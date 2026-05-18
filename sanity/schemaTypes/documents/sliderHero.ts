import { defineField, defineType } from 'sanity'

export const sliderHero = defineType({
  name: 'heroSlide',
  title: 'Homepage Hero Slider',
  type: 'document',
  icon: () => '🎞️',
  fields: [
    defineField({
      name: 'slideName',
      title: 'Slide Name',
      description: 'Internal label for the editor e.g. "Ramadan 2025 Slide"',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Slide Image',
      type: 'object',
      fields: [
        defineField({
          name: 'asset',
          title: 'Image',
          type: 'image',
          options: { hotspot: true },
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'altText',
          title: 'Alt Text',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
      ],
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
    defineField({
      name: 'link',
      title: 'Button',
      type: 'object',
      fields: [
        defineField({
          name: 'label',
          title: 'Button Label',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'url',
          title: 'URL',
          type: 'string',
          description: 'Can be internal path e.g. "/projects" or external URL',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'isExternal',
          title: 'Opens in new tab?',
          type: 'boolean',
          initialValue: false,
        }),
      ],
    }),
    defineField({
      name: 'order',
      title: 'Slide Order',
      type: 'number',
      description: 'Lower numbers appear first. Drag to reorder.',
      validation: (Rule) => Rule.required().integer().min(0),
    }),
  ],
  orderings: [
    {
      title: 'Slide Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'slideName',
      subtitle: 'title',
      media: 'image.asset',
    },
  },
})