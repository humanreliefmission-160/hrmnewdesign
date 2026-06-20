import { defineField, defineType } from "sanity";

export const impactTicker = defineType({
  name: 'impactTicker',
  title: 'Impact Ticker',
  type: 'document',
  icon: () => '💥',
  fields: [
    defineField({
      name: 'impactItems',
      title: 'Impact Items',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Add as many impact items as you like. If the list is empty, the ticker bar will not be shown on the site.'
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Impact Ticker',
      }
    }
  }
})