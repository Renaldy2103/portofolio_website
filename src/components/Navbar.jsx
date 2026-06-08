import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  // State baru untuk mendeteksi section mana yang sedang dilihat
  const [activeSection, setActiveSection] = useState('home'); 
  
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
    <nav className={`fixed top-6 left-1/2 -translate-x-1/2 w-[95%] max-w-8xl rounded-full backdrop-blur-2xl border border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.8)] flex justify-between items-center px-10 md:px-10 py-3 z-50 transition-colors duration-300 ${isScrolled ? 'bg-[#111111]/95' : 'bg-[#111111]/80'}`}>
  
    {/* 1. Bagian Logo */}
    <Link to="/" onClick={() => window.scrollTo(0,0)} className="font-display text-2xl md:text-3xl text-[#00bfff] [text-shadow:0_0_15px_rgba(0,191,255,0.6)] uppercase tracking-wide">
      MOCH RENALDY Syaputra
    </Link>

    {/* 2. Bagian Menu Navigasi */}
    <div className="hidden lg:flex items-center gap-10 text-xs md:text-sm font-bold tracking-widest uppercase">
      
      {/* Menu HOME */}
      {isHome ? (
        <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo(0,0); }} className={`transition-colors ${activeSection === 'home' ? 'text-white border-b-2 border-[#00bfff] pb-1' : 'text-gray-400 hover:text-white'}`}>HOME</a>
      ) : (
        <Link to="/" className="text-gray-400 hover:text-white transition-colors">HOME</Link>
      )}
      
      {/* Menu ABOUT (Otomatis menyala saat discroll ke section About) */}
      {isHome && (
        <a href="#about" className={`transition-colors ${activeSection === 'about' ? 'text-white border-b-2 border-[#00bfff] pb-1' : 'text-gray-400 hover:text-white'}`}>ABOUT</a>
      )}

      {/* Menu EXPERIENCE (Otomatis menyala saat discroll ke section Experience) */}
      {isHome && (
        <a href="#experience" className={`transition-colors ${activeSection === 'experience' ? 'text-white border-b-2 border-[#00bfff] pb-1' : 'text-gray-400 hover:text-white'}`}>EXPERIENCE</a>
      )}
      
      {/* Menu PROJECTS (Otomatis menyala saat discroll ke section Projects) */}
      {isHome && (
        <a href="#projects" className={`transition-colors ${activeSection === 'projects' ? 'text-white border-b-2 border-[#00bfff] pb-1' : 'text-gray-400 hover:text-white'}`}>PROJECTS</a>
      )}

      {/* Menu CERTIFICATES (Otomatis menyala saat discroll ke section Certificates) */}
      {isHome && (
        <a href="#certificates" className={`transition-colors ${activeSection === 'certificates' ? 'text-white border-b-2 border-[#00bfff] pb-1' : 'text-gray-400 hover:text-white'}`}>CERTIFICATES</a>
      )}
      
      {isHome && (
          <a href="#contact" className={`transition-colors ${activeSection === 'contact' ? 'text-white border-b-2 border-[#00bfff] pb-1' : 'text-gray-400 hover:text-white'}`}>CONTACT</a>
        )}
       </div>

    {/* 3. Bagian Tombol HIRE ME */}
    <a className="bg-[#00bfff] text-black px-6 md:px-8 py-2 md:py-2.5 rounded-full font-bold text-xs md:text-sm hover:scale-105 transition-all duration-300 active:scale-95 shadow-[0_0_15px_rgba(0,191,255,0.4)]" href={isHome ? "https://www.linkedin.com/in/moch-renaldy-syaputra-a19552288/" : "/#contact"}>
      HIRE ME
    </a>
    
  </nav>
  );
}

export default Navbar;