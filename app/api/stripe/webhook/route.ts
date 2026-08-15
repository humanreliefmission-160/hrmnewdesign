import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createServerClient } from '@/app/[locale]/lib/supabase/server';
import DonationReceipt from '@/app/[locale]/(website)/components/emails/DonationReceipt';
import DonationNotification from '@/app/[locale]/(website)/components/emails/DonationNotification';
import { Resend } from 'resend';

const stripe = new Stripe(
  process.env.STRIPE_SECRET_KEY ||
  process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY ||
  process.env.NEXTT_PUBLIC_STRIPE_SECRET_KEY ||
  '',
  {
    apiVersion: '2026-06-24.dahlia' as any,
  }
);

export async function POST(request: Request) {
  const signature = request.headers.get('stripe-signature') || '';
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret) {
    console.error('[Stripe Webhook] Missing STRIPE_WEBHOOK_SECRET environment variable.');
    return NextResponse.json({ error: 'Webhook secret not configured' }, { status: 500 });
  }

  let event: Stripe.Event;
  try {
    const rawBody = await request.text();
    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
  } catch (err: any) {
    console.error(`[Stripe Webhook] Error verifying webhook signature:`, err.message);
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  console.log(`[Stripe Webhook] Received event type: ${event.type}`);

  const supabase = createServerClient();

  try {
    switch (event.type) {
      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        const reference = paymentIntent.metadata?.donation_reference;

        if (reference) {
          console.log(`[Stripe Webhook] PaymentIntent succeeded for donation reference: ${reference}`);
          
          // Update donation status to completed
          const { error: donationErr } = await supabase
            .from('donation')
            .update({ status: 'completed' })
            .eq('reference', reference);

          if (donationErr) {
            console.error(`[Stripe Webhook] Error updating donation status:`, donationErr);
          }

          // Fetch donation record to update payment record with payment_id
          const { data: donationData } = await supabase
            .from('donation')
            .select('id')
            .eq('reference', reference)
            .maybeSingle();

          if (donationData) {
            const { error: paymentErr } = await supabase
              .from('payment')
              .update({
                status: 'completed',
                paid_at: new Date().toISOString(),
                payment_id: paymentIntent.id,
              } as any)
              .eq('donation_id', donationData.id);

            if (paymentErr) {
              console.error(`[Stripe Webhook] Error updating payment status:`, paymentErr);
            }
          }
        }
        break;
      }

      case 'invoice.paid': {
        const invoice = event.data.object as any;
        const reference =
          (invoice.subscription_details?.metadata?.donation_reference) ||
          invoice.metadata?.donation_reference;

        const paymentIntentId = (typeof invoice.payment_intent === 'string' ? invoice.payment_intent : invoice.payment_intent?.id) || null;
        const subscriptionId = (typeof invoice.subscription === 'string' ? invoice.subscription : invoice.subscription?.id) || null;
        const amountPaid = (invoice.amount_paid || 0) / 100;
        const donorEmail = invoice.customer_email || '';

        console.log(`[Stripe Webhook] invoice.paid for reference ${reference || 'N/A'}, amount: £${amountPaid}, reason: ${invoice.billing_reason}`);

        if (reference) {
          const { data: donationData } = await supabase
            .from('donation')
            .select(`
              id,
              amount_intended_gbp,
              donation_type,
              gift_aid,
              donor:donor_id (
                first_name,
                last_name,
                email
              )
            `)
            .eq('reference', reference)
            .maybeSingle();

          if (donationData) {
            const donor = Array.isArray(donationData.donor) ? (donationData.donor as any)[0] : (donationData.donor as any);
            const firstName = donor?.first_name || '';
            const lastName = donor?.last_name || '';
            const email = donorEmail || donor?.email || '';

            // If this is a recurring renewal charge (not first invoice at checkout)
            if (invoice.billing_reason === 'subscription_cycle') {
              // Insert a new payment record into the DB
              const { error: insertErr } = await supabase
                .from('payment')
                .insert({
                  donation_id: donationData.id,
                  amount_local: amountPaid,
                  currency: 'GBP',
                  exchange_rate: 1.0,
                  frequency: donationData.donation_type,
                  payment_method: 'card',
                  status: 'completed',
                  paid_at: new Date().toISOString(),
                  payment_id: paymentIntentId,
                  subscription_id: subscriptionId,
                } as any);

              if (insertErr) {
                console.error('[Stripe Webhook] Error inserting recurring payment:', insertErr);
              }
            }

            // Send emails to donor and org for every recurring charge
            const apiKey = process.env.NEXT_RESEND_API_KEY;
            if (apiKey && email) {
              const resend = new Resend(apiKey);
              const orgEmail = process.env.CONTACT_TO_EMAIL || 'info@humanreliefmission.com';

              // Donor receipt
              try {
                await resend.emails.send({
                  from: 'Human Relief Mission <donations@notifications.humanreliefmission.com>',
                  to: email,
                  bcc: 'donate@humanreliefmission.com',
                  subject: `Recurring Donation Receipt — ${reference} | Human Relief Mission`,
                  replyTo: 'info@humanreliefmission.com',
                  react: DonationReceipt({
                    firstName,
                    lastName,
                    email,
                    total: amountPaid,
                    giftAidAmount: donationData.gift_aid ? amountPaid * 0.25 : 0,
                    totalWithGiftAid: amountPaid + (donationData.gift_aid ? amountPaid * 0.25 : 0),
                    giftAid: donationData.gift_aid,
                    type: donationData.donation_type,
                    reference,
                    date: new Date().toISOString(),
                  }),
                });
              } catch (donorEmailErr) {
                console.error('[Stripe Webhook] Error sending recurring donor receipt:', donorEmailErr);
              }

              // Org notification
              try {
                await resend.emails.send({
                  from: 'Human Relief Mission <donations@notifications.humanreliefmission.com>',
                  to: orgEmail,
                  subject: `🎉 Recurring Donation Received: ${reference} from ${firstName} ${lastName}`,
                  replyTo: `${firstName} ${lastName} <${email}>`,
                  react: DonationNotification({
                    firstName,
                    lastName,
                    email,
                    total: amountPaid,
                    giftAidAmount: donationData.gift_aid ? amountPaid * 0.25 : 0,
                    totalWithGiftAid: amountPaid + (donationData.gift_aid ? amountPaid * 0.25 : 0),
                    giftAid: donationData.gift_aid,
                    type: donationData.donation_type,
                    reference,
                    paymentId: paymentIntentId,
                    subscriptionId: subscriptionId,
                    date: new Date().toISOString(),
                  }),
                });
              } catch (orgEmailErr) {
                console.error('[Stripe Webhook] Error sending recurring org notification:', orgEmailErr);
              }
            }
          }
        }
        break;
      }

      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        const reference = paymentIntent.metadata?.donation_reference;

        if (reference) {
          console.log(`[Stripe Webhook] PaymentIntent failed for donation reference: ${reference}`);

          const { error: donationErr } = await supabase
            .from('donation')
            .update({ status: 'failed' })
            .eq('reference', reference);

          if (donationErr) {
            console.error(`[Stripe Webhook] Error updating donation status:`, donationErr);
          }

          const { data: donationData } = await supabase
            .from('donation')
            .select('id')
            .eq('reference', reference)
            .maybeSingle();

          if (donationData) {
            const { error: paymentErr } = await supabase
              .from('payment')
              .update({ status: 'failed' })
              .eq('donation_id', donationData.id);

            if (paymentErr) {
              console.error(`[Stripe Webhook] Error updating payment status:`, paymentErr);
            }
          }
        }
        break;
      }

      case 'charge.failed': {
        const charge = event.data.object as Stripe.Charge;
        const reference = charge.metadata?.donation_reference;

        if (reference) {
          console.log(`[Stripe Webhook] Charge failed for donation reference: ${reference}`);
          
          const { error: donationErr } = await supabase
            .from('donation')
            .update({ status: 'failed' })
            .eq('reference', reference);

          if (donationErr) {
            console.error(`[Stripe Webhook] Error updating donation status:`, donationErr);
          }
        }
        break;
      }
    }

    return NextResponse.json({ received: true });
  } catch (err: any) {
    console.error(`[Stripe Webhook] Handler error:`, err);
    return NextResponse.json({ error: 'Webhook handler failed' }, { status: 500 });
  }
}
