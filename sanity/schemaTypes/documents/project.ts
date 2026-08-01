import { defineField, defineType } from 'sanity'
import IconSelector from '../../components/IconSelector'

export const project = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  icon: () => '📋',
  groups: [
    { name: 'overview', title: '📌 Overview', default: true },
    { name: 'intro', title: '📖 Intro' },
    { name: 'caseStudies', title: '📰 Case Studies' },
    { name: 'donations', title: '💰 Donations' },
    { name: 'benefits', title: '✅ Benefits' },
    { name: 'impact', title: '📊 Impact' },
    { name: 'ecosystem', title: '🌱 Ecosystem' },
    { name: 'faq', title: '❓ FAQ' },
  ],
  fields: [
    // ── Overview ────────────────────────────────────────────────
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'string',
      components: {
        input: IconSelector,
      },
      group: 'overview',
      description: 'React Icons name e.g. "FaHeart"',
    }),
    defineField({
      name: 'name',
      title: 'Project Name',
      type: 'string',
      group: 'overview',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      group: 'overview',
    }),
    defineField({
      name: 'projectCategory',
      title: 'Project Category',
      type: 'reference',
      to: [{ type: 'projectCategory' }],
      group: 'overview',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'cardSummary',
      title: 'Project Card Summary',
      description: 'Short summary shown on the project listing card',
      type: 'text',
      rows: 3,
      group: 'overview',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'overview',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'headerImage',
      title: 'Header Image',
      description: '📐 Recommended: 1200×800 px (3:2) for the image-half of the project header.',
      type: 'image',
      group: 'overview',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'headerVideoUrl',
      title: 'Header Video (YouTube URL)',
      description: '▶️ Optional. Paste a YouTube link to show a video instead of the image on the right-hand side of the project header. Recommended ratio: 16:9 (e.g. 1920×1080). If provided, this takes priority over the Header Image.',
      type: 'url',
      group: 'overview',
    }),
    defineField({
      name: 'headerVideoMute',
      title: 'Mute Header Video',
      description: 'If checked, the video will play silently (recommended for autoplay).',
      type: 'boolean',
      initialValue: true,
      group: 'overview',
    }),
    defineField({
      name: 'heroAmounts',
      title: 'Hero Amounts',
      description: 'Exactly 3 amounts for the most urgent needs',
      type: 'array',
      group: 'overview',
      of: [{ type: 'heroAmount' }],
      validation: (Rule) => Rule.required().min(3).max(3),
    }),

    // ── Intro ───────────────────────────────────────────────────
    defineField({
      name: 'introSection',
      title: 'Intro Section',
      type: 'object',
      group: 'intro',
      fields: [
        defineField({
          name: 'sectionTag',
          title: 'Section Tag',
          description: 'Label above the title e.g. "Our Mission"',
          type: 'string',
        }),
        defineField({
          name: 'title',
          title: 'Title',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'bodyText',
          title: 'Body Text',
          type: 'array',
          of: [{ type: 'block' }],
        }),
        defineField({
          name: 'stats',
          title: 'Stats',
          type: 'array',
          of: [{ type: 'stat' }],
        }),
      ],
    }),

    // ── Case Studies ────────────────────────────────────────────
    defineField({
      name: 'caseStudies',
      title: 'Case Studies',
      description: 'Up to 3 per project',
      type: 'array',
      group: 'caseStudies',
      of: [{ type: 'caseStudy' }],
      validation: (Rule) => Rule.max(3),
    }),

    // ── Donations ───────────────────────────────────────────────
    defineField({
      name: 'donationSection',
      title: 'Donation Section',
      type: 'object',
      group: 'donations',
      fields: [
        defineField({
          name: 'sectionTag',
          title: 'Section Tag',
          type: 'string',
        }),
        defineField({
          name: 'donationTitle',
          title: 'Donation Title',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'donationSubtext',
          title: 'Donation Subtext',
          type: 'text',
          rows: 3,
        }),
        defineField({
          name: 'donationItems',
          title: 'Donation Items',
          type: 'array',
          of: [{ type: 'donationItem' }],
        }),
      ],
    }),

    // ── Benefits ────────────────────────────────────────────────
    defineField({
      name: 'benefits',
      title: 'Benefits',
      type: 'object',
      group: 'benefits',
      fields: [
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
          rows: 2,
        }),
        defineField({
          name: 'cards',
          title: 'Benefit Cards',
          type: 'array',
          of: [{ type: 'benefitCard' }],
        }),
        defineField({
          name: 'imageGallery',
          title: 'Image Gallery',
          type: 'array',
          of: [{ type: 'imageGalleryItem' }],
        }),
      ],
    }),

    // ── Impact ──────────────────────────────────────────────────
    defineField({
      name: 'impactSection',
      title: 'Impact Section',
      type: 'object',
      group: 'impact',
      fields: [
        defineField({
          name: 'title',
          title: 'Title',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'bodyText',
          title: 'Body Text',
          type: 'array',
          of: [{ type: 'block' }],
        }),
        defineField({
          name: 'impactCards',
          title: 'Impact Cards',
          type: 'array',
          of: [{ type: 'impactCard' }],
        }),
      ],
    }),

    // ── Ecosystem ───────────────────────────────────────────────
    defineField({
      name: 'ecosystemSection',
      title: 'Ecosystem Section',
      type: 'object',
      group: 'ecosystem',
      description: 'Connect this project to the 4-stage ecosystem model',
      fields: [
        defineField({
          name: 'title',
          title: 'Title',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'bodyText',
          title: 'Body Text',
          type: 'array',
          of: [{ type: 'block' }],
        }),
        defineField({
          name: 'stage',
          title: 'Ecosystem Stage',
          description: 'Select which stage this project is currently in',
          type: 'reference',
          to: [{ type: 'ecosystemStage' }],
          // validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'ecosystemCards',
          title: 'Ecosystem Cards',
          description: 'Cards shown within this stage for this project',
          type: 'array',
          of: [{ type: 'ecosystemCardRef' }],
        }),
        defineField({
          name: 'quoteCard',
          title: 'Quote Card',
          type: 'ecosystemQuoteCard',
        }),
        defineField({
          name: 'callToAction',
          title: 'Call to Action',
          description: 'A CTA block shown at the bottom of the ecosystem section',
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
            }),
            defineField({
              name: 'body',
              title: 'Body',
              type: 'text',
              rows: 3,
            }),
            defineField({
              name: 'text',
              title: 'Button Text',
              type: 'string',
            }),
          ],
        }),
      ],
    }),


    // ── FAQ ─────────────────────────────────────────────────────
    defineField({
      name: 'faq',
      title: 'FAQ',
      type: 'object',
      group: 'faq',
      fields: [
        defineField({
          name: 'title',
          title: 'Section Title',
          type: 'string',
          initialValue: 'Frequently Asked Questions',
        }),
        defineField({
          name: 'cards',
          title: 'FAQ Cards',
          type: 'array',
          of: [{ type: 'faqCard' }],
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'tagline',
      category: 'projectCategory.name',
    },
    prepare({ title, subtitle, category }) {
      return {
        title,
        subtitle: `${category ? `[${category}] ` : ''}${subtitle || ''}`,
      }
    },
  },
})