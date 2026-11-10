import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaGithub, FaEye, FaArrowRight } from "react-icons/fa";
import emailjs from '@emailjs/browser';
import LogoLoop from "../components/LogoLoop";
import Aurora from "../components/Aurora";
import CoolProfileCard from "../components/CoolProfileCard";
import JourneyTimeline from "../components/JourneyTimeline";
import fotoProfil from "../assets/PhotoProfile.jpeg";
import { projectsData } from "../data/projectsData";
import { certificatesData } from "../data/certificatesData";
import ProjectDetailModal from "../components/ProjectDetailModal";
import CertificateModal from "../components/CertificateModal";


function Home() {
  const projects = projectsData;

  // ==========================================
  // 2. STATE & REF UTAMA
  // ==========================================
  // State untuk pagination project
  const [currentPage, setCurrentPage] = useState(0);
  const cardsPerPage = 2;
  const totalPages = Math.ceil(projects.length / cardsPerPage);

  // State & Ref untuk sertifikat
  const certificateContainerRef = useRef(null);

  // Ref & State untuk EmailJS form kontak
  const form = useRef();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  // Modal State untuk Project & Certificate
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(null);
  const [selectedCertificateIndex, setSelectedCertificateIndex] = useState(null);

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

  // Navigasi modal project
  const handlePrevProject = () => {
    setSelectedProjectIndex((prev) => {
      if (prev === null) return null;
      return (prev - 1 + projects.length) % projects.length;
    });
  };

  const handleNextProject = () => {
    setSelectedProjectIndex((prev) => {
      if (prev === null) return null;
      return (prev + 1) % projects.length;
    });
  };

  // Navigasi modal sertifikat
  const handlePrevCert = () => {
    setSelectedCertificateIndex((prev) => {
      if (prev === null) return null;
      return (prev - 1 + certificatesData.length) % certificatesData.length;
    });
  };

  const handleNextCert = () => {
    setSelectedCertificateIndex((prev) => {
      if (prev === null) return null;
      return (prev + 1) % certificatesData.length;
    });
  };

  // Fungsi scroll slider untuk sertifikat
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
    <div className="overflow-x-hidden">
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

      <main className="max-w-10xl mx-auto px-4 sm:px-6 md:px-12 lg:px-16 pt-24 sm:pt-32 md:pt-40">
      <section className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-16 min-h-[70vh] mb-20 sm:mb-28 lg:mb-40 relative scroll-reveal-target" id="home">
      <div className="flex-1 order-2 lg:order-1 text-center lg:text-left">
        <p className="text-primary font-label-caps tracking-[0.3em] mb-6 uppercase fade-in delay-100 scroll-reveal-target">
          Hi, I'm {" "}
          <span className="inline-block transition-all duration-300 hover:text-[#00bfff] hover:scale-105 hover:drop-shadow-[0_0_15px_rgba(0,191,255,0.8)] cursor-default">
            Moch Renaldy Syaputra
          </span>
        </p>
        <h1 className="font-headline-lg text-3xl sm:text-4xl md:text-5xl lg:text-6xl uppercase leading-tight mb-6">
          {/* Blue Part + Glow */}
          <span className="block text-[#00bfff] [text-shadow:0_0_25px_rgba(0,191,255,0.6)] slide-left delay-200 scroll-reveal-target">
            TECH ENTHUSIAST
          </span>
          {/* White Part */}
          <span className="block text-white mt-1 slide-left delay-300 scroll-reveal-target">
            & AI EXPLORER
          </span>
        </h1>
        <p className="font-body-lg text-on-surface-variant max-w-xl mb-12 mx-auto lg:mx-0 fade-in delay-400 scroll-reveal-target">
          A Computer Science student and software developer focusing on Artificial Intelligence, Computer Vision, and modern web applications. Combining intelligent algorithms with robust full-stack engineering.
        </p>
        
        {/* Buttons & Icons Container */}
        <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 fade-in delay-500 scroll-reveal-target">
          <a className="bg-[#C1E3FC] text-[#2C3E50] px-6 py-3.5 sm:px-8 sm:py-4 md:px-9 md:py-5 rounded-full font-bold uppercase tracking-wide inline-block hover:scale-105 transition-transform text-sm sm:text-base" href="#projects"> 
            My Project 
          </a>
          
          <a className="border border-primary/40 text-primary px-6 py-3.5 sm:px-8 sm:py-4 md:px-9 md:py-5 rounded-full font-bold hover:bg-primary/10 transition-all transform hover:-translate-y-1 flex items-center gap-2 text-sm sm:text-base" href="/cv.pdf" download="cv-moch-renaldy-syaputra.pdf"> 
            <span className="material-symbols-outlined text-lg sm:text-xl">download</span> Download CV
          </a>

          {/* Social Media Icons */}
          <div className="flex items-center gap-5 ml-0 sm:ml-2 mt-2 sm:mt-0">
            {/* GitHub Icon */}
            <a href="https://github.com/Renaldy2103/Renaldy2103" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition-colors hover:scale-110 transform duration-200" aria-label="GitHub">
              <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
              </svg>
            </a>
            
            {/* LinkedIn Icon */}
            <a href="https://www.linkedin.com/in/moch-renaldy-syaputra-a19552288" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-[#0a66c2] transition-colors hover:scale-110 transform duration-200" aria-label="LinkedIn">
              <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
            </a>
          </div>
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
                  I am a passionate <span className="text-white font-bold">Software Developer & Computer Science Student</span> exploring the frontiers of <span className="text-primary">Artificial Intelligence, Machine Learning, and Computer Vision</span>.
                </p>
                <p className="font-body-lg text-on-surface-variant leading-relaxed fade-in delay-300 scroll-reveal-target">
                  Driven by core computer science principles and a builder's mindset, I combine algorithmic foundations with practical software engineering. My focus centers on developing intelligent systems, implementing computer vision solutions, and crafting robust, full-stack web applications that solve real-world problems.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 sm:gap-6">
                <div className="glass-card rounded-2xl p-4 sm:p-6 flex flex-col items-center justify-center text-center">
                  <span className="text-primary font-headline-lg text-3xl sm:text-4xl cyber-text-glow">CS</span>
                  <span className="text-label-caps text-on-surface-variant uppercase mt-2 text-xs sm:text-sm">Student Developer</span>
                </div>
                <div className="glass-card rounded-2xl p-4 sm:p-6 flex flex-col items-center justify-center text-center">
                  <span className="text-primary font-headline-lg text-3xl sm:text-4xl cyber-text-glow">AI</span>
                  <span className="text-label-caps text-on-surface-variant uppercase mt-2 text-xs sm:text-sm">Machine Learning</span>
                </div>
                <div className="glass-card rounded-2xl p-4 sm:p-6 flex items-center gap-3 sm:gap-4">
                  <span className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-primary/10 border border-white/10 flex items-center justify-center">
                    <span className="material-symbols-outlined text-[#00bfff] text-lg sm:text-xl">psychology</span>
                  </span>
                  <div>
                    <p className="text-primary font-label-caps text-xs uppercase tracking-widest">Focus</p>
                    <p className="text-on-surface-variant mt-1 text-xs sm:text-sm">Computer Vision & AI</p>
                  </div>
                </div>
                <div className="glass-card rounded-2xl p-4 sm:p-6 flex items-center gap-3 sm:gap-4">
                  <span className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-primary/10 border border-white/10 flex items-center justify-center">
                    <span className="material-symbols-outlined text-[#00bfff] text-lg sm:text-xl">code</span>
                  </span>
                  <div>
                    <p className="text-primary font-label-caps text-xs uppercase tracking-widest">Engineering</p>
                    <p className="text-on-surface-variant mt-1 text-xs sm:text-sm">Full-Stack & Python</p>
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

      {/* Tech Stack Cards Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-20">
        
        {/* Card 1: Programming Languages */}
        <div className="glass-card rounded-xl p-8 transition-all duration-300 hover:border-[#00bfff]/50 hover:shadow-[0_0_20px_rgba(0,191,255,0.15)] group relative overflow-hidden fade-in delay-100 scroll-reveal-target">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-[2px] bg-[#00bfff] blur-[4px] opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <h3 className="text-white font-bold text-xl mb-6">Programming Languages</h3>
          <ul className="space-y-4 font-medium">
            <li className="flex items-center gap-4 text-gray-300 hover:text-white transition-colors"><img alt="Python" className="w-6 h-6 object-contain" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" /> Python</li>
            <li className="flex items-center gap-4 text-gray-300 hover:text-white transition-colors"><img alt="PHP" className="w-6 h-6 object-contain" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg" /> PHP</li>
            <li className="flex items-center gap-4 text-gray-300 hover:text-white transition-colors"><img alt="JavaScript" className="w-6 h-6 object-contain" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" /> JavaScript</li>
            <li className="flex items-center gap-4 text-gray-300 hover:text-white transition-colors"><img alt="Java" className="w-6 h-6 object-contain" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg" /> Java</li>
            <li className="flex items-center gap-4 text-gray-300 hover:text-white transition-colors"><img alt="C++" className="w-6 h-6 object-contain" src="https://cdn.simpleicons.org/cplusplus/white" /> C++</li>
          </ul>
        </div>

        {/* Card 2: Frontend Development */}
        <div className="glass-card rounded-xl p-8 transition-all duration-300 hover:border-[#00bfff]/50 hover:shadow-[0_0_20px_rgba(0,191,255,0.15)] group relative overflow-hidden fade-in delay-200 scroll-reveal-target">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-[2px] bg-[#00bfff] blur-[4px] opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <h3 className="text-white font-bold text-xl mb-6">Frontend Development</h3>
          <ul className="space-y-4 font-medium">
            <li className="flex items-center gap-4 text-gray-300 hover:text-white transition-colors"><img alt="React" className="w-6 h-6 object-contain" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" /> React JS</li>
            <li className="flex items-center gap-4 text-gray-300 hover:text-white transition-colors"><img alt="HTML5" className="w-6 h-6 object-contain" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg" /> HTML5</li>
            <li className="flex items-center gap-4 text-gray-300 hover:text-white transition-colors"><img alt="CSS3" className="w-6 h-6 object-contain" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg" /> CSS3</li>
            <li className="flex items-center gap-4 text-gray-300 hover:text-white transition-colors"><img alt="Vue.js" className="w-6 h-6 object-contain" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vuejs/vuejs-original.svg" /> Vue.js</li>
            <li className="flex items-center gap-4 text-gray-300 hover:text-white transition-colors"><img alt="Bootstrap" className="w-6 h-6 object-contain" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bootstrap/bootstrap-original.svg" /> Bootstrap</li>
            <li className="flex items-center gap-4 text-gray-300 hover:text-white transition-colors"><img alt="Tailwind CSS" className="w-6 h-6 object-contain" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" /> Tailwind CSS</li>
          </ul>
        </div>

        {/* Card 3: Backend Development */}
        <div className="glass-card rounded-xl p-8 transition-all duration-300 hover:border-[#00bfff]/50 hover:shadow-[0_0_20px_rgba(0,191,255,0.15)] group relative overflow-hidden fade-in delay-300 scroll-reveal-target">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-[2px] bg-[#00bfff] blur-[4px] opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <h3 className="text-white font-bold text-xl mb-6">Backend Development</h3>
          <ul className="space-y-4 font-medium">
            <li className="flex items-center gap-4 text-gray-300 hover:text-white transition-colors"><img alt="Node.js" className="w-6 h-6 object-contain" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg" /> Node.js</li>
            <li className="flex items-center gap-4 text-gray-300 hover:text-white transition-colors"><img alt="Laravel" className="w-6 h-6 object-contain" src="https://cdn.simpleicons.org/laravel/FF2D20" /> Laravel</li>
            <li className="flex items-center gap-4 text-gray-300 hover:text-white transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path></svg> 
              REST APIs
            </li>
            <li className="flex items-center gap-4 text-gray-300 hover:text-white transition-colors"><img alt="JWT" className="w-6 h-6 object-contain" src="https://cdn.simpleicons.org/jsonwebtokens/white" /> JWT</li>
          </ul>
        </div>

        {/* Card 4: Database & Development Tools */}
        <div className="glass-card rounded-xl p-8 transition-all duration-300 hover:border-[#00bfff]/50 hover:shadow-[0_0_20px_rgba(0,191,255,0.15)] group relative overflow-hidden fade-in delay-400 scroll-reveal-target">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-[2px] bg-[#00bfff] blur-[4px] opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <h3 className="text-white font-bold text-xl mb-6">Database & Tools</h3>
          <ul className="space-y-4 font-medium">
            <li className="flex items-center gap-4 text-gray-300 hover:text-white transition-colors"><img alt="MySQL" className="w-6 h-6 object-contain" src="https://cdn.simpleicons.org/mysql/white" /> MySQL</li>
            <li className="flex items-center gap-4 text-gray-300 hover:text-white transition-colors"><img alt="Git" className="w-6 h-6 object-contain" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg" /> Git</li>
            <li className="flex items-center gap-4 text-gray-300 hover:text-white transition-colors"><img alt="GitHub" className="w-6 h-6 object-contain" src="https://cdn.simpleicons.org/github/white" /> GitHub</li>
            <li className="flex items-center gap-4 text-gray-300 hover:text-white transition-colors"><img alt="Docker" className="w-6 h-6 object-contain" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg" /> Docker</li>
            <li className="flex items-center gap-4 text-gray-300 hover:text-white transition-colors"><img alt="VS Code" className="w-6 h-6 object-contain" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg" /> VS Code</li>
            <li className="flex items-center gap-4 text-gray-300 hover:text-white transition-colors"><img alt="XAMPP" className="w-6 h-6 object-contain" src="https://cdn.simpleicons.org/xampp/white" /> XAMPP</li>
          </ul>
        </div>

        {/* Card 5: Mobile, Game & Data AI */}
        <div className="glass-card rounded-xl p-8 transition-all duration-300 hover:border-[#00bfff]/50 hover:shadow-[0_0_20px_rgba(0,191,255,0.15)] group relative overflow-hidden fade-in delay-500 scroll-reveal-target">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-[2px] bg-[#00bfff] blur-[4px] opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <h3 className="text-white font-bold text-xl mb-6">Mobile, Game & AI</h3>
          <ul className="space-y-4 font-medium">
            <li className="flex items-center gap-4 text-gray-300 hover:text-white transition-colors"><img alt="Flutter" className="w-6 h-6 object-contain" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flutter/flutter-original.svg" /> Flutter</li>
            <li className="flex items-center gap-4 text-gray-300 hover:text-white transition-colors"><img alt="Unity" className="w-6 h-6 object-contain" src="https://cdn.simpleicons.org/unity/white" /> Unity</li>
            <li className="flex items-center gap-4 text-gray-300 hover:text-white transition-colors"><img alt="Google Colab" className="w-6 h-6 object-contain" src="https://cdn.simpleicons.org/googlecolab/white" /> Google Colab</li>
            <li className="flex items-center gap-4 text-gray-300 hover:text-white transition-colors"><img alt="Roboflow" className="w-6 h-6 object-contain" src="https://cdn.simpleicons.org/roboflow/white" /> Roboflow</li>
          </ul>
        </div>

      </div>
    </section>

        <JourneyTimeline />

{/* My Work Section */}
    <section
      className="mb-20 sm:mb-28 lg:mb-40 scroll-reveal-target"
      id="projects"
    >
      {/* HEADER */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-6">
        <div>
          <div className="flex items-center gap-4 mb-3">
            <div className="h-[2px] w-8 bg-[#00bfff]"></div>
            <span className="text-[#00bfff] font-bold text-xs uppercase tracking-widest">
              Featured Projects & Selected Works
            </span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl uppercase text-white tracking-wide [text-shadow:-1.5px_0_#00bfff,1.5px_0_#ff4500]">
            My Work
          </h2>
          <p className="text-gray-400 text-sm sm:text-base max-w-2xl mt-3">
            Curated software engineering systems, AI/ML pipelines, and interactive web applications. Click any card to explore full technical summaries, architectures, and source code.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 bg-[#00bfff] text-black px-5 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider hover:scale-105 active:scale-95 transition-all shadow-[0_0_20px_rgba(0,191,255,0.35)]"
          >
            <span>Explore All Projects</span>
            <FaArrowRight size={11} />
          </Link>

          <a
            href="https://github.com/Renaldy2103?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-white/10 hover:border-white/20 px-4 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider transition-all"
          >
            <FaGithub size={14} />
            <span>GitHub</span>
          </a>

          <div className="flex items-center gap-2 ml-2">
            <span className="text-xs font-mono text-gray-400 mr-2">
              {currentPage + 1}/{totalPages}
            </span>
            <button
              onClick={prevSlide}
              disabled={currentPage === 0}
              className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all ${
                currentPage === 0
                  ? 'border-white/5 text-gray-600 cursor-not-allowed'
                  : 'border-white/15 text-white hover:border-[#00bfff] hover:text-[#00bfff] hover:bg-[#00bfff]/10'
              }`}
              aria-label="Previous Projects"
            >
              <span className="material-symbols-outlined text-lg">arrow_back</span>
            </button>

            <button
              onClick={nextSlide}
              disabled={currentPage >= totalPages - 1}
              className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all ${
                currentPage >= totalPages - 1
                  ? 'border-white/5 text-gray-600 cursor-not-allowed'
                  : 'border-white/15 text-white hover:border-[#00bfff] hover:text-[#00bfff] hover:bg-[#00bfff]/10'
              }`}
              aria-label="Next Projects"
            >
              <span className="material-symbols-outlined text-lg">arrow_forward</span>
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
                .map((project, index) => {
                  const globalIndex = pageIndex * cardsPerPage + index;
                  return (
                    <div
                      key={project.id || index}
                      onClick={() => setSelectedProjectIndex(globalIndex)}
                      className="group relative glass-card rounded-[32px] overflow-hidden cursor-pointer border border-white/10 hover:border-[#00bfff]/60 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_0_35px_rgba(0,191,255,0.22)] flex flex-col justify-between"
                    >
                      <div>
                        {/* Image Preview with Hover Action */}
                        <div className="aspect-[16/10] overflow-hidden relative bg-black/40">
                          <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#111317] via-transparent to-transparent opacity-80" />

                          {/* Hover CTA Button */}
                          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <span className="inline-flex items-center gap-2 bg-[#00bfff] text-black px-5 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(0,191,255,0.6)] transform translate-y-3 group-hover:translate-y-0 transition-transform duration-300">
                              <FaEye size={13} />
                              <span>View Project Details</span>
                            </span>
                          </div>

                          {/* Category Badge */}
                          <div className="absolute top-4 left-4 z-10">
                            <span className="bg-black/70 backdrop-blur-md text-[#00bfff] px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-widest border border-[#00bfff]/30">
                              {project.category}
                            </span>
                          </div>
                        </div>

                        {/* Card Body */}
                        <div className="p-6 sm:p-8">
                          <h3 className="font-title-md text-xl sm:text-2xl text-white group-hover:text-[#00bfff] transition-colors mb-3 line-clamp-1 font-bold">
                            {project.title}
                          </h3>

                          <p className="text-gray-400 mb-6 text-xs sm:text-sm leading-relaxed line-clamp-2">
                            {project.description}
                          </p>

                          <div className="flex flex-wrap gap-2 mb-4">
                            {project.tech.map((item) => (
                              <span
                                key={item}
                                className="text-[11px] text-[#00bfff] font-bold tracking-wider flex items-center gap-1.5 bg-[#00bfff]/5 border border-[#00bfff]/20 px-2.5 py-1 rounded-full"
                              >
                                <span className="w-1.5 h-1.5 rounded-full bg-[#00bfff]"></span>
                                {item}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Card Footer */}
                      <div className="px-6 sm:px-8 py-4 border-t border-white/5 flex items-center justify-between text-xs">
                        <span className="text-gray-400 group-hover:text-white transition-colors font-medium flex items-center gap-1">
                          <span>View project details</span>
                          <span className="group-hover:translate-x-1 transition-transform">→</span>
                        </span>

                        {project.github && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="p-2 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-all"
                            aria-label={`GitHub repo for ${project.title}`}
                          >
                            <FaGithub size={18} />
                          </a>
                        )}
                      </div>
                    </div>
                  );
                })}
            </div>
          ))}
        </div>
      </div>

      {/* Project Detail Modal */}
      {selectedProjectIndex !== null && (
        <ProjectDetailModal
          project={projects[selectedProjectIndex]}
          onClose={() => setSelectedProjectIndex(null)}
          onPrev={handlePrevProject}
          onNext={handleNextProject}
          currentIndex={selectedProjectIndex}
          total={projects.length}
        />
      )}
    </section>

  {/* CERTIFICATES & ACHIEVEMENTS SECTION */}
  {/* ========================================================= */}
  <section className="mb-20 sm:mb-28 lg:mb-40 scroll-reveal-target relative" id="certificates">
    {/* Header */}
    <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6 relative">
      <div>
        <div className="flex items-center gap-4 mb-3">
          <div className="h-[2px] w-8 bg-[#00bfff]"></div>
          <span className="text-[#00bfff] font-bold text-xs uppercase tracking-widest">
            Validations & Credentials
          </span>
        </div>
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl uppercase tracking-wide leading-tight mb-3">
          <span className="text-white">Certificates & </span>
          <span className="text-[#00bfff] [text-shadow:0_0_20px_rgba(0,191,255,0.4)]">Achievements</span>
        </h2>
        <p className="text-gray-400 max-w-xl text-xs sm:text-sm">
          Official industry credentials, national vocational competencies, and verified technical certificates. Click any card to preview full credentials.
        </p>
      </div>

      {/* Header Actions */}
      <div className="flex flex-wrap items-center gap-3">
        <Link
          to="/certificates"
          className="inline-flex items-center gap-2 bg-[#00bfff] text-black px-5 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider hover:scale-105 active:scale-95 transition-all shadow-[0_0_20px_rgba(0,191,255,0.35)]"
        >
          <span>Explore All Certificates</span>
          <FaArrowRight size={11} />
        </Link>

        <div className="flex gap-2">
          <button
            onClick={() => scroll('left')}
            className="w-10 h-10 rounded-full bg-[#1a1a1a] border border-white/15 text-white flex items-center justify-center hover:bg-[#252525] hover:border-[#00bfff] hover:text-[#00bfff] active:scale-95 transition-all group"
            aria-label="Scroll Left"
          >
            <span className="material-symbols-outlined text-lg group-hover:-translate-x-0.5 transition-transform">
              arrow_back
            </span>
          </button>
          <button
            onClick={() => scroll('right')}
            className="w-10 h-10 rounded-full bg-[#1a1a1a] border border-white/15 text-white flex items-center justify-center hover:bg-[#252525] hover:border-[#00bfff] hover:text-[#00bfff] active:scale-95 transition-all group"
            aria-label="Scroll Right"
          >
            <span className="material-symbols-outlined text-lg group-hover:translate-x-0.5 transition-transform">
              arrow_forward
            </span>
          </button>
        </div>
      </div>
    </div>

    {/* Kontainer Slider Sertifikat */}
    <div
      ref={certificateContainerRef}
      className="flex overflow-x-auto gap-6 pb-6 scroll-smooth snap-x [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    >
      {certificatesData.map((cert, index) => (
        <div
          key={cert.id}
          onClick={() => setSelectedCertificateIndex(index)}
          className="flex-none w-[88%] sm:w-[48%] lg:w-[32%] snap-start glass-card rounded-[26px] overflow-hidden cursor-pointer border border-white/10 hover:border-[#00bfff]/60 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_0_25px_rgba(0,191,255,0.2)] flex flex-col justify-between group"
        >
          <div>
            {/* Image Container with Zoom & Hover CTA */}
            <div className="aspect-[4/3] bg-black/40 overflow-hidden relative">
              <img
                src={cert.image}
                alt={cert.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#111317] via-transparent to-transparent opacity-60" />

              <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="inline-flex items-center gap-1.5 bg-[#00bfff] text-black px-4 py-2 rounded-full font-bold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(0,191,255,0.6)] transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <FaEye size={12} />
                  <span>View Credential</span>
                </span>
              </div>

              <div className="absolute top-3 left-3 z-10">
                <span className="bg-black/70 backdrop-blur-md text-[#00bfff] px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border border-[#00bfff]/30">
                  {cert.category}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-5">
              <h3 className="text-white font-bold text-base leading-snug group-hover:text-[#00bfff] transition-colors line-clamp-2 mb-2">
                {cert.title}
              </h3>
              {cert.description && (
                <p className="text-gray-400 text-xs line-clamp-2 leading-relaxed mb-3">
                  {cert.description}
                </p>
              )}
              {cert.skills && cert.skills.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {cert.skills.slice(0, 3).map((skill) => (
                    <span
                      key={skill}
                      className="bg-white/5 text-gray-300 text-[10px] px-2 py-0.5 rounded border border-white/5"
                    >
                      {skill}
                    </span>
                  ))}
                  {cert.skills.length > 3 && (
                    <span className="text-[10px] text-gray-500 font-mono py-0.5 px-1">
                      +{cert.skills.length - 3}
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="px-5 py-3 border-t border-white/5 flex justify-between items-center text-gray-400 text-xs">
            <span className="truncate max-w-[65%] font-medium text-gray-300">{cert.issuer}</span>
            <span className="font-mono text-gray-400">{cert.date}</span>
          </div>
        </div>
      ))}
    </div>

    {/* Certificate Modal Component */}
    {selectedCertificateIndex !== null && (
      <CertificateModal
        certificate={certificatesData[selectedCertificateIndex]}
        onClose={() => setSelectedCertificateIndex(null)}
        onPrev={handlePrevCert}
        onNext={handleNextCert}
        currentIndex={selectedCertificateIndex}
        total={certificatesData.length}
      />
    )}
  </section>

        {/* Get In Touch Section */}
    <section className="mb-20 sm:mb-28 lg:mb-40 scroll-reveal-target" id="contact">
      <div className="bg-[#0f0f0f] border border-white/5 rounded-[24px] sm:rounded-[32px] md:rounded-[48px] p-6 sm:p-8 md:p-12 lg:p-16 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] md:w-[400px] md:h-[400px] bg-[#00bfff]/10 blur-[80px] sm:blur-[100px] md:blur-[120px] -z-10 rounded-full"></div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 md:gap-16 lg:gap-20">

 {/* Left Side (Text & Info) */}
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
            I am open to collaborating on AI projects, Web Development, or Data Science research. Contact me today.
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

          {/* Right Side (EmailJS Contact Form) */}
          {/* Add ref and onSubmit here */}
          <form ref={form} onSubmit={sendEmail} className="space-y-4 sm:space-y-6 flex flex-col justify-center">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Full Name</label>
                {/* Atribut name="name" ditambahkan */}
                <input name="name" required className="w-full bg-[#1a1a1a] border border-white/5 rounded-2xl px-4 sm:px-6 py-3 sm:py-4 text-white focus:border-[#00bfff] focus:ring-0 outline-none transition-all placeholder:text-gray-600" placeholder="Your name" type="text"/>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Email Address</label>
                {/* Atribut name="email" ditambahkan */}
                <input name="email" required className="w-full bg-[#1a1a1a] border border-white/5 rounded-2xl px-4 sm:px-6 py-3 sm:py-4 text-white focus:border-[#00bfff] focus:ring-0 outline-none transition-all placeholder:text-gray-600" placeholder="email@example.com" type="email"/>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Message Topic</label>
              {/* Atribut name="title" ditambahkan */}
              <input name="title" required className="w-full bg-[#1a1a1a] border border-white/5 rounded-2xl px-4 sm:px-6 py-3 sm:py-4 text-white focus:border-[#00bfff] focus:ring-0 outline-none transition-all placeholder:text-gray-600" placeholder="Web Development / AI Research" type="text"/>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Message Details</label>
              {/* Atribut name="message" ditambahkan */}
              <textarea name="message" required className="w-full bg-[#1a1a1a] border border-white/5 rounded-2xl px-4 sm:px-6 py-3 sm:py-4 text-white focus:border-[#00bfff] focus:ring-0 outline-none transition-all placeholder:text-gray-600 min-h-[120px] sm:min-h-[160px] resize-y" placeholder="How can I help you?"></textarea>
            </div>

              {/* Dynamic Send Button */}
            <button
              disabled={isSubmitting}
              className={`w-full font-bold py-3 sm:py-4 rounded-xl transition-all mt-2 text-sm sm:text-base uppercase tracking-wide flex justify-center items-center gap-2
                ${isSubmitting ? 'bg-gray-500 text-gray-300 cursor-not-allowed' : 'bg-[#9bd2fd] text-[#1a2b3c] hover:shadow-[0_0_25px_rgba(155,210,253,0.3)]'}
              `}
              type="submit"
            >
              {isSubmitting ? 'SENDING MESSAGE...' : 'SEND MESSAGE NOW'}
            </button>

            {/* Notification */}
            {submitStatus === 'success' && (
              <p className="text-green-400 text-sm text-center font-bold mt-2">✅ Your message has been sent!</p>
            )}
            {submitStatus === 'error' && (
              <p className="text-red-400 text-sm text-center font-bold mt-2">❌ Failed to send your message. Please try again.</p>
            )}

          </form>

    </div>
  </div>
</section>
      </main>
    </div>
  );
}

export default Home;
