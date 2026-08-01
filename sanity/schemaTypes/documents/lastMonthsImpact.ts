import { defineField, defineType } from 'sanity'

export const lastMonthsImpact = defineType({
  name: 'lastMonthsImpact',
  title: 'Last Months Impact',
  type: 'document',
  icon: () => '🤝',
  fields: [
    // ── Section Header ─────────────────────────────────────────────────────
    defineField({
      name: 'sectionMonth',
      title: 'Month Name',
      description: 'The month displayed in the heading, e.g. "March" or "April".',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    // ── Impact Cards (max 6) ───────────────────────────────────────────────
    defineField({
      name: 'impactCards',
      title: 'Impact Cards',
      description: 'Add up to 6 impact cards for this section.',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'lastMonthsImpactCard',
          title: 'Impact Card',
          fields: [
            defineField({
              name: 'category',
              title: 'Category / Tag',
              description: 'Displayed as a badge on the card, e.g. "Infrastructure".',
              type: 'reference',
              to: [{ type: 'projectCategory' }],
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'image',
              title: 'Card Image',
              description: '📐 Recommended: 480×320 px (3:2). Shown as the card background in the Last Month\'s Impact grid.',
              type: 'image',
              options: { hotspot: true },
            }),
            defineField({
              name: 'videoUrl',
              title: 'Card Video (YouTube URL)',
              description: '▶️ Optional. Paste a YouTube link to show a video as the card background. Recommended ratio: 3:2 (e.g. 480×320). Takes priority over the image if provided.',
              type: 'url',
            }),
            defineField({
              name: 'muteVideo',
              title: 'Mute Video',
              description: 'If checked, the card video plays silently.',
              type: 'boolean',
              initialValue: true,
            }),
            defineField({
              name: 'impactNumber',
              title: 'Impact Number',
              description: 'The large stat shown on the card, e.g. "500".',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'secondaryText',
              title: 'Unit / Secondary Text',
              description: 'Displayed next to the number, e.g. "homes" or "meals".',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Description',
              description: 'Short sentence shown on hover.',
              type: 'text',
              rows: 2,
            }),
            defineField({
              name: 'pageLink',
              title: 'Page Link',
              description: 'e.g. "/about", "/donate", or "/projects"',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              stat: 'impactNumber',
              unit: 'secondaryText',
              category: 'category.name',
              media: 'image',
            },
            prepare({ stat, unit, category, media }) {
              return {
                title: `${stat ?? '—'} ${unit ?? ''}`.trim(),
                subtitle: category ?? 'No category',
                media,
              }
            },
          },
        },
      ],
      validation: (Rule) => Rule.max(6),
    }),
  ],
  preview: {
    select: {
      month: 'sectionMonth',
    },
    prepare({ month }) {
      return { title: `Last Months Impact — ${month ?? 'No month set'}` }
    },
  },
})