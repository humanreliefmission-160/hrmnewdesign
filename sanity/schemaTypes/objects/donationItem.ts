import { defineField, defineType } from 'sanity'
import IconSelector from '../../components/IconSelector'

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
      components: {
        input: IconSelector,
      },
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
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      description: 'Auto-generated from title. Used for the donation item detail page URL.',
      options: {
        source: 'itemTitle',
        maxLength: 96,
        // Slug lives inside an array; provide isUnique to suppress the
        // "cannot be automatically checked for uniqueness" warning.
        isUnique: () => true,
      },
      validation: (R) => R.required(),
    }),

    // ── Price ─────────────────────────────────────────────────
    defineField({
      name: 'price',
      title: 'Full Price',
      description: 'The complete cost shown on the detail page',
      type: 'number',
      validation: (Rule) => Rule.required().positive(),
    }),

    // ── Donation Frequency ─────────────────────────────────────
    defineField({
      name: 'frequency',
      title: 'Frequency',
      description: 'The payment frequencies for this donation item',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'One Off', value: 'one-off' },
          { title: 'Daily', value: 'daily' },
          { title: 'Weekly', value: 'weekly' },
          { title: 'Monthly', value: 'monthly' },
          { title: 'Friday Giving', value: 'friday' },
        ],
      },
      initialValue: ['monthly'],
      validation: (Rule) => Rule.required(),
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