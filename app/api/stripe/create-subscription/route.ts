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
    const {
      amount,
      currency,
      email,
      name,
      address,
      city,
      postcode,
      phone,
      country,
      interval,
      durationMonths,
      metadata,
    } = await request.json();

    if (!amount || amount <= 0) {
      return NextResponse.json({ error: 'Invalid amount' }, { status: 400 });
    }

    // 1. Create or retrieve Stripe Customer
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

    // 2. Retrieve or create generic HRM donation product
    const productId = 'prod_hrm_donations';
    try {
      await stripe.products.retrieve(productId);
    } catch (err) {
      try {
        await stripe.products.create({
          id: productId,
          name: 'Human Relief Mission Donation',
          description: 'Donations to Human Relief Mission projects',
        });
      } catch (createErr: any) {
        console.log('Product creation error or already exists:', createErr.message);
      }
    }

    // 3. Define Stripe billing interval
    const stripeInterval = interval || 'month';

    // 4. Calculate cancel_at if durationMonths is provided
    let cancelAt: number | undefined = undefined;
    if (stripeInterval === 'month' && durationMonths && durationMonths >= 1 && durationMonths <= 12) {
      const cancelDate = new Date();
      cancelDate.setMonth(cancelDate.getMonth() + durationMonths);
      cancelDate.setHours(cancelDate.getHours() + 1);
      cancelAt = Math.floor(cancelDate.getTime() / 1000);
    }

    const donationRef = metadata?.donation_reference || '';

    // 5. Create the subscription
    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [
        {
          price_data: {
            currency: currency || 'gbp',
            product: productId,
            recurring: {
              interval: stripeInterval as 'day' | 'week' | 'month',
            },
            unit_amount: Math.round(amount * 100),
          },
        },
      ],
      payment_behavior: 'default_incomplete',
      payment_settings: {
        save_default_payment_method: 'on_subscription',
      },
      expand: ['latest_invoice.payment_intent'],
      cancel_at: cancelAt,
      // description shows in the Stripe Dashboard row alongside the email
      description: donationRef
        ? `HRM Donation ${donationRef} — ${email}`
        : `HRM Donation — ${email}`,
      metadata: metadata || {},
    });

    const invoice = subscription.latest_invoice as any;
    const paymentIntent = invoice?.payment_intent as any;

    if (!paymentIntent) {
      return NextResponse.json({
        subscriptionId: subscription.id,
        status: subscription.status,
      });
    }

    return NextResponse.json({
      subscriptionId: subscription.id,
      clientSecret: paymentIntent.client_secret,
      status: subscription.status,
    });
  } catch (error: any) {
    console.error('Subscription error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
