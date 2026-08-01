import { defineField, defineType } from 'sanity'

export const policy = defineType({
  name: 'policy',
  title: 'Policy',
  type: 'document',
  icon: () => '📄',
  fields: [
    // ── Identity ──────────────────────────────────────────────────
    defineField({
      name: 'title',
      title: 'Policy Title',
      type: 'string',
      description: 'Displayed as the page heading and in the Studio list',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'Auto-generated URL segment — click Generate after setting the title',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),

    // ── Page Header ───────────────────────────────────────────────
    defineField({
      name: 'pageHeader',
      title: 'Page Header',
      type: 'object',
      description: 'The purple hero banner at the top of the page',
      fields: [
        defineField({
          name: 'title',
          title: 'Header Title',
          type: 'string',
          description: 'Large heading shown in the hero (defaults to Policy Title if left blank)',
        }),
        defineField({
          name: 'subtitle',
          title: 'Header Subtitle',
          type: 'string',
          description: 'Short introductory sentence shown beneath the title',
        }),
      ],
    }),

    // ── Body (Rich Text) ──────────────────────────────────────────
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'Heading 2', value: 'h2' },
            { title: 'Heading 3', value: 'h3' },
            { title: 'Heading 4', value: 'h4' },
          ],
          marks: {
            decorators: [
              { title: 'Bold', value: 'strong' },
              { title: 'Italic', value: 'em' },
              { title: 'Underline', value: 'underline' },
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  defineField({
                    name: 'href',
                    type: 'url',
                    title: 'URL',
                    validation: (Rule) =>
                      Rule.uri({ allowRelative: true, scheme: ['http', 'https', 'mailto', 'tel'] }),
                  }),
                  defineField({
                    name: 'blank',
                    type: 'boolean',
                    title: 'Open in new tab',
                    initialValue: false,
                  }),
                ],
              },
            ],
          },
        },
      ],
    }),

    // ── PDF Download ──────────────────────────────────────────────
    defineField({
      name: 'pdfFile',
      title: 'PDF Version (optional)',
      type: 'file',
      description: 'If provided, a "Download PDF" button will appear at the bottom of the page',
      options: {
        accept: 'application/pdf',
      },
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'slug.current',
    },
    prepare({ title, subtitle }) {
      return {
        title: title || 'Untitled Policy',
        subtitle: subtitle ? `/${subtitle}` : 'No slug yet',
      }
    },
  },
})
