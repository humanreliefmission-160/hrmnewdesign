import { Resend } from 'resend';
import {
  checkRateLimit,
  verifyTurnstileToken,
  isValidEmailDomain,
  isSuspiciousContent,
} from '@/lib/antiSpam';

export async function POST(request: Request) {
  const apiKey = process.env.NEXT_RESEND_API_KEY;

  if (!apiKey) {
    console.error('[api/contact] Missing NEXT_RESEND_API_KEY environment variable.');
    return Response.json(
      { error: 'Email service is not configured.' },
      { status: 500 }
    );
  }

  // ---------------------------------------------------------------------------
  // 1. IP Rate Limiting
  //    Reject rapid-fire requests from the same IP before we even parse the body.
  //    This is the cheapest check — costs almost nothing server-side.
  // ---------------------------------------------------------------------------
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0].trim() ??
    request.headers.get('x-real-ip') ??
    'unknown';

  if (!checkRateLimit(ip, { max: 5, windowMs: 10 * 60 * 1000 })) {
    console.warn(`[api/contact] Rate limit exceeded for IP: ${ip}`);
    return Response.json(
      { error: 'Too many requests. Please wait a few minutes and try again.' },
      { status: 429 }
    );
  }

  // ---------------------------------------------------------------------------
  // 2. Parse JSON body
  // ---------------------------------------------------------------------------
  let body: Record<string, any> = {};
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: 'Invalid JSON payload.' }, { status: 400 });
  }

  const {
    firstName = '',
    lastName = '',
    email = '',
    phone = '',
    subject = '',
    donationReference = '',
    message = '',
    // Anti-spam fields sent by the client
    _hp_website = '',                 // Honeypot field — must always be empty
    _form_rendered_at = null,         // Timestamp (ms) when the form was first rendered
    turnstileToken = '',              // Cloudflare Turnstile challenge token
  } = body;

  // ---------------------------------------------------------------------------
  // 3. Honeypot check
  //    Bots auto-fill hidden fields. Humans never see or interact with this field.
  //    Silently return 200 so bots believe they succeeded and don't adapt.
  // ---------------------------------------------------------------------------
  if (_hp_website) {
    console.warn(`[api/contact] Honeypot triggered from IP: ${ip}`, { _hp_website });
    return Response.json({ success: true }); // Fake success — no email sent
  }

  // ---------------------------------------------------------------------------
  // 4. Speed trap check
  //    Human form-filling takes at least 2.5 seconds. Script submissions are
  //    near-instant. If the client sent a render timestamp, enforce this minimum.
  // ---------------------------------------------------------------------------
  if (_form_rendered_at && typeof _form_rendered_at === 'number') {
    const elapsed = Date.now() - _form_rendered_at;
    if (elapsed < 2500) {
      console.warn(`[api/contact] Speed trap triggered from IP: ${ip}. Elapsed: ${elapsed}ms`);
      return Response.json({ success: true }); // Fake success
    }
  }

  // ---------------------------------------------------------------------------
  // 5. Cloudflare Turnstile verification
  //    Confirms a real browser completed the challenge — not a headless script.
  // ---------------------------------------------------------------------------
  const turnstileValid = await verifyTurnstileToken(turnstileToken, ip);
  if (!turnstileValid) {
    console.warn(`[api/contact] Turnstile verification failed from IP: ${ip}`);
    return Response.json(
      { error: 'Verification failed. Please refresh the page and try again.' },
      { status: 400 }
    );
  }

  // ---------------------------------------------------------------------------
  // 6. Required field validation
  // ---------------------------------------------------------------------------
  if (
    !firstName.trim() ||
    !lastName.trim() ||
    !email.trim() ||
    !subject.trim() ||
    !message.trim()
  ) {
    return Response.json(
      { error: 'Please fill in all required fields.' },
      { status: 400 }
    );
  }

  // ---------------------------------------------------------------------------
  // 7. Email domain validation
  //    Blocks disposable/throwaway providers and gibberish usernames.
  // ---------------------------------------------------------------------------
  if (!isValidEmailDomain(email.trim())) {
    console.warn(`[api/contact] Rejected suspicious email: ${email} from IP: ${ip}`);
    return Response.json(
      { error: 'Please enter a valid email address.' },
      { status: 400 }
    );
  }

  // ---------------------------------------------------------------------------
  // 8. Suspicious content check
  //    Detects gibberish, keyboard-walk patterns, URL injection, XSS probes.
  // ---------------------------------------------------------------------------
  if (isSuspiciousContent(message)) {
    console.warn(`[api/contact] Suspicious message content from IP: ${ip}`, { message });
    return Response.json(
      { error: 'Your message could not be processed. Please write a clear message.' },
      { status: 400 }
    );
  }

  if (subject && isSuspiciousContent(subject)) {
    console.warn(`[api/contact] Suspicious subject from IP: ${ip}`, { subject });
    return Response.json(
      { error: 'Your subject could not be processed. Please enter a valid subject.' },
      { status: 400 }
    );
  }

  // ---------------------------------------------------------------------------
  // All checks passed — proceed to send emails via Resend
  // ---------------------------------------------------------------------------
  const resend = new Resend(apiKey);
  const fullName = `${firstName.trim()} ${lastName.trim()}`;
  const notificationEmail = process.env.CONTACT_TO_EMAIL || 'info@humanreliefmission.com';

  try {
    // 1. Send notification email to the HRM team
    const teamEmailResult = await resend.emails.send({
      from: 'Human Relief Mission Contact Form <donations@notifications.humanreliefmission.com>',
      to: notificationEmail,
      replyTo: `${fullName} <${email.trim()}>`,
      subject: `[Contact Form] ${subject} - ${fullName}`,
      html: `
        <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
          <div style="background-color: #650199; padding: 24px; text-align: center; color: #ffffff;">
            <h1 style="margin: 0; font-size: 22px; font-weight: 700;">New Contact Form Submission</h1>
            <p style="margin: 8px 0 0 0; font-size: 14px; opacity: 0.9;">Human Relief Mission Website</p>
          </div>
          <div style="padding: 30px; color: #333333; line-height: 1.6;">
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
              <tr>
                <td style="padding: 8px 0; font-weight: bold; width: 140px; color: #650199;">From:</td>
                <td style="padding: 8px 0;">${fullName}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #650199;">Email:</td>
                <td style="padding: 8px 0;"><a href="mailto:${email.trim()}" style="color: #650199; text-decoration: underline;">${email.trim()}</a></td>
              </tr>
              ${phone ? `
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #650199;">Phone:</td>
                <td style="padding: 8px 0;"><a href="tel:${phone.trim()}" style="color: #333333; text-decoration: none;">${phone.trim()}</a></td>
              </tr>
              ` : ''}
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #650199;">Subject:</td>
                <td style="padding: 8px 0;">${subject}</td>
              </tr>
              ${donationReference ? `
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #650199;">Donation Ref:</td>
                <td style="padding: 8px 0; font-weight: bold;">${donationReference.trim()}</td>
              </tr>
              ` : ''}
            </table>

            <div style="background-color: #f9f5fc; border-left: 4px solid #650199; padding: 16px; border-radius: 4px; margin-top: 16px;">
              <h3 style="margin: 0 0 10px 0; font-size: 15px; color: #650199;">Message Content:</h3>
              <p style="margin: 0; white-space: pre-wrap; font-size: 14px; color: #222222;">${message.trim()}</p>
            </div>
          </div>
          <div style="background-color: #f4f4f4; padding: 16px; text-align: center; font-size: 12px; color: #666666;">
            Reply directly to this email to respond to ${fullName} - <a href="mailto:${email.trim()}" style="color: #650199; text-decoration: underline;">${email.trim()}</a>
          </div>
        </div>
      `,
    });

    if (teamEmailResult.error) {
      console.error('[api/contact] Resend error sending to team:', teamEmailResult.error);
      return Response.json(
        { error: teamEmailResult.error.message || 'Failed to deliver message.' },
        { status: 502 }
      );
    }

    // 2. Send confirmation auto-responder to sender (fire & forget)
    //    Only reaches this point because ALL anti-spam checks have passed.
    try {
      await resend.emails.send({
        from: 'Human Relief Mission <donations@notifications.humanreliefmission.com>',
        to: email.trim(),
        replyTo: 'info@humanreliefmission.com',
        subject: `Thank you for contacting Human Relief Mission`,
        html: `
          <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
            <div style="background-color: #650199; padding: 24px; text-align: center; color: #ffffff;">
              <h1 style="margin: 0; font-size: 22px; font-weight: 700;">Human Relief Mission</h1>
              <p style="margin: 8px 0 0 0; font-size: 14px; opacity: 0.9;">Helping Humanity Through Welfare</p>
            </div>
            <div style="padding: 30px; color: #333333; line-height: 1.6;">
              <p style="font-size: 16px; font-weight: bold; margin-top: 0;">Dear ${firstName.trim()},</p>
              <p style="font-size: 14px;">Thank you for contacting Human Relief Mission. We have received your message regarding <strong>"${subject}"</strong>.</p>
              ${donationReference ? `<p style="font-size: 14px;">Donation Reference: <strong>${donationReference.trim()}</strong></p>` : ''}
              <p style="font-size: 14px;">Our team is reviewing your enquiry and someone will get back to you within 2&ndash;4 business days.</p>
              
              <div style="background-color: #f9f5fc; border-left: 4px solid #650199; padding: 16px; border-radius: 4px; margin: 20px 0;">
                <h4 style="margin: 0 0 8px 0; color: #650199; font-size: 14px;">Summary of your message:</h4>
                <p style="margin: 0; font-size: 13px; color: #555555; white-space: pre-wrap;">${message.trim()}</p>
              </div>

              <p style="font-size: 14px;">If you have any urgent enquiries, please call us directly on <a href="tel:+443000300160" style="color: #650199; font-weight: bold;">+44 (0) 300 0300 160</a>.</p>
              <p style="font-size: 14px; margin-bottom: 0;">Warm regards,<br /><strong>Human Relief Mission Team</strong></p>
            </div>
            <div style="background-color: #f4f4f4; padding: 16px; text-align: center; font-size: 12px; color: #666666;">
              Human Relief Mission | 160 Harehills Lane, Leeds, LS8 5JP | Charity No. 1160380
            </div>
          </div>
        `,
      });
    } catch (autoRespErr) {
      console.warn('[api/contact] Non-fatal auto-responder email error:', autoRespErr);
    }

    return Response.json({ success: true, id: teamEmailResult.data?.id });
  } catch (err: any) {
    console.error('[api/contact] Internal error:', err);
    return Response.json(
      { error: err?.message || 'An unexpected error occurred while sending your message.' },
      { status: 500 }
    );
  }
}
