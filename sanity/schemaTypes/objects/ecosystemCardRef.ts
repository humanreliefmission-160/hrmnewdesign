import { defineField, defineType } from 'sanity'

export const ecosystemCardRef = defineType({
  name: 'ecosystemCardRef',
  title: 'Ecosystem Card',
  type: 'object',
  description: 'References an ecosystem stage from the global ecosystem model',
  fields: [
    defineField({
      name: 'stage',
      title: 'Ecosystem Stage',
      type: 'reference',
      to: [{ type: 'ecosystemStage' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'iconOverride',
      title: 'Icon Override',
      description: 'Optional — override the default icon for this project context',
      type: 'string',
    }),
    defineField({
      name: 'customSummary',
      title: 'Custom Summary',
      description: 'Optional — override the stage description for this specific project',
      type: 'text',
      rows: 3,
    }),
  ],
  preview: {
    select: {
      title: 'stage.title',
      subtitle: 'stage.order',
    },
    prepare({ title, subtitle }) {
      return {
        title: title || 'Select a stage',
        subtitle: subtitle ? `Stage ${subtitle}` : '',
      }
    },
  },
})