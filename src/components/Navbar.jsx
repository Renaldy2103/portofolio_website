import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './Navbar.css';

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      // 1. Logika untuk mengubah background navbar saat di-scroll
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // 2. Logika ScrollSpy (deteksi menu aktif) khusus di halaman Home
      if (isHome) {
        const sections = document.querySelectorAll("section[id]");
        let current = "home";

        sections.forEach((section) => {
          const sectionTop = section.offsetTop;
          // Offset 150px agar menu menyala sedikit sebelum section benar-benar di ujung atas
          if (window.scrollY >= sectionTop - 150) {
            current = section.getAttribute("id");
          }
        });

        // Kembalikan ke 'home' jika scroll paling atas
        if (window.scrollY < 100) {
          setActiveSection("home");
        } else {
          setActiveSection(current);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHome]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 w-full max-w-[100vw] overflow-hidden backdrop-blur-2xl border-t border-b border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.5)] flex justify-between items-center px-4 sm:px-6 lg:px-10 py-3 sm:py-4 z-50 transition-colors duration-300 ${isScrolled ? 'bg-[#111111]/60' : 'bg-[#111111]/40'}`}
      >
        {/* Logo */}
        <Link
          to="/"
          onClick={() => window.scrollTo(0, 0)}
          className="hover:opacity-80 transition-opacity shrink-0"
        >
          <img src="/Logo navbar.png" alt="Renaldy Logo" className="h-8 sm:h-10 md:h-12 lg:h-14 w-auto max-w-[160px] sm:max-w-[200px] md:max-w-none" />
        </Link>

        {/* Desktop nav — hidden below 1024px */}
        <div className="hidden lg:flex items-center gap-3 xl:gap-6 2xl:gap-8 text-xs xl:text-sm shrink-0">
          {/* Menu HOME */}
          {isHome ? (
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo(0, 0);
              }}
              className={`relative group nav-link ${
                activeSection === 'home'
                  ? 'text-white'
                  : 'text-gray-400'
              }`}
            >
              <span className="relative z-10">Home</span>
              <span className={`absolute bottom-0 left-0 w-full h-[2px] bg-[#00bfff] transition-all duration-300 ${activeSection === 'home' ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
            </a>
          ) : (
            <Link to="/" className="text-gray-400 hover:text-white transition-colors relative group nav-link">
              <span className="relative z-10">Home</span>
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#00bfff] scale-x-0 group-hover:scale-x-100 transition-all duration-300"></span>
            </Link>
          )}

          {/* Menu ABOUT */}
          {isHome ? (
            <a
              href="#about"
              className={`relative group nav-link ${
                activeSection === 'about'
                  ? 'text-white'
                  : 'text-gray-400'
              }`}
            >
              <span className="relative z-10">About</span>
              <span className={`absolute bottom-0 left-0 w-full h-[2px] bg-[#00bfff] transition-all duration-300 ${activeSection === 'about' ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
            </a>
          ) : (
            <Link to="/#about" className="text-gray-400 hover:text-white transition-colors relative group nav-link">
              <span className="relative z-10">About</span>
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#00bfff] scale-x-0 group-hover:scale-x-100 transition-all duration-300"></span>
            </Link>
          )}

          {/* Menu JOURNEY / EXPERIENCE */}
          {isHome ? (
            <a
              href="#journey"
              className={`relative group nav-link ${
                activeSection === 'journey'
                  ? 'text-white'
                  : 'text-gray-400'
              }`}
            >
              <span className="relative z-10">Experience</span>
              <span className={`absolute bottom-0 left-0 w-full h-[2px] bg-[#00bfff] transition-all duration-300 ${activeSection === 'journey' ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
            </a>
          ) : (
            <Link to="/#journey" className="text-gray-400 hover:text-white transition-colors relative group nav-link">
              <span className="relative z-10">Experience</span>
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#00bfff] scale-x-0 group-hover:scale-x-100 transition-all duration-300"></span>
            </Link>
          )}

          {/* Menu PROJECTS */}
          {isHome ? (
            <a
              href="#projects"
              className={`relative group nav-link ${
                activeSection === 'projects'
                  ? 'text-white'
                  : 'text-gray-400'
              }`}
            >
              <span className="relative z-10">Projects</span>
              <span className={`absolute bottom-0 left-0 w-full h-[2px] bg-[#00bfff] transition-all duration-300 ${activeSection === 'projects' ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
            </a>
          ) : (
            <Link
              to="/projects"
              className={`relative group nav-link transition-colors ${
                location.pathname === '/projects' ? 'text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              <span className="relative z-10">Projects</span>
              <span className={`absolute bottom-0 left-0 w-full h-[2px] bg-[#00bfff] transition-all duration-300 ${location.pathname === '/projects' ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
            </Link>
          )}

          {/* Menu CERTIFICATES */}
          {isHome ? (
            <a
              href="#certificates"
              className={`relative group nav-link ${
                activeSection === 'certificates'
                  ? 'text-white'
                  : 'text-gray-400'
              }`}
            >
              <span className="relative z-10">Certificates</span>
              <span className={`absolute bottom-0 left-0 w-full h-[2px] bg-[#00bfff] transition-all duration-300 ${activeSection === 'certificates' ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
            </a>
          ) : (
            <Link
              to="/certificates"
              className={`relative group nav-link transition-colors ${
                location.pathname === '/certificates' ? 'text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              <span className="relative z-10">Certificates</span>
              <span className={`absolute bottom-0 left-0 w-full h-[2px] bg-[#00bfff] transition-all duration-300 ${location.pathname === '/certificates' ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
            </Link>
          )}

          {/* Menu CONTACT */}
          {isHome ? (
            <a
              href="#contact"
              className={`relative group nav-link ${
                activeSection === 'contact'
                  ? 'text-white'
                  : 'text-gray-400'
              }`}
            >
              <span className="relative z-10">Contact</span>
              <span className={`absolute bottom-0 left-0 w-full h-[2px] bg-[#00bfff] transition-all duration-300 ${activeSection === 'contact' ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
            </a>
          ) : (
            <Link to="/#contact" className="text-gray-400 hover:text-white transition-colors relative group nav-link">
              <span className="relative z-10">Contact</span>
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#00bfff] scale-x-0 group-hover:scale-x-100 transition-all duration-300"></span>
            </Link>
          )}
        </div>

        {/* 3. Tombol HIRE ME (Desktop) */}
        <a
          className="hidden lg:inline-flex shrink-0 bg-[#00bfff] text-black px-4 xl:px-7 py-2 xl:py-2.5 rounded-full font-bold text-xs xl:text-sm hover:scale-105 transition-all duration-300 active:scale-95 shadow-[0_0_15px_rgba(0,191,255,0.4)]"
          href={isHome ? 'https://www.linkedin.com/in/moch-renaldy-syaputra-a19552288/' : '/#contact'}
        >
          HIRE ME
        </a>

        {/* 4. Tombol Hamburger (Mobile) */}
        <button
          type="button"
          onClick={() => setIsMenuOpen((v) => !v)}
          className="lg:hidden inline-flex shrink-0 items-center justify-center w-10 h-10 rounded-full border border-white/10 hover:border-white/30 hover:bg-white/5 transition-all"
          aria-label="Open navigation menu"
          aria-expanded={isMenuOpen}
        >
          <span className="material-symbols-outlined text-[#00bfff]">menu</span>
        </button>
      </nav>

      {/* Mobile drawer with elegant animation */}
      <div
        className={`fixed inset-0 z-[100] transition-all duration-300 ${
          isMenuOpen ? 'visible opacity-100' : 'invisible opacity-0 pointer-events-none'
        }`}
      >
          <div
            className={`absolute inset-0 bg-black/70 backdrop-blur-md transition-opacity duration-300 ${
              isMenuOpen ? 'opacity-100' : 'opacity-0'
            }`}
            onClick={() => setIsMenuOpen(false)}
          />

          <div className={`absolute left-1/2 -translate-x-1/2 top-20 sm:top-24 w-[92%] sm:max-w-md transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            isMenuOpen ? 'translate-y-0 opacity-100 scale-100' : '-translate-y-6 opacity-0 scale-95'
          }`}>
            <div className="glass-card rounded-[28px] border border-white/10 p-6 sm:p-8 bg-[#0d0d0f]/95 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)]">
              <div className="flex items-center justify-between mb-8">
                <div className="text-[#00bfff] font-bold tracking-widest uppercase text-xs">
                  Navigation
                </div>
                <button
                  type="button"
                  onClick={() => setIsMenuOpen(false)}
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:border-[#00bfff]/50 hover:bg-white/5 transition-all text-white"
                  aria-label="Close navigation menu"
                >
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>

              <div className="flex flex-col gap-1">
                {isHome ? (
                  <>
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setIsMenuOpen(false);
                        window.scrollTo(0, 0);
                      }}
                      className={`text-sm font-bold uppercase tracking-widest transition-all duration-300 px-4 py-3 rounded-xl ${
                        activeSection === 'home' ? 'text-[#00bfff] bg-[#00bfff]/10' : 'text-gray-300 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      HOME
                    </a>
                    <a
                      href="#about"
                      onClick={() => setIsMenuOpen(false)}
                      className={`text-sm font-bold uppercase tracking-widest transition-all duration-300 px-4 py-3 rounded-xl ${
                        activeSection === 'about' ? 'text-[#00bfff] bg-[#00bfff]/10' : 'text-gray-300 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      ABOUT
                    </a>
                    <a
                      href="#journey"
                      onClick={() => setIsMenuOpen(false)}
                      className={`text-sm font-bold uppercase tracking-widest transition-all duration-300 px-4 py-3 rounded-xl ${
                        activeSection === 'journey'
                          ? 'text-[#00bfff] bg-[#00bfff]/10'
                          : 'text-gray-300 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      EXPERIENCE
                    </a>
                    <a
                      href="#projects"
                      onClick={() => setIsMenuOpen(false)}
                      className={`text-sm font-bold uppercase tracking-widest transition-all duration-300 px-4 py-3 rounded-xl ${
                        activeSection === 'projects' ? 'text-[#00bfff] bg-[#00bfff]/10' : 'text-gray-300 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      PROJECTS
                    </a>
                    <a
                      href="#certificates"
                      onClick={() => setIsMenuOpen(false)}
                      className={`text-sm font-bold uppercase tracking-widest transition-all duration-300 px-4 py-3 rounded-xl ${
                        activeSection === 'certificates'
                          ? 'text-[#00bfff] bg-[#00bfff]/10'
                          : 'text-gray-300 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      CERTIFICATES
                    </a>
                    <a
                      href="#contact"
                      onClick={() => setIsMenuOpen(false)}
                      className={`text-sm font-bold uppercase tracking-widest transition-all duration-300 px-4 py-3 rounded-xl ${
                        activeSection === 'contact' ? 'text-[#00bfff] bg-[#00bfff]/10' : 'text-gray-300 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      CONTACT
                    </a>

                    <a
                      className="mt-4 inline-flex items-center justify-center bg-[#00bfff] text-black px-6 py-3 rounded-full font-bold text-sm hover:scale-[1.02] transition-all active:scale-95 shadow-[0_0_15px_rgba(0,191,255,0.4)]"
                      href="https://www.linkedin.com/in/moch-renaldy-syaputra-a19552288/"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      HIRE ME
                    </a>
                  </>
                ) : (
                  <>
                    <Link
                      to="/"
                      onClick={() => {
                        setIsMenuOpen(false);
                        window.scrollTo(0, 0);
                      }}
                      className="text-sm font-bold uppercase tracking-widest transition-all duration-300 px-4 py-3 rounded-xl text-white hover:text-[#00bfff] hover:bg-white/5"
                    >
                      HOME
                    </Link>
                    <Link
                      to="/projects"
                      onClick={() => setIsMenuOpen(false)}
                      className={`text-sm font-bold uppercase tracking-widest transition-all duration-300 px-4 py-3 rounded-xl ${
                        location.pathname === '/projects' ? 'text-[#00bfff] bg-[#00bfff]/10' : 'text-gray-300 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      PROJECTS
                    </Link>
                    <Link
                      to="/certificates"
                      onClick={() => setIsMenuOpen(false)}
                      className={`text-sm font-bold uppercase tracking-widest transition-all duration-300 px-4 py-3 rounded-xl ${
                        location.pathname === '/certificates' ? 'text-[#00bfff] bg-[#00bfff]/10' : 'text-gray-300 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      CERTIFICATES
                    </Link>
                    <Link
                      to="/#contact"
                      onClick={() => setIsMenuOpen(false)}
                      className="text-sm font-bold uppercase tracking-widest transition-all duration-300 px-4 py-3 rounded-xl text-gray-300 hover:text-white hover:bg-white/5"
                    >
                      CONTACT
                    </Link>
                    <a
                      className="mt-4 inline-flex items-center justify-center bg-[#00bfff] text-black px-6 py-3 rounded-full font-bold text-sm hover:scale-[1.02] transition-all active:scale-95 shadow-[0_0_15px_rgba(0,191,255,0.4)]"
                      href="https://www.linkedin.com/in/moch-renaldy-syaputra-a19552288/"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      HIRE ME
                    </a>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
    </>
  );
}


export default Navbar;