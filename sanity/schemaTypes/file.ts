import { defineField, defineType } from 'sanity'

export const downloadableFile = defineType({
  name: 'downloadableFile',
  title: 'File (Downloadable)',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: r => r.required() }),
    defineField({
      name: 'type',
      title: 'File Type',
      type: 'string',
      options: { list: ['Annual Report', 'Policies'] },
      validation: r => r.required(),
    }),
    defineField({ name: 'body', title: 'Description', type: 'blockContent' }),
    defineField({ name: 'asset', title: 'File', type: 'file', validation: r => r.required() }),
  ],
})