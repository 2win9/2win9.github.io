import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: z.object({
    title: z.string().min(1),
    description: z.string().default(''),
    pubDate: z.coerce.date(),
    updatedDate: z.preprocess(
      (value) => value === '' || value === null ? undefined : value,
      z.coerce.date().optional(),
    ),
    category: z.enum(['notes', 'logs', 'thoughts']).default('notes'),
    tags: z.array(z.string()).default([]),
    published: z.boolean().default(true),
    example: z.boolean().default(false),
  }),
});

export const collections = { posts };
