import { defineField, defineType } from 'sanity'

export const project = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    // Core
    defineField({ name: 'name', title: 'Project Name', type: 'string', validation: r => r.required() }),
    defineField({ name: 'tagline', title: 'Tagline', type: 'string' }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'name' }, validation: r => r.required() }),
    defineField({ name: 'category', title: 'Category', type: 'reference', to: [{ type: 'projectCategory' }], validation: r => r.required() }),
    defineField({ name: 'location', title: 'Primary Location', type: 'reference', to: [{ type: 'location' }] }),
    defineField({ name: 'cardSummary', title: 'Card Summary', type: 'text' }),

    // Hero Amounts
    defineField({
      name: 'heroAmounts',
      title: 'Hero Donation Amounts',
      type: 'array',
      of: [{
        type: 'object',
        name: 'heroAmount',
        fields: [
          { name: 'amount', title: 'Amount (GBP)', type: 'number', validation: r => r.required() },
          { name: 'impactLabel', title: 'Impact Label', type: 'string' },
        ],
      }],
      validation: r => r.max(3),
    }),

    // Intro
    defineField({
      name: 'intro',
      title: 'Intro Section',
      type: 'object',
      fields: [
        defineField({ name: 'sectionTag', title: 'Section Tag', type: 'string' }),
        defineField({ name: 'title', title: 'Title', type: 'string', validation: r => r.required() }),
        defineField({ name: 'body', title: 'Body', type: 'blockContent' }),
        defineField({ name: 'stats', title: 'Stats', type: 'array', of: [{ type: 'stat' }] }),
      ],
    }),

    // Case Studies
    defineField({
      name: 'caseStudies',
      title: 'Case Studies',
      type: 'array',
      of: [{
        type: 'object',
        name: 'caseStudy',
        fields: [
          defineField({ name: 'title', title: 'Title', type: 'string', validation: r => r.required() }),
          defineField({ name: 'image', title: 'Image', type: 'altImage' }),
          defineField({ name: 'quote', title: 'Quote', type: 'string' }),
          defineField({ name: 'body', title: 'Body', type: 'blockContent' }),
          defineField({ name: 'refDate', title: 'Reference Date', type: 'date' }),
          defineField({ name: 'refLocation', title: 'Reference Location', type: 'string' }),
        ],
      }],
      validation: r => r.max(3),
    }),

    // Donation Section
    defineField({
      name: 'donation',
      title: 'Donation Section',
      type: 'object',
      fields: [
        defineField({ name: 'sectionTag', title: 'Section Tag', type: 'string' }),
        defineField({ name: 'title', title: 'Title', type: 'string', validation: r => r.required() }),
        defineField({ name: 'subtext', title: 'Subtext', type: 'text' }),
        defineField({ name: 'items', title: 'Donation Items', type: 'array', of: [{ type: 'donationItem' }] }),
      ],
    }),

    // Benefits
    defineField({
      name: 'benefits',
      title: 'Benefits Section',
      type: 'object',
      fields: [
        defineField({ name: 'title', title: 'Title', type: 'string' }),
        defineField({ name: 'subtext', title: 'Subtext', type: 'text' }),
        defineField({
          name: 'cards',
          title: 'Benefit Cards',
          type: 'array',
          of: [{
            type: 'object',
            name: 'benefitCard',
            fields: [
              { name: 'title', title: 'Title', type: 'string' },
              { name: 'subtext', title: 'Subtext', type: 'string' },
            ],
          }],
        }),
        defineField({ name: 'gallery', title: 'Image Gallery', type: 'array', of: [{ type: 'altImage' }] }),
      ],
    }),

    // Impact
    defineField({
      name: 'impact',
      title: 'Impact Section',
      type: 'object',
      fields: [
        defineField({ name: 'title', title: 'Title', type: 'string' }),
        defineField({ name: 'body', title: 'Body', type: 'blockContent' }),
        defineField({
          name: 'cards',
          title: 'Impact Cards',
          type: 'array',
          of: [{
            type: 'object',
            name: 'impactCard',
            fields: [
              { name: 'stat', title: 'Stat', type: 'string' },
              { name: 'bodyText', title: 'Body Text', type: 'string' },
            ],
          }],
        }),
      ],
    }),

    // Ecosystem
    defineField({
      name: 'ecosystem',
      title: 'Ecosystem Section',
      type: 'object',
      fields: [
        defineField({ name: 'title', title: 'Title', type: 'string' }),
        defineField({ name: 'body', title: 'Body', type: 'blockContent' }),
        defineField({
          name: 'cards',
          title: 'Ecosystem Cards',
          type: 'array',
          of: [{
            type: 'object',
            name: 'ecoCard',
            fields: [
              { name: 'icon', title: 'Icon', type: 'string' },
              { name: 'title', title: 'Title', type: 'string' },
              { name: 'bodyText', title: 'Body Text', type: 'string' },
            ],
          }],
        }),
        defineField({
          name: 'quote',
          title: 'Quote',
          type: 'object',
          fields: [
            { name: 'icon', title: 'Icon', type: 'string' },
            { name: 'quote', title: 'Quote', type: 'string' },
            { name: 'reference', title: 'Reference', type: 'string' },
          ],
        }),
      ],
    }),

    // FAQ
    defineField({
      name: 'faqs',
      title: 'FAQs',
      type: 'array',
      of: [{
        type: 'object',
        name: 'faq',
        fields: [
          { name: 'question', title: 'Question', type: 'string', validation: r => r.required() },
          { name: 'answer', title: 'Answer', type: 'blockContent' },
        ],
      }],
    }),
  ],
})