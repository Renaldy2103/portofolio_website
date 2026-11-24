/**
 * Elias Editorial Hero — adapted for a Cyber-Dark + Neon Cyan (#00bfff) Developer Portfolio.
 * Features:
 * - Giant two-line masked display name with kerning compensation & cursor parallax
 * - Cut-out waist-up portrait with holographic cyan duotone & outline spotlight
 * - 3D hardcover case-study playbook carousel that swings open on click
 * - Self-typing engineering build log that stamps, packs into a dark envelope & seals
 * - New full-screen InkSplash bootloader integrated with Lenis scroll locking
 */

import {
  createContext,
  Fragment,
  useCallback,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
  useSyncExternalStore,
} from 'react';
import {
  animate,
  AnimatePresence,
  domAnimation,
  LazyMotion,
  m,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'framer-motion';
import { ArrowRightIcon, ArrowUpRightIcon } from 'lucide-react';
import { lockScroll, unlockScroll } from '@/lib/smoothScroll';
import { isBootComplete, markBootComplete } from '@/lib/boot';

const cn = (...classes) => classes.filter(Boolean).join(' ');

/* ----------------------------- Defaults ----------------------------- */

const EASE = [0.16, 1, 0.3, 1];

const DEFAULT_MOTION = {
  delays: {
    nav: 0,
    first: 0.08,
    last: 0.22,
    portrait: 0.34,
    book: 0.52,
    pad: 0.62,
    intro: 0.7,
    socials: 1.0,
  },
  letterStagger: 0.05,
  depth: { portrait: 14, first: 6, last: 9 },
  letter: {
    perCharacter: 0.055,
    pauseAfterPunctuation: 0.28,
    beforeSeal: 1.3,
    press: 0.75,
    sealHold: 4.2,
  },
  bookTilt: 14,
  bookOpen: 34,
  bookCycle: 3.6,
  spotlight: { radius: 150, readyAfter: 1.8 },
  cursor: { dot: 10, ring: 42, disc: 70, readLabel: 'Inspect' },
};

const DEFAULT_SPLASH = {
  drawAt: 0.08,
  drawDuration: 0.72,
  floodAt: 0.62,
  floodDuration: 0.62,
  openAt: 1.32,
  openDuration: 0.82,
  fontTimeout: 1.0,
};

const MEDIA = {
  finePointer: '(hover: hover) and (pointer: fine)',
  composition: '(min-width: 1024px) and (min-aspect-ratio: 5/4)',
  reducedMotion: '(prefers-reduced-motion: reduce)',
};

const EMPTY_LETTER = {
  eyebrow: '',
  greeting: '',
  stamp: '',
  postmark: '',
  seal: '',
  sealing: '',
  messages: [],
  counter: '',
};

const EliasContext = createContext(null);

const useElias = () => {
  const value = useContext(EliasContext);
  if (!value) throw new Error('Elias parts must render inside <Elias>');
  return value;
};

const useReduce = () => {
  const { REDUCED } = useElias();
  const system = useReducedMotion();
  return REDUCED ?? system;
};

const IntroContext = createContext(true);
const useIntroStarted = () => useContext(IntroContext);

const OnScreenContext = createContext(true);
const useHeroOnScreen = () => useContext(OnScreenContext);

const useMediaQuery = (query) => {
  const subscribe = useCallback(
    (onChange) => {
      const list = window.matchMedia(query);
      list.addEventListener('change', onChange);
      return () => list.removeEventListener('change', onChange);
    },
    [query]
  );

  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false
  );
};

const reveal = (reduceMotion, delay, duration = 1) => {
  return reduceMotion ? { duration: 0 } : { delay, duration, ease: EASE };
};

/* ------------------------- SVG Filters & Art ------------------------- */

/**
 * Cyber-cyan duotone filter for the spotlight scanner + 2px silhouette outline filter.
 * Maps darks -> deep navy (#06101f) -> electric cyan (#00bfff) -> crisp ice highlight (#e6faff).
 */
const AuthorInkFilters = (props) => {
  return (
    <svg width="0" height="0" aria-hidden="true" focusable="false" className="absolute" {...props}>
      <filter id="ea-ink-duotone" colorInterpolationFilters="sRGB">
        <feColorMatrix
          type="matrix"
          values="0.2126 0.7152 0.0722 0 0  0.2126 0.7152 0.0722 0 0  0.2126 0.7152 0.0722 0 0  0 0 0 1 0"
        />
        <feComponentTransfer>
          <feFuncR type="table" tableValues="0.024 0.045 0.0 0.90" />
          <feFuncG type="table" tableValues="0.055 0.22 0.749 0.98" />
          <feFuncB type="table" tableValues="0.11 0.38 1.0 1.0" />
        </feComponentTransfer>
      </filter>

      <filter id="ea-ink-outline">
        <feMorphology in="SourceAlpha" operator="erode" radius="2" result="inside" />
        <feComposite in="SourceGraphic" in2="inside" operator="out" />
      </filter>
    </svg>
  );
};

// Cover art 1: Layered Backend Matrix (Cyan/Navy)
const AuthorCoverDays = (props) => {
  const nodes = Array.from({ length: 20 }, (_, index) => ({
    x: 20 + (index % 5) * 15,
    y: 84 + Math.floor(index / 5) * 11,
    marked: index === 7 || index === 12,
  }));

  return (
    <svg viewBox="0 0 100 139" preserveAspectRatio="xMidYMid slice" aria-hidden="true" {...props}>
      <rect width="100" height="139" fill="#0d1b2e" />
      {nodes.map((node) => (
        <circle
          key={`${node.x}-${node.y}`}
          cx={node.x}
          cy={node.y}
          r={node.marked ? 4.8 : 3.1}
          fill={node.marked ? '#00bfff' : '#1e3a5f'}
        />
      ))}
    </svg>
  );
};

// Cover art 2: Security Shield Stack (Emerald/Teal)
const AuthorCoverLamp = (props) => {
  return (
    <svg viewBox="0 0 100 139" preserveAspectRatio="xMidYMid slice" aria-hidden="true" {...props}>
      <rect width="100" height="139" fill="#0b1f24" />
      <circle cx="70" cy="86" r="28" fill="#10333b" />
      <circle cx="70" cy="86" r="13" fill="#00bfff" fillOpacity="0.45" />
      <rect x="12" y="112" width="56" height="9" rx="1.5" fill="#14b8a6" />
      <rect x="18" y="102" width="46" height="9" rx="1.5" fill="#0ea5e9" />
      <rect x="14" y="92" width="40" height="9" rx="1.5" fill="#bae6fd" />
      <rect x="0" y="122" width="100" height="17" fill="#09181d" />
    </svg>
  );
};

// Cover art 3: Neural Vision Path (Indigo/Cyan)
const AuthorCoverPath = (props) => {
  return (
    <svg viewBox="0 0 100 139" preserveAspectRatio="xMidYMid slice" aria-hidden="true" {...props}>
      <rect width="100" height="139" fill="#11162b" />
      <circle cx="82" cy="30" r="7" fill="#38bdf8" />
      <path
        d="M92 139c-10-14-34-14-30-28s24-12 14-26-46-6-50-18"
        fill="none"
        stroke="#3b82f6"
        strokeWidth="6.5"
        strokeLinecap="round"
      />
      <g fill="#7dd3fc">
        <circle cx="79" cy="128" r="1.8" />
        <circle cx="65" cy="116" r="1.8" />
        <circle cx="73" cy="100" r="1.8" />
        <circle cx="60" cy="88" r="1.8" />
        <circle cx="42" cy="82" r="1.8" />
      </g>
    </svg>
  );
};

// Cover art 4: Horizon Radar Pulse (Deep Slate/Cyan)
const AuthorCoverSunrise = (props) => {
  return (
    <svg viewBox="0 0 100 139" preserveAspectRatio="xMidYMid slice" aria-hidden="true" {...props}>
      <rect width="100" height="139" fill="#0b1526" />
      <circle cx="50" cy="96" r="36" fill="#112440" />
      <path d="M20 96a30 30 0 0 1 60 0Z" fill="#00bfff" />
      <rect y="96" width="100" height="43" fill="#08101e" />
      <rect x="14" y="104" width="72" height="2.2" rx="1.1" fill="#1d4ed8" />
      <rect x="24" y="112" width="52" height="2.2" rx="1.1" fill="#0284c7" />
      <rect x="34" y="120" width="32" height="2.2" rx="1.1" fill="#38bdf8" />
    </svg>
  );
};

const InkButton = ({ label, icon = 'right', href, disabled = false, onClick, className }) => {
  const Arrow = icon === 'up-right' ? ArrowUpRightIcon : ArrowRightIcon;
  const classes = cn('ea-cta', icon === 'up-right' && 'ea-cta-diagonal', className);

  const content = (
    <>
      <span className="ea-cta-label">{label}</span>
      <span aria-hidden="true" className="ea-cta-mark">
        <Arrow className="ea-cta-arrow ea-cta-arrow-out" strokeWidth={2} />
        <Arrow className="ea-cta-arrow ea-cta-arrow-in" strokeWidth={2} />
      </span>
    </>
  );

  if (href) {
    return (
      <a href={href} className={classes}>
        {content}
      </a>
    );
  }

  return (
    <button type="button" className={classes} disabled={disabled} onClick={onClick}>
      {content}
    </button>
  );
};

/* ------------------------- Masked Display Name ------------------------- */

const measureKerning = (element, text) => {
  const context = document.createElement('canvas').getContext('2d');
  if (!context) return [];

  const style = getComputedStyle(element);
  const shown = style.textTransform === 'uppercase' ? text.toUpperCase() : text;
  context.font = `${style.fontWeight} 100px ${style.fontFamily}`;

  const width = (value) => context.measureText(value).width;

  return [...shown].map((letter, index) => {
    const next = shown[index + 1];
    return next ? (width(letter + next) - width(letter) - width(next)) / 100 : 0;
  });
};

