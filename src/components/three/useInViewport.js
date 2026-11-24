import { useEffect, useState } from 'react';

/**
 * Tracks whether `ref` is near the viewport.
 * - `inView`: currently intersecting (used to pause frameloop when scrolled away)
 * - `hasEntered`: true once it has entered at least once (used to lazy-mount below-the-fold WebGL canvases)
 */
export default function useInViewport(ref, { rootMargin = '180px', defaultVisible = false } = {}) {
  const [inView, setInView] = useState(defaultVisible);
  const [hasEntered, setHasEntered] = useState(defaultVisible);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
        if (entry.isIntersecting) {
          setHasEntered(true);
        }
      },
      { rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, rootMargin]);

  return { inView, hasEntered };
}
