import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createServerClient } from '@/app/[locale]/lib/supabase/server';

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

          // Fetch the donation record to get its ID for updating associated payment record
          const { data: donationData } = await supabase
            .from('donation')
            .select('id')
            .eq('reference', reference)
            .maybeSingle();

          if (donationData) {
            const { error: paymentErr } = await supabase
              .from('payment')
              .update({ status: 'completed', paid_at: new Date().toISOString() })
              .eq('donation_id', donationData.id);

            if (paymentErr) {
              console.error(`[Stripe Webhook] Error updating payment status:`, paymentErr);
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
