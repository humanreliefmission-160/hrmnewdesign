import DonationReceipt from '@/app/[locale]/(website)/components/emails/DonationReceipt';
import DonationNotification from '@/app/[locale]/(website)/components/emails/DonationNotification';
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
    // No body or malformed
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
    paymentId = null,
    subscriptionId = null,
    last4 = null,
    date,
    bankDetails = null,
  } = body;

  if (!email) {
    return Response.json({ error: 'Recipient email is required.' }, { status: 400 });
  }

  const resend = new Resend(apiKey);
  const isOffline = bankDetails !== null;

  const donorSubject = isOffline
    ? `Donation Intent Confirmed — ${reference} | Human Relief Mission`
    : `Donation Receipt — ${reference} | Human Relief Mission`;

  const orgSubject = `🎉 New Donation: ${reference} from ${firstName} ${lastName}`;
  const orgEmail = process.env.CONTACT_TO_EMAIL || 'info@humanreliefmission.com';

  try {
    // 1. Send receipt to donor
    const { data: donorResult, error: donorErr } = await resend.emails.send({
      from: 'Human Relief Mission <donations@notifications.humanreliefmission.com>',
      to: email,
      bcc: 'donate@humanreliefmission.com',
      subject: donorSubject,
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

    if (donorErr) {
      console.error('[emails/route] Resend error sending to donor:', donorErr);
      return Response.json({ error: donorErr.message }, { status: 502 });
    }

    // 2. Send notification to organization team (non-blocking failure)
    try {
      await resend.emails.send({
        from: 'Human Relief Mission <donations@notifications.humanreliefmission.com>',
        to: orgEmail,
        subject: orgSubject,
        replyTo: `${firstName} ${lastName} <${email}>`,
        react: DonationNotification({
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
          paymentId,
          subscriptionId,
          last4,
          date,
          bankDetails,
        }),
      });
    } catch (orgErr) {
      console.error('[emails/route] Error sending org notification:', orgErr);
    }

    return Response.json({ success: true, id: donorResult?.id });

  } catch (err: any) {
    console.error('[emails/route]', err);
    return Response.json({ error: err?.message || 'Failed to send email' }, { status: 500 });
  }
}