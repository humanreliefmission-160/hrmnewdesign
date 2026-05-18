import { defineField, defineType } from 'sanity'

export const aboutUs = defineType({
  name: 'aboutUs',
  title: 'About Us',
  type: 'document',
  icon: () => '🤝',
  // __experimental_actions: ['update', 'publish'],
  fields: [
    // ── Who We Are ────────────────────────────────────────────────
    defineField({
      name: 'whoWeAre',
      title: 'Who We Are',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Section Title',
          type: 'string',
          initialValue: 'Who We Are',
        }),
        defineField({
          name: 'body',
          title: 'Body Text',
          type: 'array',
          of: [{ type: 'block' }],
        }),
        defineField({
          name: 'images',
          title: 'Slideshow Images',
          description: 'Add as many images as you like',
          type: 'array',
          of: [{ type: 'imageWithAlt' }],
        }),
      ],
    }),

    // ── Impact ────────────────────────────────────────────────────
    defineField({
      name: 'impactSection',
      title: 'Impact',
      description: 'Mirrors the homepage impact stats. Each item shows icon, figure, and one line.',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Section Title',
          type: 'string',
          initialValue: 'Our Impact',
        }),
        defineField({
          name: 'items',
          title: 'Impact Items',
          type: 'array',
          of: [{ type: 'aboutImpactItem' }],
        }),
      ],
    }),

    // ── Downloadable File Cards ───────────────────────────────────
    defineField({
      name: 'fileCards',
      title: 'Downloadable File Cards',
      description: 'Select file cards to display on the About Us page',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'fileCard' }],
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: 'About Us' }
    },
  },
})