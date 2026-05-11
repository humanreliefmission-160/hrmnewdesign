import { defineField, defineType } from 'sanity'

export const donationItem = defineType({
  name: 'donationItem',
  title: 'Donation Item',
  type: 'object',
  fields: [
    defineField({
      name: 'icon',
      title: 'Icon (react-icons name)',
      type: 'string',
      description: 'e.g. FaHandHoldingHeart',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'subtext',
      title: 'Subtext',
      type: 'string',
    }),
    defineField({
      name: 'price',
      title: 'Base Price (GBP)',
      type: 'number',
      validation: (rule) => rule.required().min(0),
    }),
    defineField({
      name: 'frequency',
      title: 'Payment Frequency',
      type: 'string',
      options: { list: ['one_off', 'monthly'] },
      initialValue: 'one_off',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'bodyText',
      title: 'Body Text',
      type: 'blockContent', // requires a blockContent type, or use 'array' of block
    }),
    defineField({
      name: 'amounts',
      title: 'Pre-set Amounts',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'amountOption',
          fields: [
            { name: 'value', title: 'Amount (GBP)', type: 'number', validation: (r) => r.required() },
            { name: 'isFixed', title: 'Fixed amount only?', type: 'boolean', initialValue: false },
          ],
        },
      ],
    }),
    defineField({
      name: 'intentions',
      title: 'Applicable Giving Intentions',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'intention' }] }],
    }),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [{ type: 'altImage' }],
    }),
    defineField({
      name: 'additionalFields',
      title: 'Additional Form Fields',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'field',
          fields: [{ name: 'label', title: 'Field Label', type: 'string' }],
        },
      ],
    }),
    defineField({
      name: 'info',
      title: 'Info Note',
      type: 'text',
    }),
    defineField({
      name: 'keyFeatures',
      title: 'Key Features',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'feature',
          fields: [
            { name: 'title', title: 'Title', type: 'string' },
            { name: 'text', title: 'Text', type: 'string' },
          ],
        },
      ],
    }),
    defineField({
      name: 'howItHelps',
      title: 'How It Helps',
      type: 'array',
      of: [{ type: 'object', name: 'help', fields: [{ name: 'text', title: 'Text', type: 'string' }] }],
    }),
    defineField({
      name: 'endGoal',
      title: 'End Goal / Outcome',
      type: 'text',
    }),
    defineField({
      name: 'summarise',
      title: 'Summary for Receipt',
      type: 'text',
    }),
  ],
})