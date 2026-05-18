import { defineField, defineType } from 'sanity'

export const navSubItem = defineType({
  name: 'navSubItem',
  title: 'Nav Sub Item',
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
      description: 'e.g. "/about" or "/projects/water-wells"',
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
  ],
  preview: {
    select: {
      title: 'label',
      linkType: 'linkType',
      internal: 'internalLink',
      external: 'externalLink',
    },
    prepare({ title, linkType, internal, external }) {
      return {
        title: title || 'Untitled Sub Item',
        subtitle: linkType === 'internal' ? internal : external,
      }
    },
  },
})