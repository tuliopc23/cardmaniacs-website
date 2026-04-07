import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const posts = defineCollection({
  loader: glob({ base: "./src/content/posts", pattern: "**/*.mdoc" }),
  schema: z.object({
    title: z.string(),
    summary: z.string().optional(),
    date: z.string().optional(),
    author: z.string().optional(),
    tags: z.string().optional(),
    draft: z.boolean().optional(),
    featured: z.boolean().optional(),
    cover: z.string().optional(),
  }),
});

const changelog = defineCollection({
  loader: glob({ base: "./src/content/changelog", pattern: "**/*.mdoc" }),
  schema: z.object({
    title: z.string(),
    version: z.string().optional(),
    date: z.string().optional(),
    type: z.enum(["feature", "fix", "improvement"]).optional(),
    platform: z.enum(["all", "macos", "ios", "ipados"]).optional(),
  }),
});

const docs = defineCollection({
  loader: glob({ base: "./src/content/docs", pattern: "**/*.mdoc" }),
  schema: z.object({
    title: z.string(),
    section: z.string().optional(),
    order: z.number().optional(),
  }),
});

const releases = defineCollection({
  loader: glob({ base: "./src/content/releases", pattern: "**/*.mdoc" }),
  schema: z.object({
    title: z.string(),
    version: z.string().optional(),
    date: z.string().optional(),
    platforms: z.string().optional(),
    highlights: z.string().optional(),
    downloadUrl: z.string().optional(),
  }),
});

const legal = defineCollection({
  loader: glob({ base: "./src/content/legal", pattern: "**/*.mdoc" }),
  schema: z.object({
    title: z.string(),
    lastUpdated: z.string().optional(),
  }),
});

const media = defineCollection({
  loader: glob({ base: "./src/content/media", pattern: "**/*.yaml" }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    type: z.enum(["screenshot", "icon", "banner"]).optional(),
    platform: z.enum(["all", "macos", "ios", "ipados"]).optional(),
    image: z.string().optional(),
  }),
});

export const collections = { posts, changelog, docs, releases, legal, media };
