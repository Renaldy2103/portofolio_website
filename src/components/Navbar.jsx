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
        className={`fixed top-0 left-0 right-0 w-full backdrop-blur-2xl border-t border-b border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.5)] flex justify-between items-center px-4 sm:px-6 lg:px-10 py-3 sm:py-4 z-50 transition-colors duration-300 ${isScrolled ? 'bg-[#111111]/60' : 'bg-[#111111]/40'}`}
      >
        {/* 1. Bagian Logo */}
        <Link
          to="/"
          onClick={() => window.scrollTo(0, 0)}
          // PERBAIKAN: Mengubah ukuran teks mobile dan menambahkan truncate agar responsif
          className="font-['Syne'] text-sm sm:text-xl md:text-2xl lg:text-3xl bg-gradient-to-r from-[#00bfff] via-white to-[#00bfff] bg-clip-text text-transparent hover:opacity-80 transition-opacity uppercase tracking-widest truncate mr-4"
        >
          Moch Renaldy Syaputra
        </Link>

        {/* 2. Bagian Menu Navigasi (Desktop) */}
        <div className="hidden lg:flex items-center gap-6 lg:gap-8 text-xs sm:text-sm shrink-0">
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
          {isHome && (
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
          )}

          {/* Menu JOURNEY */}
          {isHome && (
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
          )}

          {/* Menu PROJECTS */}
          {isHome && (
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
          )}

          {/* Menu CERTIFICATES */}
          {isHome && (
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
          )}

          {/* Menu CONTACT */}
          {isHome && (
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
          )}
        </div>

        {/* 3. Tombol HIRE ME (Desktop) */}
        <a
          className="hidden lg:inline-flex shrink-0 bg-[#00bfff] text-black px-6 md:px-8 py-2 md:py-2.5 rounded-full font-bold text-xs md:text-sm hover:scale-105 transition-all duration-300 active:scale-95 shadow-[0_0_15px_rgba(0,191,255,0.4)]"
          href={isHome ? 'https://www.linkedin.com/in/moch-renaldy-syaputra-a19552288/' : '/#contact'}
        >
          HIRE ME
        </a>

        {/* 4. Tombol Hamburger (Mobile) */}
        <button
          type="button"
          onClick={() => setIsMenuOpen((v) => !v)}
          // PERBAIKAN: Menambahkan 'shrink-0' agar tombol tidak mengecil tertimpa nama logo
          className="lg:hidden inline-flex shrink-0 items-center justify-center w-10 h-10 rounded-full border border-white/10 hover:border-white/30 hover:bg-white/5 transition-all"
          aria-label="Open navigation menu"
          aria-expanded={isMenuOpen}
        >
          <span className="material-symbols-outlined text-[#00bfff]">menu</span>
        </button>
      </nav>

      {/* Mobile drawer */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[100]">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsMenuOpen(false)}
          />

          <div className="absolute left-1/2 -translate-x-1/2 top-20 sm:top-24 w-[94%] sm:max-w-md">
            <div className="glass-card rounded-[28px] border border-white/10 p-6 bg-[#111111]/90">
              <div className="flex items-center justify-between mb-6">
                <div className="text-[#00bfff] font-bold tracking-widest uppercase text-xs">
                  Navigation
                </div>
                <button
                  type="button"
                  onClick={() => setIsMenuOpen(false)}
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:border-white/30 hover:bg-white/5 transition-all text-white"
                  aria-label="Close navigation menu"
                >
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>

              <div className="flex flex-col gap-4">
                {isHome ? (
                  <>
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setIsMenuOpen(false);
                        window.scrollTo(0, 0);
                      }}
                      className={`text-sm font-bold uppercase tracking-widest transition-colors ${
                        activeSection === 'home' ? 'text-[#00bfff]' : 'text-gray-300 hover:text-white'
                      }`}
                    >
                      HOME
                    </a>
                    <a
                      href="#about"
                      onClick={() => setIsMenuOpen(false)}
                      className={`text-sm font-bold uppercase tracking-widest transition-colors ${
                        activeSection === 'about' ? 'text-[#00bfff]' : 'text-gray-300 hover:text-white'
                      }`}
                    >
                      ABOUT
                    </a>
                    <a
                      href="#journey"
                      onClick={() => setIsMenuOpen(false)}
                      className={`text-sm font-bold uppercase tracking-widest transition-colors ${
                        activeSection === 'journey'
                          ? 'text-[#00bfff]'
                          : 'text-gray-300 hover:text-white'
                      }`}
                    >
                      EXPERIENCE
                    </a>
                    <a
                      href="#projects"
                      onClick={() => setIsMenuOpen(false)}
                      className={`text-sm font-bold uppercase tracking-widest transition-colors ${
                        activeSection === 'projects' ? 'text-[#00bfff]' : 'text-gray-300 hover:text-white'
                      }`}
                    >
                      PROJECTS
                    </a>
                    <a
                      href="#certificates"
                      onClick={() => setIsMenuOpen(false)}
                      className={`text-sm font-bold uppercase tracking-widest transition-colors ${
                        activeSection === 'certificates'
                          ? 'text-[#00bfff]'
                          : 'text-gray-300 hover:text-white'
                      }`}
                    >
                      CERTIFICATES
                    </a>
                    <a
                      href="#contact"
                      onClick={() => setIsMenuOpen(false)}
                      className={`text-sm font-bold uppercase tracking-widest transition-colors ${
                        activeSection === 'contact' ? 'text-[#00bfff]' : 'text-gray-300 hover:text-white'
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
                  <Link
                    to="/"
                    onClick={() => {
                      setIsMenuOpen(false);
                      window.scrollTo(0, 0);
                    }}
                    className="text-sm font-bold uppercase tracking-widest transition-colors text-white"
                  >
                    HOME
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;