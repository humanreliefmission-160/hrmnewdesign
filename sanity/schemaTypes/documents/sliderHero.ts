import { defineField, defineType } from 'sanity'

type LinkParent = {
  linkType?: 'internal' | 'external'
  internalDestination?: 'project' | 'path'
}

export const sliderHero = defineType({
  name: 'heroSlide',
  title: 'Homepage Hero Slider',
  type: 'document',
  icon: () => '🎞️',
  fields: [
    defineField({
      name: 'slideName',
      title: 'Slide Name',
      description: 'Internal label for the editor e.g. "Ramadan 2025 Slide"',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Desktop Image',
      description: 'Image for desktop and tablet screens (Landscape).',
      type: 'object',
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
      ],
    }),
    defineField({
      name: 'mobileImage',
      title: 'Mobile Image (Optional)',
      description: 'Image specifically for mobile screens (Portrait). If not provided, the Desktop Image will be cropped to fit.',
      type: 'image',
      options: { hotspot: true },
    }),
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
      rows: 3,
    }),
    defineField({
      name: 'link',
      title: 'Button',
      type: 'object',
      fields: [
        defineField({
          name: 'label',
          title: 'Button Label',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'linkType',
          title: 'Link type',
          type: 'string',
          options: {
            list: [
              { title: 'Internal', value: 'internal' },
              { title: 'External', value: 'external' },
            ],
            layout: 'radio',
            direction: 'horizontal',
          },
          initialValue: 'internal',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'internalDestination',
          title: 'Internal destination',
          type: 'string',
          description: 'Pick a project page from the list, or enter a custom path for any other page.',
          options: {
            list: [
              { title: 'Project page', value: 'project' },
              { title: 'Other page (custom path)', value: 'path' },
            ],
            layout: 'radio',
            direction: 'horizontal',
          },
          initialValue: 'path',
          hidden: ({ parent }) => (parent as LinkParent)?.linkType !== 'internal',
          validation: (Rule) =>
            Rule.custom((value, context) => {
              const parent = context.parent as LinkParent
              if (parent?.linkType === 'internal' && !value) {
                return 'Choose where this internal link should go'
              }
              return true
            }),
        }),
        defineField({
          name: 'project',
          title: 'Project',
          type: 'reference',
          to: [{ type: 'project' }],
          description: 'Links to /projects/{project-slug}',
          hidden: ({ parent }) =>
            (parent as LinkParent)?.linkType !== 'internal' ||
            (parent as LinkParent)?.internalDestination !== 'project',
          validation: (Rule) =>
            Rule.custom((value, context) => {
              const parent = context.parent as LinkParent
              if (
                parent?.linkType === 'internal' &&
                parent?.internalDestination === 'project' &&
                !value
              ) {
                return 'Select a project'
              }
              return true
            }),
        }),
        defineField({
          name: 'internalPath',
          title: 'Internal page path',
          type: 'string',
          description: 'e.g. "/about", "/donate", or "/projects"',
          hidden: ({ parent }) =>
            (parent as LinkParent)?.linkType !== 'internal' ||
            (parent as LinkParent)?.internalDestination !== 'path',
          validation: (Rule) =>
            Rule.custom((value, context) => {
              const parent = context.parent as LinkParent
              if (
                parent?.linkType === 'internal' &&
                parent?.internalDestination === 'path' &&
                !value
              ) {
                return 'Internal path is required'
              }
              return true
            }),
        }),
        defineField({
          name: 'externalUrl',
          title: 'External URL',
          type: 'url',
          hidden: ({ parent }) => (parent as LinkParent)?.linkType !== 'external',
          validation: (Rule) =>
            Rule.custom((value, context) => {
              const parent = context.parent as LinkParent
              if (parent?.linkType === 'external' && !value) {
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
          hidden: ({ parent }) => (parent as LinkParent)?.linkType !== 'external',
        }),
      ],
    }),
    defineField({
      name: 'order',
      title: 'Slide Order',
      type: 'number',
      description: 'Lower numbers appear first. Drag to reorder.',
      validation: (Rule) => Rule.required().integer().min(0),
    }),
  ],
  orderings: [
    {
      title: 'Slide Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'slideName',
      subtitle: 'title',
      media: 'image.asset',
      linkType: 'link.linkType',
      internalDestination: 'link.internalDestination',
      projectName: 'link.project.name',
      internalPath: 'link.internalPath',
      externalUrl: 'link.externalUrl',
    },
    prepare({ title, subtitle, media, linkType, internalDestination, projectName, internalPath, externalUrl }) {
      let linkLabel = ''
      if (linkType === 'external') {
        linkLabel = externalUrl || 'External link'
      } else if (internalDestination === 'project') {
        linkLabel = projectName ? `Project: ${projectName}` : 'Project (not set)'
      } else {
        linkLabel = internalPath || 'Internal path'
      }
      return {
        title,
        subtitle: [subtitle, linkLabel].filter(Boolean).join(' · '),
        media,
      }
    },
  },
})
