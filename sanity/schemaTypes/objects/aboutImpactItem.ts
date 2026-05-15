import { defineField, defineType } from 'sanity'

export const aboutImpactItem = defineType({
  name: 'aboutImpactItem',
  title: 'About Impact Item',
  type: 'object',
  description: 'Mirrors homepage impact: icon, figure, and a single line of descriptive text.',
  fields: [
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'string',
      description: 'React Icons name e.g. "FaHandHoldingHeart"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'figure',
      title: 'Figure',
      description: 'The stat value e.g. "10,000+" or "£2M"',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      description: 'One line of text describing the impact e.g. "Families provided with food packs"',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'figure',
      subtitle: 'description',
    },
    prepare({ title, subtitle }) {
      return {
        title: title || '',
        subtitle: subtitle || '',
      }
    },
  },
})