const MaskedWord = ({ text, delay, from, reverse = false }) => {
  const { MOTION } = useElias();
  const [kerning, setKerning] = useState([]);
  const wordRef = useRef(null);
  const reduceMotion = useReduce();
  const started = useIntroStarted();

  const letters = [...text];
  const offset = from === 'below' ? '105%' : '-105%';

  useEffect(() => {
    let active = true;
    document.fonts.ready.then(() => {
      if (active && wordRef.current) {
        setKerning(measureKerning(wordRef.current, text));
      }
    });
    return () => {
      active = false;
    };
  }, [text]);

  return (
    <span ref={wordRef} aria-hidden="true" className="inline-block whitespace-nowrap">
      {letters.map((letter, index) => {
        const order = reverse ? letters.length - 1 - index : index;
        return (
          <span
            key={`${letter}-${index}`}
            className="ea-letter-mask inline-block"
            style={kerning[index] ? { marginRight: `${kerning[index]}em` } : undefined}
          >
            <m.span
              className="inline-block"
              initial={{ transform: `translateY(${offset})` }}
              animate={started ? { transform: 'translateY(0%)' } : undefined}
              transition={reveal(reduceMotion, delay + order * MOTION.letterStagger, 1.0)}
            >
              {letter}
            </m.span>
          </span>
        );
      })}
    </span>
  );
};

/* ----------------------------- Ink Cursor ----------------------------- */

const TRAIL_SPRING = { stiffness: 420, damping: 34, mass: 0.5 };

const modeFor = (target) => {
  if (!(target instanceof Element)) return 'dot';
  if (target.closest('.ea-book-frame')) return 'read';
  if (target.closest('a, button')) return 'link';
  return 'dot';
};

const InkCursor = () => {
  const [mode, setMode] = useState('dot');
  const rootRef = useRef(null);
  const modeRef = useRef('dot');

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const visible = useMotionValue(0);
  const trailX = useSpring(x, TRAIL_SPRING);
  const trailY = useSpring(y, TRAIL_SPRING);

  const { MOTION } = useElias();
  const { dot, ring, disc, readLabel } = MOTION.cursor;

  useEffect(() => {
    const hero = rootRef.current?.parentElement;
    if (!hero) return undefined;

    const handleMove = (event) => {
      const rect = hero.getBoundingClientRect();
      const next = modeFor(event.target);

      x.set(event.clientX - rect.left);
      y.set(event.clientY - rect.top);
      visible.set(1);

      if (next !== modeRef.current) {
        modeRef.current = next;
        setMode(next);
      }
    };

    const handleLeave = () => visible.set(0);

    hero.addEventListener('pointermove', handleMove, { passive: true });
    hero.addEventListener('pointerleave', handleLeave);

    return () => {
      hero.removeEventListener('pointermove', handleMove);
      hero.removeEventListener('pointerleave', handleLeave);
    };
  }, [x, y, visible]);

  return (
    <div ref={rootRef} aria-hidden="true" className="pointer-events-none absolute inset-0 z-[60] overflow-hidden">
      <m.div className="absolute top-0 left-0" style={{ x: trailX, y: trailY, opacity: visible }}>
        <m.div
          className="border-ea-accent absolute rounded-full border-[1.5px] shadow-[0_0_14px_rgba(0,191,255,0.45)]"
          style={{ width: ring, height: ring, left: -ring / 2, top: -ring / 2 }}
          initial={{ transform: 'scale(0.2)', opacity: 0 }}
          animate={mode === 'link' ? { transform: 'scale(1)', opacity: 1 } : { transform: 'scale(0.2)', opacity: 0 }}
          transition={{ duration: 0.32, ease: EASE }}
        />
        <m.div
          className="bg-ea-accent text-[#04070d] absolute grid place-items-center rounded-full text-[10px] font-bold tracking-[0.18em] uppercase shadow-[0_0_24px_rgba(0,191,255,0.6)]"
          style={{ width: disc, height: disc, left: -disc / 2, top: -disc / 2 }}
          initial={{ transform: 'scale(0)', opacity: 0 }}
          animate={mode === 'read' ? { transform: 'scale(1)', opacity: 1 } : { transform: 'scale(0)', opacity: 0 }}
          transition={{ duration: 0.38, ease: EASE }}
        >
          {readLabel}
        </m.div>
      </m.div>

      <m.div className="absolute top-0 left-0" style={{ x, y, opacity: visible }}>
        <m.div
          className="bg-ea-accent ring-[#05070c] absolute rounded-full ring-2 shadow-[0_0_10px_rgba(0,191,255,0.8)]"
          style={{ width: dot, height: dot, left: -dot / 2, top: -dot / 2 }}
          animate={{ transform: mode === 'dot' ? 'scale(1)' : mode === 'link' ? 'scale(0.5)' : 'scale(0)' }}
          transition={{ duration: 0.28, ease: EASE }}
        />
      </m.div>
    </div>
  );
};

/* ------------------------ New InkSplash Bootloader ------------------------ */

const SWEEP_EASE = [0.76, 0, 0.24, 1];
const FLOOD = { fromRadius: 70, toRadius: 780 };

