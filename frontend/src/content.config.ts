import { defineCollection } from "astro:content";
import { z as schema } from "astro:content";
import { glob } from "astro/loaders";

const posts = defineCollection({
  loader: glob({ base: "./src/content/posts", pattern: "**/*.mdoc" }),
  schema: schema.object({
    title: schema.string(),
    summary: schema.string().optional(),
    date: schema.string().optional(),
    author: schema.string().optional(),
    tags: schema.string().optional(),
    draft: schema.boolean().optional(),
    featured: schema.boolean().optional(),
    cover: schema.string().optional(),
  }),
});

const changelog = defineCollection({
  loader: glob({ base: "./src/content/changelog", pattern: "**/*.mdoc" }),
  schema: schema.object({
    title: schema.string(),
    version: schema.string().optional(),
    date: schema.string().optional(),
    type: schema.enum(["feature", "fix", "improvement"]).optional(),
    platform: schema.enum(["all", "macos", "ios", "ipados"]).optional(),
  }),
});

const docs = defineCollection({
  loader: glob({ base: "./src/content/docs", pattern: "**/*.mdoc" }),
  schema: schema.object({
    title: schema.string(),
    section: schema.string().optional(),
    order: schema.number().optional(),
  }),
});

const releases = defineCollection({
  loader: glob({ base: "./src/content/releases", pattern: "**/*.mdoc" }),
  schema: schema.object({
    title: schema.string(),
    version: schema.string().optional(),
    date: schema.string().optional(),
    platforms: schema.string().optional(),
    highlights: schema.string().optional(),
    downloadUrl: schema.string().optional(),
  }),
});

const legal = defineCollection({
  loader: glob({ base: "./src/content/legal", pattern: "**/*.mdoc" }),
  schema: schema.object({
    title: schema.string(),
    lastUpdated: schema.string().optional(),
  }),
});

const media = defineCollection({
  loader: glob({ base: "./src/content/media", pattern: "**/*.yaml" }),
  schema: schema.object({
    title: schema.string(),
    description: schema.string().optional(),
    type: schema.enum(["screenshot", "icon", "banner"]).optional(),
    platform: schema.enum(["all", "macos", "ios", "ipados"]).optional(),
    image: schema.string().optional(),
  }),
});

export const collections = { posts, changelog, docs, releases, legal, media };
