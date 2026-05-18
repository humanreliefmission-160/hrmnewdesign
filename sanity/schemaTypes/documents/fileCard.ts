import { defineField, defineType } from 'sanity'

export const fileCard = defineType({
  name: 'fileCard',
  title: 'Downloadable File Card',
  type: 'document',
  icon: () => '📥',
  fields: [
    defineField({
      name: 'type',
      title: 'File Type',
      type: 'string',
      options: {
        list: [
          { title: 'Annual Report', value: 'annual-report' },
          { title: 'Policies', value: 'policies' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Title',
      description: 'Displayed on the card front',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Body',
      description: 'Short description shown on the card',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'file',
      title: 'File',
      type: 'file',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      description: 'Optional thumbnail for the card',
      type: 'image',
      options: { hotspot: true },
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'type',
      media: 'coverImage',
    },
    prepare({ title, subtitle, media }) {
      const typeLabel: Record<string, string> = {
        'annual-report': 'Annual Report',
        'policies': 'Policies',
      }
      return {
        title,
        subtitle: typeLabel[subtitle] || subtitle,
        media,
      }
    },
  },
})