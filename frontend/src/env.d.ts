import "../.astro/types.d.ts";
/// <reference types="astro/client" />

declare global {
  interface Window {
    __cmDockAbort?: AbortController;
    __cmAppDockAbort?: AbortController;
    __cmThemeDockAbort?: AbortController;
    cmSyncThemeColor?: () => void;
  }
}

export {};
