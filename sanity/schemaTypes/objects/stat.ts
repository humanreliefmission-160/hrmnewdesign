import { defineField, defineType } from 'sanity'

export const stat = defineType({
  name: 'stat',
  title: 'Statistic',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Stat Value',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'subtext',
      title: 'Label',
      type: 'string',
    }),
  ],
})