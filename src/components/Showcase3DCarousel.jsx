import { useCallback, useEffect, useRef, useState } from 'react';
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'framer-motion';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import useMediaQuery from '../hooks/useMediaQuery';

/**
 * Shortest signed circular distance from `activeIndex` to `index` in a ring of size `total`.
 */
function getCircularOffset(index, activeIndex, total) {
  if (total <= 0) return 0;
  let diff = (index - activeIndex) % total;
  if (diff > total / 2) diff -= total;
  if (diff < -total / 2) diff += total;
  return diff;
}

/**
 * Wrapper for the active center card giving subtle pointer-driven 3D tilt + holographic glare.
 */
function ActiveCardTilt({ children, enabled }) {
  const ref = useRef(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const gx = useMotionValue(50);
  const gy = useMotionValue(50);

  const springCfg = { stiffness: 260, damping: 24, mass: 0.6 };
  const rotateX = useSpring(useTransform(my, [0, 1], [6.5, -6.5]), springCfg);
  const rotateY = useSpring(useTransform(mx, [0, 1], [-6.5, 6.5]), springCfg);
  const glareBg = useMotionTemplate`radial-gradient(320px circle at ${gx}% ${gy}%, rgba(0, 191, 255, 0.16), rgba(255,255,255,0.04) 38%, transparent 72%)`;

  const handleMove = (e) => {
    if (!enabled || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
    const py = Math.min(1, Math.max(0, (e.clientY - rect.top) / rect.height));
    mx.set(px);
    my.set(py);
    gx.set(px * 100);
    gy.set(py * 100);
  };

  const handleLeave = () => {
    mx.set(0.5);
    my.set(0.5);
  };

  return (
    <motion.div
      ref={ref}
      onPointerMove={enabled ? handleMove : undefined}
      onPointerLeave={enabled ? handleLeave : undefined}
      style={
        enabled
          ? {
              rotateX,
              rotateY,
              transformStyle: 'preserve-3d',
            }
          : undefined
      }
      className="relative w-full h-full"
    >
      {enabled && (
        <motion.div
          aria-hidden="true"
          style={{ background: glareBg }}
          className="pointer-events-none absolute inset-0 z-20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        />
      )}
      {children}
    </motion.div>
  );
}

/**
 * 3D Perspective Coverflow Stage Carousel.
 * Supports:
 * - True CSS 3D perspective depth (`translateX`, `translateZ`, `rotateY`, `scale`)
 * - Drag / touch horizontal swipe (`touch-pan-y` safe for mobile vertical scroll)
 * - Click side card to focus, click center card to open modal
 * - Keyboard Left/Right arrows, accessible 44x44px buttons, pagination dots & autoplay toggle
 */
export default function Showcase3DCarousel({
  items,
  renderCard,
  onSelectActive,
  ariaLabel = '3D Showcase Carousel',
  cardWidthClass = 'w-[84%] sm:w-[370px] md:w-[400px] lg:w-[420px]',
  stageHeightClass = 'h-[415px] sm:h-[435px] md:h-[450px]',
  autoPlayInterval = 4800,
}) {
  const [rawActiveIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [inView, setInView] = useState(false);

  const stageRef = useRef(null);
  const dragStartRef = useRef(null);
  const suppressClickRef = useRef(false);

  const prefersReduced = useReducedMotion();
  const isMobile = useMediaQuery('(max-width: 767px)');
  const isFinePointer = useMediaQuery('(hover: hover) and (pointer: fine)');

  const total = items.length;
  const activeIndex = total > 0 ? ((rawActiveIndex % total) + total) % total : 0;

  const goNext = useCallback(() => {
    if (total <= 1) return;
    setActiveIndex((prev) => (prev + 1) % total);
  }, [total]);

  const goPrev = useCallback(() => {
    if (total <= 1) return;
    setActiveIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Pause autoplay when offscreen
  useEffect(() => {
    const el = stageRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return undefined;
    const obs = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.25 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!isAutoPlaying || isHovered || !inView || prefersReduced || total <= 1) {
      return undefined;
    }
    const timer = window.setInterval(goNext, autoPlayInterval);
    return () => window.clearInterval(timer);
  }, [isAutoPlaying, isHovered, inView, prefersReduced, total, goNext, autoPlayInterval]);

  const handlePointerDown = (e) => {
    suppressClickRef.current = false;
    dragStartRef.current = { x: e.clientX, y: e.clientY, moved: false };
  };

  const handlePointerMove = (e) => {
    if (!dragStartRef.current) return;
    const dx = e.clientX - dragStartRef.current.x;
    const dy = e.clientY - dragStartRef.current.y;
    if (Math.abs(dx) > 12 && Math.abs(dx) > Math.abs(dy)) {
      dragStartRef.current.moved = true;
    }
  };

  const handlePointerUp = (e) => {
    if (!dragStartRef.current) return;
    const dx = e.clientX - dragStartRef.current.x;
    const dy = e.clientY - dragStartRef.current.y;
    suppressClickRef.current = Boolean(dragStartRef.current.moved);
    dragStartRef.current = null;

    if (Math.abs(dx) > 44 && Math.abs(dx) > Math.abs(dy) * 1.2) {
      if (dx < 0) goNext();
      else goPrev();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      goNext();
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      goPrev();
    }
  };

  if (total === 0) return null;

  const maxVisibleOffset = isMobile ? 1 : total >= 5 ? 2 : 1;

  return (
    <div
      ref={stageRef}
      role="region"
      aria-roledescription="carousel"
      aria-label={ariaLabel}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative select-none outline-none focus-visible:ring-2 focus-visible:ring-[#00bfff]/60 rounded-3xl"
    >
      {/* 3D Perspective Stage */}
      <div
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={() => {
          dragStartRef.current = null;
        }}
        style={{ perspective: '1400px' }}
        className={`relative w-full ${stageHeightClass} flex items-center justify-center overflow-hidden touch-pan-y py-4`}
      >
        {/* 3D Holographic Stage Pedestal Glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 w-[72%] max-w-xl h-16 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(0,191,255,0.24)_0%,rgba(59,130,246,0.08)_45%,transparent_75%)] blur-xl"
        />
        <div
          aria-hidden="true"
          style={{ transform: 'perspective(600px) rotateX(72deg)' }}
          className="pointer-events-none absolute bottom-1 left-1/2 -translate-x-1/2 w-[64%] max-w-lg h-14 rounded-full border border-[#00bfff]/20 opacity-50"
        />

        {items.map((item, idx) => {
          const offset = getCircularOffset(idx, activeIndex, total);
          const absOffset = Math.abs(offset);

          if (absOffset > maxVisibleOffset) return null;

          const isCenter = offset === 0;

          // Compute 3D spatial coordinates
          let xPercent = 0;
          let zPx = 0;
          let rotateYDeg = 0;
          let scaleVal = 1;
          let opacityVal = 1;

          if (!prefersReduced && !isCenter) {
            if (isMobile) {
              xPercent = offset * 56;
              zPx = -150;
              rotateYDeg = offset * -26;
              scaleVal = 0.84;
              opacityVal = 0.48;
            } else if (absOffset === 1) {
              xPercent = offset * 64;
              zPx = -190;
              rotateYDeg = offset * -32;
              scaleVal = 0.86;
              opacityVal = 0.76;
            } else {
              xPercent = offset * 110;
              zPx = -360;
              rotateYDeg = offset * -45;
              scaleVal = 0.72;
              opacityVal = 0.36;
            }
          } else if (prefersReduced && !isCenter) {
            xPercent = offset * 85;
            scaleVal = 0.9;
            opacityVal = absOffset === 1 ? 0.5 : 0;
          }

          const zIndex = 30 - absOffset * 10;

          return (
            <motion.div
              key={item.id || item.title || idx}
              initial={false}
              animate={{
                x: `${xPercent}%`,
                z: zPx,
                rotateY: rotateYDeg,
                scale: scaleVal,
                opacity: opacityVal,
              }}
              transition={
                prefersReduced
                  ? { duration: 0.2 }
                  : {
                      type: 'spring',
                      stiffness: 230,
                      damping: 28,
                      mass: 0.85,
                    }
              }
              style={{
                zIndex,
                transformStyle: 'preserve-3d',
              }}
              onClick={(e) => {
                if (suppressClickRef.current) {
                  suppressClickRef.current = false;
                  return;
                }
                if (isCenter) {
                  onSelectActive?.(idx, e);
                } else {
                  e.stopPropagation();
                  setActiveIndex(idx);
                }
              }}
              aria-hidden={!isCenter}
              className={`group absolute ${cardWidthClass} h-[375px] sm:h-[395px] cursor-pointer`}
            >
              <ActiveCardTilt enabled={isCenter && isFinePointer && !prefersReduced}>
                <div
                  className={`relative w-full h-full rounded-3xl overflow-hidden transition-shadow duration-300 ${
                    isCenter
                      ? 'glass-card bg-[#0d121c]/92 border border-[#00bfff]/45 shadow-[0_24px_60px_-15px_rgba(0,0,0,0.9),0_0_34px_rgba(0,191,255,0.22)]'
                      : 'glass-card bg-[#0b0f18]/85 border border-white/10 hover:border-[#00bfff]/35 shadow-[0_16px_40px_rgba(0,0,0,0.75)]'
                  }`}
                >
                  {/* Side-card click-to-focus veil */}
                  {!isCenter && (
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 z-20 bg-[#050811]/30 group-hover:bg-transparent transition-colors duration-300"
                    />
                  )}
                  {renderCard(item, idx, isCenter)}
                </div>
              </ActiveCardTilt>
            </motion.div>
          );
        })}
      </div>

      {/* Accessible 3D Stage Controls Dock */}
      {total > 1 && (
        <div className="mt-4 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          <button
            type="button"
            onClick={goPrev}
            aria-label="Previous item"
            className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-white/[0.04] hover:bg-[#00bfff]/15 border border-white/12 hover:border-[#00bfff]/50 text-slate-200 hover:text-[#00bfff] active:scale-95 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00bfff]"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Interactive Ring Indicators */}
          <div className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white/[0.03] border border-white/[0.08]">
            {items.map((item, idx) => {
              const isCurrent = idx === activeIndex;
              return (
                <button
                  key={item.id || idx}
                  type="button"
                  onClick={() => setActiveIndex(idx)}
                  aria-label={`Go to slide ${idx + 1}: ${item.title}`}
                  aria-current={isCurrent ? 'true' : undefined}
                  className="p-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00bfff] rounded-full"
                >
                  <span
                    className={`block h-2 rounded-full transition-all duration-300 ${
                      isCurrent
                        ? 'w-6 bg-[#00bfff] shadow-[0_0_10px_#00bfff]'
                        : 'w-2 bg-white/20 hover:bg-white/45'
                    }`}
                  />
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={goNext}
            aria-label="Next item"
            className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-white/[0.04] hover:bg-[#00bfff]/15 border border-white/12 hover:border-[#00bfff]/50 text-slate-200 hover:text-[#00bfff] active:scale-95 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00bfff]"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Slide Counter + Auto-rotate Toggle */}
          <div className="inline-flex items-center gap-2 pl-1">
            <span className="text-xs font-mono text-slate-400 tabular-nums">
              <span className="text-[#00bfff] font-bold">
                {String(activeIndex + 1).padStart(2, '0')}
              </span>{' '}
              / {String(total).padStart(2, '0')}
            </span>

            {!prefersReduced && (
              <button
                type="button"
                onClick={() => setIsAutoPlaying((v) => !v)}
                aria-label={isAutoPlaying ? 'Pause 3D auto-rotation' : 'Start 3D auto-rotation'}
                title={isAutoPlaying ? 'Pause auto-rotation' : 'Resume auto-rotation'}
                className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 text-slate-400 hover:text-white active:scale-95 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00bfff]"
              >
                {isAutoPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
