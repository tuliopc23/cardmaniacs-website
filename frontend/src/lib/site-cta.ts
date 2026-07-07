/** App Store URL from env; empty until the app is listed. */
const raw = import.meta.env.PUBLIC_APP_STORE_URL ?? "";

export const appStoreUrl = typeof raw === "string" ? raw.trim() : "";

export const hasAppStoreUrl = appStoreUrl.length > 0;

export const downloadCta = {
  href: hasAppStoreUrl ? appStoreUrl : undefined,
  label: hasAppStoreUrl ? "App Store" : "App Store",
  sublabel: hasAppStoreUrl ? "Download on the" : "Soon in",
  isExternal: hasAppStoreUrl,
  isAvailable: hasAppStoreUrl,
} as const;
