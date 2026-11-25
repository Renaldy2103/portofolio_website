import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { scrollToTarget, lockScroll, unlockScroll } from '../lib/smoothScroll';

const HOME_NAV_ITEMS = [
  { id: 'home', label: 'Home', href: '#home' },
  { id: 'about', label: 'About', href: '#about' },
  { id: 'journey', label: 'Experience', href: '#journey' },
  { id: 'projects', label: 'Work', href: '#projects' },
  { id: 'certificates', label: 'Certificates', href: '#certificates' },
  { id: 'contact', label: 'Contact', href: '#contact' },
];

const SUBPAGE_NAV_ITEMS = [
  { id: 'home', label: 'Home', to: '/' },
  { id: 'about', label: 'About', to: '/#about' },
  { id: 'journey', label: 'Experience', to: '/#journey' },
  { id: 'projects', label: 'Work', to: '/projects' },
  { id: 'certificates', label: 'Certificates', to: '/certificates' },
  { id: 'contact', label: 'Contact', to: '/#contact' },
];

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setIsScrolled(y > 36);

      const docHeight =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;
      setScrollProgress(docHeight > 0 ? Math.min(1, Math.max(0, y / docHeight)) : 0);

      if (isHome) {
        const sections = document.querySelectorAll('section[id]');
        let current = 'home';

        sections.forEach((section) => {
          const rect = section.getBoundingClientRect();
          if (rect.top <= 180) {
            current = section.getAttribute('id') || current;
          }
        });

        // Map #tech-stack into 'about' so pill remains visible through intro/skills
        if (current === 'tech-stack') current = 'about';
        setActiveSection(y < 100 ? 'home' : current);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHome]);

  useEffect(() => {
    if (!isMenuOpen) return undefined;
    lockScroll();
    const onKey = (e) => {
      if (e.key === 'Escape') setIsMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      unlockScroll();
      window.removeEventListener('keydown', onKey);
    };
  }, [isMenuOpen]);

  const resolvedActiveId = isHome
    ? activeSection
    : location.pathname === '/projects'
      ? 'projects'
      : location.pathname === '/certificates'
        ? 'certificates'
        : 'home';

  const items = isHome ? HOME_NAV_ITEMS : SUBPAGE_NAV_ITEMS;

  return (
    <>
      {/* Skip to content link for keyboard accessibility */}
      <a
        href={isHome ? '#about' : '#main-content'}
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[120] focus:bg-[#00bfff] focus:text-black focus:px-4 focus:py-2 focus:rounded-full focus:font-bold focus:text-xs"
      >
        Skip to content
      </a>

      <header className="fixed top-0 inset-x-0 z-50 px-3 sm:px-6 pt-3 sm:pt-4 pointer-events-none">
        <div
          className={`pointer-events-auto relative max-w-6xl mx-auto rounded-full transition-all duration-500 ${
            isScrolled
              ? 'bg-[#070b14]/82 backdrop-blur-2xl border border-white/12 shadow-[0_14px_44px_-10px_rgba(0,0,0,0.85),0_0_24px_rgba(0,191,255,0.09)] px-3.5 sm:px-5 py-2'
              : 'bg-[#090d16]/55 backdrop-blur-xl border border-white/[0.08] shadow-[0_8px_30px_rgba(0,0,0,0.45)] px-4 sm:px-6 py-2.5 sm:py-3'
          }`}
        >
          {/* Top specular highlight */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-[#00bfff]/45 to-transparent"
          />

          {/* Subtle bottom scroll progress laser line */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-8 bottom-0 h-[1.5px] overflow-hidden rounded-full"
          >
            <div
              className="h-full bg-gradient-to-r from-transparent via-[#00bfff] to-[#67e8f9] origin-left transition-transform duration-150 ease-out"
              style={{
                transform: `scaleX(${scrollProgress})`,
                opacity: isScrolled ? 0.85 : 0,
              }}
            />
          </div>

          <nav aria-label="Primary Navigation" className="flex items-center justify-between gap-3">
            {/* Brand Logo + Live Status */}
            <div className="flex items-center gap-3 shrink-0">
              <Link
                to="/"
                onClick={(e) => {
                  if (isHome) {
                    e.preventDefault();
                    scrollToTarget(0);
                  }
                }}
                className="inline-flex items-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00bfff] hover:opacity-90 transition-opacity"
              >
                <img
                  src="/Logo navbar.png"
                  alt="Moch Renaldy Syaputra"
                  className="h-7 sm:h-8 md:h-9 w-auto object-contain"
                />
              </Link>
            </div>

            {/* Center Capsule Links (Desktop) */}
            <ul className="hidden lg:flex items-center gap-1 rounded-full bg-white/[0.03] border border-white/[0.06] p-1">
              {items.map((item) => {
                const isActive = resolvedActiveId === item.id;
                const sharedClass = `relative inline-flex items-center gap-1.5 rounded-full px-3.5 xl:px-4 py-1.5 text-xs font-semibold tracking-wide transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00bfff] ${
                  isActive ? 'text-white' : 'text-slate-400 hover:text-slate-100'
                }`;

                const inner = (
                  <>
                    {isActive && (
                      <motion.span
                        layoutId="navbarActivePill"
                        transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                        className="absolute inset-0 rounded-full bg-gradient-to-b from-white/[0.11] to-white/[0.04] border border-[#00bfff]/35 shadow-[0_0_18px_rgba(0,191,255,0.2)]"
                      />
                    )}
                    {isActive && (
                      <span
                        aria-hidden="true"
                        className="relative z-10 w-1.5 h-1.5 rounded-full bg-[#00bfff] shadow-[0_0_8px_#00bfff]"
                      />
                    )}
                    <span className="relative z-10">{item.label}</span>
                  </>
                );

                return (
                  <li key={item.id}>
                    {isHome ? (
                      <a
                        href={item.href}
                        onClick={
                          item.id === 'home'
                            ? (e) => {
                                e.preventDefault();
                                scrollToTarget(0);
                              }
                            : undefined
                        }
                        aria-current={isActive ? 'page' : undefined}
                        className={sharedClass}
                      >
                        {inner}
                      </a>
                    ) : (
                      <Link
                        to={item.to}
                        onClick={
                          item.to === '/'
                            ? () => scrollToTarget(0, { immediate: true })
                            : undefined
                        }
                        aria-current={isActive ? 'page' : undefined}
                        className={sharedClass}
                      >
                        {inner}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>

            {/* Right CTA & Mobile Menu Trigger */}
            <div className="flex items-center gap-2 shrink-0">
              <a
                href="https://www.linkedin.com/in/moch-renaldy-syaputra-a19552288/"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden lg:inline-flex items-center gap-2 rounded-full bg-[#00bfff] hover:bg-[#33ccff] text-[#04070d] pl-4 pr-2.5 py-1.5 text-xs font-bold tracking-wider uppercase transition-all duration-200 hover:shadow-[0_0_24px_rgba(0,191,255,0.5)] active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <span>Hire Me</span>
                <span className="grid place-items-center w-6 h-6 rounded-full bg-[#04070d]/15">
                  <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={2.5} />
                </span>
              </a>

              <button
                type="button"
                onClick={() => setIsMenuOpen((v) => !v)}
                className="lg:hidden inline-flex items-center justify-center w-11 h-11 rounded-full bg-white/[0.05] border border-white/10 hover:border-[#00bfff]/50 text-slate-200 hover:text-[#00bfff] active:scale-95 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00bfff]"
                aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                aria-expanded={isMenuOpen}
              >
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile Floating Glass Menu Drawer */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            data-lenis-prevent
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[90] lg:hidden"
          >
            <div
              className="absolute inset-0 bg-black/75 backdrop-blur-md"
              onClick={() => setIsMenuOpen(false)}
            />

            <motion.div
              initial={{ opacity: 0, y: -16, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.97 }}
              transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
              className="relative mx-auto mt-20 w-[92%] max-w-md rounded-3xl bg-[#090d16]/95 border border-white/12 p-5 shadow-[0_24px_60px_rgba(0,0,0,0.85),0_0_30px_rgba(0,191,255,0.12)] backdrop-blur-2xl"
            >
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#00bfff] animate-pulse" />
                  <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#00bfff]">
                    Navigation
                  </span>
                </div>
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">
                  ESC to close
                </span>
              </div>

              <ul className="flex flex-col gap-1">
                {items.map((item, idx) => {
                  const isActive = resolvedActiveId === item.id;
                  const rowClass = `flex items-center justify-between min-h-[46px] px-4 py-2.5 rounded-2xl text-sm font-semibold tracking-wide transition-all active:scale-[0.99] ${
                    isActive
                      ? 'bg-[#00bfff]/12 text-[#00bfff] border border-[#00bfff]/30'
                      : 'text-slate-300 hover:text-white hover:bg-white/[0.05] border border-transparent'
                  }`;

                  const content = (
                    <>
                      <span className="flex items-center gap-3">
                        <span className="text-[11px] font-mono text-slate-500">
                          {String(idx + 1).padStart(2, '0')}
                        </span>
                        <span>{item.label}</span>
                      </span>
                      {isActive && (
                        <span className="w-2 h-2 rounded-full bg-[#00bfff] shadow-[0_0_8px_#00bfff]" />
                      )}
                    </>
                  );

                  return (
                    <motion.li
                      key={item.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.035, duration: 0.22 }}
                    >
                      {isHome ? (
                        <a
                          href={item.href}
                          onClick={(e) => {
                            setIsMenuOpen(false);
                            if (item.id === 'home') {
                              e.preventDefault();
                              scrollToTarget(0);
                            }
                          }}
                          className={rowClass}
                        >
                          {content}
                        </a>
                      ) : (
                        <Link
                          to={item.to}
                          onClick={() => {
                            setIsMenuOpen(false);
                            if (item.to === '/') {
                              scrollToTarget(0, { immediate: true });
                            }
                          }}
                          className={rowClass}
                        >
                          {content}
                        </Link>
                      )}
                    </motion.li>
                  );
                })}
              </ul>

              <div className="mt-4 pt-4 border-t border-white/10 flex items-center gap-2.5">
                <a
                  href="https://www.linkedin.com/in/moch-renaldy-syaputra-a19552288/"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex-1 min-h-[46px] inline-flex items-center justify-center gap-2 rounded-2xl bg-[#00bfff] text-[#04070d] font-bold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(0,191,255,0.35)] active:scale-95 transition-all"
                >
                  <span>Hire Me on LinkedIn</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;
