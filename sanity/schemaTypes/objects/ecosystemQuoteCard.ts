import { defineField, defineType } from 'sanity'

export const ecosystemQuoteCard = defineType({
  name: 'ecosystemQuoteCard',
  title: 'Ecosystem Quote Card',
  type: 'object',
  fields: [
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'string',
      description: 'React Icons name e.g. "FaQuoteLeft"',
    }),
    defineField({
      name: 'quote',
      title: 'Quote',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'reference',
      title: 'Reference',
      description: 'e.g. "Ahmad, Kabul 2024"',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      title: 'quote',
      subtitle: 'reference',
    },
  },
})