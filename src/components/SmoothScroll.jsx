import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { setLenis, scrollToTarget } from '../lib/smoothScroll';

gsap.registerPlugin(ScrollTrigger);

/**
 * Global smooth scrolling (Lenis) synced with GSAP ScrollTrigger.
 * Also handles: same-page #anchor links, cross-page "/#section" links,
 * and resetting scroll on route change.
 */
export default function SmoothScroll() {
  const { pathname, hash } = useLocation();

  // 1. Create Lenis once and drive it from GSAP's ticker
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return undefined;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenis.on('scroll', ScrollTrigger.update);
    const tick = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    setLenis(lenis);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      setLenis(null);
    };
  }, []);

  // 2. Intercept same-page hash links (e.g. navbar "#about") for smooth scrolling
  useEffect(() => {
    const handleClick = (event) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey) return;
      const anchor = event.target.closest?.('a[href*="#"]');
      if (!anchor || anchor.target === '_blank') return;

      const url = new URL(anchor.href, window.location.href);
      const samePage = url.origin === window.location.origin && url.pathname === window.location.pathname;
      if (!samePage || !url.hash || url.hash === '#') return;

      const target = document.querySelector(decodeURIComponent(url.hash));
      if (!target) return;

      event.preventDefault();
      scrollToTarget(target);
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  // 3. Route changes: jump to top, or to "/#section" when navigating from another page
  useEffect(() => {
    let frame;
    if (hash) {
      frame = requestAnimationFrame(() => {
        const target = document.querySelector(decodeURIComponent(hash));
        if (target) scrollToTarget(target);
      });
    } else {
      scrollToTarget(0, { immediate: true });
    }

    const refresh = setTimeout(() => ScrollTrigger.refresh(), 300);
    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(refresh);
    };
  }, [pathname, hash]);

  // 4. Keep ScrollTrigger positions correct when page height changes (images, lazy 3D)
  useEffect(() => {
    let timeout;
    const observer = new ResizeObserver(() => {
      clearTimeout(timeout);
      timeout = setTimeout(() => ScrollTrigger.refresh(), 200);
    });
    observer.observe(document.body);
    return () => {
      clearTimeout(timeout);
      observer.disconnect();
    };
  }, []);

  return null;
}
