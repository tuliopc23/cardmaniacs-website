import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const posts = defineCollection({
  loader: glob({ base: './src/content/posts', pattern: '**/*.mdoc' }),
  schema: z.object({
    title: z.string(),
    summary: z.string().optional(),
    date: z.string().optional(),
    cover: z.string().optional(),
  }),
});

export const collections = { posts };
