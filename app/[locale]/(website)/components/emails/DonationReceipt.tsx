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
  Img,
} from '@react-email/components';

interface LineItem {
  projectName: string;
  projectItem: string;
  intention: string;
  amount: number;
}

interface DonationReceiptProps {
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

export default function DonationReceipt({
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
}: DonationReceiptProps) {
  const donorName = [firstName, lastName].filter(Boolean).join(' ') || 'Valued Donor';
  const donationDate = formatDate(date);
  const isOfflinePayment = bankDetails !== null;

  return (
    <Html lang="en">
      <Head />
      <Preview>Your donation receipt — {reference} | Human Relief Mission</Preview>
      <Body style={{ backgroundColor: '#F5F5F5', fontFamily: 'Outfit, Arial, sans-serif', margin: 0, padding: 0 }}>
        <Container style={{ maxWidth: '600px', margin: '32px auto', backgroundColor: '#ffffff', borderRadius: '4px', overflow: 'hidden', border: '1px solid #E5E5E5' }}>

          {/* Header */}
          <Section style={{ backgroundColor: '#650199', padding: '36px 40px', textAlign: 'center' }}>
            <Heading style={{ color: '#ffffff', fontSize: '26px', fontWeight: 700, margin: 0, lineHeight: '1.2' }}>
              Thank you, {firstName || donorName}!
            </Heading>
            <Text style={{ color: 'rgba(255,255,255,0.8)', fontSize: '14px', margin: '8px 0 0' }}>
              {isOfflinePayment
                ? 'Your donation intent has been recorded.'
                : 'Your donation was successfully processed.'}
            </Text>
          </Section>

          {/* Reference + date */}
          <Section style={{ backgroundColor: '#F8F0FF', padding: '20px 40px', borderBottom: '1px solid #E9D5FF' }}>
            <Row>
              <Column style={{ width: '60%' }}>
                <Text style={{ margin: 0, fontSize: '11px', color: '#9c6cc0', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Donation Reference</Text>
                <Text style={{ margin: '4px 0 0', fontSize: '20px', fontWeight: 700, color: '#650199' }}>{reference || '—'}</Text>
              </Column>
              <Column style={{ width: '40%', textAlign: 'right' as const }}>
                <Text style={{ margin: 0, fontSize: '11px', color: '#9c6cc0', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Date</Text>
                <Text style={{ margin: '4px 0 0', fontSize: '13px', fontWeight: 600, color: '#1A1A1A' }}>{donationDate}</Text>
                <Text style={{ margin: '4px 0 0', fontSize: '12px', color: '#9c6cc0' }}>Type: {formatDonationType(type)}</Text>
              </Column>
            </Row>
          </Section>

          {/* Donation breakdown */}
          <Section style={{ padding: '28px 40px' }}>
            <Heading as="h2" style={{ fontSize: '14px', fontWeight: 700, color: '#1A1A1A', margin: '0 0 16px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Donation Summary
            </Heading>

            {lineItems.length > 0 ? (
              lineItems.map((item, i) => (
                <Row key={i} style={{ marginBottom: '10px', backgroundColor: '#FAFAFA', borderRadius: '4px', padding: '10px 12px', border: '1px solid #E5E5E5' }}>
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
            ) : (
              <Text style={{ color: '#6B6B6B', fontSize: '13px' }}>—</Text>
            )}

            <Hr style={{ borderColor: '#E5E5E5', margin: '16px 0' }} />

            {/* Gift Aid */}
            {giftAid && giftAidAmount > 0 && (
              <Row style={{ marginBottom: '8px' }}>
                <Column><Text style={{ margin: 0, fontSize: '13px', color: '#6B6B6B' }}>Gift Aid (+25%)</Text></Column>
                <Column style={{ textAlign: 'right' as const }}>
                  <Text style={{ margin: 0, fontSize: '13px', fontWeight: 600, color: '#650199' }}>+ £{fmt(giftAidAmount)}</Text>
                </Column>
              </Row>
            )}

            {/* Total */}
            <Row>
              <Column><Text style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: '#1A1A1A' }}>Total Donated</Text></Column>
              <Column style={{ textAlign: 'right' as const }}>
                <Text style={{ margin: 0, fontSize: '22px', fontWeight: 700, color: '#650199' }}>£{fmt(total)}</Text>
              </Column>
            </Row>

            {giftAid && totalWithGiftAid > total && (
              <Text style={{ margin: '6px 0 0', fontSize: '11px', color: '#9c6cc0', fontStyle: 'italic' }}>
                Total value to the charity with Gift Aid: £{fmt(totalWithGiftAid)}
              </Text>
            )}
          </Section>

          {/* ── Bank Details Section (only for offline payments) ── */}
          {isOfflinePayment && bankDetails && (
            <Section style={{ padding: '0 40px 28px' }}>
              <Hr style={{ borderColor: '#E9D5FF', margin: '0 0 20px' }} />
              <Heading as="h2" style={{ fontSize: '14px', fontWeight: 700, color: '#1A1A1A', margin: '0 0 12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                {bankDetails.method === 'BACS Direct Debit' ? 'BACS Direct Debit Details' : `${bankDetails.method} Details`}
              </Heading>

              {bankDetails.method === 'BACS Direct Debit' ? (
                <Section style={{ backgroundColor: '#F8F0FF', borderRadius: '4px', padding: '16px 20px', border: '1px solid #E9D5FF' }}>
                  <Text style={{ margin: '0 0 6px', fontSize: '12px', color: '#6B6B6B' }}>
                    A BACS Direct Debit mandate has been submitted. Your bank will activate it within 3–5 working days.
                  </Text>
                  <Hr style={{ borderColor: '#E9D5FF', margin: '10px 0' }} />
                  {[
                    ['Account Holder', bankDetails.accountHolderName],
                    ['Sort Code', bankDetails.sortCode],
                    ['Account Number', bankDetails.accountNumber],
                  ].map(([label, value]) => (
                    <Row key={label} style={{ marginBottom: '6px' }}>
                      <Column style={{ width: '45%' }}>
                        <Text style={{ margin: 0, fontSize: '12px', color: '#6B6B6B', fontWeight: 600 }}>{label}</Text>
                      </Column>
                      <Column>
                        <Text style={{ margin: 0, fontSize: '12px', color: '#1A1A1A', fontWeight: 700 }}>{value}</Text>
                      </Column>
                    </Row>
                  ))}
                </Section>
              ) : (
                <Section style={{ backgroundColor: '#F8F0FF', borderRadius: '4px', padding: '16px 20px', border: '1px solid #E9D5FF' }}>
                  <Text style={{ margin: '0 0 6px', fontSize: '12px', color: '#6B6B6B' }}>
                    {bankDetails.method === 'Standing Order'
                      ? 'The donor has confirmed they will set up a Standing Order to Human Relief Mission.'
                      : 'The donor has confirmed they will make a Bank Transfer to Human Relief Mission.'}
                  </Text>
                  <Hr style={{ borderColor: '#E9D5FF', margin: '10px 0' }} />
                  {[
                    ['Donor Name', bankDetails.accountHolderName],
                    ['Donor Bank', bankDetails.bankName],
                    [bankDetails.method === 'Standing Order' ? 'First Payment Date' : 'Est. Transfer Date', bankDetails.estimatedTransferDate],
                  ].map(([label, value]) => (
                    <Row key={label} style={{ marginBottom: '6px' }}>
                      <Column style={{ width: '45%' }}>
                        <Text style={{ margin: 0, fontSize: '12px', color: '#6B6B6B', fontWeight: 600 }}>{label}</Text>
                      </Column>
                      <Column>
                        <Text style={{ margin: 0, fontSize: '12px', color: '#1A1A1A', fontWeight: 700 }}>{value}</Text>
                      </Column>
                    </Row>
                  ))}
                </Section>
              )}

              {/* HRM bank details for donor reference */}
              <Section style={{ backgroundColor: '#ffffff', borderRadius: '4px', padding: '14px 20px', border: '1px solid #E5E5E5', marginTop: '12px' }}>
                <Text style={{ margin: '0 0 8px', fontSize: '12px', fontWeight: 700, color: '#1A1A1A' }}>Human Relief Mission Bank Details:</Text>
                {[
                  ['Account Name', 'Human Relief Mission'],
                  ['Sort Code', '30-00-00'],
                  ['Account Number', '12345678'],
                ].map(([label, value]) => (
                  <Row key={label} style={{ marginBottom: '4px' }}>
                    <Column style={{ width: '45%' }}>
                      <Text style={{ margin: 0, fontSize: '12px', color: '#6B6B6B' }}>{label}</Text>
                    </Column>
                    <Column>
                      <Text style={{ margin: 0, fontSize: '12px', color: '#1A1A1A', fontWeight: 600 }}>{value}</Text>
                    </Column>
                  </Row>
                ))}
              </Section>
            </Section>
          )}

          {/* Message */}
          <Section style={{ padding: '0 40px 28px', textAlign: 'center' as const }}>
            <Hr style={{ borderColor: '#E5E5E5', margin: '0 0 20px' }} />
            <Text style={{ fontSize: '13px', color: '#6B6B6B', lineHeight: '1.6', margin: 0 }}>
              Your generosity makes a real difference to communities in need around the world. Human Relief Mission is a registered UK charity
              and all donations are used directly to fund life-changing projects.
            </Text>
          </Section>

          {/* Footer */}
          <Section style={{ backgroundColor: '#1A1A1A', padding: '20px 40px', textAlign: 'center' as const }}>
            <Text style={{ color: 'rgba(255,255,255,0.5)', fontSize: '11px', margin: 0 }}>
              Human Relief Mission · Registered Charity No. {process.env.NEXT_PUBLIC_CHARITY_NO ?? '1160380'}
            </Text>
            <Text style={{ color: 'rgba(255,255,255,0.4)', fontSize: '10px', margin: '6px 0 0' }}>
              humanreliefmission.com · This email was sent to {email}
            </Text>
          </Section>

        </Container>
      </Body>
    </Html>
  );
}
