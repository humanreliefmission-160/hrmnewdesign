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

    // ── Nav Items (header only) ────────────────────────────────────
    defineField({
      name: 'navItems',
      title: 'Navigation Items',
      description: 'Drag to reorder. These are the links shown in the header navbar.',
      type: 'array',
      of: [{ type: 'navItem' }],
      hidden: ({ document }) => document?.placement !== 'header',
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

    // ── Footer Columns (only shown if footer) ─────────────────────
    defineField({
      name: 'footerColumns',
      title: 'Footer Columns',
      description: 'Each item is a column in the footer. Add a heading and links for each column.',
      type: 'array',
      hidden: ({ document }) => document?.placement !== 'footer',
      of: [
        {
          type: 'object',
          name: 'footerColumn',
          title: 'Footer Column',
          fields: [
            defineField({
              name: 'columnTitle',
              title: 'Column Heading',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'links',
              title: 'Links',
              type: 'array',
              of: [
                {
                  type: 'object',
                  name: 'footerLink',
                  title: 'Link',
                  fields: [
                    defineField({
                      name: 'label',
                      title: 'Label',
                      type: 'string',
                      validation: (Rule) => Rule.required(),
                    }),
                    defineField({
                      name: 'linkType',
                      title: 'Link Type',
                      type: 'string',
                      options: {
                        list: [
                          { title: 'Internal Page', value: 'internal' },
                          { title: 'External URL', value: 'external' },
                        ],
                        layout: 'radio',
                      },
                      initialValue: 'internal',
                      validation: (Rule) => Rule.required(),
                    }),
                    defineField({
                      name: 'internalLink',
                      title: 'Internal Page Path',
                      type: 'string',
                      description: 'e.g. "/about" or "/projects"',
                      hidden: ({ parent }) => parent?.linkType !== 'internal',
                    }),
                    defineField({
                      name: 'externalLink',
                      title: 'External URL',
                      type: 'url',
                      hidden: ({ parent }) => parent?.linkType !== 'external',
                    }),
                    defineField({
                      name: 'isExternal',
                      title: 'Opens in new tab?',
                      type: 'boolean',
                      initialValue: false,
                      hidden: ({ parent }) => parent?.linkType !== 'external',
                    }),
                  ],
                  preview: {
                    select: { title: 'label', subtitle: 'internalLink' },
                  },
                },
              ],
            }),
          ],
          preview: {
            select: { title: 'columnTitle', links: 'links' },
            prepare({ title, links }) {
              const count = links?.length || 0
              return {
                title: title || 'Untitled Column',
                subtitle: `${count} link${count !== 1 ? 's' : ''}`,
              }
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