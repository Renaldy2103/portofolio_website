import { useEffect, useRef, useState } from 'react';

/**
 * Defers mounting (and therefore downloading React.lazy chunks) until the container
 * approaches the viewport. Once mounted, stays mounted.
 */
export default function LazyViewport({
  children,
  fallback = null,
  rootMargin = '320px',
  className = '',
}) {
  const ref = useRef(null);
  const [shouldRender, setShouldRender] = useState(
    () => typeof window !== 'undefined' && typeof IntersectionObserver === 'undefined'
  );

  useEffect(() => {
    if (shouldRender) return undefined;
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldRender(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [shouldRender, rootMargin]);

  return (
    <div ref={ref} className={className}>
      {shouldRender ? children : fallback}
    </div>
  );
}
