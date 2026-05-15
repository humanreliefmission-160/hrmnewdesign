import { defineField, defineType } from 'sanity'

export const howItHelps = defineType({
  name: 'howItHelps',
  title: 'How It Helps',
  type: 'object',
  fields: [
    defineField({
      name: 'text',
      title: 'Text',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'text',
    },
  },
})