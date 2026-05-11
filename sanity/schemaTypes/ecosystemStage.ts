import { defineField, defineType } from 'sanity'

export const ecosystemStage = defineType({
  name: 'ecosystemStage',
  title: 'Ecosystem Stage',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (r) => r.required()
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text'
    }),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [{ type: 'altImage' }]
    }),
    defineField({
      name: 'sort_order',
      title: 'Sort Order',
      type: 'number',
      initialValue: 0
    }),
  ],
})