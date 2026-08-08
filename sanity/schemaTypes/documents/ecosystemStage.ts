import { defineField, defineType } from 'sanity'
import IconSelector from '../../components/IconSelector'

export const ecosystemStage = defineType({
  name: 'ecosystemStage',
  title: 'Ecosystem Stage',
  type: 'document',
  icon: () => '🌱',
  fields: [
    defineField({
      name: 'seo',
      title: 'SEO & Social Sharing',
      type: 'seo',
    }),
    // ── Page Header ──────────────────────────────────────────────
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'e.g. "Essentials", "Stability", "Development", "Self Sustainability"',
      validation: (Rule) => Rule.required(),
    }),
    // defineField({
    //   name: 'slug',
    //   title: 'Slug',
    //   type: 'slug',
    //   options: {
    //     source: 'title',
    //     maxLength: 96,
    //   },
    //   validation: (Rule) => Rule.required(),
    // }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      // Required — Studio blocks publishing without a slug
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'order',
      title: 'Stage Order',
      type: 'number',
      description: '1 = first stage, 4 = final stage',
      validation: (Rule) => Rule.required().min(1).max(4).integer(),
    }),
    defineField({
      name: 'headerImage',
      title: 'Header Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'headerDescription',
      title: 'Header Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'donationPrices',
      title: 'Header Donation Prices',
      description: 'Pre-defined quick-select prices for this stage in the header',
      type: 'array',
      of: [{ type: 'heroAmount' }],
    }),

    // ── Ecosystem Card ───────────────────────────────────────────
    defineField({
      name: 'cardImage',
      title: 'Card Image',
      description: 'Shows on card and the Ecosystem stage Page Header section',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'cardIcon',
      title: 'Card Icon',
      description: 'For about page when user selects stage, the project will show',
      type: 'string',
      components: {
        input: IconSelector,
      },
    }),
    defineField({
      name: 'stageNumber',
      title: 'Stage Number',
      description: 'Shows on card and About us page ecosystem card',
      type: 'number',
    }),
    defineField({
      name: 'stageName',
      title: 'Stage Name',
      type: 'string',
    }),
    defineField({
      name: 'cardDescription',
      title: 'Card Description',
      type: 'text',
      rows: 3,
    }),

    // ── Intro Section ────────────────────────────────────────────
    defineField({
      name: 'introTitle',
      title: 'Intro Title',
      type: 'string',
    }),
    defineField({
      name: 'impactCards',
      title: 'Impact Cards',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'impactCardItem',
          title: 'Impact Card Item',
          fields: [
            defineField({ name: 'figure', title: 'Figure', type: 'string' }),
            defineField({ name: 'subtext', title: 'Subtext', type: 'string' }),
          ],
        },
      ],
    }),
    defineField({
      name: 'whyThisStageExists',
      title: 'Why this stage exists',
      type: 'object',
      fields: [
        defineField({ name: 'title', title: 'Title', type: 'string' }),
        defineField({ name: 'bodyText', title: 'Body Text', type: 'array', of: [{ type: 'block' }] }),
      ],
    }),
    defineField({
      name: 'howThisStageWorks',
      title: 'How this stage works',
      type: 'object',
      fields: [
        defineField({ name: 'title', title: 'Title', type: 'string' }),
        defineField({ name: 'bodyText', title: 'Body Text', type: 'array', of: [{ type: 'block' }] }),
      ],
    }),
    defineField({
      name: 'longTermVision',
      title: 'Long term vision',
      type: 'object',
      fields: [
        defineField({ name: 'title', title: 'Title', type: 'string' }),
        defineField({ name: 'bodyText', title: 'Body Text', type: 'array', of: [{ type: 'block' }] }),
      ],
    }),
    defineField({
      name: 'howYouCanHelp',
      title: 'How you can help',
      type: 'object',
      fields: [
        defineField({ name: 'title', title: 'Title', type: 'string' }),
        defineField({ name: 'bodyText', title: 'Body Text', type: 'array', of: [{ type: 'block' }] }),
      ],
    }),

    // ── Case Study ───────────────────────────────────────────────
    defineField({
      name: 'caseStudy',
      title: 'Case Study',
      type: 'object',
      fields: [
        defineField({ name: 'title', title: 'Title', type: 'string' }),
        defineField({
          name: 'image',
          title: 'Image',
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({ name: 'caption', title: 'Caption', type: 'string' }),
          ],
        }),
        defineField({ name: 'quote', title: 'Quote', type: 'text', rows: 3 }),
        defineField({ name: 'bodyText', title: 'Body Text', type: 'array', of: [{ type: 'block' }] }),
        defineField({
          name: 'reference',
          title: 'Reference',
          type: 'object',
          fields: [
            defineField({ name: 'text', title: 'Reference Text', type: 'string' }),
            defineField({ name: 'dateAndInterviewer', title: 'Date and Interviewer', type: 'string' }),
          ],
        }),
      ],
    }),

    // ── FAQs ─────────────────────────────────────────────────────
    defineField({
      name: 'faqs',
      title: 'FAQs',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'faqItem',
          title: 'FAQ Item',
          fields: [
            defineField({ name: 'question', title: 'Question', type: 'string' }),
            defineField({ name: 'answer', title: 'Answer', type: 'text', rows: 4 }),
          ],
        },
      ],
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
      media: 'cardImage',
    },
    prepare({ title, order, media }) {
      return {
        title: `Stage ${order || ''}: ${title || ''}`,
        media,
      }
    },
  },
})