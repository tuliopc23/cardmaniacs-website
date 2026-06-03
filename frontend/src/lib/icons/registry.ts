/**
 * Tree-shaken Lucide icons + semantic aliases for marketing UI.
 */
import type { IconNode } from "lucide";
import {
  Apple,
  Archive,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  ArrowUpRight,
  BadgePercent,
  BookOpen,
  Bookmark,
  BookmarkCheck,
  Calendar,
  CalendarDays,
  Check,
  ChevronRight,
  Clock,
  Circle,
  CircleDot,
  Cloud,
  Code,
  Command,
  Compass,
  CornerDownLeft,
  CreditCard,
  Download,
  FileText,
  Folder,
  Gift,
  Heart,
  Highlighter,
  History,
  Image,
  Import,
  Inbox,
  Keyboard,
  Library,
  List,
  ListChecks,
  Menu,
  Moon,
  Newspaper,
  NotebookPen,
  Plus,
  Radio,
  RotateCcw,
  Rss,
  Search,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Sun,
  Tag,
  Tablet,
  TvMinimalPlay,
  Video,
  X,
} from "lucide";

export type RegistryIcon = IconNode;

/** Canonical registry keys (kebab-case). */
export const icons = {
  apple: Apple,
  archive: Archive,
  "arrow-down": ArrowDown,
  "arrow-left": ArrowLeft,
  "arrow-right": ArrowRight,
  "arrow-up": ArrowUp,
  "arrow-up-right": ArrowUpRight,
  article: FileText,
  "badge-percent": BadgePercent,
  "book-open": BookOpen,
  "book-open-text": BookOpen,
  "bookmark-simple": Bookmark,
  bookmarks: Bookmark,
  broadcast: Radio,
  calendar: Calendar,
  "calendar-days": CalendarDays,
  check: Check,
  clock: Clock,
  "chevron-right": ChevronRight,
  circle: Circle,
  "circle-dot": CircleDot,
  cloud: Cloud,
  code: Code,
  command: Command,
  compass: Compass,
  "corner-down-left": CornerDownLeft,
  "credit-card": CreditCard,
  download: Download,
  "file-text": FileText,
  folder: Folder,
  gift: Gift,
  github: Code,
  heart: Heart,
  highlighter: Highlighter,
  history: History,
  changelog: History,
  press: Newspaper,
  legal: ShieldCheck,
  release: Tag,
  screenshot: Image,
  import: Import,
  inbox: Inbox,
  keyboard: Keyboard,
  library: Library,
  list: List,
  "list-checks": ListChecks,
  menu: Menu,
  moon: Moon,
  "moon-stars": Moon,
  newspaper: Newspaper,
  "notebook-pen": NotebookPen,
  plus: Plus,
  rss: Rss,
  search: Search,
  "shield-check": ShieldCheck,
  sparkles: Sparkles,
  sparkle: Sparkles,
  sun: Sun,
  "sun-dim": Sun,
  tag: Tag,
  "device-mobile": Smartphone,
  "device-tablet": Tablet,
  x: X,
  close: X,
  youtube: TvMinimalPlay,
  video: Video,
  "bookmark-check": BookmarkCheck,
  saved: BookmarkCheck,
  "rotate-ccw": RotateCcw,
  unread: CircleDot,
} as const satisfies Record<string, RegistryIcon>;

export type IconKey = keyof typeof icons;

const aliasMap: Record<string, IconKey> = {
  "magnifying-glass": "search",
  envelope: "import",
  fix: "check",
  feature: "sparkles",
  macos: "keyboard",
  ios: "device-mobile",
};

export function resolveIconKey(name: string): IconKey | undefined {
  const normalized = name.trim().toLowerCase();
  if (normalized in icons) return normalized as IconKey;
  if (normalized in aliasMap) return aliasMap[normalized];
  return undefined;
}

export function getIconNode(name: string): RegistryIcon | undefined {
  const key = resolveIconKey(name);
  return key ? icons[key] : undefined;
}

/** Nav / footer / FAQ semantic ids */
export const navIcons = {
  features: "sparkles",
  pricing: "credit-card",
  blog: "newspaper",
  changelog: "history",
} as const satisfies Record<string, IconKey>;

export const workflowStepIcons = [
  "inbox",
  "list-checks",
  "book-open",
  "highlighter",
  "rotate-ccw",
] as const satisfies readonly IconKey[];

export const heroChipIcons: Record<string, IconKey> = {
  Feeds: "rss",
  "Read Later": "bookmark-simple",
  Bookmarks: "bookmarks",
  Highlights: "highlighter",
  Summaries: "sparkles",
  Offline: "download",
};

export const pricingLabelIcons: Record<string, IconKey> = {
  "7-day trial": "gift",
  monthly: "calendar",
  annual: "badge-percent",
};

export const faqIcons = [
  "device-mobile",
  "gift",
  "rss",
  "download",
  "cloud",
  "import",
] as const satisfies readonly IconKey[];
