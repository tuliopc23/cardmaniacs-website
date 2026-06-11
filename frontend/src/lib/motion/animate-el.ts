import { animate } from "motion";

/** Motion's DOM keyframe types omit some animatable CSS props (e.g. height). */
type MotionKeyframes = Record<string, string | number | Array<string | number>>;

export function animateEl(
  target: Element | Element[],
  keyframes: MotionKeyframes,
  options?: Record<string, unknown>,
) {
  return animate(target, keyframes as never, (options ?? {}) as never);
}
