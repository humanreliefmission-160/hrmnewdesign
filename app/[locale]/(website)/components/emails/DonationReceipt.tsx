import { Html, Body, Heading, Text, Section, Button } from '@react-email/components';

export default function DonationReceipt() {
  return (
    <Html>
      <Body>
        <Section>
          <Heading>Donation Receipt</Heading>
          <Text>Thank you for your donation!</Text>
        </Section>
        <Button href="https://humanreliefmission.com"
          className='bg-purple text-brand-white px-10 py-5 rounded-sm'>
          Visit Website
        </Button>
      </Body>
    </Html>
  );
}
