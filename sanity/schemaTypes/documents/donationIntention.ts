import { defineField, defineType } from 'sanity'

export const donationIntention = defineType({
  name: 'donationIntention',
  title: 'Donation Intention',
  type: 'document',
  icon: () => '🤲',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'e.g. "Zakat", "Sadaqah", "Lillah", "General"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
  },
})