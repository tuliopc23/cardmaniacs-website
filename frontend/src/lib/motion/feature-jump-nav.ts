import { prefersReducedMotion } from "./prefers-motion";

export function initFeatureJumpNav() {
  const nav = document.querySelector<HTMLElement>("[data-feature-jump-nav]");
  if (!nav || nav.dataset.jumpNavInit) return;
  nav.dataset.jumpNavInit = "1";

  const links = [...nav.querySelectorAll<HTMLAnchorElement>("[data-feature-jump-link]")];
  if (links.length === 0) return;

  const sectionIds = links
    .map((link) => link.getAttribute("href")?.replace(/^#/, ""))
    .filter((id): id is string => Boolean(id));

  const sections = sectionIds
    .map((id) => document.getElementById(id))
    .filter((el): el is HTMLElement => el instanceof HTMLElement);

  if (sections.length === 0) return;

  const setActive = (id: string) => {
    links.forEach((link) => {
      const href = link.getAttribute("href")?.replace(/^#/, "");
      const active = href === id;
      link.dataset.active = active ? "true" : "false";
      link.setAttribute("aria-current", active ? "true" : "false");
    });
  };

  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

      if (visible[0]?.target.id) {
        setActive(visible[0].target.id);
      }
    },
    { rootMargin: "-35% 0px -55% 0px", threshold: [0, 0.15, 0.35] },
  );

  sections.forEach((section) => observer.observe(section));

  if (!prefersReducedMotion()) {
    links.forEach((link) => {
      link.addEventListener("click", () => {
        link.classList.add("cm-jump-link-pressed");
        window.setTimeout(() => link.classList.remove("cm-jump-link-pressed"), 180);
      });
    });
  }
}
