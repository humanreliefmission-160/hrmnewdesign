import { defineField, defineType } from 'sanity'

export const intention = defineType({
  name: 'intention',
  title: 'Giving Intention',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: r => r.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' }, validation: r => r.required() }),
    defineField({ name: 'description', title: 'Description', type: 'text' }),
  ],
})