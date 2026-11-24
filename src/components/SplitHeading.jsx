import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { useGSAP } from '@gsap/react';
import { onBootComplete } from '../lib/boot';

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

/**
 * Animates a heading word-by-word using GSAP SplitText + ScrollTrigger.
 * - mode="scroll" (default): reveals words as the heading enters the viewport
 * - mode="hero": waits for BootLoader completion, then reveals words
 */
export default function SplitHeading({
  as = 'h2',
  children,
  className = '',
  mode = 'scroll',
  delay = 0,
  stagger = 0.055,
  duration = 0.78,
  start = 'top 86%',
}) {
  const headingRef = useRef(null);
  const Tag = as;

  useGSAP(
    () => {
      const el = headingRef.current;
      if (!el) return undefined;

      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) return undefined;

      const split = SplitText.create(el, {
        type: 'words',
        mask: 'words',
        aria: 'auto',
      });

      if (!split.words || split.words.length === 0) {
        split.revert();
        return undefined;
      }

      // Give masks slight breathing room during slide-up, then release overflow for neon text-shadows
      split.masks.forEach((maskEl) => {
        maskEl.style.paddingBottom = '0.12em';
        maskEl.style.marginBottom = '-0.12em';
      });

      gsap.set(split.words, {
        yPercent: 115,
        opacity: 0,
        willChange: 'transform, opacity',
      });

      const releaseMasks = () => {
        split.masks.forEach((maskEl) => {
          maskEl.style.overflow = 'visible';
        });
      };

      let unsubscribeBoot = () => {};
      let tween;

      if (mode === 'hero') {
        unsubscribeBoot = onBootComplete(() => {
          tween = gsap.to(split.words, {
            yPercent: 0,
            opacity: 1,
            duration,
            stagger,
            delay,
            ease: 'power3.out',
            clearProps: 'willChange',
            onComplete: releaseMasks,
          });
        });
      } else {
        tween = gsap.to(split.words, {
          yPercent: 0,
          opacity: 1,
          duration,
          stagger,
          delay,
          ease: 'power3.out',
          clearProps: 'willChange',
          onComplete: releaseMasks,
          scrollTrigger: {
            trigger: el,
            start,
            toggleActions: 'play none none none',
            once: true,
          },
        });
      }

      return () => {
        unsubscribeBoot();
        if (tween) tween.kill();
        split.revert();
      };
    },
    { scope: headingRef, dependencies: [mode, delay, stagger, duration, start] }
  );

  return (
    <Tag ref={headingRef} className={className}>
      {children}
    </Tag>
  );
}
