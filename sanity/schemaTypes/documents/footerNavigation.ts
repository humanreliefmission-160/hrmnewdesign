import { defineField, defineType } from 'sanity'

export const footerNavigation = defineType({
  name: 'footerNavigation',
  title: 'Footer Navigation',
  type: 'document',
  icon: () => '🔻',
  // Only one footer navigation document should ever exist
  // __experimental_actions: ['update', 'publish'],
  fields: [
    // ── Footer Columns ────────────────────────────────────────────
    defineField({
      name: 'footerColumns',
      title: 'Footer Columns',
      description: 'Each item is a column in the footer. Add a heading and links for each column.',
      type: 'array',
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

    // ── Social Links ──────────────────────────────────────────────
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      description: 'Social media links shown in the footer',
      type: 'array',
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
            select: { title: 'platform', subtitle: 'url' },
          },
        },
      ],
    }),
  ],
  preview: {
    select: { columns: 'footerColumns' },
    prepare({ columns }) {
      const count = columns?.length || 0
      return {
        title: 'Footer Navigation',
        subtitle: `${count} column${count !== 1 ? 's' : ''}`,
      }
    },
  },
})
