import { defineField, defineType } from 'sanity'

export const campaign = defineType({
  name: 'campaign',
  title: 'Campaign',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: r => r.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' }, validation: r => r.required() }),
    defineField({ name: 'hero', title: 'Hero Image', type: 'altImage' }),
    defineField({
      name: 'urgency_level',
      title: 'Urgency Level',
      type: 'string',
      options: { list: ['low', 'medium', 'high'] },
      initialValue: 'medium',
    }),
    defineField({ name: 'start_date', title: 'Start Date', type: 'datetime' }),
    defineField({ name: 'end_date', title: 'End Date', type: 'datetime' }),
    defineField({ name: 'countdown_to_start', title: 'Show Countdown to Start', type: 'boolean', initialValue: false }),
    defineField({ name: 'countdown_to_end', title: 'Show Countdown to End', type: 'boolean', initialValue: false }),
    defineField({ name: 'is_active', title: 'Active', type: 'boolean', initialValue: false }),
    defineField({ name: 'linked_projects', title: 'Linked Projects', type: 'array', of: [{ type: 'reference', to: [{ type: 'project' }] }] }),
    defineField({ name: 'analytics_tag', title: 'Analytics Campaign Tag', type: 'string' }),
    defineField({ name: 'featured', title: 'Featured', type: 'boolean', initialValue: false }),
    defineField({ name: 'campaign_theme', title: 'Campaign Theme', type: 'string' }),
    defineField({ name: 'donation_goal', title: 'Donation Goal (GBP)', type: 'number' }),
    defineField({ name: 'raised_amount', title: 'Raised Amount (GBP)', type: 'number' }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      fields: [
        { name: 'metaTitle', title: 'Meta Title', type: 'string' },
        { name: 'metaDescription', title: 'Meta Description', type: 'text' },
        { name: 'ogImage', title: 'Open Graph Image', type: 'image' },
        defineField({
          name: 'keywords',
          title: 'Keywords',
          type: 'array',
          of: [{ type: 'string' }],
          options: {
            layout: 'tags', // gives a tag‐style input, easy to add separate keywords
          },
        }),
      ],
    }),
    defineField({
      name: 'status',
      title: 'Campaign Status',
      type: 'string',
      options: { list: ['upcoming', 'active', 'completed', 'archived'] },
      initialValue: 'upcoming',
      validation: r => r.required(),
    }),
  ],
})