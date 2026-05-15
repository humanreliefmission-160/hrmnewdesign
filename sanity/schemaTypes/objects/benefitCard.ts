import { defineField, defineType } from 'sanity'

export const benefitCard = defineType({
  name: 'benefitCard',
  title: 'Benefit Card',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtext',
      title: 'Subtext',
      type: 'text',
      rows: 3,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'subtext',
    },
  },
})