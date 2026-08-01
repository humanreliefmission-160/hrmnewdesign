import { defineField, defineType } from 'sanity'

export const caseStudy = defineType({
  name: 'caseStudy',
  title: 'Case Study',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'object',
      fields: [
        defineField({
          name: 'asset',
          title: 'Image',
          description: '📐 Recommended: 800×600 px (4:3). Shown as the left-hand visual in the Case Study section.',
          type: 'image',
          options: { hotspot: true },
        }),
        defineField({
          name: 'altText',
          title: 'Alt Text',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'caption',
          title: 'Image Caption',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'videoUrl',
      title: 'Video (YouTube URL)',
      description: '▶️ Optional. Paste a YouTube link to show a video in the Case Study left-side panel instead of the image. Recommended ratio: 4:3 (e.g. 800×600). Takes priority over the image if provided.',
      type: 'url',
    }),
    defineField({
      name: 'muteVideo',
      title: 'Mute Video',
      description: 'If checked, the case study video plays silently.',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'quote',
      title: 'Quote',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'reference',
      title: 'Reference',
      type: 'object',
      fields: [
        defineField({
          name: 'dateAndLocation',
          title: 'Date and Location',
          description: 'e.g. "Kabul, March 2024"',
          type: 'string',
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image.asset',
    },
  },
})