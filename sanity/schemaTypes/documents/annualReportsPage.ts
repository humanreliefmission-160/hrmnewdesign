import { defineField, defineType } from 'sanity'

export const annualReportsPage = defineType({
  name: 'annualReportsPage',
  title: 'Annual Reports Page',
  type: 'document',
  icon: () => '📊',
  // Singleton — only one document of this type should exist
  fields: [
    // ── Page Header ───────────────────────────────────────────────
    defineField({
      name: 'pageHeaderTitle',
      title: 'Page Header Title',
      type: 'string',
      description: 'Large heading displayed in the purple hero banner',
      initialValue: 'Annual Reports',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'pageHeaderSubtitle',
      title: 'Page Header Subtitle',
      type: 'string',
      description: 'Short line shown beneath the main heading in the hero',
      initialValue: 'Transparency and accountability at the heart of everything we do.',
    }),

    // ── Intro Text ────────────────────────────────────────────────
    defineField({
      name: 'introText',
      title: 'Intro Paragraph',
      type: 'text',
      rows: 4,
      description: 'Introductory paragraph displayed between the page header and the report cards',
      initialValue:
        'We believe in full transparency. Our annual reports give a comprehensive overview of our programmes, financials and the impact your donations have had on communities around the world.',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Annual Reports Page' }
    },
  },
})
