import { defineField, defineType } from 'sanity'

export const ecosystemStage = defineType({
  name: 'ecosystemStage',
  title: 'Ecosystem Stage',
  type: 'document',
  icon: () => '🌱',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'e.g. "Essentials", "Stability", "Development", "Self Sustainability"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Stage Order',
      type: 'number',
      description: '1 = first stage, 4 = final stage',
      validation: (Rule) => Rule.required().min(1).max(4).integer(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [{ type: 'imageWithAlt' }],
    }),
  ],
  orderings: [
    {
      title: 'Stage Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      order: 'order',
      media: 'images.0.image',
    },
    prepare({ title, order, media }) {
      return {
        title: `Stage ${order}: ${title}`,
        media,
      }
    },
  },
})