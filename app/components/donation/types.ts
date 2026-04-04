export interface DonationState {
  type: string;
  fund: string;
  amount: number | null;
  giftAid: boolean;
}
