export type DonationItemImage = {
  altText: string
  caption?: string
  link?: string
  asset?: { _ref: string; _type: 'reference' }
}

export type IntentionRef = {
  title: string
  description?: string
}

export type DonationAmountOption = {
  _key: string
  amount: number
  label?: string
}

export type DonationItemData = {
  icon?: string
  itemTitle: string
  itemSubtext?: string
  price: number
  donationType: 'one-off' | 'monthly'
  frequency?: string | string[]
  donationItemBody?: any[]
  amounts?: DonationAmountOption[]
  intentions?: IntentionRef[]
  additionalFields?: Array<{ label: string }>
  images?: DonationItemImage[]
  keyFeatures?: Array<{ title: string; text: string }>
  howItHelps?: Array<{ text: string }>
  info?: string
  endGoal?: string
  summarise?: string
}

export type GalleryImage = {
  src: string
  altText: string
  caption?: string
  link?: string
}
