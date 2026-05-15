import { defineField, defineType } from 'sanity'

export const impactCard = defineType({
  name: 'impactCard',
  title: 'Impact Card',
  type: 'object',
  fields: [
    defineField({
      name: 'stat',
      title: 'Stat',
      description: 'e.g. "10,000+"',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'bodyText',
      title: 'Body Text',
      type: 'text',
      rows: 2,
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'stat',
      subtitle: 'bodyText',
    },
  },
})