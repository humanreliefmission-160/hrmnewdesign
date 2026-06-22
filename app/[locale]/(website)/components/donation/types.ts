export interface DonationState {
  type: string
  /** @deprecated Use projectName — kept for payment summary compatibility */
  fund: string
  label: string
  projectId: string
  projectName: string
  projectSlug: string
  donationItemKey: string
  donationItemTitle: string
  intention: string
  amount: number | null
  giftAid: boolean | null
  additionalFieldValues: Record<string, string>
  durationMonths: number | null // null means ongoing / indefinite
}

export const initialDonationState: DonationState = {
  type: 'monthly',
  fund: '',
  label: '',
  projectId: '',
  projectName: '',
  projectSlug: '',
  donationItemKey: '',
  donationItemTitle: '',
  intention: '',
  amount: null,
  giftAid: null,
  additionalFieldValues: {},
  durationMonths: null,
}
