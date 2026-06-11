import { inView, stagger } from "motion";
import { animateEl, whenAnimationDone } from "./animate-el";
import { easeOutQuint, prefersReducedMotion } from "./prefers-motion";

/** Scroll / section reveals — perceptible but calm */
const REVEAL_Y = 28;
const REVEAL_OPACITY = 0.82;
const REVEAL_DURATION = 0.58;

/** Hero load choreography — stronger entrance for above-the-fold */
const HERO_Y = 36;
const HERO_OPACITY = 0.68;
const HERO_SCALE = 0.96;
const HERO_BLUR = 6;
const HERO_DURATION = 0.65;

export type RevealVariant = "default" | "hero" | "device";

function isInViewport(el: HTMLElement) {
  const rect = el.getBoundingClientRect();
  return rect.top < window.innerHeight * 0.92 && rect.bottom > 0;
}

export function setRevealInitial(el: HTMLElement, variant: RevealVariant = "default") {
  if (variant === "device") {
    el.style.opacity = String(HERO_OPACITY);
    el.style.transform = `translateY(${HERO_Y + 8}px) scale(${HERO_SCALE})`;
    el.style.filter = `blur(${HERO_BLUR}px)`;
    return;
  }

  const y = variant === "hero" ? HERO_Y : REVEAL_Y;
  const opacity = variant === "hero" ? HERO_OPACITY : REVEAL_OPACITY;
  el.style.opacity = String(opacity);
  el.style.transform = `translateY(${y}px)`;
}

export function clearRevealInline(el: HTMLElement) {
  el.style.opacity = "";
  el.style.transform = "";
  el.style.filter = "";
}

export function animateReveal(el: HTMLElement, delay = 0, variant: RevealVariant = "default") {
  const cssInitial =
    variant !== "default" && document.documentElement.classList.contains("motion-enhanced");
  if (!cssInitial) {
    setRevealInitial(el, variant);
  }

  if (variant === "device") {
    return whenAnimationDone(
      animateEl(
        el,
        {
          transform: [`translateY(${HERO_Y + 8}px) scale(${HERO_SCALE})`, "translateY(0) scale(1)"],
          opacity: [HERO_OPACITY, 1],
          filter: [`blur(${HERO_BLUR}px)`, "blur(0px)"],
        },
        { duration: HERO_DURATION + 0.08, delay, easing: easeOutQuint },
      ),
      () => {
        el.dataset.revealDone = "1";
        clearRevealInline(el);
      },
    );
  }

  const y = variant === "hero" ? HERO_Y : REVEAL_Y;
  const opacity = variant === "hero" ? HERO_OPACITY : REVEAL_OPACITY;
  const duration = variant === "hero" ? HERO_DURATION : REVEAL_DURATION;

  return whenAnimationDone(
    animateEl(
      el,
      {
        transform: [`translateY(${y}px)`, "translateY(0)"],
        opacity: [opacity, 1],
      },
      { duration, delay, easing: easeOutQuint },
    ),
    () => {
      el.dataset.revealDone = "1";
      clearRevealInline(el);
    },
  );
}

function runRevealOnce(el: HTMLElement, delay = 0, variant: RevealVariant = "default") {
  if (el.dataset.revealDone === "1") return;
  animateReveal(el, delay, variant);
}

function bindRevealOnView(el: HTMLElement, run: () => void) {
  if (isInViewport(el)) {
    requestAnimationFrame(run);
    return;
  }

  inView(el, run, { margin: "-8% 0px -8% 0px", amount: 0.12 });
}

function bindStaggerOnView(root: HTMLElement, run: () => void) {
  if (isInViewport(root)) {
    requestAnimationFrame(run);
    return;
  }

  inView(root, run, { margin: "-10% 0px -10% 0px", amount: 0.1 });
}

export function initScrollReveals() {
  if (prefersReducedMotion()) return;

  document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => {
    if (el.dataset.revealInit) return;
    el.dataset.revealInit = "1";

    bindRevealOnView(el, () => runRevealOnce(el));
  });
}

export function initStaggerGroups() {
  if (prefersReducedMotion()) return;

  document.querySelectorAll<HTMLElement>("[data-reveal-stagger]").forEach((root) => {
    if (root.dataset.staggerInit) return;
    root.dataset.staggerInit = "1";

    const items = [...root.querySelectorAll<HTMLElement>("[data-reveal-card]")];
    if (items.length === 0) return;

    const runStagger = () => {
      if (root.dataset.staggerDone === "1") return;
      root.dataset.staggerDone = "1";
      items.forEach((el, i) => {
        animateReveal(el, i * 0.07);
      });
    };

    bindStaggerOnView(root, runStagger);
  });
}

export function initPlatformStills() {
  if (prefersReducedMotion()) return;

  document.querySelectorAll<HTMLElement>("[data-platform-stills]").forEach((root) => {
    if (root.dataset.stillsInit) return;
    root.dataset.stillsInit = "1";

    const figures = [...root.querySelectorAll<HTMLElement>("[data-platform-still]")];
    if (figures.length === 0) return;

    const runStagger = () => {
      if (root.dataset.stillsDone === "1") return;
      root.dataset.stillsDone = "1";

      figures.forEach((el) => setRevealInitial(el));
      whenAnimationDone(
        animateEl(
          figures,
          {
            transform: [`translateY(${REVEAL_Y}px)`, "translateY(0)"],
            opacity: [REVEAL_OPACITY, 1],
          },
          { duration: 0.52, delay: stagger(0.09), easing: easeOutQuint },
        ),
        () => {
          figures.forEach((el) => {
            el.dataset.revealDone = "1";
            clearRevealInline(el);
          });
        },
      );
    };

    bindStaggerOnView(root, runStagger);
  });
}
