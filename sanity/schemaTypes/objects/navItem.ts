import { defineField, defineType } from 'sanity'

export const navItem = defineType({
  name: 'navItem',
  title: 'Nav Item',
  type: 'object',
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
      validation: (Rule) =>
        Rule.custom((value, context: any) => {
          if (context.parent?.linkType === 'internal' && !value) {
            return 'Internal path is required'
          }
          return true
        }),
    }),
    defineField({
      name: 'externalLink',
      title: 'External URL',
      type: 'url',
      hidden: ({ parent }) => parent?.linkType !== 'external',
      validation: (Rule) =>
        Rule.custom((value, context: any) => {
          if (context.parent?.linkType === 'external' && !value) {
            return 'External URL is required'
          }
          return true
        }),
    }),
    defineField({
      name: 'isExternal',
      title: 'Opens in new tab?',
      type: 'boolean',
      initialValue: false,
      hidden: ({ parent }) => parent?.linkType !== 'external',
    }),

    // ── Sub Items (header only) ─────────────────────────────
    defineField({
      name: 'subItems',
      title: 'Sub Items',
      description: 'Dropdown items under this nav link — header only',
      type: 'array',
      of: [{ type: 'navSubItem' }],
    }),
  ],
  preview: {
    select: {
      title: 'label',
      linkType: 'linkType',
      internal: 'internalLink',
      external: 'externalLink',
      subItems: 'subItems',
    },
    prepare({ title, linkType, internal, external, subItems }) {
      const link = linkType === 'internal' ? internal : external
      const subCount = subItems?.length
      return {
        title: title || 'Untitled Item',
        subtitle: `${link || ''}${subCount ? ` · ${subCount} sub item${subCount > 1 ? 's' : ''}` : ''}`,
      }
    },
  },
})