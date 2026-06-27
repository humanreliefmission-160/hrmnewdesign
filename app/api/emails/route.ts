import DonationReceipt from '@/app/[locale]/(website)/components/emails/DonationReceipt';
import { Resend } from 'resend';

export async function POST() {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.error('[emails/route] Missing RESEND_API_KEY environment variable.');
    return Response.json(
      { error: 'Email service is not configured.' },
      { status: 500 }
    );
  }

  const resend = new Resend(apiKey);

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
    }); if (error) {
      console.error('[emails/route]', error);
      return Response.json({ error: error.message }, { status: 502 });
    }

    return Response.json({ success: true, id: data?.id });

  } catch (err) {
    console.error('[emails/route]', err);
    return Response.json({ error: 'Failed to send email' }, { status: 500 });
  }
}