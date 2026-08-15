import {
  Html,
  Body,
  Head,
  Heading,
  Text,
  Section,
  Row,
  Column,
  Hr,
  Preview,
  Container,
} from '@react-email/components';

interface LineItem {
  projectName: string;
  projectItem: string;
  intention: string;
  amount: number;
}

interface DonationNotificationProps {
  firstName?: string;
  lastName?: string;
  email?: string;
  total?: number;
  giftAidAmount?: number;
  totalWithGiftAid?: number;
  giftAid?: boolean | null;
  type?: string;
  lineItems?: LineItem[];
  reference?: string;
  paymentId?: string | null;
  subscriptionId?: string | null;
  last4?: string | null;
  date?: string;
  bankDetails?: Record<string, string> | null;
}

function fmt(value: number) {
  return value.toLocaleString('en-GB', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function formatDonationType(type?: string) {
  switch (type) {
    case 'monthly': return 'Monthly';
    case 'weekly': return 'Weekly';
    case 'daily': return 'Daily';
    case 'friday': return 'Friday Giving';
    default: return 'One-off';
  }
}

function formatDate(iso?: string) {
  if (!iso) return new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
}

export default function DonationNotification({
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
}: DonationNotificationProps) {
  const donorName = [firstName, lastName].filter(Boolean).join(' ') || 'Anonymous Donor';
  const donationDate = formatDate(date);
  const isOfflinePayment = bankDetails !== null;

  const formattedPaymentId = paymentId ? `#${paymentId} - Stripe` : '—';
  const formattedSubId = subscriptionId ? `#${subscriptionId}-S${subscriptionId.slice(-4).toUpperCase()} - Stripe` : null;

  return (
    <Html lang="en">
      <Head />
      <Preview>New Donation Received: {reference} — {donorName}</Preview>
      <Body style={{ backgroundColor: '#F5F5F5', fontFamily: 'Outfit, Arial, sans-serif', margin: 0, padding: 0 }}>
        <Container style={{ maxWidth: '600px', margin: '32px auto', backgroundColor: '#ffffff', borderRadius: '4px', overflow: 'hidden', border: '1px solid #E5E5E5' }}>

          {/* Banner Header */}
          <Section style={{ backgroundColor: '#650199', padding: '36px 40px', textAlign: 'center' }}>
            <Text style={{ color: '#FED21C', fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', margin: '0 0 8px' }}>
              Human Relief Mission — Internal Notification
            </Text>
            <Heading style={{ color: '#ffffff', fontSize: '24px', fontWeight: 700, margin: 0, lineHeight: '1.3' }}>
              🎉 Congratulations! New donation from {donorName}
            </Heading>
          </Section>

          {/* Reference + key metadata */}
          <Section style={{ backgroundColor: '#F8F0FF', padding: '20px 40px', borderBottom: '1px solid #E9D5FF' }}>
            <Row>
              <Column style={{ width: '50%' }}>
                <Text style={{ margin: 0, fontSize: '11px', color: '#9c6cc0', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Donation Reference</Text>
                <Text style={{ margin: '4px 0 0', fontSize: '18px', fontWeight: 700, color: '#650199' }}>{reference || '—'}</Text>
              </Column>
              <Column style={{ width: '50%', textAlign: 'right' as const }}>
                <Text style={{ margin: 0, fontSize: '11px', color: '#9c6cc0', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Date & Frequency</Text>
                <Text style={{ margin: '4px 0 0', fontSize: '13px', fontWeight: 600, color: '#1A1A1A' }}>{donationDate}</Text>
                <Text style={{ margin: '2px 0 0', fontSize: '12px', fontWeight: 700, color: '#650199' }}>{formatDonationType(type)}</Text>
              </Column>
            </Row>
          </Section>

          {/* Donor Info */}
          <Section style={{ padding: '24px 40px 12px' }}>
            <Heading as="h2" style={{ fontSize: '14px', fontWeight: 700, color: '#1A1A1A', margin: '0 0 12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Donor Information
            </Heading>
            <Section style={{ backgroundColor: '#FAFAFA', borderRadius: '4px', padding: '14px 16px', border: '1px solid #E5E5E5' }}>
              <Row style={{ marginBottom: '6px' }}>
                <Column style={{ width: '35%' }}><Text style={{ margin: 0, fontSize: '13px', color: '#6B6B6B', fontWeight: 600 }}>Name:</Text></Column>
                <Column><Text style={{ margin: 0, fontSize: '13px', color: '#1A1A1A', fontWeight: 700 }}>{donorName}</Text></Column>
              </Row>
              <Row style={{ marginBottom: '6px' }}>
                <Column style={{ width: '35%' }}><Text style={{ margin: 0, fontSize: '13px', color: '#6B6B6B', fontWeight: 600 }}>Email:</Text></Column>
                <Column><Text style={{ margin: 0, fontSize: '13px', color: '#650199', fontWeight: 600 }}>{email}</Text></Column>
              </Row>
            </Section>
          </Section>

          {/* Donation Summary */}
          <Section style={{ padding: '12px 40px 24px' }}>
            <Heading as="h2" style={{ fontSize: '14px', fontWeight: 700, color: '#1A1A1A', margin: '0 0 12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Donation Details
            </Heading>

            {lineItems.length > 0 ? (
              lineItems.map((item, i) => (
                <Row key={i} style={{ marginBottom: '8px', backgroundColor: '#FAFAFA', borderRadius: '4px', padding: '10px 12px', border: '1px solid #E5E5E5' }}>
                  <Column>
                    <Text style={{ margin: 0, fontSize: '13px', fontWeight: 600, color: '#1A1A1A' }}>{item.projectName}</Text>
                    {(item.projectItem || item.intention) && (
                      <Text style={{ margin: '2px 0 0', fontSize: '12px', color: '#6B6B6B' }}>
                        {[item.projectItem, item.intention].filter(Boolean).join(' | ')}
                      </Text>
                    )}
                  </Column>
                  <Column style={{ textAlign: 'right' as const }}>
                    <Text style={{ margin: 0, fontSize: '14px', fontWeight: 700, color: '#650199' }}>£{fmt(item.amount)}</Text>
                  </Column>
                </Row>
              ))
            ) : null}

            <Hr style={{ borderColor: '#E5E5E5', margin: '16px 0' }} />

            {/* Total + Gift Aid */}
            {giftAid && giftAidAmount > 0 && (
              <Row style={{ marginBottom: '6px' }}>
                <Column><Text style={{ margin: 0, fontSize: '13px', color: '#6B6B6B' }}>Gift Aid (+25%)</Text></Column>
                <Column style={{ textAlign: 'right' as const }}>
                  <Text style={{ margin: 0, fontSize: '13px', fontWeight: 600, color: '#650199' }}>+ £{fmt(giftAidAmount)}</Text>
                </Column>
              </Row>
            )}

            <Row>
              <Column><Text style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: '#1A1A1A' }}>Total Amount</Text></Column>
              <Column style={{ textAlign: 'right' as const }}>
                <Text style={{ margin: 0, fontSize: '22px', fontWeight: 700, color: '#650199' }}>£{fmt(total)}</Text>
              </Column>
            </Row>
          </Section>

          {/* Payment Identifiers Section */}
          <Section style={{ padding: '0 40px 24px' }}>
            <Heading as="h2" style={{ fontSize: '14px', fontWeight: 700, color: '#1A1A1A', margin: '0 0 12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Payment References
            </Heading>
            <Section style={{ backgroundColor: '#F8F0FF', borderRadius: '4px', padding: '14px 16px', border: '1px solid #E9D5FF' }}>
              <Row style={{ marginBottom: '6px' }}>
                <Column style={{ width: '40%' }}><Text style={{ margin: 0, fontSize: '12px', color: '#6B6B6B', fontWeight: 600 }}>Payment ID:</Text></Column>
                <Column><Text style={{ margin: 0, fontSize: '12px', color: '#1A1A1A', fontWeight: 700, fontFamily: 'monospace' }}>{formattedPaymentId}</Text></Column>
              </Row>

              {formattedSubId && (
                <Row style={{ marginBottom: '6px' }}>
                  <Column style={{ width: '40%' }}><Text style={{ margin: 0, fontSize: '12px', color: '#6B6B6B', fontWeight: 600 }}>Subscription ID:</Text></Column>
                  <Column><Text style={{ margin: 0, fontSize: '12px', color: '#650199', fontWeight: 700, fontFamily: 'monospace' }}>{formattedSubId}</Text></Column>
                </Row>
              )}

              {last4 && (
                <Row style={{ marginBottom: '4px' }}>
                  <Column style={{ width: '40%' }}><Text style={{ margin: 0, fontSize: '12px', color: '#6B6B6B', fontWeight: 600 }}>Card Last 4 Digits:</Text></Column>
                  <Column><Text style={{ margin: 0, fontSize: '12px', color: '#1A1A1A', fontWeight: 700 }}>•••• {last4}</Text></Column>
                </Row>
              )}
            </Section>
          </Section>

          {/* Footer */}
          <Section style={{ backgroundColor: '#1A1A1A', padding: '20px 40px', textAlign: 'center' as const }}>
            <Text style={{ color: 'rgba(255,255,255,0.6)', fontSize: '11px', margin: 0 }}>
              Human Relief Mission · Admin Notification System
            </Text>
          </Section>

        </Container>
      </Body>
    </Html>
  );
}
