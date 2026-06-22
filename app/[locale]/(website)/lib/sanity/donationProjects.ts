export const DONATION_PROJECTS_QUERY = `
  *[_type == "project" && defined(slug.current)] | order(name asc) {
    _id,
    name,
    "slug": slug.current,
    donationSection {
      donationItems[] {
        _key,
        itemTitle,
        itemSubtext,
        price,
        donationType,
        frequency,
        amounts[] {
          _key,
          amount,
          label
        },
        intentions[]-> {
          _id,
          title
        },
        additionalFields[] {
          label
        }
      }
    }
  }
`

export type DonationPortalAmount = {
  _key: string
  amount: number
  label?: string
}

export type DonationPortalIntention = {
  _id: string
  title: string
}

export type DonationPortalItem = {
  _key: string
  itemTitle: string
  itemSubtext?: string
  price: number
  donationType?: 'one-off' | 'monthly'
  frequency?: 'one-off' | 'daily' | 'weekly' | 'monthly'
  amounts?: DonationPortalAmount[]
  intentions?: DonationPortalIntention[]
  additionalFields?: Array<{ label: string }>
}

export type DonationPortalProject = {
  _id: string
  name: string
  slug: string
  donationSection?: {
    donationItems?: DonationPortalItem[]
  }
}

export function getProjectDonationItems(
  project: DonationPortalProject | undefined,
  donationType: string
): DonationPortalItem[] {
  const items = project?.donationSection?.donationItems ?? []
  if (donationType === 'oneoff') {
    return items.filter(
      (item) => (item.frequency ?? item.donationType ?? 'monthly') === 'one-off'
    )
  }
  // monthly or friday (friday is weekly/recurring)
  return items.filter(
    (item) => {
      const freq = item.frequency ?? item.donationType ?? 'monthly'
      return freq === 'monthly' || freq === 'weekly' || freq === 'daily'
    }
  )
}
