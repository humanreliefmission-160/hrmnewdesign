import DonationReceipt from '@/app/[locale]/(website)/components/emails/DonationReceipt';
import { Resend } from 'resend';

export async function POST(request: Request) {
  const apiKey = process.env.NEXT_RESEND_API_KEY;

  if (!apiKey) {
    console.error('[emails/route] Missing NEXT_RESEND_API_KEY environment variable.');
    return Response.json(
      { error: 'Email service is not configured.' },
      { status: 500 }
    );
  }

  let body: Record<string, any> = {};
  try {
    body = await request.json();
  } catch {
    // No body or malformed — fall through with empty body (still sends a basic receipt)
  }

  const {
    firstName = '',
    lastName = '',
    email = '',
    total = 0,
    giftAidAmount = 0,
    totalWithGiftAid = 0,
    giftAid = false,
    type = 'oneoff',
    lineItems = [],
    reference = '',
    date,
    bankDetails = null,
  } = body;

  if (!email) {
    return Response.json({ error: 'Recipient email is required.' }, { status: 400 });
  }

  const resend = new Resend(apiKey);

  const donorName = [firstName, lastName].filter(Boolean).join(' ') || 'Donor';
  const isOffline = bankDetails !== null;

  const subject = isOffline
    ? `Donation Intent Confirmed — ${reference} | Human Relief Mission`
    : `Donation Receipt — ${reference} | Human Relief Mission`;

  try {
    const { data, error } = await resend.emails.send({
      from: 'Human Relief Mission <donations@notifications.humanreliefmission.com>',
      to: email,
      bcc: 'donate@humanreliefmission.com',
      subject,
      replyTo: 'info@humanreliefmission.com',
      react: DonationReceipt({
        firstName,
        lastName,
        email,
        total,
        giftAidAmount,
        totalWithGiftAid,
        giftAid,
        type,
        lineItems,
        reference,
        date,
        bankDetails,
      }),
    });

    if (error) {
      console.error('[emails/route] Resend error object:', JSON.stringify(error, null, 2));
      console.error('[emails/route] Resend error name:', error.name);
      console.error('[emails/route] Resend error message:', error.message);
      return Response.json({ error: error.message }, { status: 502 });
    }

    return Response.json({ success: true, id: data?.id });

  } catch (err) {
    console.error('[emails/route]', err);
    return Response.json({ error: 'Failed to send email' }, { status: 500 });
  }
}