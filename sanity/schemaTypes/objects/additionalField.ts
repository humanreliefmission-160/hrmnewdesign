import { defineField, defineType } from 'sanity'

export const additionalField = defineType({
  name: 'additionalField',
  title: 'Additional Field',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      description: 'e.g. "Beneficiary Name" or "Orphan ID"',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'label',
    },
  },
})