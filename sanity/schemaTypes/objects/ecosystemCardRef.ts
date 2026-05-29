import { defineField, defineType } from 'sanity'
import IconSelector from '../../components/IconSelector'

export const ecosystemCardRef = defineType({
  name: 'ecosystemCardRef',
  title: 'Ecosystem Card',
  type: 'object',
  description: 'A card within the project\'s ecosystem stage section',
  fields: [
    defineField({
      name: 'icon',
      title: 'Icon',
      description: 'React Icons name e.g. "FaHandHoldingHeart". Find the icon name from this link https://react-icons.github.io/react-icons/search',
      type: 'string',
      components: {
        input: IconSelector,
      },
    }),
    defineField({
      name: 'cardTitle',
      title: 'Card Title',
      type: 'string',
    }),
    defineField({
      name: 'customSummary',
      title: 'Custom Summary',
      description: 'How does this project impact the beneficiaries at this stage?',
      type: 'text',
      rows: 3,
    }),
  ],
  preview: {
    select: {
      title: 'cardTitle',
      subtitle: 'customSummary',
    },
    prepare({ title, subtitle }) {
      return {
        title: `Card Title: ${title}`,
        subtitle: `Custom Summary: ${subtitle}`,
      }
    },
  },
})