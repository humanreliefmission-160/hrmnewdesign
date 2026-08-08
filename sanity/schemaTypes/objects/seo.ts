import { defineField, defineType } from 'sanity'

export const seo = defineType({
  name: 'seo',
  title: 'SEO & Social Sharing',
  type: 'object',
  fields: [
    defineField({
      name: 'metaTitle',
      title: 'Meta Title',
      type: 'string',
      description: 'Title for search engine results pages (SERPs) and browser tabs. Recommended length: 50–60 characters.',
      validation: (Rule) => Rule.max(70).warning('Titles longer than 70 characters may be truncated by search engines.'),
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      rows: 3,
      description: 'Summary snippet shown in search engine results. Recommended length: 150–160 characters.',
      validation: (Rule) => Rule.max(200).warning('Descriptions longer than 200 characters may be truncated by search engines.'),
    }),
    defineField({
      name: 'ogImage',
      title: 'Social Share Image (OpenGraph)',
      description: '📐 Recommended: 1200×630 px (1.91:1 aspect ratio) for social media previews (Facebook, Twitter, WhatsApp, LinkedIn).',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'keywords',
      title: 'Keywords',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
      description: 'Target keywords related to this page or project.',
    }),
    defineField({
      name: 'canonicalUrl',
      title: 'Canonical URL',
      type: 'url',
      description: 'Optional override for the canonical URL if this content is cross-posted or has an alternate master location.',
    }),
    defineField({
      name: 'noIndex',
      title: 'Hide from Search Engines (noindex)',
      type: 'boolean',
      description: 'If checked, search engines will be instructed NOT to index this page in search results.',
      initialValue: false,
    }),
  ],
})
