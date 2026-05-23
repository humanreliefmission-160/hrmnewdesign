import { defineField, defineType } from 'sanity'

export const benefitCard = defineType({
  name: 'benefitCard',
  title: 'Benefit Card',
  type: 'object',
  fields: [
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'string',
      description: 'React Icons name e.g. "FaHandHoldingHeart". Find the icon name from this link https://react-icons.github.io/react-icons/search',
      validation: (Rule) => Rule.required(),
    }),
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