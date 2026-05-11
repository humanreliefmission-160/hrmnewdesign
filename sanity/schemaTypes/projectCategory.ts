import { defineField, defineType } from 'sanity'

export const projectCategory = defineType({
  name: 'projectCategory',
  title: 'Project Category',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
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
      name: 'donationItems',
      title: 'Default Donation Items',
      type: 'array',
      of: [{ type: 'donationItem' }]
    }),
  ],
})