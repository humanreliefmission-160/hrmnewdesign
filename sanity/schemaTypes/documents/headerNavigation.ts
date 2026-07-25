import { defineField, defineType } from 'sanity'

export const headerNavigation = defineType({
  name: 'headerNavigation',
  title: 'Header Navigation',
  type: 'document',
  icon: () => '🔝',
  // Only one header navigation document should ever exist
  // __experimental_actions: ['update', 'publish'],
  fields: [
    defineField({
      name: 'navItems',
      title: 'Navigation Items',
      description: 'Drag to reorder. Sub items appear as dropdowns.',
      type: 'array',
      of: [{ type: 'navItem' }],
    }),
  ],
  preview: {
    select: { items: 'navItems' },
    prepare({ items }) {
      const count = items?.length || 0
      return {
        title: 'Header Navigation',
        subtitle: `${count} item${count !== 1 ? 's' : ''}`,
      }
    },
  },
})
