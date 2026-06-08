import { marketingImages } from "../lib/marketing-images";

export type FeatureBullet = { icon: string; title: string; description: string };

export type FeatureLayout = "split" | "surfaceFirst" | "fullBleed" | "stacked" | "platform";

export type FeatureBulletStyle = "cards" | "prose";

export type FeatureSection = {
  id: string;
  label: string;
  icon: string;
  heading: string;
  description: string;
  screenshot: string;
  screenshotAlt: string;
  bullets: FeatureBullet[];
  bulletStyle?: FeatureBulletStyle;
  surface: "triage" | "reader" | "highlight" | "command" | "media" | "device" | "none";
  layout: FeatureLayout;
  reverse?: boolean;
};

export const featureSections: FeatureSection[] = [
  {
    id: "feeds",
    label: "Feeds & syndication",
    icon: "rss",
    heading: "RSS, social, and media — one stream.",
    description:
      "Subscribe with RSS, Atom, or JSON Feed. Add Reddit, Mastodon, and media channels as first-class sources — with more social integrations on the roadmap.",
    screenshot: marketingImages.macTriage,
    screenshotAlt: "Cardmaniacs feed triage on Mac",
    surface: "triage",
    layout: "split",
    bulletStyle: "prose",
    bullets: [
      {
        icon: "rss",
        title: "RSS, Atom, JSON Feed",
        description: "Full-text parsing and card-based triage.",
      },
      {
        icon: "broadcast",
        title: "YouTube & podcasts",
        description: "Watch and listen in a calm native player.",
      },
      {
        icon: "bookmark-simple",
        title: "Source management",
        description: "Unread workflow and feed cards.",
      },
    ],
  },
  {
    id: "read-later",
    label: "Read later & parsing",
    icon: "book-open",
    heading: "Every format, one Reader.",
    description:
      "Articles, Wikipedia, GitHub READMEs, JS-heavy pages, Markdown notes, PDFs, and EPUB — offline when you need it.",
    screenshot: marketingImages.macReader,
    screenshotAlt: "Cardmaniacs Reader on Mac",
    surface: "reader",
    layout: "surfaceFirst",
    bulletStyle: "prose",
    bullets: [
      { icon: "file-text", title: "Web articles", description: "Clean text from complex pages." },
      {
        icon: "code",
        title: "GitHub READMEs",
        description: "Repository docs as readable articles.",
      },
      {
        icon: "book-open-text",
        title: "PDF, EPUB, Markdown",
        description: "Documents beside your queue.",
      },
    ],
  },
  {
    id: "reader-highlights",
    label: "Reader & highlights",
    icon: "highlighter",
    heading: "Beautiful reading. Lasting highlights.",
    description:
      "Highlight in the Reader or on web content — stored references with tags and a dedicated highlights library.",
    screenshot: marketingImages.macHighlights,
    screenshotAlt: "Highlights in Cardmaniacs",
    surface: "highlight",
    layout: "fullBleed",
    bulletStyle: "prose",
    bullets: [
      {
        icon: "article",
        title: "Reader surfaces",
        description: "Editorial typography and calm chrome.",
      },
      {
        icon: "sparkle",
        title: "Web highlights",
        description: "Rendered references saved for later.",
      },
      { icon: "tag", title: "Tags & metadata", description: "Organize by source and topic." },
    ],
  },
  {
    id: "read-aloud",
    label: "Read aloud",
    icon: "article",
    heading: "Listen on your terms.",
    description:
      "Text-to-speech with native playback controls — reading continues when your eyes cannot.",
    screenshot: marketingImages.macReader,
    screenshotAlt: "Read aloud in Cardmaniacs",
    surface: "none",
    layout: "stacked",
    bulletStyle: "prose",
    bullets: [
      { icon: "article", title: "TTS in Reader", description: "Start listening from any article." },
      {
        icon: "clock",
        title: "Native controls",
        description: "Playback integrated with reading flow.",
      },
    ],
  },
  {
    id: "power-user",
    label: "Navigation & power user",
    icon: "keyboard",
    heading: "Keyboard-first when you want it.",
    description:
      "Quick Add, command palette, search, and Vim-style navigation for fast triage and reading.",
    screenshot: marketingImages.macCommand,
    screenshotAlt: "Command palette on Mac",
    surface: "command",
    layout: "split",
    reverse: true,
    bulletStyle: "prose",
    bullets: [
      { icon: "plus", title: "Quick Add", description: "Capture URLs and files in seconds." },
      {
        icon: "search",
        title: "Command palette",
        description: "Search and actions from one surface.",
      },
      { icon: "keyboard", title: "Vim keys", description: "Surf articles without the mouse." },
    ],
  },
  {
    id: "organization",
    label: "Organization",
    icon: "folder",
    heading: "Find everything later.",
    description:
      "Frictionless tagging, Smart Lists, full-text search, bookmarks, and reading states.",
    screenshot: marketingImages.macCommand,
    screenshotAlt: "Library organization",
    surface: "none",
    layout: "surfaceFirst",
    bulletStyle: "prose",
    bullets: [
      { icon: "tag", title: "Tags", description: "Flexible labels across all content types." },
      { icon: "folder", title: "Smart Lists", description: "Rules that keep collections fresh." },
      { icon: "search", title: "Full-text search", description: "Fast, local, private search." },
    ],
  },
  {
    id: "extensions",
    label: "Native extensions",
    icon: "sparkles",
    heading: "Plugs into Apple platforms.",
    description:
      "App Intents, web extension, widgets, and iCloud sync — where supported on your devices.",
    screenshot: marketingImages.macMedia,
    screenshotAlt: "Cardmaniacs integrations",
    surface: "media",
    layout: "stacked",
    bulletStyle: "prose",
    bullets: [
      { icon: "sparkle", title: "App Intents", description: "Automate with Shortcuts." },
      { icon: "code", title: "Web extension", description: "Save from Safari instantly." },
      { icon: "heart", title: "Widgets", description: "Glanceable queue on Home Screen." },
    ],
  },
  {
    id: "platform",
    label: "Every Apple device",
    icon: "device-mobile",
    heading: "Crafted for Mac, iPhone, and iPad.",
    description:
      "Keyboard-first Mac workspace, touch-first iPhone capture, iPad multitasking — with dark mode and offline reading.",
    screenshot: marketingImages.macHeroLight,
    screenshotAlt: "Cardmaniacs on Apple platforms",
    surface: "device",
    layout: "platform",
    bulletStyle: "prose",
    bullets: [
      { icon: "device-mobile", title: "iPhone", description: "Capture and read on the go." },
      { icon: "device-tablet", title: "iPad", description: "Split view and workspace layout." },
      { icon: "keyboard", title: "Mac", description: "Command palette and Vim navigation." },
    ],
  },
];
