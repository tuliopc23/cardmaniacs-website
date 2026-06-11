import { animateEl } from "./animate-el";
import { easeOutQuint, prefersReducedMotion } from "./prefers-motion";

export function initFaqAccordion() {
  const items = document.querySelectorAll<HTMLDetailsElement>("[data-faq-item]");
  if (items.length === 0) return;

  items.forEach((details) => {
    if (details.dataset.faqInit) return;
    details.dataset.faqInit = "1";

    const summary = details.querySelector("summary");
    const body = details.querySelector<HTMLElement>("[data-faq-body]");
    if (!(summary instanceof HTMLElement) || !body) return;

    if (prefersReducedMotion()) return;

    summary.addEventListener("click", (event) => {
      event.preventDefault();

      if (details.open) {
        const start = body.scrollHeight;
        body.style.height = `${start}px`;
        body.style.overflow = "hidden";
        void animateEl(
          body,
          { height: [`${start}px`, "0px"] },
          { duration: 0.22, easing: "ease-in" },
        ).finished.then(() => {
          details.open = false;
          body.style.height = "";
          body.style.overflow = "";
        });
        return;
      }

      details.open = true;
      body.style.height = "0px";
      body.style.overflow = "hidden";
      const target = body.scrollHeight;
      void animateEl(
        body,
        { height: ["0px", `${target}px`] },
        { duration: 0.28, easing: easeOutQuint },
      ).finished.then(() => {
        body.style.height = "";
        body.style.overflow = "";
      });
    });
  });
}
