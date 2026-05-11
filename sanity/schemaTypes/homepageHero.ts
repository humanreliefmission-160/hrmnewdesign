import { defineField, defineType } from 'sanity'

export const homepageHero = defineType({
  name: 'homepageHero',
  title: 'Homepage Hero',
  type: 'document',
  fields: [
    defineField({
      name: 'image',
      title: 'Hero Image',
      type: 'altImage',
      validation: (r) => r.required()
    }),
    defineField({
      name: 'title',
      title: 'Headline',
      type: 'string',
      validation: (r) => r.required()
    }),
    defineField({
      name: 'subtext',
      title: 'Subtitle',
      type: 'string'
    }),
    defineField({
      name: 'link',
      title: 'CTA Link',
      type: 'url',
      validation: (r) => r.required()
    }),
  ],
})