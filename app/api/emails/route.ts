import DonationReceipt from '@/app/[locale]/(website)/components/emails/DonationReceipt';
import { Resend } from 'resend';

const apiKey = process.env.RESEND_API_KEY;

if (!apiKey) {
  // This throws at build/cold-start time with a clear message instead of
  // the opaque Resend constructor error, making future misconfigurations
  // easier to diagnose in Vercel's logs.
  throw new Error('Missing RESEND_API_KEY environment variable.');
}

const resend = new Resend(apiKey);

export async function POST() {
  try {
    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'media@humanreliefmission.com',
      subject: 'Welcome',
      // Fix: DonationReceipt() called as a function returns whatever the
      // component body returns as a plain object — it is not valid JSX.
      // Using <DonationReceipt /> creates an actual React element, which is
      // what Resend's `react` field and @react-email/render expect.
      react: DonationReceipt()
    });

    if (error) {
      console.error('[emails/route]', error);
      return Response.json({ error: error.message }, { status: 502 });
    }

    return Response.json({ success: true, id: data?.id });

  } catch (err) {
    console.error('[emails/route]', err);
    return Response.json({ error: 'Failed to send email' }, { status: 500 });
  }
}