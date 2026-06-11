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

/** Motion v12+: animate() is thenable; `.finished` was removed. */
export function whenAnimationDone(
  animation: { then?: (onfulfilled: () => void) => unknown },
  onDone: () => void,
) {
  if (typeof animation.then === "function") {
    void animation.then(onDone);
    return;
  }
  onDone();
}
