import { component, defineMarkdocConfig } from "@astrojs/markdoc/config";

const callout = component("./src/components/markdoc/Callout.astro");

export default defineMarkdocConfig({
  tags: {
    note: {
      render: callout,
      attributes: {
        title: { type: String },
        variant: { type: String, default: "note" },
      },
    },
    tip: {
      render: callout,
      attributes: {
        title: { type: String },
        variant: { type: String, default: "tip" },
      },
    },
    important: {
      render: callout,
      attributes: {
        title: { type: String },
        variant: { type: String, default: "important" },
      },
    },
    warning: {
      render: callout,
      attributes: {
        title: { type: String },
        variant: { type: String, default: "warning" },
      },
    },
  },
});
