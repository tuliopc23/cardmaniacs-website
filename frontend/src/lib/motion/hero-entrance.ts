import { animateReveal } from "./reveal";
import { prefersReducedMotion } from "./prefers-motion";

export function initHeroEntrance() {
  if (prefersReducedMotion()) return;

  const root = document.querySelector<HTMLElement>("[data-hero-enter]");
  if (!root || root.dataset.heroEnterInit) return;
  root.dataset.heroEnterInit = "1";

  const items = [...root.querySelectorAll<HTMLElement>("[data-hero-item]")];
  items.forEach((el, i) => {
    const isDeviceFrame = el.hasAttribute("data-hero-device");
    void animateReveal(el, i * 0.07, isDeviceFrame ? "device" : "hero");
  });
}
