import { defineField, defineType } from 'sanity'

export const navigation = defineType({
  name: 'navigation',
  title: 'Header/Footer Navigation',
  type: 'document',
  icon: () => '🧭',
  fields: [
    defineField({
      name: 'placement',
      title: 'Placement',
      type: 'string',
      options: {
        list: [
          { title: 'Header', value: 'header' },
          { title: 'Footer', value: 'footer' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),

    // ── Nav Items ─────────────────────────────────────────────────
    defineField({
      name: 'navItems',
      title: 'Navigation Items',
      description: 'Drag to reorder. Sub items only render on the header.',
      type: 'array',
      of: [{ type: 'navItem' }],
    }),

    // ── Footer Extras (only shown if footer) ──────────────────────
    defineField({
      name: 'footerTagline',
      title: 'Footer Tagline',
      description: 'Short tagline shown in the footer e.g. charity reg number or mission statement',
      type: 'string',
      hidden: ({ document }) => document?.placement !== 'footer',
    }),
    defineField({
      name: 'footerLogo',
      title: 'Footer Logo',
      type: 'image',
      options: { hotspot: true },
      hidden: ({ document }) => document?.placement !== 'footer',
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      description: 'Social media links shown in the footer',
      type: 'array',
      hidden: ({ document }) => document?.placement !== 'footer',
      of: [
        {
          type: 'object',
          name: 'socialLink',
          title: 'Social Link',
          fields: [
            defineField({
              name: 'platform',
              title: 'Platform',
              type: 'string',
              options: {
                list: [
                  { title: 'Facebook', value: 'facebook' },
                  { title: 'Instagram', value: 'instagram' },
                  { title: 'X / Twitter', value: 'twitter' },
                  { title: 'LinkedIn', value: 'linkedin' },
                  { title: 'YouTube', value: 'youtube' },
                  { title: 'TikTok', value: 'tiktok' },
                  { title: 'WhatsApp', value: 'whatsapp' },
                ],
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'url',
              title: 'URL',
              type: 'url',
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              title: 'platform',
              subtitle: 'url',
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      placement: 'placement',
      items: 'navItems',
    },
    prepare({ placement, items }) {
      const count = items?.length || 0
      return {
        title: placement === 'header' ? 'Header Navigation' : 'Footer Navigation',
        subtitle: `${count} item${count !== 1 ? 's' : ''}`,
      }
    },
  },
})