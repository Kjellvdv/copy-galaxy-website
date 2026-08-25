import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const swipe = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/swipe' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      company: z.string(),
      /** Where the pattern was spotted. */
      url: z.string().url(),
      /** Plain string on purpose — see src/config/categories.ts. */
      category: z.string(),
      /** What the company sells. See src/config/industries.ts. */
      industry: z.string().default('other'),
      tags: z.array(z.string()).default([]),
      /** Card image. Always present, even for video entries (poster frame). */
      screenshot: image(),
      /** Extra screenshots shown on the detail page only. */
      extras: z.array(image()).default([]),
      /** Path under /public for patterns that only make sense in motion. */
      video: z.string().optional(),
      added: z.date(),
    }),
});

export const collections = { swipe };
