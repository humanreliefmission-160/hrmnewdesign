import { defineField, defineType } from 'sanity'

export const altImage = defineType({
  name: 'altImage',
  title: 'Image',
  type: 'object',
  fields: [
    defineField({
      name: 'asset',
      title: 'Image Asset',
      type: 'image',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'alt',
      title: 'Alt Text',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'caption',
      title: 'Caption',
      type: 'string',
    }),
    defineField({
      name: 'link',
      title: 'Link',
      type: 'url',
    }),
  ],
})