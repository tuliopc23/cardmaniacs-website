import { navIcons, type IconKey } from "./icons/registry";
import { downloadCta, hasAppStoreUrl } from "./site-cta";

export type SiteNavLink = {
  href: string;
  label: string;
  key: string;
  icon: IconKey;
  external?: boolean;
};

/** Maps Keystatic legal collection ids to short URL + nav keys. */
export const legalPageKeys: Record<string, string> = {
  "privacy-policy": "privacy",
  "terms-of-use": "terms",
  support: "support",
};

export const pageLabels: Record<string, string> = {
  home: "Home",
  features: "Features",
  pricing: "Pricing",
  blog: "Blog",
  changelog: "Changelog",
  docs: "Docs",
  press: "Press kit",
  privacy: "Privacy",
  terms: "Terms",
  support: "Support",
  releases: "Releases",
};

export const headerNavLinks: SiteNavLink[] = [
  { href: "/features", label: "Features", key: "features", icon: navIcons.features },
  { href: "/pricing", label: "Pricing", key: "pricing", icon: navIcons.pricing },
  { href: "/blog", label: "Blog", key: "blog", icon: navIcons.blog },
  { href: "/changelog", label: "Changelog", key: "changelog", icon: navIcons.changelog },
  { href: "/docs", label: "Docs", key: "docs", icon: navIcons.docs },
];

export const exploreNavLinks: SiteNavLink[] = [
  { href: "/", label: "Home", key: "home", icon: "library" },
  ...headerNavLinks,
];

export const elsewhereNavLinks: SiteNavLink[] = [
  { href: "/press", label: "Press kit", key: "press", icon: "press" },
  {
    href: hasAppStoreUrl ? (downloadCta.href ?? "/features") : "/features",
    label: hasAppStoreUrl ? "Get the app" : "Explore features",
    key: "cta",
    icon: hasAppStoreUrl ? "download" : "compass",
    external: hasAppStoreUrl,
  },
  { href: "/privacy", label: "Privacy", key: "privacy", icon: "shield-check" },
  { href: "/support", label: "Support", key: "support", icon: "file-text" },
  { href: "/terms", label: "Terms", key: "terms", icon: "file-text" },
];

export function normalizeCurrentPage(currentPage: string): string {
  return legalPageKeys[currentPage] ?? currentPage;
}

export function getPageLabel(currentPage: string): string {
  return pageLabels[normalizeCurrentPage(currentPage)] ?? "Home";
}

export function isActiveNavLink(key: string, currentPage: string): boolean {
  return normalizeCurrentPage(currentPage) === key;
}