const InkSplash = ({ onOpen }) => {
  const { INTRO, NAME, SPLASH } = useElias();
  const [tracing, setTracing] = useState(false);
  const [done, setDone] = useState(() => isBootComplete());
  const openedRef = useRef(false);

  const clipId = useId();
  const wipeId = useId();
  const hole = useMotionValue(0);
  const holeEdge = useTransform(hole, (value) => value - 1);
  const maskImage = useMotionTemplate`radial-gradient(circle ${hole}px at 50% 50%, transparent ${holeEdge}px, #000 ${hole}px)`;

  // Scale SVG text automatically to fit any name length inside the 1000-unit viewBox
  const firstFontSize = Math.min(280, Math.floor(1260 / Math.max(NAME.first.length, 4)));
  const lastFontSize = Math.min(196, Math.floor(1180 / Math.max(NAME.last.length, 4)));

  const open = useCallback(() => {
    if (openedRef.current) return;
    openedRef.current = true;
    onOpen();
    markBootComplete();

    const radius = Math.hypot(window.innerWidth, window.innerHeight) / 2 + 32;
    animate(hole, radius, { duration: SPLASH.openDuration, ease: SWEEP_EASE }).then(() => {
      setDone(true);
    });
  }, [hole, onOpen, SPLASH.openDuration]);

  useEffect(() => {
    if (done) {
      onOpen();
      return undefined;
    }
    let active = true;
    const timeout = new Promise((resolve) => window.setTimeout(resolve, SPLASH.fontTimeout * 1000));
    Promise.race([document.fonts.ready, timeout]).then(() => {
      if (active) setTracing(true);
    });
    return () => {
      active = false;
    };
  }, [done, onOpen, SPLASH.fontTimeout]);

  useEffect(() => {
    if (!tracing || done) return undefined;
    const timer = window.setTimeout(open, SPLASH.openAt * 1000);
    return () => window.clearTimeout(timer);
  }, [tracing, done, open, SPLASH.openAt]);

  useEffect(() => {
    if (done) return undefined;

    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = 'hidden';
    lockScroll();
    window.addEventListener('keydown', open);

    return () => {
      root.style.overflow = previous;
      unlockScroll();
      window.removeEventListener('keydown', open);
    };
  }, [done, open]);

  if (done) return null;

  return (
    <m.div
      aria-hidden="true"
      className="ea-splash fixed inset-0 z-[9999] flex h-svh w-full flex-col bg-[#04070d] select-none"
      style={{ maskImage, WebkitMaskImage: maskImage }}
      onPointerDown={open}
    >
      {/* Subtle cyber grid inside bootloader */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(#00bfff 1px, transparent 1px), linear-gradient(90deg, #00bfff 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      <div className="ea-wrap flex h-20 shrink-0 items-center justify-between">
        <m.p
          className="text-slate-300/80 flex flex-wrap gap-[0.6em] text-[10px] sm:text-[11px] font-mono font-medium tracking-[0.2em] uppercase"
          initial={{ opacity: 0 }}
          animate={tracing ? { opacity: 1 } : undefined}
          transition={{ delay: 0.15, duration: 0.7 }}
        >
          {INTRO.roles.map((role, index) => (
            <Fragment key={role}>
              {index > 0 && <span className="text-ea-accent">/</span>}
              <span>{role}</span>
            </Fragment>
          ))}
        </m.p>

        <span className="hidden sm:inline-block text-[10px] font-mono tracking-[0.22em] text-slate-500 uppercase">
          CLICK OR PRESS ANY KEY
        </span>
      </div>

      <div className="pointer-events-none absolute inset-0 flex items-center justify-center px-4">
        <svg viewBox="0 23 1000 414" className="ea-splash-name font-ea-display font-black">
          <defs>
            <clipPath id={wipeId}>
              <m.rect
                x={0}
                y={0}
                width={1000}
                height={440}
                style={{ originX: 0 }}
                initial={{ scaleX: 0 }}
                animate={tracing ? { scaleX: 1 } : undefined}
                transition={{ delay: SPLASH.drawAt, duration: SPLASH.drawDuration, ease: EASE }}
              />
            </clipPath>
            <clipPath id={clipId}>
              <m.circle
                cx={0}
                cy={230}
                r={FLOOD.fromRadius}
                initial={{ x: -260, scale: 1 }}
                animate={tracing ? { x: 500, scale: FLOOD.toRadius / FLOOD.fromRadius } : undefined}
                transition={{ delay: SPLASH.floodAt, duration: SPLASH.floodDuration, ease: SWEEP_EASE }}
              />
            </clipPath>
          </defs>

          <g clipPath={`url(#${wipeId})`} filter="url(#ea-ink-outline)" textAnchor="middle">
            <text x={500} y={230} fontSize={firstFontSize} letterSpacing="0.03em" fill="var(--color-ea-accent)">
              {NAME.first.toUpperCase()}
            </text>
            <text x={500} y={386} fontSize={lastFontSize} letterSpacing="0.03em" fill="var(--color-ea-ink)">
              {NAME.last.toUpperCase()}
            </text>
          </g>

          <g clipPath={`url(#${clipId})`} textAnchor="middle">
            <text x={500} y={230} fontSize={firstFontSize} letterSpacing="0.03em" fill="var(--color-ea-accent)">
              {NAME.first.toUpperCase()}
            </text>
            <text x={500} y={386} fontSize={lastFontSize} letterSpacing="0.03em" fill="var(--color-ea-ink)">
              {NAME.last.toUpperCase()}
            </text>
          </g>
        </svg>
      </div>
    </m.div>
  );
};

/* ------------------------- Optional Embedded Nav ------------------------- */

const NavLink = ({ label, href, active = false, step }) => {
  const { MOTION } = useElias();
  const reduceMotion = useReduce();
  const started = useIntroStarted();

  return (
    <m.li
      initial={{ opacity: 0, transform: 'translateY(8px)' }}
      animate={started ? { opacity: 1, transform: 'translateY(0px)' } : undefined}
      transition={reveal(reduceMotion, MOTION.delays.nav + 0.15 + step * 0.08, 0.8)}
    >
      <a
        href={href}
        aria-current={active ? 'page' : undefined}
        className={cn(
          'ea-nav-link inline-flex min-h-10 items-center gap-2 font-medium uppercase',
          active ? 'text-ea-accent' : 'text-ea-ink'
        )}
      >
        <span className="ea-roll">
          <span>{label}</span>
          <span aria-hidden="true">{label}</span>
        </span>
      </a>
    </m.li>
  );
};

const HeroNavbar = () => {
  const { BRAND, MOTION, NAV_CTA, NAV_LINKS, NAV_STATUS } = useElias();
  const reduceMotion = useReduce();
  const started = useIntroStarted();
  const { left, right } = NAV_LINKS;

  return (
    <header className="ea-wrap">
      <nav aria-label="Hero Navigation" className="ea-nav">
        <a
          href={BRAND.href}
          className="ea-nav-logo font-ea-display text-ea-accent overflow-y-clip leading-none font-black tracking-[-0.045em] uppercase"
        >
          <m.span
            className="block"
            initial={{ transform: 'translateY(105%)' }}
            animate={started ? { transform: 'translateY(0%)' } : undefined}
            transition={reveal(reduceMotion, MOTION.delays.nav, 0.9)}
          >
            {BRAND.name}
          </m.span>
        </a>

        <m.p
          className="ea-nav-status"
          initial={{ opacity: 0 }}
          animate={started ? { opacity: 1 } : undefined}
          transition={reveal(reduceMotion, MOTION.delays.nav + 0.5, 0.8)}
        >
          <span aria-hidden="true" className="ea-nav-status-dot" />
          {NAV_STATUS.label}
          <span aria-hidden="true" className="text-ea-accent">
            ·
          </span>
          <span className="text-ea-ink">{NAV_STATUS.detail}</span>
        </m.p>

        <ul className="ea-nav-left">
          {left.map((link, index) => (
            <NavLink key={link.label} {...link} step={left.length - 1 - index} />
          ))}
        </ul>

        <ul className="ea-nav-right">
          {right.map((link, index) => (
            <NavLink key={link.label} {...link} step={index} />
          ))}
        </ul>

        <m.div
          className="ea-nav-cta"
          initial={{ opacity: 0, transform: 'translateY(8px)' }}
          animate={started ? { opacity: 1, transform: 'translateY(0px)' } : undefined}
          transition={reveal(reduceMotion, MOTION.delays.nav + 0.15 + right.length * 0.08, 0.8)}
        >
          {NAV_CTA && <InkButton label={NAV_CTA.label} href={NAV_CTA.href} icon="up-right" />}
        </m.div>
      </nav>
    </header>
  );
};

/* ------------------------- Intro & Socials ------------------------- */

const WRITTEN = {
  hidden: { opacity: 0, transform: 'translateY(0.45em)', clipPath: 'inset(0% 0% 100% 0%)' },
  shown: { opacity: 1, transform: 'translateY(0em)', clipPath: 'inset(-20% -5% -35% -5%)' },
};

const AuthorIntro = () => {
  const { INTRO, MOTION, CTAS } = useElias();
  const reduceMotion = useReduce();
  const started = useIntroStarted();
  const start = MOTION.delays.intro;

  return (
    <div className="ea-intro">
      <m.p
        className="ea-intro-roles text-ea-accent font-mono font-semibold uppercase"
        initial={WRITTEN.hidden}
        animate={started ? WRITTEN.shown : undefined}
        transition={reveal(reduceMotion, start, 0.9)}
      >
        {INTRO.roles.map((role, index) => (
          <Fragment key={role}>
            {index > 0 && (
              <span aria-hidden="true" className="text-slate-500">
                /
              </span>
            )}
            <span>{role}</span>
          </Fragment>
        ))}
      </m.p>

      <p className="ea-intro-headline text-ea-ink font-semibold">
        {INTRO.headline.map((line, index) => (
          <m.span
            key={line}
            className="block"
            initial={WRITTEN.hidden}
            animate={started ? WRITTEN.shown : undefined}
            transition={reveal(reduceMotion, start + 0.1 + index * 0.09, 1)}
          >
            {line}
          </m.span>
        ))}
      </p>

      <m.hr
        className="ea-intro-rule bg-ea-accent origin-left border-0 shadow-[0_0_12px_rgba(0,191,255,0.6)]"
        initial={{ transform: 'scaleX(0)' }}
        animate={started ? { transform: 'scaleX(1)' } : undefined}
        transition={reveal(reduceMotion, start + 0.42, 0.85)}
      />

      <m.p
        className="ea-intro-description text-ea-muted font-normal"
        initial={{ opacity: 0, transform: 'translateY(10px)' }}
        animate={started ? { opacity: 1, transform: 'translateY(0px)' } : undefined}
        transition={reveal(reduceMotion, start + 0.52, 0.85)}
      >
        {INTRO.description}
      </m.p>

      {CTAS && CTAS.length > 0 && (
        <m.div
          className="mt-5 flex flex-wrap items-center gap-2.5"
          initial={{ opacity: 0, transform: 'translateY(10px)' }}
          animate={started ? { opacity: 1, transform: 'translateY(0px)' } : undefined}
          transition={reveal(reduceMotion, start + 0.65, 0.85)}
        >
          {CTAS.map((cta) => (
            <a
              key={cta.label}
              href={cta.href}
              download={cta.download}
              className={cn(
                'inline-flex items-center gap-2 rounded-full px-4 py-2 text-[11px] font-bold tracking-wider uppercase transition-all',
                cta.primary
                  ? 'bg-[#00bfff] text-[#04070d] shadow-[0_0_18px_rgba(0,191,255,0.4)] hover:scale-105'
                  : 'border border-white/15 bg-white/5 text-slate-200 hover:border-[#00bfff]/60 hover:text-[#00bfff]'
              )}
            >
              <span>{cta.label}</span>
              <ArrowUpRightIcon className="w-3.5 h-3.5" />
            </a>
          ))}
        </m.div>
      )}
    </div>
  );
};

const SocialLinks = () => {
  const { MOTION, SOCIAL_LINKS } = useElias();
  const reduceMotion = useReduce();
  const started = useIntroStarted();
  const enter = (step) => reveal(reduceMotion, MOTION.delays.socials + step * 0.07, 0.8);

  return (
    <ul
      aria-label="Social links"
      className="ea-socials text-ea-ink flex flex-wrap items-center gap-2.5 text-[13px] font-medium"
    >
      {SOCIAL_LINKS.map((link, index) => (
        <Fragment key={link.label}>
          {index > 0 && (
            <m.li
              aria-hidden="true"
              className="text-ea-accent"
              initial={{ opacity: 0 }}
              animate={started ? { opacity: 1 } : undefined}
              transition={enter(index * 2 - 1)}
            >
              /
            </m.li>
          )}
          <m.li
            initial={{ opacity: 0, transform: 'translateY(8px)' }}
            animate={started ? { opacity: 1, transform: 'translateY(0px)' } : undefined}
            transition={enter(index * 2)}
          >
            <a
              href={link.href}
              target={link.href.startsWith('http') ? '_blank' : undefined}
              rel={link.href.startsWith('http') ? 'noreferrer' : undefined}
              className="ea-link inline-flex min-h-9 items-center hover:text-[#00bfff] transition-colors"
            >
              {link.label}
            </a>
          </m.li>
        </Fragment>
      ))}
    </ul>
  );
};

/* ------------------------- Self-Writing Build Log ------------------------- */

const tomorrowLabel = () => {
  const date = new Date();
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

const pad = (value) => String(value).padStart(2, '0');

const Envelope = ({ date }) => {
  const { LETTER } = useElias();
  const reduceMotion = useReduce();
  const timing = (delay, duration) => (reduceMotion ? { duration: 0 } : { delay, duration, ease: EASE });

  return (
    <span aria-hidden="true" className="ea-envelope">
      <m.span
        className="ea-envelope-letter"
        initial={{ transform: 'translateY(-78%)' }}
        animate={{ transform: 'translateY(6%)' }}
        transition={timing(0.2, 1.05)}
      />
      <span className="ea-envelope-side ea-envelope-left" />
      <span className="ea-envelope-side ea-envelope-right" />
      <span className="ea-envelope-bottom" />
      <m.span
        className="ea-envelope-flap"
        initial={{ transform: 'rotateX(180deg)', opacity: 0 }}
        animate={{ transform: 'rotateX(0deg)', opacity: 1 }}
        transition={timing(1.2, 0.95)}
      >
        <span className="ea-envelope-flap-shape" />
      </m.span>
      <m.span
        className="ea-wax-seal font-ea-display"
        initial={{ transform: 'scale(2.2)', opacity: 0 }}
        animate={{ transform: 'scale(1)', opacity: 1 }}
        transition={timing(2.25, 0.55)}
      >
        {LETTER.seal}
      </m.span>
      <m.span
        className="ea-postmark"
        initial={{ transform: 'scale(1.7) rotate(-34deg)', opacity: 0 }}
        animate={{ transform: 'scale(1) rotate(-12deg)', opacity: 1 }}
        transition={timing(2.75, 0.55)}
      >
        <span>{LETTER.postmark}</span>
        <span className="ea-postmark-date">{date}</span>
      </m.span>
    </span>
  );
};

const TomorrowLetter = () => {
  const { LETTER, MOTION } = useElias();
  const [index, setIndex] = useState(0);
  const [typed, setTyped] = useState(0);
  const [stage, setStage] = useState('typing');
  const waitedRef = useRef({ step: '', ms: 0 });

  const reduceMotion = useReduce();
  const started = useIntroStarted();
  const onScreen = useHeroOnScreen();

  const timing = MOTION.letter;
  const message = LETTER.messages[index];
  const shown = reduceMotion ? message : message.slice(0, typed);
  const finished = shown.length === message.length;
  const swap = reduceMotion ? { duration: 0 } : { duration: 0.72, ease: EASE };

  useEffect(() => {
    if (!started || reduceMotion || !onScreen) return undefined;

    let delay;
    let step;

    if (stage === 'typing' && typed < message.length) {
      const previous = message[typed - 1] ?? '';
      delay = timing.perCharacter + (/[,.]/.test(previous) ? timing.pauseAfterPunctuation : 0);
      step = () => setTyped((count) => count + 1);
    } else if (stage === 'typing') {
      delay = timing.beforeSeal;
      step = () => setStage('pressing');
    } else if (stage === 'pressing') {
      delay = timing.press;
      step = () => setStage('sealing');
    } else {
      delay = timing.sealHold;
      step = () => {
        setIndex((current) => (current + 1) % LETTER.messages.length);
        setTyped(0);
        setStage('typing');
      };
    }

    const key = `${index}:${stage}:${typed}`;
    const waited = waitedRef.current.step === key ? waitedRef.current.ms : 0;
    const begun = performance.now() - waited;
    const timer = window.setTimeout(step, Math.max(0, delay * 1000 - waited));

    return () => {
      waitedRef.current = { step: key, ms: performance.now() - begun };
      window.clearTimeout(timer);
    };
  }, [started, reduceMotion, onScreen, index, stage, typed, message, timing, LETTER.messages.length]);

  return (
    <m.section
      aria-label={LETTER.eyebrow}
      className="ea-pad"
      initial={{ clipPath: 'inset(0% 0% 0% 100%)' }}
      animate={started ? { clipPath: 'inset(-10% -10% 0% -10%)' } : undefined}
      transition={reveal(reduceMotion, MOTION.delays.pad, 1.1)}
    >
      <p className="sr-only">{`${LETTER.greeting} ${LETTER.messages[0]}`}</p>

      <div aria-hidden="true" className="ea-pad-inner">
        <AnimatePresence mode="wait" initial={false}>
          {stage !== 'sealing' ? (
            <m.div
              key={`sheet-${index}`}
              className="ea-letter-sheet"
              initial={{ opacity: 0, transform: 'translateY(24px) rotate(-1.1deg)' }}
              animate={{ opacity: 1, transform: 'translateY(0px) rotate(-1.1deg)' }}
              exit={{ opacity: 0, transform: 'translateY(36px) scale(0.95) rotate(-1.1deg)' }}
              transition={swap}
            >
              <p className="ea-letter-eyebrow">{LETTER.eyebrow}</p>
              <span className={cn('ea-letter-stamp', finished && 'is-ready', stage === 'pressing' && 'is-pressed')}>
                {LETTER.stamp}
              </span>
              <p className="ea-letter-greeting">{LETTER.greeting}</p>
              <p className="ea-letter-field ea-letter-read">
                {shown}
                {stage === 'typing' && !reduceMotion && <span className="ea-letter-caret" />}
              </p>
              <p className="ea-letter-meta">
                {LETTER.counter} {pad(index + 1)} / {pad(LETTER.messages.length)}
              </p>
            </m.div>
          ) : (
            <m.div
              key={`envelope-${index}`}
              className="ea-letter-envelope-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, x: '65%', rotate: 6 }}
              transition={reduceMotion ? { duration: 0 } : { duration: 0.85, ease: [0.6, 0, 0.35, 1] }}
            >
              <p className="ea-letter-eyebrow">
                {LETTER.sealing} · {tomorrowLabel()}
              </p>
              <Envelope date={tomorrowLabel()} />
            </m.div>
          )}
        </AnimatePresence>
      </div>
    </m.section>
  );
};

/* --------------------- 3D Hardcover Case Study Book --------------------- */

const COVER_ART = {
  sunrise: AuthorCoverSunrise,
  lamp: AuthorCoverLamp,
  path: AuthorCoverPath,
  days: AuthorCoverDays,
};

const TURN_SPRING = { stiffness: 160, damping: 20, mass: 0.7 };
const OPEN_SPRING = { stiffness: 90, damping: 17, mass: 0.9 };
const REST = { rotateY: -24, rotateX: 6 };

const FeaturedBook = () => {
  const { BOOK_CARD, BOOKS, MOTION, NAME } = useElias();
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const [cycled, setCycled] = useState(false);
  const [hovered, setHovered] = useState(false);

  const swapRef = useRef(null);
  const shownRef = useRef(null);

  const reduceMotion = useReduce();
  const started = useIntroStarted();
  const onScreen = useHeroOnScreen();
  const finePointer = useMediaQuery(MEDIA.finePointer);

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const peek = useMotionValue(0);
  const openness = useMotionValue(0);
  const springX = useSpring(pointerX, TURN_SPRING);
  const springY = useSpring(pointerY, TURN_SPRING);
  const springPeek = useSpring(peek, TURN_SPRING);
  const springOpen = useSpring(openness, OPEN_SPRING);

  const rotateY = useTransform([springX, springOpen], ([x, o]) => (REST.rotateY + x * MOTION.bookTilt) * (1 - o) + x * 3 * o);
  const rotateX = useTransform(
    [springY, springOpen],
    ([y, o]) => (REST.rotateX - y * MOTION.bookTilt * 0.5) * (1 - o) - y * 2 * o
  );

  const shiftX = useTransform(springOpen, (value) => `${value * 50}%`);
  const scale = useTransform(springOpen, (value) => 1 + value * 0.18);
  const shadowScale = useTransform(springOpen, (value) => 1 + value * 1.1);
  const coverRotate = useTransform([springPeek, springOpen], ([p, o]) => -Math.max(p * MOTION.bookOpen, o * 178));

  const turnActive = finePointer && !reduceMotion;
  const { delays } = MOTION;
  const book = BOOKS[index];
  const CoverArt = COVER_ART[book.art] || AuthorCoverDays;

  const coverStyle = {
    rotateY,
    rotateX,
    x: shiftX,
    scale,
    '--ea-cover': book.colors.cover,
    '--ea-cover-type': book.colors.type,
    '--ea-spine': book.colors.spine,
  };

  const closeBook = useCallback(() => {
    setOpen(false);
    openness.set(0);
  }, [openness]);

  useEffect(() => {
    if (!open) return undefined;
    const handleKey = (event) => {
      if (event.key === 'Escape') closeBook();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [open, closeBook]);

  useEffect(() => {
    return () => {
      if (swapRef.current) window.clearTimeout(swapRef.current);
    };
  }, []);

  const handleClick = () => {
    peek.set(0);

    if (!open) {
      setOpen(true);
      if (reduceMotion) springOpen.jump(1);
      openness.set(1);
      return;
    }

    closeBook();
    if (reduceMotion) springOpen.jump(0);

    swapRef.current = window.setTimeout(
      () => {
        setCycled(true);
        setIndex((current) => (current + 1) % BOOKS.length);
      },
      reduceMotion ? 0 : 620
    );
  };

  useEffect(() => {
    if (!started || hovered || open || reduceMotion || !onScreen) return undefined;

    const shown = shownRef.current?.index === index ? shownRef.current.ms : 0;
    const begun = performance.now() - shown;

    const timer = window.setTimeout(
      () => {
        setCycled(true);
        setIndex((current) => (current + 1) % BOOKS.length);
      },
      Math.max(0, MOTION.bookCycle * 1000 - shown)
    );

    return () => {
      shownRef.current = { index, ms: performance.now() - begun };
      window.clearTimeout(timer);
    };
  }, [started, hovered, open, reduceMotion, onScreen, index, BOOKS.length, MOTION.bookCycle]);

  useEffect(() => {
    shownRef.current = null;
  }, [hovered, open]);

  const handlePointerEnter = () => {
    setHovered(true);
    if (turnActive && !open) peek.set(1);
  };

  const handlePointerMove = (event) => {
    if (!turnActive) return;
    const rect = event.currentTarget.getBoundingClientRect();
    pointerX.set(((event.clientX - rect.left) / rect.width) * 2 - 1);
    pointerY.set(((event.clientY - rect.top) / rect.height) * 2 - 1);
  };

  const handlePointerLeave = () => {
    setHovered(false);
    pointerX.set(0);
    pointerY.set(0);
    peek.set(0);
  };

  return (
    <figure className="ea-book">
      <m.button
        type="button"
        aria-expanded={open}
        aria-label={`${open ? BOOK_CARD.close : BOOK_CARD.open} ${book.title}`}
        className="ea-book-frame block w-full overflow-hidden"
        initial={{ clipPath: 'inset(0% 0% 100% 0%)' }}
        animate={started ? { clipPath: 'inset(0% 0% 0% 0%)' } : undefined}
        transition={reveal(reduceMotion, delays.book, 1.0)}
        onPointerEnter={handlePointerEnter}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        onClick={handleClick}
      >
        <span aria-hidden="true" className="ea-book-stage">
          <m.span className="ea-book-shadow" style={{ scaleX: shadowScale }} />

          <AnimatePresence initial={false}>
            <m.span
              key={index}
              className="ea-book-slot"
              initial={{ transform: 'translateX(100%)' }}
              animate={{ transform: 'translateX(0%)' }}
              exit={{ transform: 'translateX(-100%)' }}
              transition={reduceMotion ? { duration: 0 } : { duration: 0.85, ease: [0.65, 0, 0.35, 1] }}
            >
              <m.span
                className="ea-book-3d"
                style={coverStyle}
                initial={cycled ? false : { y: '18%', opacity: 0 }}
                animate={started ? { y: '0%', opacity: 1 } : undefined}
                transition={reveal(reduceMotion, delays.book + 0.3, 1.0)}
              >
                <span className="ea-book-back" />
                <span className="ea-book-edge" />
                <span className="ea-book-spine">
                  <span>{book.title}</span>
                </span>
                <span className="ea-book-page">
                  <span className="ea-book-page-text">{book.text}</span>
                  <span className="ea-book-folio">{BOOK_CARD.folio}</span>
                </span>
                <span className="ea-book-hinge">
                  <m.span className="ea-book-cover" style={{ rotateY: coverRotate }}>
                    <span className="ea-book-cover-front">
                      <CoverArt className="ea-book-art" />
                      <span className="ea-book-title font-ea-display">
                        {book.coverLines.map((line) => (
                          <span key={line} className="block">
                            {line}
                          </span>
                        ))}
                      </span>
                      <span className="ea-book-byline">
                        <span>{`${NAME.first} ${NAME.last}`.trim()}</span>
                      </span>
                    </span>
                    <span className="ea-book-cover-inside">
                      <span className="ea-book-page-chapter">{book.chapter}</span>
                      <span className="ea-book-inside-title font-ea-display">{book.chapterTitle}</span>
                    </span>
                  </m.span>
                </span>
              </m.span>
            </m.span>
          </AnimatePresence>
        </span>
      </m.button>

      <p className="sr-only" aria-live="polite">
        {open ? `${book.title}. ${book.chapter}: ${book.chapterTitle}. ${book.text}` : ''}
      </p>

      <figcaption className="ea-book-caption flex items-center gap-2.5">
        <m.span
          className="ea-book-label text-ea-ink mr-auto text-[14px] font-semibold whitespace-nowrap truncate"
          initial={{ opacity: 0, transform: 'translateX(-12px)' }}
          animate={started ? { opacity: 1, transform: 'translateX(0px)' } : undefined}
          transition={reveal(reduceMotion, delays.book + 0.4, 0.75)}
        >
          <m.span
            key={index}
            className="block truncate"
            initial={{ opacity: 0, transform: 'translateY(6px)' }}
            animate={{ opacity: 1, transform: 'translateY(0px)' }}
          >
            {book.label}
          </m.span>
        </m.span>
        <m.span
          className="ea-book-topics text-ea-muted text-[12px] font-mono whitespace-nowrap"
          initial={{ opacity: 0 }}
          animate={started ? { opacity: 1 } : undefined}
          transition={reveal(reduceMotion, delays.book + 0.55, 0.75)}
        >
          <m.span
            key={index}
            className="block"
            initial={{ opacity: 0, transform: 'translateY(6px)' }}
            animate={{ opacity: 1, transform: 'translateY(0px)' }}
          >
            {book.topics.map((topic, position) => (
              <Fragment key={topic}>
                {position > 0 && (
                  <span aria-hidden="true" className="text-ea-accent">
                    {' / '}
                  </span>
                )}
                {topic}
              </Fragment>
            ))}
          </m.span>
        </m.span>
        <m.a
          href={BOOK_CARD.href}
          aria-label={`Explore ${book.title}`}
          className="ea-book-arrow relative shrink-0 rounded-full after:absolute after:-inset-2"
          initial={{ transform: 'scale(0) rotate(-90deg)' }}
          animate={started ? { transform: 'scale(1) rotate(0deg)' } : undefined}
          transition={reveal(reduceMotion, delays.book + 0.65, 0.7)}
        >
          <span className="ea-cta-mark ea-cta-diagonal">
            <ArrowUpRightIcon aria-hidden="true" className="ea-cta-arrow ea-cta-arrow-out" strokeWidth={2} />
            <ArrowUpRightIcon aria-hidden="true" className="ea-cta-arrow ea-cta-arrow-in" strokeWidth={2} />
          </span>
        </m.a>
      </figcaption>
    </figure>
  );
};

/* --------------------------- Hero Composition --------------------------- */

const DEPTH_SPRING = { stiffness: 50, damping: 18, mass: 0.9 };
const SPOT_SPRING = { stiffness: 380, damping: 36, mass: 0.6 };

const HeroSection = () => {
  const { BOOKS, IMAGES, LETTER: letter, MOTION, NAME, REDUCED, SHOW_NAVBAR } = useElias();

  const [opened, setOpened] = useState(() => isBootComplete());
  const [spotReady, setSpotReady] = useState(false);
  const [onScreen, setOnScreen] = useState(true);

  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const spotOpenRef = useRef(false);

  const reduceMotion = useReduce();
  const finePointer = useMediaQuery(MEDIA.finePointer);
  const composition = useMediaQuery(MEDIA.composition);
  const mediaReduced = useMediaQuery(MEDIA.reducedMotion);
  const prefersReduced = REDUCED ?? mediaReduced;

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const depthX = useSpring(pointerX, DEPTH_SPRING);
  const depthY = useSpring(pointerY, DEPTH_SPRING);
  const firstX = useTransform(depthX, (value) => value * -MOTION.depth.first);
  const firstY = useTransform(depthY, (value) => value * -MOTION.depth.first * 0.4);
  const lastX = useTransform(depthX, (value) => value * -MOTION.depth.last);
  const lastY = useTransform(depthY, (value) => value * -MOTION.depth.last * 0.3);
  const portraitX = useTransform(depthX, (value) => value * MOTION.depth.portrait);

  const spotX = useMotionValue(0);
  const spotY = useMotionValue(0);
  const spotRadius = useMotionValue(0);
  const spotCentreX = useSpring(spotX, SPOT_SPRING);
  const spotCentreY = useSpring(spotY, SPOT_SPRING);
  const spotXVar = useMotionTemplate`${spotCentreX}px`;
  const spotYVar = useMotionTemplate`${spotCentreY}px`;
  const spotRadiusVar = useMotionTemplate`${spotRadius}px`;

  const { delays, spotlight } = MOTION;
  const depthActive = finePointer && !reduceMotion;
  const spotActive = depthActive && composition && spotReady;
  const started = opened || prefersReduced;
  const cursorActive = finePointer && !prefersReduced;

  const spotStyle = {
    '--ea-spot-x': spotXVar,
    '--ea-spot-y': spotYVar,
    '--ea-spot-r': spotRadiusVar,
  };

  useEffect(() => {
    if (!started) return undefined;
    const timer = window.setTimeout(() => setSpotReady(true), spotlight.readyAfter * 1000);
    return () => window.clearTimeout(timer);
  }, [started, spotlight.readyAfter]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    let visible = true;
    const update = () => setOnScreen(visible && !document.hidden);

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      update();
    });

    observer.observe(section);
    document.addEventListener('visibilitychange', update);

    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', update);
    };
  }, []);

  const handleSplashOpen = useCallback(() => setOpened(true), []);

  const handlePointerMove = (event) => {
    if (!depthActive) return;

    pointerX.set((event.clientX / window.innerWidth) * 2 - 1);
    pointerY.set((event.clientY / window.innerHeight) * 2 - 1);

    if (!spotActive || !canvasRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    if (!spotOpenRef.current) {
      spotOpenRef.current = true;
      if (spotRadius.get() < 1) {
        spotCentreX.jump(x);
        spotCentreY.jump(y);
      }
      animate(spotRadius, spotlight.radius, { duration: 0.55, ease: EASE });
    }

    spotX.set(x);
    spotY.set(y);
  };

  const handlePointerLeave = () => {
    pointerX.set(0);
    pointerY.set(0);
    spotOpenRef.current = false;
    animate(spotRadius, 0, { duration: 0.4, ease: EASE });
  };

  return (
    <section
      ref={sectionRef}
      id="home"
      aria-label={`${NAME.first} ${NAME.last}`}
      className={cn(
        'ea-hero text-ea-ink font-ea-sans relative',
        !SHOW_NAVBAR && 'ea-hero-offset',
        cursorActive && 'ea-has-cursor'
      )}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <AuthorInkFilters />
      {cursorActive && <InkCursor />}
      {!prefersReduced && <InkSplash onOpen={handleSplashOpen} />}

      <IntroContext.Provider value={started}>
        {SHOW_NAVBAR ? <HeroNavbar /> : <div aria-hidden="true" className="h-16 sm:h-20 lg:h-24" />}

        <div className="ea-wrap ea-stage">
          <m.div ref={canvasRef} className="ea-canvas" style={spotStyle}>
            <div className="ea-figure">
              <div className="ea-layer ea-layer-name ea-layer-base">
                <h1 className="ea-name font-ea-display font-black uppercase">
                  <span className="sr-only">{`${NAME.first} ${NAME.last}`}</span>

                  <m.span className="ea-name-first text-ea-accent" style={{ x: firstX, y: firstY }}>
                    <MaskedWord text={NAME.first} delay={delays.first} from="below" />
                  </m.span>
                  <m.span className="ea-name-last text-ea-ink" style={{ x: lastX, y: lastY }}>
                    <MaskedWord text={NAME.last} delay={delays.last} from="above" reverse />
                  </m.span>
                </h1>
              </div>

              {spotActive && (
                <div aria-hidden="true" className="ea-layer ea-layer-name ea-layer-ink">
                  <div className="ea-name font-ea-display font-black uppercase">
                    <m.span className="ea-name-first ea-ink-first" style={{ x: firstX, y: firstY }}>
                      {NAME.first}
                    </m.span>
                    <m.span className="ea-name-last ea-ink-last" style={{ x: lastX, y: lastY }}>
                      {NAME.last}
                    </m.span>
                  </div>
                </div>
              )}

              <div className="ea-layer ea-layer-portrait ea-layer-base">
                {IMAGES.portrait && (
                  <m.img
                    src={IMAGES.portrait.src}
                    alt={IMAGES.portrait.alt}
                    width={IMAGES.portrait.width}
                    height={IMAGES.portrait.height}
                    fetchPriority="high"
                    decoding="async"
                    className="ea-portrait origin-bottom"
                    style={{ x: portraitX }}
                    initial={{ clipPath: 'inset(100% 0% 0% 0%)', scale: 1.05 }}
                    animate={started ? { clipPath: 'inset(0% 0% 0% 0%)', scale: 1 } : undefined}
                    transition={reveal(reduceMotion, delays.portrait, 1.25)}
                  />
                )}
              </div>

              {spotActive && IMAGES.portrait && (
                <div aria-hidden="true" className="ea-layer ea-layer-portrait ea-layer-ink">
                  <m.img
                    src={IMAGES.portrait.src}
                    alt=""
                    width={IMAGES.portrait.width}
                    height={IMAGES.portrait.height}
                    decoding="async"
                    className="ea-portrait ea-ink-portrait"
                    style={{ x: portraitX }}
                  />
                </div>
              )}
            </div>

            <AuthorIntro />
            <OnScreenContext.Provider value={onScreen}>
              {letter.messages.length > 0 && <TomorrowLetter />}
              {BOOKS.length > 0 && <FeaturedBook />}
            </OnScreenContext.Provider>
            <SocialLinks />
          </m.div>
        </div>
      </IntroContext.Provider>
    </section>
  );
};

/* ----------------------------- Styles & Root ----------------------------- */

const FILL = { width: '100%' };

const BLOCK_CSS = `
[data-slot='elias'],
.ea-hero {
  --color-ea-page: transparent;
  --color-ea-accent: #00bfff;
  --color-ea-ink: #f1f5f9;
  --color-ea-muted: #94a3b8;
  --color-ea-paper: rgba(14, 21, 35, 0.78);

  --font-ea-display: 'Inter', 'Geist Variable', ui-sans-serif, system-ui, sans-serif;
  --font-ea-sans: 'Figtree', 'Geist Variable', ui-sans-serif, system-ui, sans-serif;
  --font-ea-mono: 'IBM Plex Mono', ui-monospace, 'Courier New', monospace;
}

@layer utilities {
  .bg-ea-page {
    background-color: var(--color-ea-page);
  }
  .bg-ea-ink {
    background-color: var(--color-ea-ink);
  }
  .bg-ea-accent {
    background-color: var(--color-ea-accent);
  }
  .text-ea-page {
    color: #05070c;
  }
  .text-ea-ink {
    color: var(--color-ea-ink);
  }
  .text-ea-accent {
    color: var(--color-ea-accent);
  }
  .text-ea-muted {
    color: var(--color-ea-muted);
  }
  .border-ea-accent {
    border-color: var(--color-ea-accent);
  }
  .font-ea-display {
    font-family: var(--font-ea-display);
  }
  .font-ea-sans {
    font-family: var(--font-ea-sans);
  }
  .font-ea-mono {
    font-family: var(--font-ea-mono);
  }
}

.ea-hero {
  --ea-gutter: 16px;
  --ea-nav-h: 84px;
  --ea-w: min(100cqw - 2 * var(--ea-gutter), 1440px);
  container-type: inline-size;
  min-height: 100svh;
  overflow: clip;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}

@media (min-width: 640px) {
  .ea-hero {
    --ea-gutter: 24px;
  }
}

@media (min-width: 1024px) {
  .ea-hero {
    --ea-gutter: 40px;
  }
}

.ea-wrap {
  width: var(--ea-w);
  margin-inline: auto;
}

/* Optional internal navbar styles */
.ea-nav {
  container-type: inline-size;
  display: grid;
  grid-template-columns: repeat(4, auto);
  justify-content: space-between;
  align-items: center;
  row-gap: 6px;
  padding-block: 14px 6px;
}

.ea-nav-logo {
  grid-row: 1;
  grid-column: 1 / -1;
  justify-self: center;
  font-size: 28px;
}

.ea-nav-cta {
  grid-row: 1;
  grid-column: 1 / -1;
  justify-self: end;
}

.ea-nav-left,
.ea-nav-right {
  display: contents;
  white-space: nowrap;
}

.ea-nav-left > li,
.ea-nav-right > li {
  grid-row: 2;
}

.ea-nav-status {
  display: none;
}

.ea-roll {
  position: relative;
  display: inline-block;
  overflow: hidden;
  line-height: 1.25;
}

.ea-roll > span {
  display: block;
  transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

.ea-roll > span + span {
  position: absolute;
  inset: 0;
  transform: translateY(100%);
}

@media (hover: hover) {
  .ea-nav-link:hover .ea-roll > span:first-child {
    transform: translateY(-100%);
  }
  .ea-nav-link:hover .ea-roll > span + span {
    transform: translateY(0);
  }
}

.ea-nav-link {
  font-size: clamp(12px, 3.4vw, 13px);
  letter-spacing: 0.06em;
}

/* CTA Pill */
.ea-cta {
  --ea-cta-mark: 34px;
  position: relative;
  isolation: isolate;
  display: inline-flex;
  align-items: center;
  gap: 14px;
  height: 44px;
  padding-inline: 20px 5px;
  overflow: hidden;
  border: 1px solid rgba(0, 191, 255, 0.35);
  border-radius: 999px;
  color: var(--color-ea-ink);
  font-size: 12.5px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  white-space: nowrap;
  transition: color 0.4s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.ea-cta::before {
  content: '';
  position: absolute;
  z-index: -1;
  top: 50%;
  right: calc(5px + var(--ea-cta-mark) / 2);
  width: var(--ea-cta-mark);
  height: var(--ea-cta-mark);
  margin: calc(var(--ea-cta-mark) / -2) calc(var(--ea-cta-mark) / -2) 0 0;
  border-radius: 50%;
  background: var(--color-ea-accent);
  transform: scale(0);
  transition: transform 0.65s cubic-bezier(0.16, 1, 0.3, 1);
}

.ea-cta-mark {
  position: relative;
  display: grid;
  place-items: center;
  width: var(--ea-cta-mark);
  height: var(--ea-cta-mark);
  overflow: hidden;
  border-radius: 50%;
  background: var(--color-ea-accent);
  color: #05070c;
  box-shadow: 0 0 14px rgba(0, 191, 255, 0.45);
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.ea-cta-arrow {
  position: absolute;
  width: 44%;
  height: 44%;
  transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

.ea-cta-arrow-in {
  transform: translateX(-160%);
}

.ea-cta-diagonal .ea-cta-arrow-in {
  transform: translate(-160%, 160%);
}

@media (hover: hover) {
  .ea-cta:not(:disabled):hover {
    border-color: var(--color-ea-accent);
    color: #05070c;
  }
  .ea-cta:not(:disabled):hover::before {
    transform: scale(14);
  }
  .ea-cta:not(:disabled):hover .ea-cta-mark {
    transform: scale(1.06);
  }
  .ea-cta:not(:disabled):hover .ea-cta-arrow-out {
    transform: translateX(160%);
  }
  .ea-cta-diagonal:not(:disabled):hover .ea-cta-arrow-out {
    transform: translate(160%, -160%);
  }
  .ea-cta:not(:disabled):hover .ea-cta-arrow-in {
    transform: translate(0, 0);
  }
}

/* Mobile & Tablet stacked editorial layout */
.ea-stage {
  padding-block: 12px 44px;
}

.ea-canvas {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  grid-template-areas:
    'figure'
    'intro'
    'book'
    'pad'
    'socials';
  row-gap: 32px;
}

.ea-figure {
  grid-area: figure;
  position: relative;
  container-type: inline-size;
  min-height: 76cqw;
}

.ea-layer {
  display: contents;
}

.ea-ink-first,
.ea-ink-last {
  color: var(--color-ea-accent);
  filter: url(#ea-ink-outline);
}

.ea-ink-last {
  color: var(--color-ea-ink);
}

.ea-ink-portrait {
  filter: url(#ea-ink-duotone);
}

.ea-name {
  --ea-mask-top: 0.02em;
  --ea-mask-bottom: 0.02em;
  position: relative;
  display: flex;
  flex-direction: column;
  line-height: 0.86;
}

.ea-name-first,
.ea-name-last {
  letter-spacing: 0.015em;
}

.ea-name-first {
  text-shadow: 0 0 36px rgba(0, 191, 255, 0.28);
  font-size: 18.8cqw;
  margin-left: -0.03em;
}

.ea-name-last {
  align-self: flex-end;
  font-size: 15.8cqw;
  margin-right: -0.04em;
}

.ea-letter-mask {
  clip-path: inset(var(--ea-mask-top) -0.25em var(--ea-mask-bottom) -0.25em);
}

/* Subtle cyber pedestal behind portrait on mobile/tablet */
.ea-figure::after {
  content: '';
  display: block;
  width: 72cqw;
  height: 58cqw;
  margin: 4cqw auto 0;
  border-radius: 20px 20px 0 0;
  background: linear-gradient(180deg, rgba(0, 191, 255, 0.1) 0%, rgba(12, 18, 30, 0.85) 100%);
  border: 1px solid rgba(0, 191, 255, 0.2);
  border-bottom: 0;
}

.ea-portrait {
  position: absolute;
  z-index: 2;
  bottom: 0;
  left: 50%;
  translate: -50% 0;
  height: 82%;
  width: auto;
  max-width: none;
  object-fit: contain;
  filter: drop-shadow(0 16px 36px rgba(0, 0, 0, 0.75)) drop-shadow(0 0 24px rgba(0, 191, 255, 0.14));
}

.ea-intro {
  grid-area: intro;
}

.ea-intro-roles {
  display: flex;
  flex-wrap: wrap;
  gap: 0.65em;
  font-size: 11px;
  letter-spacing: 0.18em;
  margin-bottom: 12px;
}

.ea-intro-headline {
  font-size: 22px;
  line-height: 1.18;
  letter-spacing: -0.01em;
  margin-bottom: 18px;
}

.ea-intro-rule {
  width: 52px;
  height: 2px;
  margin-bottom: 18px;
}

.ea-intro-description {
  max-width: 340px;
  font-size: 14.5px;
  line-height: 1.6;
}

.ea-book {
  grid-area: book;
}

.ea-book-frame {
  position: relative;
  aspect-ratio: 324 / 207;
  border-radius: 16px;
  background: var(--color-ea-paper);
  border: 1px solid rgba(0, 191, 255, 0.18);
  backdrop-filter: blur(16px);
  box-shadow: 0 18px 40px -18px rgba(0, 0, 0, 0.7);
  container-type: size;
}

.ea-book-caption {
  margin-top: 10px;
}

.ea-socials {
  grid-area: socials;
}

@media (min-width: 640px) {
  .ea-canvas {
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    grid-template-areas:
      'figure figure'
      'intro book'
      'pad pad'
      'socials socials';
    column-gap: 28px;
  }

  .ea-figure {
    min-height: 58cqw;
  }

  .ea-figure::after {
    width: 54cqw;
    height: 44cqw;
  }

  .ea-portrait {
    height: 88%;
  }
}

/* Self-Writing Engineering Log Pad (Cyber-Dark Blueprint Sheet) */
.ea-pad {
  grid-area: pad;
  position: relative;
}

.ea-pad-inner {
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 290px;
}

.ea-letter-sheet,
.ea-letter-envelope-view {
  position: relative;
  display: flex;
  flex: 1;
  flex-direction: column;
}

.ea-letter-sheet {
  padding: 22px 20px 16px;
  border-radius: 14px;
  background: linear-gradient(165deg, rgba(14, 22, 38, 0.94) 0%, rgba(9, 14, 24, 0.96) 100%);
  border: 1px solid rgba(0, 191, 255, 0.22);
  box-shadow: 0 20px 44px -18px rgba(0, 0, 0, 0.8), inset 0 1px 0 rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(16px);
}

.ea-letter-eyebrow {
  padding-right: 72px;
  color: var(--color-ea-accent);
  font-family: var(--font-ea-mono);
  font-size: 10.5px;
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
}

.ea-letter-stamp {
  position: absolute;
  top: 12px;
  right: 12px;
  display: grid;
  place-items: center;
  width: 68px;
  height: 68px;
  padding: 0 0 0 0.12em;
  border: 1.5px solid var(--color-ea-accent);
  border-radius: 50%;
  color: var(--color-ea-accent);
  font-size: 9.5px;
  font-weight: 700;
  line-height: 1.25;
  text-align: center;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  opacity: 0.38;
  transform: rotate(12deg);
  transition: transform 0.45s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.3s, color 0.3s, opacity 0.4s;
}

.ea-letter-stamp.is-ready {
  opacity: 1;
  box-shadow: 0 0 16px rgba(0, 191, 255, 0.3);
}

.ea-letter-stamp.is-pressed {
  background: var(--color-ea-accent);
  color: #04070d;
  transform: rotate(0deg) scale(0.88);
}

.ea-letter-greeting {
  display: block;
  margin-top: 16px;
  color: #7dd3fc;
  font-family: var(--font-ea-mono);
  font-size: 14px;
}

.ea-letter-field {
  flex: 1;
  width: 100%;
  min-height: 76px;
  margin-top: 6px;
  color: #e2e8f0;
  font-family: var(--font-ea-mono);
  font-size: 14.5px;
  line-height: 1.62;
}

.ea-letter-read {
  white-space: pre-wrap;
}

.ea-letter-caret {
  display: inline-block;
  width: 0.55em;
  height: 1.08em;
  margin-left: 3px;
  background: var(--color-ea-accent);
  box-shadow: 0 0 8px rgba(0, 191, 255, 0.8);
  vertical-align: -0.18em;
  animation: ea-caret 1s steps(2, jump-none) infinite;
}

@keyframes ea-caret {
  50% { opacity: 0; }
}

.ea-letter-meta {
  margin-top: auto;
  padding-top: 10px;
  color: var(--color-ea-muted);
  font-family: var(--font-ea-mono);
  font-size: 10.5px;
  font-weight: 500;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}

.ea-letter-envelope-view {
  align-items: center;
  justify-content: center;
  gap: 16px;
  text-align: center;
}

.ea-letter-envelope-view .ea-letter-eyebrow {
  padding-right: 0;
}

/* Dark Cyber Envelope & Cyan Wax Seal */
.ea-envelope {
  position: relative;
  display: block;
  width: min(100%, 290px);
  aspect-ratio: 1.62;
  border-radius: 8px;
  background: #0d1729;
  border: 1px solid rgba(0, 191, 255, 0.25);
  box-shadow: 0 22px 40px -20px rgba(0, 0, 0, 0.85), 0 0 24px rgba(0, 191, 255, 0.1);
  container-type: inline-size;
  perspective: 900px;
}

.ea-envelope > span {
  position: absolute;
}

.ea-envelope-letter {
  inset: 6% 7% auto;
  height: 86%;
  border-radius: 4px;
  background:
    repeating-linear-gradient(to bottom, transparent 0 9cqw, rgba(0, 191, 255, 0.22) 9cqw 9.6cqw) 12% 22% / 62% 40%
      no-repeat,
    #111d33;
  border: 1px solid rgba(0, 191, 255, 0.2);
}

.ea-envelope-side {
  inset: 0;
  border-radius: 8px;
  background: #101c31;
}

.ea-envelope-left {
  clip-path: polygon(0 0, 52% 56%, 0 100%);
}

.ea-envelope-right {
  clip-path: polygon(100% 0, 48% 56%, 100% 100%);
}

.ea-envelope-bottom {
  inset: 0;
  border-radius: 8px;
  background: #14233d;
  clip-path: polygon(0 100%, 50% 47%, 100% 100%);
}

.ea-envelope-flap {
  inset: 0 0 auto;
  height: 60%;
  filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.45));
  transform-origin: top center;
}

.ea-envelope-flap-shape {
  position: absolute;
  inset: 0;
  border-radius: 8px 8px 0 0;
  background: linear-gradient(to bottom, #182b49, #101e36);
  clip-path: polygon(0 0, 100% 0, 50% 100%);
}

.ea-wax-seal {
  top: 60%;
  left: 50%;
  display: grid;
  place-items: center;
  width: 17cqw;
  aspect-ratio: 1;
  margin: -8.5cqw 0 0 -8.5cqw;
  border-radius: 50%;
  background: radial-gradient(circle at 35% 30%, #67e8f9, #00bfff 55%, #0369a1);
  box-shadow: 0 0 18px rgba(0, 191, 255, 0.65), inset 0 0 0 0.9cqw rgba(255, 255, 255, 0.3);
  color: #04070d;
  font-size: 6.8cqw;
  font-weight: 900;
  line-height: 1;
}

.ea-postmark {
  right: 7%;
  bottom: 9%;
  display: grid;
  place-items: center;
  align-content: center;
  width: 23cqw;
  aspect-ratio: 1;
  border: 0.5cqw solid var(--color-ea-accent);
  border-radius: 50%;
  color: var(--color-ea-accent);
  font-size: 2.5cqw;
  font-weight: 700;
  line-height: 1.35;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  opacity: 0.88;
}

.ea-postmark::before {
  content: '';
  position: absolute;
  inset: 7%;
  border: 0.25cqw solid currentColor;
  border-radius: 50%;
}

.ea-postmark-date {
  font-family: var(--font-ea-mono);
  font-weight: 400;
  letter-spacing: 0.04em;
}

/* Wide Desktop Editorial Composition (>= 1024px) */
@media (min-width: 1024px) and (min-aspect-ratio: 5/4) {
  .ea-hero {
    display: grid;
    grid-template-rows: auto 1fr;
  }

  .ea-stage {
    position: relative;
    min-height: calc(var(--ea-w) * 635 / 1600 + 44px);
    padding: 0;
  }

  .ea-canvas {
    --ea-u: max(min(100cqw / 1280, (100cqh - 36px) / 635), 100cqw / 1600);
    --ea-slack: max(0px, 100cqh - 685 * var(--ea-u));
    --ea-head: calc(42 * var(--ea-u));
    --ea-portrait-max: max(600 * var(--ea-u), 510px);
    --ea-portrait-left: calc(275 * var(--ea-u));
    --ea-top: max(12 * var(--ea-u) + var(--ea-slack) * 0.14, 100cqh - var(--ea-portrait-max) - var(--ea-head));
    --ea-portrait-h: min(100cqh - var(--ea-top) - var(--ea-head), var(--ea-portrait-max));
    --ea-last-top: calc(var(--ea-top) + 198 * var(--ea-u));
    --ea-last-base: calc(var(--ea-top) + 340 * var(--ea-u));
    position: absolute;
    inset: 0;
    display: block;
    container-type: size;
  }

  .ea-figure {
    display: contents;
  }

  .ea-layer {
    position: absolute;
    inset: 0;
    display: block;
    pointer-events: none;
  }

  .ea-layer-name {
    z-index: 0;
  }

  .ea-layer-portrait {
    z-index: 2;
  }

  .ea-layer-base {
    --ea-spot: radial-gradient(
      circle var(--ea-spot-r, 0px) at var(--ea-spot-x, 0px) var(--ea-spot-y, 0px),
      transparent calc(var(--ea-spot-r, 0px) - 1px),
      #000 calc(var(--ea-spot-r, 0px) + 1px)
    );
    mask-image: var(--ea-spot);
    -webkit-mask-image: var(--ea-spot);
  }

  .ea-layer-ink {
    --ea-spot: radial-gradient(
      circle var(--ea-spot-r, 0px) at var(--ea-spot-x, 0px) var(--ea-spot-y, 0px),
      #000 calc(var(--ea-spot-r, 0px) + 1px),
      transparent calc(var(--ea-spot-r, 0px) + 2px)
    );
    mask-image: var(--ea-spot);
    -webkit-mask-image: var(--ea-spot);
  }

  .ea-name {
    --ea-mask-top: 0.115em;
    --ea-mask-bottom: 0.115em;
    position: static;
    display: block;
    line-height: 1;
  }

  .ea-name-first,
  .ea-name-last {
    position: absolute;
    white-space: nowrap;
  }

  /* Tuned for 7-letter RENALDY and 8-letter SYAPUTRA */
  .ea-name-first {
    top: calc(var(--ea-top) - 0.12em);
    left: -0.03em;
    margin: 0;
    font-size: calc(198 * var(--ea-u));
  }

  .ea-name-last {
    top: calc(var(--ea-last-top) - 0.12em);
    right: -0.04em;
    margin: 0;
    font-size: calc(164 * var(--ea-u));
  }

  .ea-figure::after {
    display: none;
  }

  .ea-portrait {
    z-index: 2;
    top: auto;
    bottom: 0;
    left: var(--ea-portrait-left);
    translate: none;
    height: var(--ea-portrait-h);
    width: auto;
  }

  .ea-pad {
    position: absolute;
    z-index: 3;
    top: calc(var(--ea-last-base) + 18 * var(--ea-u));
    right: 0;
    width: calc(430 * var(--ea-u));
    height: calc(100% - var(--ea-last-base) - 18 * var(--ea-u));
  }

  .ea-pad-inner {
    min-height: 0;
    padding: calc(6 * var(--ea-u)) 0 0 0;
  }

  .ea-letter-sheet {
    padding: calc(20 * var(--ea-u)) calc(22 * var(--ea-u)) calc(16 * var(--ea-u));
    border-radius: 14px 14px 0 0;
    border-bottom: 0;
  }

  .ea-letter-eyebrow,
  .ea-letter-meta {
    font-size: max(10px, 10.5 * var(--ea-u));
  }

  .ea-letter-stamp {
    top: calc(12 * var(--ea-u));
    right: calc(14 * var(--ea-u));
    width: max(58px, 68 * var(--ea-u));
    height: max(58px, 68 * var(--ea-u));
    font-size: max(8.5px, 9.5 * var(--ea-u));
  }

  .ea-letter-greeting {
    margin-top: calc(14 * var(--ea-u));
    font-size: max(12.5px, 14 * var(--ea-u));
  }

  .ea-letter-field {
    min-height: 0;
    font-size: max(12.5px, 14.5 * var(--ea-u));
  }

  .ea-envelope {
    width: min(100%, 290 * var(--ea-u));
  }

  .ea-intro {
    position: absolute;
    z-index: 3;
    top: calc(var(--ea-last-top) + 26 * var(--ea-u));
    left: 0;
    width: calc(285 * var(--ea-u));
  }

  .ea-intro-roles {
    gap: 0.38em 0.5em;
    font-size: max(9.5px, 10.5 * var(--ea-u));
    letter-spacing: 0.14em;
    margin-bottom: calc(14 * var(--ea-u));
  }

  .ea-intro-headline {
    font-size: max(18px, 23 * var(--ea-u));
    line-height: 1.15;
    margin-bottom: calc(18 * var(--ea-u));
  }

  .ea-intro-rule {
    width: calc(48 * var(--ea-u));
    margin-bottom: calc(16 * var(--ea-u));
  }

  .ea-intro-description {
    max-width: calc(275 * var(--ea-u));
    font-size: max(13px, 14 * var(--ea-u));
    line-height: 1.55;
  }

  .ea-book {
    position: absolute;
    z-index: 3;
    top: var(--ea-top);
    right: 0;
    width: calc(336 * var(--ea-u));
  }

  .ea-book-frame {
    border-radius: calc(14 * var(--ea-u));
    height: calc(186 * var(--ea-u));
    aspect-ratio: auto;
  }

  .ea-book-caption {
    gap: calc(8 * var(--ea-u));
    margin-top: calc(8 * var(--ea-u));
  }

  .ea-book-label {
    font-size: max(12px, 13.5 * var(--ea-u));
  }

  .ea-book-topics {
    font-size: max(10.5px, 11.5 * var(--ea-u));
  }

  .ea-socials {
    position: absolute;
    z-index: 3;
    font-size: max(12px, 12.5 * var(--ea-u));
    bottom: calc(22 * var(--ea-u));
    left: 0;
  }
}

.ea-link {
  position: relative;
}

.ea-book-arrow .ea-cta-mark {
  --ea-cta-mark: clamp(22px, 28 * var(--ea-u, 1px), 28px);
}

@media (hover: hover) {
  .ea-link::after {
    content: '';
    position: absolute;
    inset-inline: 0;
    bottom: 2px;
    height: 1px;
    background: var(--color-ea-accent);
    transform: scaleX(0);
    transform-origin: right;
    transition: transform 0.45s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .ea-link:hover::after {
    transform: scaleX(1);
    transform-origin: left;
  }
  .ea-book:hover .ea-book-arrow .ea-cta-arrow-out {
    transform: translate(160%, -160%);
  }
  .ea-book:hover .ea-book-arrow .ea-cta-arrow-in {
    transform: translate(0, 0);
  }
}

.ea-splash-name {
  width: min(90vw, 130svh);
  max-height: 70%;
  height: auto;
  overflow: visible;
}

@media (prefers-reduced-motion: reduce) {
  .ea-splash {
    display: none;
  }
}

.ea-has-cursor,
.ea-has-cursor * {
  cursor: none;
}

/* 3D Hardcover Book Internals */
.ea-book-slot {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  transform-style: preserve-3d;
}

.ea-book-stage {
  position: absolute;
  inset: 0;
  text-align: left;
  display: grid;
  place-items: center;
  perspective: 900px;
}

.ea-book-shadow {
  position: absolute;
  bottom: 8cqh;
  width: 48cqh;
  height: 8cqh;
  border-radius: 50%;
  background: radial-gradient(closest-side, rgba(0, 191, 255, 0.28), transparent);
  filter: blur(6px);
}

.ea-book-3d {
  --ea-book-depth: 9cqh;
  position: relative;
  display: block;
  height: 74cqh;
  aspect-ratio: 0.72;
  transform-style: preserve-3d;
}

.ea-book-3d > span {
  position: absolute;
}

.ea-book-back {
  display: block;
  inset: 0;
  border-radius: 2px 5px 5px 2px;
  background: #060b14;
  transform: translateZ(calc(var(--ea-book-depth) / -2));
}

.ea-book-edge {
  display: block;
  top: 2%;
  right: 0;
  width: var(--ea-book-depth);
  height: 96%;
  background: repeating-linear-gradient(to right, #cbd5e1 0 1.5px, #94a3b8 1.5px 2.5px);
  transform: translateX(50%) rotateY(90deg);
}

.ea-book-spine {
  top: 0;
  left: 0;
  width: var(--ea-book-depth);
  height: 100%;
  display: grid;
  place-items: center;
  overflow: hidden;
  background: var(--ea-spine, var(--color-ea-accent));
  transform: translateX(-50%) rotateY(-90deg);
}

.ea-book-spine > span {
  color: #04070d;
  font-size: 3.3cqh;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  white-space: nowrap;
  transform: rotate(90deg);
}

.ea-book-page {
  inset: 2% 3% 2% 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 2.5cqh;
  padding: 0 10% 0 14%;
  background: linear-gradient(to right, rgba(0, 0, 0, 0.35), transparent 16%), #0e1729;
  border: 1px solid rgba(0, 191, 255, 0.25);
  transform: translateZ(calc(var(--ea-book-depth) / 2 - 2px));
}

.ea-book-page-chapter {
  color: var(--color-ea-accent);
  font-family: var(--font-ea-mono);
  font-size: 2.9cqh;
  font-weight: 600;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

.ea-book-page-text {
  color: #e2e8f0;
  font-size: 3.6cqh;
  line-height: 1.48;
}

.ea-book-folio {
  position: absolute;
  bottom: 6%;
  left: 0;
  right: 0;
  color: var(--color-ea-muted);
  font-family: var(--font-ea-mono);
  font-size: 2.8cqh;
  text-align: center;
}

.ea-book-hinge {
  inset: 0;
  transform: translateZ(calc(var(--ea-book-depth) / 2));
  transform-style: preserve-3d;
}

.ea-book-cover {
  position: absolute;
  inset: 0;
  transform-origin: left center;
  transform-style: preserve-3d;
}

.ea-book-cover-front,
.ea-book-cover-inside {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  backface-visibility: hidden;
}

.ea-book-cover-front {
  justify-content: space-between;
  padding: 11% 10% 9%;
  border-radius: 2px 5px 5px 2px;
  overflow: hidden;
  background: var(--ea-cover, #0d1b2e);
  color: var(--ea-cover-type, #f8fafc);
  border: 1px solid rgba(0, 191, 255, 0.35);
  box-shadow: inset 3px 0 0 rgba(0, 191, 255, 0.35);
}

.ea-book-cover-inside {
  justify-content: center;
  gap: 2.5cqh;
  padding: 0 12%;
  border-radius: 5px 2px 2px 5px;
  background: linear-gradient(to left, rgba(0, 0, 0, 0.35), transparent 16%), #0b1322;
  border: 1px solid rgba(0, 191, 255, 0.25);
  transform: rotateY(180deg);
}

.ea-book-inside-title {
  color: #f8fafc;
  font-size: 7.4cqh;
  font-weight: 900;
  line-height: 0.96;
  letter-spacing: -0.02em;
  text-transform: uppercase;
}

.ea-book-title {
  font-size: 8.8cqh;
  font-weight: 900;
  line-height: 0.94;
  letter-spacing: -0.02em;
  text-transform: uppercase;
}

.ea-book-byline {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  font-family: var(--font-ea-mono);
  font-size: 2.6cqh;
  font-weight: 600;
  letter-spacing: 0.18em;
  color: var(--color-ea-accent);
  text-transform: uppercase;
}

.ea-book-art {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  border-radius: inherit;
}

.ea-book-title,
.ea-book-byline {
  position: relative;
}

@keyframes ea-breathe {
  0% { opacity: 0.55; transform: scale(1); }
  70%, 100% { opacity: 0; transform: scale(3); }
}

@media (prefers-reduced-motion: reduce) {
  .ea-nav-status-dot::after,
  .ea-letter-caret {
    animation: none;
  }
}
`;

const Elias = ({
  brand = { name: '', href: '#' },
  navLinks = { left: [], right: [] },
  navCta,
  navStatus = { label: '', detail: '' },
  showNavbar = false,
  name = { first: '', last: '' },
  intro = { roles: [], headline: [], description: '' },
  ctas = [],
  portrait,
  books = [],
  bookCard = { href: '#projects', open: 'Open case study', close: 'Close and next project', folio: '01' },
  letter,
  socialLinks = [],
  motion,
  splash,
  reducedMotion,
  className,
}) => {
  const value = {
    BRAND: brand,
    NAV_LINKS: navLinks,
    NAV_CTA: navCta,
    NAV_STATUS: navStatus,
    SHOW_NAVBAR: showNavbar,
    NAME: name,
    INTRO: intro,
    CTAS: ctas,
    IMAGES: { portrait },
    BOOKS: books,
    BOOK_CARD: bookCard,
    LETTER: letter ?? EMPTY_LETTER,
    SOCIAL_LINKS: socialLinks,
    MOTION: {
      ...DEFAULT_MOTION,
      ...motion,
      delays: { ...DEFAULT_MOTION.delays, ...motion?.delays },
      depth: { ...DEFAULT_MOTION.depth, ...motion?.depth },
      letter: { ...DEFAULT_MOTION.letter, ...motion?.letter },
      spotlight: { ...DEFAULT_MOTION.spotlight, ...motion?.spotlight },
      cursor: { ...DEFAULT_MOTION.cursor, ...motion?.cursor },
    },
    SPLASH: { ...DEFAULT_SPLASH, ...splash },
    REDUCED: reducedMotion,
  };

  return (
    <EliasContext.Provider value={value}>
      <LazyMotion features={domAnimation}>
        <style>{BLOCK_CSS}</style>
        <div data-slot="elias" className={cn('bg-ea-page', className)} style={FILL}>
          <HeroSection />
        </div>
      </LazyMotion>
    </EliasContext.Provider>
  );
};

export { Elias };
export default Elias;
