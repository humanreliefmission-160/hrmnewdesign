import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(
  process.env.STRIPE_SECRET_KEY ||
  process.env.NEXTT_PUBLIC_STRIPE_SECRET_KEY ||
  '',
  {
    apiVersion: '2022-11-15' as any,
  }
);

export async function POST(request: Request) {
  try {
    const { amount, currency, email, name, address, city, postcode, phone, country, metadata } = await request.json();

    if (!amount || amount <= 0) {
      return NextResponse.json({ error: 'Invalid amount' }, { status: 400 });
    }

    const customers = await stripe.customers.list({ email, limit: 1 });
    let customer;

    const customerAddress = address ? {
      line1: address,
      city: city || undefined,
      postal_code: postcode || undefined,
      country: country || 'GB',
    } : undefined;

    if (customers.data.length > 0) {
      customer = customers.data[0];
      const updateParams: Stripe.CustomerUpdateParams = {};
      if (name) updateParams.name = name;
      if (phone) updateParams.phone = phone;
      if (customerAddress) updateParams.address = customerAddress;

      if (Object.keys(updateParams).length > 0) {
        await stripe.customers.update(customer.id, updateParams);
      }
    } else {
      customer = await stripe.customers.create({
        email,
        name: name || undefined,
        phone: phone || undefined,
        address: customerAddress,
      });
    }

    const donationRef = metadata?.donation_reference || '';

    // Create the PaymentIntent linked to the customer
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency: currency || 'gbp',
      customer: customer.id,
      receipt_email: email,
      // 'card' covers all card-based payment methods incl. Google Pay & Apple Pay
      payment_method_types: ['card'],
      // description shows in the Stripe Dashboard payment row alongside the email
      description: donationRef
        ? `HRM Donation ${donationRef} — ${email}`
        : `HRM Donation — ${email}`,
      metadata: metadata || {},
    });

    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (error: any) {
    console.error('Stripe error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
