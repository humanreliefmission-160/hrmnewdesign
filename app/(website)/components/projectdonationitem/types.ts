export interface DonationState {
  type: string;
  fund: string;
  intention: string;
  amount: number | null;
  giftAid: boolean | null;
}
