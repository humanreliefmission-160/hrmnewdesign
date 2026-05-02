export interface DonationState {
  type: string;
  fund: string;
  label: string;
  intention: string;
  amount: number | null;
  giftAid: boolean | null;
}
