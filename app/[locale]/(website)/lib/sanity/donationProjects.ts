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
  donationType: 'one-off' | 'monthly'
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
  const sanityType = donationType === 'oneoff' ? 'one-off' : 'monthly'
  return items.filter(
    // Items saved before donationType was added have undefined — treat them as
    // 'monthly' to match the schema's initialValue so they are not silently hidden.
    (item) => (item.donationType ?? 'monthly') === sanityType
  )
}
