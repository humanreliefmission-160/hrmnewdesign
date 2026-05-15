import { defineField, defineType } from 'sanity'

export const donationItem = defineType({
  name: 'donationItem',
  title: 'Donation Item',
  type: 'object',
  fields: [
    // ── Identity ──────────────────────────────────────────────
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'string',
      description: 'React Icons name e.g. "FaHeart"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'itemTitle',
      title: 'Item Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'itemSubtext',
      title: 'Item Subtext',
      description: 'Short tagline for the donation card',
      type: 'text',
      rows: 2,
    }),

    // ── Price ─────────────────────────────────────────────────
    defineField({
      name: 'price',
      title: 'Full Price',
      description: 'The complete cost shown on the detail page',
      type: 'number',
      validation: (Rule) => Rule.required().positive(),
    }),

    // ── Quick-Select Amounts ──────────────────────────────────
    defineField({
      name: 'amounts',
      title: 'Quick-Select Amounts',
      description: 'Fixed amounts donors can quickly choose. Custom amount is always available automatically.',
      type: 'array',
      of: [{ type: 'donationAmount' }],
    }),

    // ── Content ───────────────────────────────────────────────
    defineField({
      name: 'donationItemBody',
      title: 'Donation Item Body',
      type: 'array',
      of: [{ type: 'block' }],
    }),

    // ── Intentions ────────────────────────────────────────────
    defineField({
      name: 'intentions',
      title: 'Donation Intentions',
      description: 'Which intentions apply to this item (Zakat, Sadaqah, etc.)',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'donationIntention' }] }],
    }),

    // ── Images ────────────────────────────────────────────────
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'donationItemImage',
          title: 'Image',
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
            defineField({
              name: 'caption',
              title: 'Caption',
              type: 'string',
            }),
            defineField({
              name: 'link',
              title: 'Link',
              type: 'url',
            }),
          ],
          preview: {
            select: {
              title: 'altText',
              media: 'asset',
            },
          },
        },
      ],
    }),

    // ── Additional Fields ─────────────────────────────────────
    defineField({
      name: 'additionalFields',
      title: 'Additional Fields',
      description: 'Extra inputs to collect from donors',
      type: 'array',
      of: [{ type: 'additionalField' }],
    }),

    // ── Info ──────────────────────────────────────────────────
    defineField({
      name: 'info',
      title: 'Info',
      type: 'text',
      rows: 3,
    }),

    // ── Key Features ──────────────────────────────────────────
    defineField({
      name: 'keyFeatures',
      title: 'Key Features',
      type: 'array',
      of: [{ type: 'keyFeature' }],
    }),

    // ── How It Helps ──────────────────────────────────────────
    defineField({
      name: 'howItHelps',
      title: 'How It Helps',
      type: 'array',
      of: [{ type: 'howItHelps' }],
    }),

    // ── End Goal & Summary ────────────────────────────────────
    defineField({
      name: 'endGoal',
      title: 'End Goal',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'summarise',
      title: 'Summarise',
      type: 'text',
      rows: 3,
    }),
  ],
  preview: {
    select: {
      title: 'itemTitle',
      subtitle: 'price',
    },
    prepare({ title, subtitle }) {
      return {
        title,
        subtitle: `£${subtitle} (full price)`,
      }
    },
  },
})