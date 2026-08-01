import { defineField, defineType } from 'sanity'

export const imageGalleryItem = defineType({
  name: 'imageGalleryItem',
  title: 'Image Gallery Item',
  type: 'object',
  fields: [
    defineField({
      name: 'image',
      title: 'Image',
      description: '📐 Recommended: 640×440 px (4:3). Shown in the scrolling image strip on project pages.',
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
      name: 'link',
      title: 'Link',
      type: 'url',
    }),
    defineField({
      name: 'videoUrl',
      title: 'Video (YouTube URL)',
      description: '▶️ Optional. Paste a YouTube link to show a video in this gallery slot instead of the image. Recommended ratio: 4:3 (e.g. 640×440). Takes priority over the image if provided.',
      type: 'url',
    }),
    defineField({
      name: 'muteVideo',
      title: 'Mute Video',
      description: 'If checked, the video plays silently (recommended for autoplay).',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'altText',
      media: 'image',
    },
  },
})