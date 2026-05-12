import { config, fields, collection } from "@keystatic/core";

export default config({
  storage: {
    kind: "github",
    repo: "tuliopc23/cardmaniacs-website",
  },
  collections: {
    posts: collection({
      label: "Blog Posts",
      slugField: "title",
      path: "src/content/posts/*",
      format: { contentField: "content" },
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        summary: fields.text({ label: "Summary", multiline: true }),
        date: fields.date({ label: "Publish Date" }),
        author: fields.text({ label: "Author", defaultValue: "Cardmaniacs Team" }),
        tags: fields.text({ label: "Tags (comma-separated)" }),
        draft: fields.checkbox({
          label: "Draft",
          defaultValue: false,
          description: "Draft posts are not published",
        }),
        featured: fields.checkbox({
          label: "Featured",
          defaultValue: false,
          description: "Show on homepage",
        }),
        cover: fields.image({
          label: "Cover Image",
          directory: "public/images/blog",
          publicPath: "/images/blog/",
        }),
        content: fields.markdoc({ label: "Content" }),
      },
    }),

    changelog: collection({
      label: "Changelog",
      slugField: "title",
      path: "src/content/changelog/*",
      format: { contentField: "content" },
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        version: fields.text({ label: "Version", description: "e.g. 1.2.0" }),
        date: fields.date({ label: "Release Date" }),
        type: fields.select({
          label: "Type",
          options: [
            { label: "Feature", value: "feature" },
            { label: "Fix", value: "fix" },
            { label: "Improvement", value: "improvement" },
          ],
          defaultValue: "feature",
        }),
        platform: fields.select({
          label: "Platform",
          options: [
            { label: "All", value: "all" },
            { label: "macOS", value: "macos" },
            { label: "iOS", value: "ios" },
            { label: "iPadOS", value: "ipados" },
          ],
          defaultValue: "all",
        }),
        content: fields.markdoc({ label: "Details" }),
      },
    }),

    docs: collection({
      label: "Documentation",
      slugField: "title",
      path: "src/content/docs/*",
      format: { contentField: "content" },
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        section: fields.text({
          label: "Section",
          description: "e.g. Getting Started, Feeds, Advanced",
        }),
        order: fields.integer({
          label: "Sort Order",
          defaultValue: 0,
          description: "Lower = earlier in sidebar",
        }),
        content: fields.markdoc({ label: "Content" }),
      },
    }),

    releases: collection({
      label: "Release Notes",
      slugField: "title",
      path: "src/content/releases/*",
      format: { contentField: "content" },
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        version: fields.text({ label: "Version", description: "e.g. 1.2.0" }),
        date: fields.date({ label: "Release Date" }),
        platforms: fields.text({ label: "Platforms", description: "e.g. macOS, iOS, iPadOS" }),
        highlights: fields.text({
          label: "Highlights",
          multiline: true,
          description: "Key changes summary",
        }),
        downloadUrl: fields.url({ label: "Download URL" }),
        content: fields.markdoc({ label: "Full Release Notes" }),
      },
    }),

    legal: collection({
      label: "Legal Pages",
      slugField: "title",
      path: "src/content/legal/*",
      format: { contentField: "content" },
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        lastUpdated: fields.date({ label: "Last Updated" }),
        content: fields.markdoc({ label: "Content" }),
      },
    }),
  },
});
