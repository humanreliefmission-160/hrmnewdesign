import { defineField, defineType } from 'sanity'

export const donationAmount = defineType({
  name: 'donationAmount',
  title: 'Quick-Select Amount',
  type: 'object',
  fields: [
    defineField({
      name: 'amount',
      title: 'Amount (£)',
      type: 'number',
      validation: (Rule) => Rule.required().positive(),
    }),
    defineField({
      name: 'label',
      title: 'Label',
      description: 'Optional e.g. "Most Popular" or "Basic"',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      title: 'amount',
      subtitle: 'label',
    },
    prepare({ title, subtitle }) {
      return {
        title: `£${title}`,
        subtitle: subtitle || 'Quick-select',
      }
    },
  },
})