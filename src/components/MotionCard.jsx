import { useRef } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
  useReducedMotion,
} from 'framer-motion';
import useMediaQuery from '../hooks/useMediaQuery';

/**
 * Reusable animated card powered by Motion (framer-motion):
 * - Smooth entrance reveal with stagger on scroll (whileInView)
 * - Desktop: hover lift + pointer-driven 3D tilt + radial cyan spotlight
 * - Touch / Mobile: lightweight entrance + tap feedback without pointer overhead
 */
export default function MotionCard({
  children,
  className = '',
  onClick,
  index = 0,
  tiltMax = 5,
  hoverLift = -5,
  layout = false,
  glare = true,
}) {
  const cardRef = useRef(null);
  const prefersReduced = useReducedMotion();
  const isTouch = useMediaQuery('(pointer: coarse)');
  const disableTilt = prefersReduced || isTouch || tiltMax === 0;

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const spotX = useMotionValue(0);
  const spotY = useMotionValue(0);

  const springConfig = { stiffness: 260, damping: 24, mass: 0.6 };
  const rotateX = useSpring(useTransform(mouseY, [0, 1], [tiltMax, -tiltMax]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-tiltMax, tiltMax]), springConfig);

  const spotlightBg = useMotionTemplate`radial-gradient(260px circle at ${spotX}px ${spotY}px, rgba(0, 191, 255, 0.12), transparent 72%)`;

  const handlePointerMove = (e) => {
    if (disableTilt || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    spotX.set(x);
    spotY.set(y);
    mouseX.set(Math.min(1, Math.max(0, x / rect.width)));
    mouseY.set(Math.min(1, Math.max(0, y / rect.height)));
  };

  const handlePointerLeave = () => {
    if (disableTilt) return;
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  const staggerDelay = Math.min(index * 0.055, 0.25);

  return (
    <motion.div
      ref={cardRef}
      layout={layout}
      onClick={onClick}
      onPointerMove={disableTilt ? undefined : handlePointerMove}
      onPointerLeave={disableTilt ? undefined : handlePointerLeave}
      initial={prefersReduced ? false : { opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={prefersReduced ? undefined : { opacity: 0, scale: 0.96, y: 10 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{
        duration: 0.46,
        delay: staggerDelay,
        ease: [0.22, 1, 0.36, 1],
        layout: { duration: 0.28, ease: [0.22, 1, 0.36, 1] },
      }}
      whileHover={
        disableTilt
          ? undefined
          : {
              y: hoverLift,
              transition: { type: 'spring', stiffness: 340, damping: 24 },
            }
      }
      whileTap={onClick && !prefersReduced ? { scale: 0.985 } : undefined}
      style={
        disableTilt
          ? undefined
          : {
              rotateX,
              rotateY,
              transformPerspective: 1000,
            }
      }
      className={`group relative ${className}`}
    >
      {glare && !disableTilt && (
        <motion.div
          aria-hidden="true"
          style={{ background: spotlightBg }}
          className="pointer-events-none absolute inset-0 z-20 rounded-[inherit] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        />
      )}
      {children}
    </motion.div>
  );
}
