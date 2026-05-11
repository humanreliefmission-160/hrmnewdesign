import { defineField, defineType } from 'sanity'

export const aboutUs = defineType({
  name: 'aboutUs',
  title: 'About Us',
  type: 'document',
  fields: [
    defineField({
      name: 'whoWeAre',
      title: 'Who We Are',
      type: 'object',
      fields: [
        defineField({ name: 'images', title: 'Slideshow Images', type: 'array', of: [{ type: 'altImage' }] }),
      ],
    }),
    defineField({
      name: 'impact',
      title: 'Impact Stats',
      type: 'object',
      fields: [
        defineField({
          name: 'cards',
          title: 'Impact Cards',
          type: 'array',
          of: [
            {
              type: 'object',
              name: 'impactCard',
              fields: [
                { name: 'icon', title: 'Icon (from react icons)', type: 'string' },
                { name: 'card', title: 'Stat Headline', type: 'string' },
                { name: 'line', title: 'Supporting Line', type: 'string' },
              ],
            },
          ],
        }),
      ],
    }),
    defineField({
      name: 'downloadableFiles',
      title: 'Downloadable Files',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'file' }] }],
    }),
  ],
})