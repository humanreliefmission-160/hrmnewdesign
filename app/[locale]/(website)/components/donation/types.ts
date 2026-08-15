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
  durationMonths: number | null // null means ongoing / indefinite (monthly)
  // Daily giving date range
  dailyStartDate: string | null  // ISO date string, e.g. "2026-08-20"
  dailyEndDate: string | null    // ISO date string
  // Weekly / Friday giving duration
  weeklyDurationWeeks: number | null // 1–52
  // Monthly giving mode
  monthlyMode: 'quantity' | 'full_year' | null
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
  dailyStartDate: null,
  dailyEndDate: null,
  weeklyDurationWeeks: null,
  monthlyMode: null,
}
