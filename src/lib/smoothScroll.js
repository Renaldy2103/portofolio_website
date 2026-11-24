// Shared Lenis instance + scroll helpers.
// Components call these helpers instead of touching window.scrollTo directly,
// so scrolling stays smooth and modals can pause the page scroll.

let lenis = null;
let lockCount = 0;

const HEADER_OFFSET = -90;

export function setLenis(instance) {
  lenis = instance;
  if (lenis && lockCount > 0) lenis.stop();
}

export function getLenis() {
  return lenis;
}

/**
 * Smooth-scroll to a number (px), CSS selector, or element.
 * Falls back to native scrolling when Lenis is disabled (reduced motion).
 */
export function scrollToTarget(target, options = {}) {
  const { immediate = false, offset } = options;
  const isPosition = typeof target === 'number';
  const resolvedOffset = offset ?? (isPosition ? 0 : HEADER_OFFSET);

  if (lenis) {
    lenis.scrollTo(target, { offset: resolvedOffset, immediate, force: true });
    return;
  }

  if (isPosition) {
    window.scrollTo({ top: target, behavior: immediate ? 'auto' : 'smooth' });
    return;
  }

  const el = typeof target === 'string' ? document.querySelector(target) : target;
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY + resolvedOffset;
  window.scrollTo({ top, behavior: immediate ? 'auto' : 'smooth' });
}

/** Pause page scrolling (nested calls are reference-counted). */
export function lockScroll() {
  lockCount += 1;
  if (lenis) lenis.stop();
}

export function unlockScroll() {
  lockCount = Math.max(0, lockCount - 1);
  if (lenis && lockCount === 0) lenis.start();
}
