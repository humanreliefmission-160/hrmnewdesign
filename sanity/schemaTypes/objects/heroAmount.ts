import { defineField, defineType } from 'sanity'

export const heroAmount = defineType({
  name: 'heroAmount',
  title: 'Hero Amount',
  type: 'object',
  fields: [
    defineField({
      name: 'amount',
      title: 'Amount (£)',
      type: 'number',
      validation: (Rule) => Rule.required().positive(),
    }),
    defineField({
      name: 'impactLabel',
      title: 'Impact Label',
      description: 'e.g. "Feeds a family for a week"',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'impactLabel',
      subtitle: 'amount',
    },
    prepare({ title, subtitle }) {
      return {
        title,
        subtitle: subtitle ? `£${subtitle}` : '',
      }
    },
  },
})