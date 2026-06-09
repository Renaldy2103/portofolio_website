import { useEffect, useRef, useState } from 'react';
import { FaGithub } from "react-icons/fa";
import emailjs from '@emailjs/browser';
import LogoLoop from "../components/LogoLoop";
import Aurora from "../components/Aurora";
import CoolProfileCard from "../components/CoolProfileCard";
import JourneyTimeline from "../components/JourneyTimeline";
import fotoProfil from "../assets/PhotoProfile.jpeg";


function Home() {
  const projects = [
    {
      title: "Pendeteksi Kantuk",
      category: "AI/ML",
      image: "/projects/pendeteksi_kantuk.png", // Spasi di awal path sudah dihapus
      github: "https://github.com/Renaldy2103/pendeteksi_kantuk",
      description: "Sistem pendeteksi kantuk berbasis Python dan Computer Vision untuk mendeteksi kondisi mata secara real-time.",
      tech: ["PYTHON", "OPENCV", "COMPUTER VISION"],
      icon: "visibility",
    },
    {
      title: "Health Care",
      category: "WEB APP",
      image: "/projects/health_care.png",
      github: "https://github.com/Renaldy2103/health_care",
      description: "Sistem informasi layanan kesehatan berbasis PHP & MySQL untuk pengelolaan pasien, dokter, resep dan pembayaran.",
      tech: ["PHP", "MYSQL", "WEB DEVELOPMENT"],
      icon: "medical_services",
    },
    {
      title: "Smart Hospital",
      category: "HEALTHCARE",
      image: "/projects/smart_hospital.png",
      description: "Platform rumah sakit modern yang mengintegrasikan IoT, AI, Cloud Computing dan Big Data.",
      tech: ["PHP", "MYSQL", "IOT"],
      icon: "local_hospital",
    },
    {
      title: "Game Marbot Simulator",
      category: "GAME DEV",
      image: "/projects/marbot_simulator.png",
      github: "https://github.com/Renaldy2103/game_marbot_simulator",
      description: "Game simulasi 3D bertema marbot masjid dengan misi menjaga kebersihan dan keamanan lingkungan.",
      tech: ["UNITY", "C#", "3D GAME"],
      icon: "sports_esports",
    },
    {
      title: "Agenda Ummat",
      category: "FLUTTER",
      image: "/projects/ummat_app.png",
      github: "https://github.com/Renaldy2103/Ummat_App",
      description: "Aplikasi mobile berbasis Flutter untuk manajemen acara dan komunitas Muslim.",
      tech: ["FLUTTER", "DART", "MOBILE"],
      icon: "event",
    },
    {
      title: "Deteksi Objek YOLOv11",
      category: "AI / ML",
      image: "/projects/deteksi_objek.png",
      description: "Implementasi dan evaluasi model YOLOv11 menggunakan Roboflow dan Google Colab.",
      tech: ["YOLOV11", "ROBOFLOW", "COLAB"],
      icon: "visibility",
    },
  ];

  // ==========================================
  // 2. STATE & REF UTAMA (Solusi Error Anda)
  // ==========================================
  // State untuk pagination project
  const [currentPage, setCurrentPage] = useState(0);
  const cardsPerPage = 2;
  const totalPages = Math.ceil(projects.length / cardsPerPage);

  // State & Ref untuk sertifikat (Mencegah error 'not defined')
  const certificateContainerRef = useRef(null);

  // Ref & State untuk EmailJS form kontak
  const form = useRef();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  // ==========================================
  // 3. FUNGSI NAVIGASI (HANDLERS)
  // ==========================================
  // Fungsi slide untuk project carousel
  const nextSlide = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const prevSlide = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  // Fungsi scroll slider untuk sertifikat (Menghilangkan warning 'never used')
  const scroll = (direction) => {
    if (certificateContainerRef.current) {
      const { scrollLeft, clientWidth } = certificateContainerRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      certificateContainerRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  // Fungsi kirim email via EmailJS
  const sendEmail = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    emailjs.sendForm(
      'service_r56up9s',   
      'template_jbyg2as',  
      form.current, 
      'pHjP0kFkJyJPehZYM'    
    )
    .then((result) => {
      console.log("Email sukses dikirim!", result.text);
      setSubmitStatus('success');
      form.current.reset();
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(null), 5000);
    }, (error) => {
      console.log("Gagal mengirim email:", error.text);
      setSubmitStatus('error');
      setIsSubmitting(false);
    });
  };

  // ==========================================
  // 4. DATA SERTIFIKAT (ARRAY OBJECT)
  // ==========================================
  const certificatesData = [
    {
      id: 1,
      category: 'TECHNICAL',
      date: 'APR 2022',
      title: 'Fundamental Frontend Engineer with Vue Js',
      issuer: 'Alterra Academy',
      image: '/certificate/alterra.jpeg', 
      icon: 'verified'
    },
    {
      id: 2,
      category: 'TECHNICAL',
      date: 'FEB 2022',
      title: 'Java Fundamentals',
      issuer: 'Oracle Academy',
      image: '/certificate/oracle_java.jpeg',
      icon: 'code'
    },
    {
      id: 3,
      category: 'TECHNICAL',
      date: 'MAY 2022',
      title: 'PCAP: Programming Essentials in Python',
      issuer: 'Cisco Networking Academy & Python Institute',
      image: '/certificate/python_cisco.jpeg',
      icon: 'integration_instructions'
    },
    {
      id: 4,
      category: 'SOFTSKILL',
      date: 'JUN 2021',
      title: 'Surat Keterangan Praktik Kerja Lapangan (PKL)',
      issuer: 'EZY INDUSTRIES (SMKN 8 Malang)',
      image: '/certificate/ezy.jpeg',
      icon: 'history_edu'
    },
    {
      id: 5,
      category: 'TECHNICAL',
      date: 'MAY 2022',
      title: 'Sertifikat Uji Kompetensi: Rekayasa Perangkat Lunak',
      issuer: 'SMKN 8 Malang & PT. Retgoo Sentris Informa',
      image: '/certificate/smk.jpeg',
      icon: 'military_tech'
    }
  ];

  // ==========================================
  // 5. EFFECTS (Scroll Animation Observer)
  // ==========================================
  useEffect(() => {
    // Only observe parent sections, not nested animated children
    const sections = document.querySelectorAll('section[id].scroll-reveal-target');
    const childAnimatables = document.querySelectorAll('.scroll-reveal-target:not(section[id])');

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Also add active to nested animated children
                entry.target.querySelectorAll('.scroll-reveal-target').forEach(child => {
                    child.classList.add('active');
                });
            } else {
                entry.target.classList.remove('active');
                entry.target.querySelectorAll('.scroll-reveal-target').forEach(child => {
                    child.classList.remove('active');
                });
            }
        });
    }, { threshold: 0.15 });

    const childObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            } else {
                entry.target.classList.remove('active');
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => {
        section.classList.add('scroll-reveal');
        sectionObserver.observe(section);
    });

    childAnimatables.forEach(child => {
        child.classList.add('scroll-reveal');
        childObserver.observe(child);
    });

    return () => {
      sections.forEach(section => sectionObserver.unobserve(section));
      childAnimatables.forEach(child => childObserver.unobserve(child));
    };
  }, []);

  return (
    <>
      {/* Background Blooms */}
      <div className="bloom-bg top-[-200px] right-[-100px]"></div>
      <div className="bloom-bg bottom-[-200px] left-[-200px]"></div>

      {/* Aurora Effect */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <Aurora
          colorStops={["#3B82F6","#ffffff","#f0ff27"]}
          blend={0.5}
          amplitude={1.0}
          speed={1}
        />
      </div>

      <main className="max-w-10xl mx-auto px-6 md:px-12 lg:px-16 pt-32 md:pt-40">
        {/* Hero Section */}
        <section className="flex flex-col lg:flex-row items-center justify-between gap-16 min-h-[75vh] mb-40 relative scroll-reveal-target" id="home">
          <div className="flex-1 order-2 lg:order-1 text-center lg:text-left">
            <p className="text-primary font-label-caps tracking-[0.3em] mb-6 uppercase fade-in delay-100 scroll-reveal-target">Halo, Saya Moch Renaldy Syaputra</p>
            <h1 className="font-headline-lg text-3xl sm:text-4xl md:text-5xl lg:text-6xl uppercase leading-tight mb-6">

              {/* Bagian Biru + Glow */}
              <span className="block text-[#00bfff] [text-shadow:0_0_25px_rgba(0,191,255,0.6)] slide-left delay-200 scroll-reveal-target">
                TECH ENTHUSIAST
              </span>
              {/* Bagian Putih */}
              <span className="block text-white mt-1 slide-left delay-300 scroll-reveal-target">
                & AI EXPLORER
              </span>
            </h1>
            <p className="font-body-lg text-on-surface-variant max-w-xl mb-12 mx-auto lg:mx-0 fade-in delay-400 scroll-reveal-target">

              Mahasiswa Teknik Informatika semester 6 dengan fokus riset pada Artificial Intelligence, Computer Vision, dan NLP. Memadukan kecerdasan buatan dengan pengembangan web modern.
            </p>
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 fade-in delay-500 scroll-reveal-target">
            <a className="bg-[#C1E3FC] text-[#2C3E50] px-[36px] py-[23px] rounded-full font-bold uppercase tracking-wide inline-block hover:scale-105 transition-transform" href="#projects"> LIHAT PROYEK </a>
            <a className="border border-primary/40 text-primary px-10 py-5 rounded-full font-bold hover:bg-primary/10 transition-all transform hover:-translate-y-1 flex items-center gap-2" href="/cv.pdf" download="cv-moch-renaldy-syaputra.pdf"> <span className="material-symbols-outlined">download</span> UNDUH CV</a>
            </div>
          </div>
          <div className="flex-1 order-1 lg:order-2 relative group">
            <CoolProfileCard photoProfil={fotoProfil} />
          </div>
        </section>

        {/* About Section */}
        <section className="mb-24 scroll-reveal-target" id="about">
          <div className="glass-card rounded-[20px] sm:rounded-[30px] md:rounded-[40px] p-6 sm:p-8 md:p-12">
            <div className="flex items-center gap-4 mb-8 slide-left scroll-reveal-target">
              <div className="h-[2px] w-8 bg-[#86a8c3]"></div>
              <span className="text-[#86a8c3] font-bold text-sm uppercase tracking-widest">INTRODUCTION</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-white mb-6 tracking-wide slide-left delay-100 scroll-reveal-target">About Me</h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
              <div>
                <p className="font-body-lg text-on-surface-variant leading-relaxed mb-6 text-base sm:text-lg md:text-xl fade-in delay-200 scroll-reveal-target">
                  I am a <span className="text-white font-bold">6th-semester Computer Science student</span> currently exploring the vast domains of <span className="text-primary">Machine Learning, Computer Vision, and Natural Language Processing (NLP)</span>.
                </p>
                <p className="font-body-lg text-on-surface-variant leading-relaxed fade-in delay-300 scroll-reveal-target">
                  My motivation lies in building efficient AI solutions and integrating them with interactive, user-friendly web interfaces. I thrive on solving complex problems at the intersection of intelligence and design, aiming to create impactful digital experiences.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 sm:gap-6">
                <div className="glass-card rounded-2xl p-4 sm:p-6 flex flex-col items-center text-center">
                  <span className="text-primary font-headline-lg text-3xl sm:text-4xl cyber-text-glow">6th</span>
                  <span className="text-label-caps text-on-surface-variant uppercase mt-2 text-xs sm:text-sm">Semester Student</span>
                </div>
                <div className="glass-card rounded-2xl p-4 sm:p-6 flex flex-col items-center text-center">
                  <span className="text-primary font-headline-lg text-3xl sm:text-4xl cyber-text-glow">AI</span>
                  <span className="text-label-caps text-on-surface-variant uppercase mt-2 text-xs sm:text-sm">Focused Research</span>
                </div>
                <div className="glass-card rounded-2xl p-4 sm:p-6 flex items-center gap-3 sm:gap-4">
                  <span className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-primary/10 border border-white/10 flex items-center justify-center">
                    <span className="material-symbols-outlined text-[#00bfff] text-lg sm:text-xl">psychology</span>
                  </span>
                  <div>
                    <p className="text-primary font-label-caps text-xs uppercase tracking-widest">Focus</p>
                    <p className="text-on-surface-variant mt-1 text-xs sm:text-sm">Real-time vision & AI</p>
                  </div>
                </div>
                <div className="glass-card rounded-2xl p-4 sm:p-6 flex items-center gap-3 sm:gap-4">
                  <span className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-primary/10 border border-white/10 flex items-center justify-center">
                    <span className="material-symbols-outlined text-[#00bfff] text-lg sm:text-xl">build</span>
                  </span>
                  <div>
                    <p className="text-primary font-label-caps text-xs uppercase tracking-widest">Tools</p>
                    <p className="text-on-surface-variant mt-1 text-xs sm:text-sm">Python, OpenCV, Web</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tech Stack Section */}
        <section className="mb-40 scroll-reveal-target" id="tech-stack">
          <div className="flex items-center gap-4 mb-8 slide-left scroll-reveal-target">
            <div className="h-[2px] w-8 bg-[#86a8c3]"></div>
            <span className="text-[#86a8c3] font-bold text-sm uppercase tracking-widest">TECH STACK</span>
          </div>

          <LogoLoop
            logos={[
              { node: <img alt="React" className="h-14 w-auto shrink-0 max-w-none object-contain" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" />, title: 'React' },
              { node: <img alt="Next.js" className="h-14 w-auto shrink-0 max-w-none object-contain" src="https://cdn.simpleicons.org/nextdotjs/white" />, title: 'Next.js' },
              { node: <img alt="Tailwind" className="h-14 w-auto shrink-0 max-w-none object-contain" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" />, title: 'Tailwind CSS' },
              { node: <img alt="TypeScript" className="h-14 w-auto shrink-0 max-w-none object-contain" src="https://cdn.simpleicons.org/typescript/white" />, title: 'TypeScript' },
              { node: <img alt="Python" className="h-14 w-auto shrink-0 max-w-none object-contain" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" />, title: 'Python' },
              { node: <img alt="PHP" className="h-14 w-auto shrink-0 max-w-none object-contain" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg" />, title: 'PHP' },
              { node: <img alt="JavaScript" className="h-14 w-auto shrink-0 max-w-none object-contain" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" />, title: 'JavaScript' },
              { node: <img alt="MySQL" className="h-14 w-auto shrink-0 max-w-none object-contain" src="https://cdn.simpleicons.org/mysql/white" />, title: 'MySQL' },
              { node: <img alt="C++" className="h-14 w-auto shrink-0 max-w-none object-contain" src="https://cdn.simpleicons.org/cplusplus/white" />, title: 'C++' },
              { node: <img alt="Docker" className="h-14 w-auto shrink-0 max-w-none object-contain" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg" />, title: 'Docker' },
              { node: <img alt="Git" className="h-14 w-auto shrink-0 max-w-none object-contain" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg" />, title: 'Git' },
              { node: <img alt="VS Code" className="h-14 w-auto shrink-0 max-w-none object-contain" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg" />, title: 'VS Code' },
              { node: <img alt="Google Colab" className="h-14 w-auto shrink-0 max-w-none object-contain" src="https://cdn.simpleicons.org/googlecolab/white" />, title: 'Google Colab' },
              { node: <img alt="Roboflow" className="h-14 w-auto shrink-0 max-w-none object-contain" src="https://cdn.simpleicons.org/roboflow/white" />, title: 'Roboflow' },
              { node: <img alt="Gemini" className="h-14 w-auto shrink-0 max-w-none object-contain" src="https://cdn.simpleicons.org/googlegemini/white" />, title: 'Gemini' },
              { node: <img alt="Claude" className="h-14 w-auto shrink-0 max-w-none object-contain" src="https://cdn.simpleicons.org/anthropic/white" />, title: 'Claude' },
              { node: <img alt="React Native" className="h-14 w-auto shrink-0 max-w-none object-contain" src="https://cdn.simpleicons.org/react/white" />, title: 'React' },
            ]}
            speed={90}
            direction="left"
            logoHeight={64}
            gap={64}
            hoverSpeed={0}
            ariaLabel="Tech stack logos"
          />
        </section>

        <JourneyTimeline />

{/* My Work Section */}
<section
      className="mb-40 px-6 md:px-12 lg:px-16 scroll-reveal-target"
      id="projects"
    >
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div>
          <div className="flex items-center gap-4 mb-4">
            <div className="h-[2px] w-8 bg-[#86a8c3]"></div>
            <span className="text-[#86a8c3] font-bold text-sm uppercase tracking-widest">
              Featured Projects
            </span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl uppercase text-white tracking-wide [text-shadow:-1.5px_0_#00bfff,1.5px_0_#ff4500]">
            My Work
          </h2>
        </div>

        <div className="flex flex-col items-start md:items-end gap-6">
          <a
            href="https://github.com/Renaldy2103?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#00bfff] font-bold text-sm hover:underline underline-offset-8 uppercase tracking-widest"
          >
            VIEW ALL ON GITHUB
          </a>

          <div className="hidden sm:flex gap-4">
            <button
              onClick={prevSlide}
              className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:border-white/30 hover:bg-white/5 transition-all text-[#00bfff]"
            >
              <span className="material-symbols-outlined">
                arrow_back
              </span>
            </button>

            <button
              onClick={nextSlide}
              className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:border-white/30 hover:bg-white/5 transition-all text-[#00bfff]"
            >
              <span className="material-symbols-outlined">
                arrow_forward
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* SLIDER */}
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{
            transform: `translateX(-${currentPage * 100}%)`,
          }}
        >
          {Array.from({ length: totalPages }).map((_, pageIndex) => (
            <div
              key={pageIndex}
              className="min-w-full grid grid-cols-1 lg:grid-cols-2 gap-8"
            >
              {projects
                .slice(
                  pageIndex * cardsPerPage,
                  pageIndex * cardsPerPage + cardsPerPage
                )
                .map((project, index) => (
                  <div
                    key={index}
                    className="group relative glass-card rounded-[32px] overflow-hidden cursor-pointer card-glow transition-all duration-500"
                  >
                    <div className="aspect-[16/10] overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 grayscale group-hover:grayscale-0"
                      />

                      <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none backdrop-blur-[2px]">
                        <span className="material-symbols-outlined text-6xl text-white">
                          {project.icon}
                        </span>
                      </div>
                    </div>

                    <div className="p-6 sm:p-10">
                      <div className="flex flex-col sm:flex-row justify-between items-start gap-2 mb-4 sm:mb-6">
                        <h3 className="font-title-md text-xl sm:text-2xl text-white group-hover:text-primary transition-colors">
                          {project.title}
                        </h3>

                        <span className="bg-primary-container/20 text-primary-container px-3 py-1 sm:px-4 sm:py-1.5 rounded-lg text-xs font-bold uppercase tracking-widest border border-primary/20 whitespace-nowrap">
                          {project.category}
                        </span>
                      </div>

                      <p className="font-body-sm text-on-surface-variant mb-6 sm:mb-8 text-sm sm:text-base line-clamp-2">
                        {project.description}
                      </p>

                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div className="flex flex-wrap gap-2 sm:gap-4">
                          {project.tech.map((item) => (
                            <span
                              key={item}
                              className="text-xs text-primary font-bold tracking-widest flex items-center gap-1"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                              {item}
                            </span>
                          ))}
                        </div>

                        {project.github && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white hover:text-[#00bfff] transition mt-2 sm:mt-0"
                          >
                            <FaGithub size={24} />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          ))}
        </div>
      </div>
    </section>

{/* SECTION SERTIFIKAT & PENCAPAIAN */}
{/* ========================================================= */}
<section className="mb-40 scroll-reveal-target relative px-4 sm:px-0" id="certificates">

  {/* Header Container: Menggunakan flex untuk membagi judul (kiri) dan tombol (kanan) */}
  <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-6 relative">

    {/* Sisi Kiri: Judul & Teks Deskripsi */}
    <div className="text-left">
      <div className="flex items-center gap-4 mb-4">
        <span className="text-[#86a8c3] font-bold text-sm uppercase tracking-widest">Validations</span>
        <div className="h-[2px] w-8 bg-[#86a8c3]"></div>
      </div>
      <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-[40px] xl:text-[54px] uppercase tracking-wide leading-tight mb-4">
        <span className="text-white">SERTIFIKAT & </span>
        <span className="text-[#00bfff]">PENCAPAIAN</span>
      </h2>
      <p className="text-gray-400 max-w-xl text-sm md:text-base">
        Kumpulan validasi kompetensi teknis dan pengembangan diri dalam perjalanan karir teknologi saya.
      </p>
    </div>

    {/* Sisi Kanan Atas: Tombol Navigasi Minimalis (Tanpa Tulisan Teks) */}
    <div className="flex gap-3 self-end md:self-auto">
      <button
        onClick={() => scroll('left')}
        className="w-12 h-12 rounded-xl bg-[#1a1a1a] border border-white/10 text-white flex items-center justify-center hover:bg-[#252525] hover:border-white/20 active:scale-95 transition-all group"
        aria-label="Scroll Left"
      >
        <span className="material-symbols-outlined text-xl group-hover:-translate-x-0.5 transition-transform">
          arrow_back
        </span>
      </button>
      <button
        onClick={() => scroll('right')}
        className="w-12 h-12 rounded-xl bg-[#1a1a1a] border border-white/10 text-white flex items-center justify-center hover:bg-[#252525] hover:border-white/20 active:scale-95 transition-all group"
        aria-label="Scroll Right"
      >
        <span className="material-symbols-outlined text-xl group-hover:translate-x-0.5 transition-transform">
          arrow_forward
        </span>
      </button>
    </div>

  </div>

  {/* Kontainer Slider Sertifikat */}
  <div
    ref={certificateContainerRef}
    className="flex overflow-x-auto gap-4 sm:gap-6 pb-6 scroll-smooth snap-x [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
  >
    {certificatesData.map((cert) => (
      <div
        key={cert.id}
        className="flex-none w-[85%] sm:w-[48%] lg:w-[31%] snap-start bg-[#1a1a1a] p-4 sm:p-5 rounded-2xl border border-white/5 flex flex-col justify-between"
      >
        <div>
          <img
            src={cert.image}
            alt={cert.title}
            className="w-full aspect-[4/3] object-cover rounded-xl mb-3 sm:mb-4 bg-black/20"
          />
          <span className="text-[10px] sm:text-xs text-[#00bfff] font-bold tracking-widest uppercase block mb-2">
            {cert.category}
          </span>
          <h3 className="text-white font-bold text-sm sm:text-base md:text-lg leading-snug line-clamp-2">
            {cert.title}
          </h3>
        </div>
        <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-white/5 flex justify-between items-center text-gray-400 text-xs">
          <span className="truncate max-w-[70%]">{cert.issuer}</span>
          <span className="font-mono">{cert.date}</span>
        </div>
      </div>
    ))}
  </div>

</section>

        {/* Get In Touch Section */}
    <section className="mb-40 px-4 sm:px-6 md:px-12 lg:px-16 scroll-reveal-target" id="contact">
      <div className="bg-[#0f0f0f] border border-white/5 rounded-[24px] sm:rounded-[32px] md:rounded-[48px] p-6 sm:p-8 md:p-12 lg:p-16 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] md:w-[400px] md:h-[400px] bg-[#00bfff]/10 blur-[80px] sm:blur-[100px] md:blur-[120px] -z-10 rounded-full"></div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 md:gap-16 lg:gap-20">

          {/* --- BAGIAN KIRI (Teks & Info) --- */}
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="h-[2px] w-8 bg-[#86a8c3]"></div>
              <span className="text-[#86a8c3] font-bold text-sm uppercase tracking-widest">Connect</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl uppercase text-white leading-[0.9] mb-4 sm:mb-6 md:mb-8 tracking-wide">
              LET'S BUILD <br/>
              SOMETHING <br/>
              <span className="text-[#00bfff] [text-shadow:0_0_25px_rgba(0,191,255,0.8)]">SMART</span> TOGETHER
            </h2>
            <p className="text-gray-300 text-base sm:text-lg md:text-xl mb-8 sm:mb-12 max-w-md">
              Saya terbuka untuk kolaborasi proyek AI, Web Development, atau riset data science. Hubungi saya sekarang.
            </p>

            <div className="space-y-6 sm:space-y-8">
              <div className="flex items-center gap-4 sm:gap-6 group">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#1a1a1a] border border-white/5 flex items-center justify-center group-hover:border-[#00bfff]/50 transition-all">
                  <span className="material-symbols-outlined text-[#86a8c3]">mail</span>
                </div>
                <div>
                  <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">Email Me</p>
                  <p className="text-white font-bold text-sm sm:text-base md:text-lg">renaldy.syaputra2103@gmail.com</p>
                </div>
              </div>
              <div className="flex items-center gap-4 sm:gap-6 group">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#1a1a1a] border border-white/5 flex items-center justify-center group-hover:border-[#00bfff]/50 transition-all">
                  <span className="material-symbols-outlined text-[#86a8c3]">location_on</span>
                </div>
                <div>
                  <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">Location</p>
                  <p className="text-white font-bold text-sm sm:text-base md:text-lg">Malang, Indonesia</p>
                </div>
              </div>
            </div>
          </div>

          {/* --- BAGIAN KANAN (Formulir Terhubung EmailJS) --- */}
          {/* Tambahkan ref dan onSubmit di sini */}
          <form ref={form} onSubmit={sendEmail} className="space-y-4 sm:space-y-6 flex flex-col justify-center">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Nama Lengkap</label>
                {/* Atribut name="name" ditambahkan */}
                <input name="name" required className="w-full bg-[#1a1a1a] border border-white/5 rounded-2xl px-4 sm:px-6 py-3 sm:py-4 text-white focus:border-[#00bfff] focus:ring-0 outline-none transition-all placeholder:text-gray-600" placeholder="Nama Anda" type="text"/>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Alamat Email</label>
                {/* Atribut name="email" ditambahkan */}
                <input name="email" required className="w-full bg-[#1a1a1a] border border-white/5 rounded-2xl px-4 sm:px-6 py-3 sm:py-4 text-white focus:border-[#00bfff] focus:ring-0 outline-none transition-all placeholder:text-gray-600" placeholder="email@example.com" type="email"/>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Topik Pesan</label>
              {/* Atribut name="title" ditambahkan */}
              <input name="title" required className="w-full bg-[#1a1a1a] border border-white/5 rounded-2xl px-4 sm:px-6 py-3 sm:py-4 text-white focus:border-[#00bfff] focus:ring-0 outline-none transition-all placeholder:text-gray-600" placeholder="Web Development / AI Research" type="text"/>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Detail Pesan</label>
              {/* Atribut name="message" ditambahkan */}
              <textarea name="message" required className="w-full bg-[#1a1a1a] border border-white/5 rounded-2xl px-4 sm:px-6 py-3 sm:py-4 text-white focus:border-[#00bfff] focus:ring-0 outline-none transition-all placeholder:text-gray-600 min-h-[120px] sm:min-h-[160px] resize-y" placeholder="Bagaimana saya bisa membantu Anda?"></textarea>
            </div>

            {/* Tombol Kirim Dinamis */}
            <button
              disabled={isSubmitting}
              className={`w-full font-bold py-3 sm:py-4 rounded-xl transition-all mt-2 text-sm sm:text-base uppercase tracking-wide flex justify-center items-center gap-2
                ${isSubmitting ? 'bg-gray-500 text-gray-300 cursor-not-allowed' : 'bg-[#9bd2fd] text-[#1a2b3c] hover:shadow-[0_0_25px_rgba(155,210,253,0.3)]'}
              `}
              type="submit"
            >
              {isSubmitting ? 'MENGIRIM PESAN...' : 'KIRIM PESAN SEKARANG'}
            </button>

            {/* Notifikasi Berhasil / Gagal */}
            {submitStatus === 'success' && (
              <p className="text-green-400 text-sm text-center font-bold mt-2">✅ Pesan Anda berhasil dikirim!</p>
            )}
            {submitStatus === 'error' && (
              <p className="text-red-400 text-sm text-center font-bold mt-2">❌ Gagal mengirim pesan. Silakan coba lagi.</p>
            )}

          </form>

    </div>
  </div>
</section>
      </main>
    </>
  );
}

export default Home;
