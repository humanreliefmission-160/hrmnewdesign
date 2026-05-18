import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'homepageHero',
  title: 'Homepage Hero Slider',
  type: 'document',
  // __experimental_actions: ['update', 'publish'],
  fields: [
    defineField({
      name: 'slides',
      title: 'Hero Slides',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'heroSlide' }] }],
      options: {
        sortable: true, // Enables drag and drop ordering
      },
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Homepage Hero Slider' }
    },
  },
})