import { useRef, useState, lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { FaGithub, FaEye, FaArrowRight } from 'react-icons/fa';
import emailjs from '@emailjs/browser';
import Elias from '@/components/ui/elias-author-hero';
import LogoLoop from '../components/LogoLoop';
import JourneyTimeline from '../components/JourneyTimeline';
import SplitHeading from '../components/SplitHeading';
import MotionCard from '../components/MotionCard';
import MagneticButton from '../components/MagneticButton';
import { projectsData } from '../data/projectsData';
import { certificatesData } from '../data/certificatesData';
import ProjectDetailModal from '../components/ProjectDetailModal';
import CertificateModal from '../components/CertificateModal';
import useMediaQuery from '../hooks/useMediaQuery';

const TechGlobe3D = lazy(() => import('../components/three/TechGlobe3D'));
const CyberOrb3D = lazy(() => import('../components/three/CyberOrb3D'));

const HERO_CASE_BOOKS = [
  {
    label: 'Backend Architecture',
    title: 'Inventory System',
    coverLines: ['Inventory', 'Management', 'System'],
    topics: ['FastAPI', 'PostgreSQL'],
    art: 'days',
    colors: { cover: '#0d1b2e', type: '#f8fafc', spine: '#00bfff' },
    chapter: 'Case Study 01',
    chapterTitle: 'Atomic Stock & Audit',
    text: 'Layered FastAPI & SQLAlchemy 2.x backend using SELECT FOR UPDATE row locks, 3-tier validation, and JWT RBAC.',
  },
  {
    label: 'Mobile Security App',
    title: 'ScamShield',
    coverLines: ['Scam', 'Shield', 'Defense'],
    topics: ['React Native', 'Expo 52'],
    art: 'lamp',
    colors: { cover: '#0b1f24', type: '#f8fafc', spine: '#14b8a6' },
    chapter: 'Case Study 02',
    chapterTitle: 'Zero-PII Fraud Check',
    text: 'Detects phishing URLs & SMS scams with explainable 0–100 risk scores, automatic PII redaction, and 100% offline heuristics.',
  },
  {
    label: 'Computer Vision AI',
    title: 'Fatigue Vision',
    coverLines: ['Real-Time', 'Fatigue', 'Vision'],
    topics: ['Python', 'OpenCV'],
    art: 'path',
    colors: { cover: '#11162b', type: '#f8fafc', spine: '#38bdf8' },
    chapter: 'Case Study 03',
    chapterTitle: 'Sub-250ms Alerting',
    text: 'Tracks 68 facial landmarks continuously to compute Eye Aspect Ratio (EAR) and trigger instant microsleep alarms.',
  },
  {
    label: 'Deep Learning',
    title: 'YOLOv11 Pipeline',
    coverLines: ['YOLOv11', 'Object', 'Pipeline'],
    topics: ['PyTorch', 'ONNX'],
    art: 'sunrise',
    colors: { cover: '#0b1526', type: '#f8fafc', spine: '#00bfff' },
    chapter: 'Case Study 04',
    chapterTitle: 'Edge Recognition',
    text: 'End-to-end multi-class detection trained on GPU with Roboflow augmentation and exported to ONNX for fast inference.',
  },
];

const HERO_BUILD_LETTER = {
  eyebrow: 'Engineering Build Log',
  greeting: '> renaldy.focus:',
  stamp: 'HIRE READY',
  postmark: 'MALANG',
  seal: 'MR',
  sealing: 'Committing engineering log',
  counter: 'Note',
  messages: [
    'Designing clean layered Python & FastAPI backends where concurrency, database constraints, and auditability come first.',
    'Building full-stack & mobile experiences in React, TypeScript, and Expo that stay fast, accessible, and resilient offline.',
    'Bridging practical Computer Vision and Machine Learning models with production-ready software engineering.',
    'Open for Junior Backend, Full-Stack, and AI Engineering opportunities — ready to ship clean, tested code.',
  ],
};

function Home() {
  const projects = projectsData;

  const isLg = useMediaQuery('(min-width: 1024px)');
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');

  // Responsive Project slider pagination (3 desktop, 2 tablet)
  const [currentPage, setCurrentPage] = useState(0);
  const cardsPerPage = isLg ? 3 : 2;
  const totalPages = Math.ceil(projects.length / cardsPerPage);
  const activeSlide = Math.min(currentPage, totalPages - 1);

  // Certificates horizontal scroll container
  const certificateContainerRef = useRef(null);

  // EmailJS contact form state
  const form = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  // Modal state for Project & Certificate details
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(null);
  const [selectedCertificateIndex, setSelectedCertificateIndex] = useState(null);

  const nextSlide = () => {
    setCurrentPage((prev) => {
      const clamped = Math.min(prev, totalPages - 1);
      return clamped < totalPages - 1 ? clamped + 1 : clamped;
    });
  };

  const prevSlide = () => {
    setCurrentPage((prev) => {
      const clamped = Math.min(prev, totalPages - 1);
      return clamped > 0 ? clamped - 1 : 0;
    });
  };

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

  const scroll = (direction) => {
    if (certificateContainerRef.current) {
      const { scrollLeft, clientWidth } = certificateContainerRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      certificateContainerRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  const sendEmail = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    emailjs
      .sendForm('service_r56up9s', 'template_jbyg2as', form.current, 'pHjP0kFkJyJPehZYM')
      .then(
        () => {
          setSubmitStatus('success');
          form.current.reset();
          setIsSubmitting(false);
          setTimeout(() => setSubmitStatus(null), 5000);
        },
        () => {
          setSubmitStatus('error');
          setIsSubmitting(false);
        }
      );
  };

  return (
    <div className="overflow-x-hidden">
      {/* =========================================
          EDITORIAL CYBER-DARK HERO (Elias + InkSplash Bootloader)
         ========================================= */}
      <Elias
        showNavbar={false}
        name={{ first: 'Renaldy', last: 'Syaputra' }}
        portrait={{
          src: '/PhotoProfileTrans.png',
          alt: 'Moch Renaldy Syaputra',
          width: 1247,
          height: 1261,
        }}
        intro={{
          roles: ['Backend Dev', 'AI & Vision', 'Full-Stack'],
          headline: ['Building reliable', 'backends & smart', 'AI systems.'],
          description:
            'Computer Science student & software engineer crafting clean FastAPI architectures, computer vision pipelines, and modern web & mobile apps.',
        }}
        ctas={[
          { label: 'My Projects', href: '#projects', primary: true },
          { label: 'Download CV', href: '/cv.pdf', download: 'cv-moch-renaldy-syaputra.pdf' },
        ]}
        books={HERO_CASE_BOOKS}
        bookCard={{
          href: '#projects',
          open: 'Inspect case study',
          close: 'Close and next project',
          folio: 'CASE',
        }}
        letter={HERO_BUILD_LETTER}
        socialLinks={[
          { label: 'GitHub', href: 'https://github.com/Renaldy2103' },
          { label: 'LinkedIn', href: 'https://www.linkedin.com/in/moch-renaldy-syaputra-a19552288' },
          { label: 'Projects', href: '#projects' },
          { label: 'Contact', href: '#contact' },
        ]}
      />

      <main className="max-w-10xl mx-auto px-4 sm:px-6 md:px-12 lg:px-16 pt-16 sm:pt-24">

        {/* =========================================
            ABOUT SECTION
           ========================================= */}
        <section className="mb-24" id="about">
          <div className="glass-card rounded-[24px] sm:rounded-[32px] p-6 sm:p-8 md:p-12">
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45 }}
              className="flex items-center gap-4 mb-6"
            >
              <div className="h-[2px] w-8 bg-[#86a8c3]"></div>
              <span className="text-[#86a8c3] font-bold text-xs sm:text-sm uppercase tracking-widest">
                INTRODUCTION
              </span>
            </motion.div>

            <SplitHeading
              as="h2"
              className="font-display text-3xl sm:text-4xl md:text-5xl text-white mb-6 tracking-wide font-bold"
            >
              About Me
            </SplitHeading>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
              <div>
                <motion.p
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.55 }}
                  className="font-body-lg text-on-surface-variant leading-relaxed mb-5 text-base sm:text-lg"
                >
                  I am a passionate{' '}
                  <span className="text-white font-bold">Software Developer &amp; Computer Science Student</span>{' '}
                  exploring the frontiers of{' '}
                  <span className="text-primary">Artificial Intelligence, Machine Learning, and Backend Systems</span>.
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.55, delay: 0.1 }}
                  className="font-body-lg text-on-surface-variant leading-relaxed text-sm sm:text-base"
                >
                  Driven by core computer science principles and a builder&apos;s mindset, I combine algorithmic foundations with clean software architecture. My focus centers on building reliable Python &amp; FastAPI backends, computer vision pipelines, and modern full-stack &amp; mobile applications.
                </motion.p>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:gap-5">
                <MotionCard index={0} className="glass-card rounded-2xl p-4 sm:p-6 flex flex-col items-center justify-center text-center border border-white/10 hover:border-[#00bfff]/50">
                  <span className="text-primary font-headline-lg text-2xl sm:text-4xl cyber-text-glow font-bold">CS</span>
                  <span className="text-label-caps text-on-surface-variant uppercase mt-1.5 sm:mt-2 text-[11px] sm:text-sm">
                    Student Developer
                  </span>
                </MotionCard>

                <MotionCard index={1} className="glass-card rounded-2xl p-4 sm:p-6 flex flex-col items-center justify-center text-center border border-white/10 hover:border-[#00bfff]/50">
                  <span className="text-primary font-headline-lg text-2xl sm:text-4xl cyber-text-glow font-bold">AI</span>
                  <span className="text-label-caps text-on-surface-variant uppercase mt-1.5 sm:mt-2 text-[11px] sm:text-sm">
                    Machine Learning
                  </span>
                </MotionCard>

                <MotionCard index={2} className="glass-card rounded-2xl p-3.5 sm:p-6 flex flex-col sm:flex-row items-center sm:items-center text-center sm:text-left gap-2.5 sm:gap-4 border border-white/10 hover:border-[#00bfff]/50">
                  <span className="w-9 h-9 sm:w-12 sm:h-12 rounded-xl bg-primary/10 border border-white/10 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[#00bfff] text-base sm:text-xl">psychology</span>
                  </span>
                  <div>
                    <p className="text-primary font-label-caps text-[10px] sm:text-xs uppercase tracking-widest">Focus</p>
                    <p className="text-on-surface-variant mt-0.5 sm:mt-1 text-[11px] sm:text-sm leading-snug">Computer Vision &amp; AI</p>
                  </div>
                </MotionCard>

                <MotionCard index={3} className="glass-card rounded-2xl p-3.5 sm:p-6 flex flex-col sm:flex-row items-center sm:items-center text-center sm:text-left gap-2.5 sm:gap-4 border border-white/10 hover:border-[#00bfff]/50">
                  <span className="w-9 h-9 sm:w-12 sm:h-12 rounded-xl bg-primary/10 border border-white/10 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[#00bfff] text-base sm:text-xl">code</span>
                  </span>
                  <div>
                    <p className="text-primary font-label-caps text-[10px] sm:text-xs uppercase tracking-widest">Engineering</p>
                    <p className="text-on-surface-variant mt-0.5 sm:mt-1 text-[11px] sm:text-sm leading-snug">Full-Stack &amp; Python</p>
                  </div>
                </MotionCard>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================
            TECH STACK SECTION + 3D TECH GLOBE (#3)
           ========================================= */}
        <section className="mb-28 sm:mb-36" id="tech-stack">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <motion.div
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45 }}
                className="flex items-center gap-4 mb-3"
              >
                <div className="h-[2px] w-8 bg-[#86a8c3]"></div>
                <span className="text-[#86a8c3] font-bold text-xs sm:text-sm uppercase tracking-widest">
                  TECH STACK
                </span>
              </motion.div>
              <SplitHeading
                as="h2"
                className="font-display text-3xl sm:text-4xl md:text-5xl text-white font-bold uppercase tracking-wide"
              >
                Skills &amp; Ecosystem
              </SplitHeading>
            </div>
            <p className="text-gray-400 text-xs sm:text-sm max-w-md">
              Explore my core backend, frontend, mobile, and AI toolset — drag the 3D globe below to inspect technologies interactively.
            </p>
          </div>

          <LogoLoop
            logos={[
              { node: <img alt="React" className="h-14 w-auto shrink-0 max-w-none object-contain" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" />, title: 'React' },
              { node: <img alt="Next.js" className="h-14 w-auto shrink-0 max-w-none object-contain" src="https://cdn.simpleicons.org/nextdotjs/white" />, title: 'Next.js' },
              { node: <img alt="Tailwind" className="h-14 w-auto shrink-0 max-w-none object-contain" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" />, title: 'Tailwind CSS' },
              { node: <img alt="TypeScript" className="h-14 w-auto shrink-0 max-w-none object-contain" src="https://cdn.simpleicons.org/typescript/white" />, title: 'TypeScript' },
              { node: <img alt="Python" className="h-14 w-auto shrink-0 max-w-none object-contain" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" />, title: 'Python' },
              { node: <img alt="FastAPI" className="h-14 w-auto shrink-0 max-w-none object-contain" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastapi/fastapi-original.svg" />, title: 'FastAPI' },
              { node: <img alt="PostgreSQL" className="h-14 w-auto shrink-0 max-w-none object-contain" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg" />, title: 'PostgreSQL' },
              { node: <img alt="PHP" className="h-14 w-auto shrink-0 max-w-none object-contain" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg" />, title: 'PHP' },
              { node: <img alt="JavaScript" className="h-14 w-auto shrink-0 max-w-none object-contain" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" />, title: 'JavaScript' },
              { node: <img alt="MySQL" className="h-14 w-auto shrink-0 max-w-none object-contain" src="https://cdn.simpleicons.org/mysql/white" />, title: 'MySQL' },
              { node: <img alt="Docker" className="h-14 w-auto shrink-0 max-w-none object-contain" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg" />, title: 'Docker' },
              { node: <img alt="Git" className="h-14 w-auto shrink-0 max-w-none object-contain" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg" />, title: 'Git' },
              { node: <img alt="VS Code" className="h-14 w-auto shrink-0 max-w-none object-contain" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg" />, title: 'VS Code' },
              { node: <img alt="Google Colab" className="h-14 w-auto shrink-0 max-w-none object-contain" src="https://cdn.simpleicons.org/googlecolab/white" />, title: 'Google Colab' },
              { node: <img alt="Roboflow" className="h-14 w-auto shrink-0 max-w-none object-contain" src="https://cdn.simpleicons.org/roboflow/white" />, title: 'Roboflow' },
            ]}
            speed={85}
            direction="left"
            logoHeight={56}
            gap={56}
            hoverSpeed={0}
            ariaLabel="Tech stack logos"
          />

          {/* 3D Orbiting Tech Stack Globe (#3) */}
          {!prefersReducedMotion && (
            <div className="mt-12">
              <Suspense
                fallback={
                  <div className="w-full h-[360px] rounded-3xl glass-card border border-white/10 flex items-center justify-center text-xs font-mono text-gray-400">
                    INITIALIZING 3D TECH GLOBE...
                  </div>
                }
              >
                <TechGlobe3D />
              </Suspense>
            </div>
          )}

          {/* Tech Stack Categorized Motion Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6 mt-10">
            {/* Card 1: Programming Languages */}
            <MotionCard
              index={0}
              className="glass-card rounded-2xl p-6 sm:p-7 transition-colors duration-300 hover:border-[#00bfff]/50 hover:shadow-[0_0_24px_rgba(0,191,255,0.14)] overflow-hidden"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-[2px] bg-[#00bfff] blur-[3px] opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <h3 className="text-white font-bold text-lg mb-5">Programming Languages</h3>
              <ul className="space-y-3.5 text-sm font-medium">
                <li className="flex items-center gap-3.5 text-gray-300 hover:text-white transition-colors"><img alt="Python" className="w-5 h-5 object-contain" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" /> Python</li>
                <li className="flex items-center gap-3.5 text-gray-300 hover:text-white transition-colors"><img alt="TypeScript" className="w-5 h-5 object-contain" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" /> TypeScript</li>
                <li className="flex items-center gap-3.5 text-gray-300 hover:text-white transition-colors"><img alt="JavaScript" className="w-5 h-5 object-contain" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" /> JavaScript</li>
                <li className="flex items-center gap-3.5 text-gray-300 hover:text-white transition-colors"><img alt="PHP" className="w-5 h-5 object-contain" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg" /> PHP</li>
                <li className="flex items-center gap-3.5 text-gray-300 hover:text-white transition-colors"><img alt="Java" className="w-5 h-5 object-contain" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg" /> Java &amp; C++</li>
              </ul>
            </MotionCard>

            {/* Card 2: Frontend Development */}
            <MotionCard
              index={1}
              className="glass-card rounded-2xl p-6 sm:p-7 transition-colors duration-300 hover:border-[#00bfff]/50 hover:shadow-[0_0_24px_rgba(0,191,255,0.14)] overflow-hidden"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-[2px] bg-[#00bfff] blur-[3px] opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <h3 className="text-white font-bold text-lg mb-5">Frontend Development</h3>
              <ul className="space-y-3.5 text-sm font-medium">
                <li className="flex items-center gap-3.5 text-gray-300 hover:text-white transition-colors"><img alt="React" className="w-5 h-5 object-contain" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" /> React JS</li>
                <li className="flex items-center gap-3.5 text-gray-300 hover:text-white transition-colors"><img alt="Tailwind CSS" className="w-5 h-5 object-contain" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" /> Tailwind CSS</li>
                <li className="flex items-center gap-3.5 text-gray-300 hover:text-white transition-colors"><img alt="Vue.js" className="w-5 h-5 object-contain" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vuejs/vuejs-original.svg" /> Vue.js</li>
                <li className="flex items-center gap-3.5 text-gray-300 hover:text-white transition-colors"><img alt="HTML5" className="w-5 h-5 object-contain" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg" /> HTML5 &amp; CSS3</li>
                <li className="flex items-center gap-3.5 text-gray-300 hover:text-white transition-colors"><img alt="Bootstrap" className="w-5 h-5 object-contain" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bootstrap/bootstrap-original.svg" /> Bootstrap</li>
              </ul>
            </MotionCard>

            {/* Card 3: Backend Development */}
            <MotionCard
              index={2}
              className="glass-card rounded-2xl p-6 sm:p-7 transition-colors duration-300 hover:border-[#00bfff]/50 hover:shadow-[0_0_24px_rgba(0,191,255,0.14)] overflow-hidden"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-[2px] bg-[#00bfff] blur-[3px] opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <h3 className="text-white font-bold text-lg mb-5">Backend Development</h3>
              <ul className="space-y-3.5 text-sm font-medium">
                <li className="flex items-center gap-3.5 text-gray-300 hover:text-white transition-colors"><img alt="FastAPI" className="w-5 h-5 object-contain" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastapi/fastapi-original.svg" /> FastAPI &amp; SQLAlchemy</li>
                <li className="flex items-center gap-3.5 text-gray-300 hover:text-white transition-colors"><img alt="PostgreSQL" className="w-5 h-5 object-contain" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg" /> PostgreSQL</li>
                <li className="flex items-center gap-3.5 text-gray-300 hover:text-white transition-colors"><img alt="Node.js" className="w-5 h-5 object-contain" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg" /> Node.js</li>
                <li className="flex items-center gap-3.5 text-gray-300 hover:text-white transition-colors"><img alt="Laravel" className="w-5 h-5 object-contain" src="https://cdn.simpleicons.org/laravel/FF2D20" /> Laravel</li>
                <li className="flex items-center gap-3.5 text-gray-300 hover:text-white transition-colors"><img alt="JWT" className="w-5 h-5 object-contain" src="https://cdn.simpleicons.org/jsonwebtokens/white" /> REST APIs &amp; JWT</li>
              </ul>
            </MotionCard>

            {/* Card 4: Database & Development Tools */}
            <MotionCard
              index={3}
              className="glass-card rounded-2xl p-6 sm:p-7 transition-colors duration-300 hover:border-[#00bfff]/50 hover:shadow-[0_0_24px_rgba(0,191,255,0.14)] overflow-hidden"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-[2px] bg-[#00bfff] blur-[3px] opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <h3 className="text-white font-bold text-lg mb-5">Database &amp; Tools</h3>
              <ul className="space-y-3.5 text-sm font-medium">
                <li className="flex items-center gap-3.5 text-gray-300 hover:text-white transition-colors"><img alt="MySQL" className="w-5 h-5 object-contain" src="https://cdn.simpleicons.org/mysql/white" /> MySQL</li>
                <li className="flex items-center gap-3.5 text-gray-300 hover:text-white transition-colors"><img alt="Docker" className="w-5 h-5 object-contain" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg" /> Docker Compose</li>
                <li className="flex items-center gap-3.5 text-gray-300 hover:text-white transition-colors"><img alt="Git" className="w-5 h-5 object-contain" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg" /> Git &amp; GitHub</li>
                <li className="flex items-center gap-3.5 text-gray-300 hover:text-white transition-colors"><img alt="VS Code" className="w-5 h-5 object-contain" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg" /> VS Code</li>
              </ul>
            </MotionCard>

            {/* Card 5: Mobile, Game & Data AI */}
            <MotionCard
              index={4}
              className="glass-card rounded-2xl p-6 sm:p-7 transition-colors duration-300 hover:border-[#00bfff]/50 hover:shadow-[0_0_24px_rgba(0,191,255,0.14)] overflow-hidden"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-[2px] bg-[#00bfff] blur-[3px] opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <h3 className="text-white font-bold text-lg mb-5">Mobile, Game &amp; AI</h3>
              <ul className="space-y-3.5 text-sm font-medium">
                <li className="flex items-center gap-3.5 text-gray-300 hover:text-white transition-colors"><img alt="React Native" className="w-5 h-5 object-contain" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" /> React Native (Expo)</li>
                <li className="flex items-center gap-3.5 text-gray-300 hover:text-white transition-colors"><img alt="Flutter" className="w-5 h-5 object-contain" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flutter/flutter-original.svg" /> Flutter</li>
                <li className="flex items-center gap-3.5 text-gray-300 hover:text-white transition-colors"><img alt="Unity" className="w-5 h-5 object-contain" src="https://cdn.simpleicons.org/unity/white" /> Unity 3D</li>
                <li className="flex items-center gap-3.5 text-gray-300 hover:text-white transition-colors"><img alt="Google Colab" className="w-5 h-5 object-contain" src="https://cdn.simpleicons.org/googlecolab/white" /> OpenCV, YOLOv11 &amp; Roboflow</li>
              </ul>
            </MotionCard>
          </div>
        </section>

        {/* =========================================
            EXPERIENCE TIMELINE
           ========================================= */}
        <JourneyTimeline />

        {/* =========================================
            FEATURED PROJECTS SECTION
           ========================================= */}
        <section className="mb-24 sm:mb-32" id="projects">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6">
            <div>
              <motion.div
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45 }}
                className="flex items-center gap-4 mb-3"
              >
                <div className="h-[2px] w-8 bg-[#00bfff]"></div>
                <span className="text-[#00bfff] font-bold text-xs uppercase tracking-widest">
                  Featured Projects &amp; Selected Works
                </span>
              </motion.div>

              <SplitHeading
                as="h2"
                className="font-display text-3xl sm:text-4xl md:text-5xl uppercase text-white tracking-wide font-bold [text-shadow:-1.5px_0_#00bfff,1.5px_0_#ff4500]"
              >
                My Work
              </SplitHeading>
              <p className="text-gray-400 text-xs sm:text-sm max-w-2xl mt-3 leading-relaxed">
                Curated software engineering systems, backend APIs, mobile apps, and AI/ML pipelines. Click any card to explore full architectures and source code.
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

              <div className="hidden md:flex items-center gap-2 ml-1">
                <span className="text-xs font-mono text-gray-400 mr-1">
                  {activeSlide + 1}/{totalPages}
                </span>
                <button
                  onClick={prevSlide}
                  disabled={activeSlide === 0}
                  className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all ${
                    activeSlide === 0
                      ? 'border-white/5 text-gray-600 cursor-not-allowed'
                      : 'border-white/15 text-white hover:border-[#00bfff] hover:text-[#00bfff] hover:bg-[#00bfff]/10'
                  }`}
                  aria-label="Previous Projects"
                >
                  <span className="material-symbols-outlined text-base">arrow_back</span>
                </button>

                <button
                  onClick={nextSlide}
                  disabled={activeSlide >= totalPages - 1}
                  className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all ${
                    activeSlide >= totalPages - 1
                      ? 'border-white/5 text-gray-600 cursor-not-allowed'
                      : 'border-white/15 text-white hover:border-[#00bfff] hover:text-[#00bfff] hover:bg-[#00bfff]/10'
                  }`}
                  aria-label="Next Projects"
                >
                  <span className="material-symbols-outlined text-base">arrow_forward</span>
                </button>
              </div>
            </div>
          </div>

          {/* MOBILE HORIZONTAL SNAP CAROUSEL (< 768px) */}
          <div className="md:hidden flex overflow-x-auto gap-4 pb-4 pt-1 snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {projects.slice(0, 6).map((project, index) => {
              const isCompleted = project.status
                ? !project.status.toLowerCase().includes('progress')
                : true;
              return (
                <MotionCard
                  key={project.id || index}
                  index={index}
                  onClick={() => setSelectedProjectIndex(index)}
                  className="flex-none w-[85%] snap-start glass-card rounded-2xl overflow-hidden cursor-pointer border border-white/10 flex flex-col justify-between bg-[#11141b]/80"
                >
                  <div>
                    <div className="aspect-[16/9] overflow-hidden relative bg-[#0c1017]">
                      <img
                        src={project.image}
                        alt={project.title}
                        loading="lazy"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#11141b] via-transparent to-transparent opacity-75" />
                      <div className="absolute top-2.5 left-2.5 z-10">
                        <span className="bg-black/80 backdrop-blur-md text-[#00bfff] px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider border border-[#00bfff]/30">
                          {project.category}
                        </span>
                      </div>
                      {project.status && (
                        <div className="absolute top-2.5 right-2.5 z-10">
                          <span
                            className={`backdrop-blur-md px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider border flex items-center gap-1 ${
                              isCompleted
                                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                                : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                            }`}
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${
                                isCompleted ? 'bg-emerald-400' : 'bg-amber-400 animate-pulse'
                              }`}
                            />
                            {project.status}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <div className="flex items-center justify-between text-[10px] text-gray-500 mb-1">
                        <span className="truncate max-w-[160px]">{project.role || 'Software Project'}</span>
                        <span className="font-mono">{project.year || '2025'}</span>
                      </div>
                      <h3 className="text-base text-white font-bold mb-1.5 line-clamp-1">{project.title}</h3>
                      <p className="text-gray-400 mb-3 text-xs leading-relaxed line-clamp-2">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {project.tech.slice(0, 3).map((item) => (
                          <span
                            key={item}
                            className="text-[9px] text-[#00bfff] font-bold bg-[#00bfff]/5 border border-[#00bfff]/20 px-2 py-0.5 rounded-md"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="px-4 py-2.5 border-t border-white/5 flex items-center justify-between text-xs">
                    <span className="text-[#00bfff] font-bold text-xs">Details ↗</span>
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-1 text-gray-300 bg-white/5 border border-white/10 px-2.5 py-1 rounded-full text-[10px] font-semibold"
                      >
                        <FaGithub size={11} />
                        <span>GitHub</span>
                      </a>
                    )}
                  </div>
                </MotionCard>
              );
            })}
          </div>

          {/* TABLET & DESKTOP SLIDER (>= 768px) */}
          <div className="hidden md:block overflow-hidden py-2">
            <div
              className="flex transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
              style={{
                transform: `translateX(-${activeSlide * 100}%)`,
              }}
            >
              {Array.from({ length: totalPages }).map((_, pageIndex) => (
                <div
                  key={pageIndex}
                  className="min-w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6 px-0.5"
                >
                  {projects
                    .slice(pageIndex * cardsPerPage, pageIndex * cardsPerPage + cardsPerPage)
                    .map((project, index) => {
                      const globalIndex = pageIndex * cardsPerPage + index;
                      const isCompleted = project.status
                        ? !project.status.toLowerCase().includes('progress')
                        : true;

                      return (
                        <MotionCard
                          key={project.id || index}
                          index={index}
                          onClick={() => setSelectedProjectIndex(globalIndex)}
                          className="glass-card rounded-2xl overflow-hidden cursor-pointer border border-white/10 hover:border-[#00bfff]/60 transition-colors duration-300 hover:shadow-[0_12px_30px_rgba(0,191,255,0.16)] flex flex-col justify-between h-full bg-[#11141b]/70"
                        >
                          <div>
                            <div className="aspect-[16/9] overflow-hidden relative bg-[#0c1017]">
                              <img
                                src={project.image}
                                alt={project.title}
                                onError={(e) => {
                                  e.currentTarget.style.display = 'none';
                                }}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-[#11141b] via-transparent to-transparent opacity-70" />

                              <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                                <span className="inline-flex items-center gap-1.5 bg-[#00bfff] text-black px-3.5 py-1.5 rounded-full font-bold text-[11px] uppercase tracking-wider shadow-[0_0_15px_rgba(0,191,255,0.6)] transform translate-y-1.5 group-hover:translate-y-0 transition-transform duration-200">
                                  <FaEye size={11} />
                                  <span>View Details</span>
                                </span>
                              </div>

                              <div className="absolute top-3 left-3 z-10">
                                <span className="bg-black/80 backdrop-blur-md text-[#00bfff] px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider border border-[#00bfff]/30">
                                  {project.category}
                                </span>
                              </div>

                              {project.status && (
                                <div className="absolute top-3 right-3 z-10">
                                  <span
                                    className={`backdrop-blur-md px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider border flex items-center gap-1.5 ${
                                      isCompleted
                                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                                        : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                                    }`}
                                  >
                                    <span
                                      className={`w-1.5 h-1.5 rounded-full ${
                                        isCompleted ? 'bg-emerald-400' : 'bg-amber-400 animate-pulse'
                                      }`}
                                    />
                                    {project.status}
                                  </span>
                                </div>
                              )}
                            </div>

                            <div className="p-4 sm:p-5">
                              <div className="flex items-center justify-between text-[11px] text-gray-500 mb-1.5">
                                <span className="truncate max-w-[170px]">
                                  {project.role || 'Software Project'}
                                </span>
                                <span className="font-mono text-[10px]">{project.year || '2025'}</span>
                              </div>

                              <h3 className="font-title-md text-base sm:text-lg text-white group-hover:text-[#00bfff] transition-colors mb-2 line-clamp-1 font-bold">
                                {project.title}
                              </h3>

                              <p className="text-gray-400 mb-4 text-xs leading-relaxed line-clamp-2">
                                {project.description}
                              </p>

                              <div className="flex flex-wrap gap-1.5">
                                {project.tech.slice(0, 3).map((item) => (
                                  <span
                                    key={item}
                                    className="text-[10px] text-[#00bfff] font-bold tracking-wider flex items-center gap-1 bg-[#00bfff]/5 border border-[#00bfff]/20 px-2 py-0.5 rounded-md"
                                  >
                                    <span className="w-1 h-1 rounded-full bg-[#00bfff]"></span>
                                    {item}
                                  </span>
                                ))}
                                {project.tech.length > 3 && (
                                  <span className="text-[10px] text-gray-500 font-mono py-0.5 px-1">
                                    +{project.tech.length - 3}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="px-4 sm:px-5 py-3 border-t border-white/5 flex items-center justify-between text-xs gap-2">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedProjectIndex(globalIndex);
                              }}
                              className="text-[#00bfff] font-bold group-hover:underline flex items-center gap-1 hover:text-white transition-colors text-xs"
                            >
                              <span>Details</span>
                              <span className="text-xs">↗</span>
                            </button>

                            {project.github && (
                              <a
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="inline-flex items-center gap-1.5 text-gray-300 hover:text-white bg-white/5 hover:bg-[#00bfff]/20 hover:border-[#00bfff]/40 border border-white/10 px-2.5 py-1 rounded-full transition-all text-[10px] font-semibold"
                                aria-label={`GitHub repo for ${project.title}`}
                                title={`Open ${project.title} on GitHub`}
                              >
                                <FaGithub size={12} />
                                <span>GitHub</span>
                              </a>
                            )}
                          </div>
                        </MotionCard>
                      );
                    })}
                </div>
              ))}
            </div>
          </div>

          <AnimatePresence>
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
          </AnimatePresence>
        </section>

        {/* =========================================
            CERTIFICATES & ACHIEVEMENTS SECTION
           ========================================= */}
        <section className="mb-24 sm:mb-32 relative" id="certificates">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 gap-6 relative">
            <div>
              <motion.div
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45 }}
                className="flex items-center gap-4 mb-3"
              >
                <div className="h-[2px] w-8 bg-[#00bfff]"></div>
                <span className="text-[#00bfff] font-bold text-xs uppercase tracking-widest">
                  Validations &amp; Credentials
                </span>
              </motion.div>
              <SplitHeading
                as="h2"
                className="font-display text-3xl sm:text-4xl md:text-5xl uppercase tracking-wide leading-tight mb-3 font-bold"
              >
                <span className="text-white">Certificates &amp; </span>
                <span className="text-[#00bfff] [text-shadow:0_0_20px_rgba(0,191,255,0.4)]">
                  Achievements
                </span>
              </SplitHeading>
              <p className="text-gray-400 max-w-xl text-xs sm:text-sm">
                Official industry credentials, national vocational competencies, and verified technical certificates.
              </p>
            </div>

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
                  className="w-9 h-9 rounded-full bg-[#1a1a1a] border border-white/15 text-white flex items-center justify-center hover:bg-[#252525] hover:border-[#00bfff] hover:text-[#00bfff] active:scale-95 transition-all group"
                  aria-label="Scroll Left"
                >
                  <span className="material-symbols-outlined text-base group-hover:-translate-x-0.5 transition-transform">
                    arrow_back
                  </span>
                </button>
                <button
                  onClick={() => scroll('right')}
                  className="w-9 h-9 rounded-full bg-[#1a1a1a] border border-white/15 text-white flex items-center justify-center hover:bg-[#252525] hover:border-[#00bfff] hover:text-[#00bfff] active:scale-95 transition-all group"
                  aria-label="Scroll Right"
                >
                  <span className="material-symbols-outlined text-base group-hover:translate-x-0.5 transition-transform">
                    arrow_forward
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Certificates Horizontal Slider */}
          <div
            ref={certificateContainerRef}
            className="flex overflow-x-auto gap-5 pb-6 pt-2 scroll-smooth snap-x [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {certificatesData.map((cert, index) => (
              <MotionCard
                key={cert.id}
                index={index}
                onClick={() => setSelectedCertificateIndex(index)}
                className="flex-none w-[86%] sm:w-[47%] lg:w-[31.8%] snap-start glass-card rounded-2xl overflow-hidden cursor-pointer border border-white/10 hover:border-[#00bfff]/60 transition-colors duration-300 hover:shadow-[0_12px_26px_rgba(0,191,255,0.16)] flex flex-col justify-between bg-[#11141b]/70"
              >
                <div>
                  <div className="aspect-[4/3] bg-black/40 overflow-hidden relative">
                    <img
                      src={cert.image}
                      alt={cert.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#11141b] via-transparent to-transparent opacity-60" />

                    <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                      <span className="inline-flex items-center gap-1.5 bg-[#00bfff] text-black px-3.5 py-1.5 rounded-full font-bold text-[11px] uppercase tracking-wider shadow-[0_0_15px_rgba(0,191,255,0.6)] transform translate-y-1.5 group-hover:translate-y-0 transition-transform duration-200">
                        <FaEye size={11} />
                        <span>View Credential</span>
                      </span>
                    </div>

                    <div className="absolute top-3 left-3 z-10">
                      <span className="bg-black/75 backdrop-blur-md text-[#00bfff] px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider border border-[#00bfff]/30">
                        {cert.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-4 sm:p-5">
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

                <div className="px-4 sm:px-5 py-3 border-t border-white/5 flex justify-between items-center text-gray-400 text-xs">
                  <span className="truncate max-w-[65%] font-medium text-gray-300">{cert.issuer}</span>
                  <span className="font-mono text-[11px] text-gray-400">{cert.date}</span>
                </div>
              </MotionCard>
            ))}
          </div>

          <AnimatePresence>
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
          </AnimatePresence>
        </section>

        {/* =========================================
            CONTACT SECTION + 3D CYBER ORB (#2)
           ========================================= */}
        <section className="mb-20 sm:mb-28 lg:mb-36" id="contact">
          <div className="bg-[#0f1116]/90 border border-white/10 rounded-[24px] sm:rounded-[32px] p-6 sm:p-8 md:p-12 lg:p-14 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-[240px] h-[240px] md:w-[380px] md:h-[380px] bg-[#00bfff]/10 blur-[100px] -z-10 rounded-full"></div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-14 items-center">
              {/* Left Side: Heading + Interactive 3D Cyber Orb + Contact Cards */}
              <div>
                <motion.div
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45 }}
                  className="flex items-center gap-4 mb-5"
                >
                  <div className="h-[2px] w-8 bg-[#86a8c3]"></div>
                  <span className="text-[#86a8c3] font-bold text-xs sm:text-sm uppercase tracking-widest">
                    Connect
                  </span>
                </motion.div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
                  <SplitHeading
                    as="h2"
                    className="font-display text-3xl sm:text-4xl md:text-5xl uppercase text-white leading-[0.95] tracking-wide font-bold"
                  >
                    LET&apos;S BUILD <br />
                    SOMETHING <br />
                    <span className="text-[#00bfff] [text-shadow:0_0_25px_rgba(0,191,255,0.75)]">
                      SMART
                    </span>{' '}
                    TOGETHER
                  </SplitHeading>

                  {!prefersReducedMotion && (
                    <div className="hidden sm:block w-36 h-36 md:w-44 md:h-44 shrink-0">
                      <Suspense fallback={<div className="w-full h-full rounded-full bg-[#00bfff]/5 animate-pulse" />}>
                        <CyberOrb3D compact />
                      </Suspense>
                    </div>
                  )}
                </div>

                <p className="text-gray-300 text-sm sm:text-base mb-8 max-w-md leading-relaxed">
                  I am open to collaborating on Backend Engineering, Full-Stack Web Applications, Mobile Apps, or AI research. Contact me today.
                </p>

                <div className="space-y-4">
                  <MotionCard index={0} tiltMax={4} className="rounded-2xl">
                    <a
                      href="mailto:renaldy.syaputra2103@gmail.com"
                      className="flex items-center gap-4 sm:gap-5 glass-card p-4 sm:p-5 rounded-2xl border border-white/10 hover:border-[#00bfff]/50 transition-colors"
                    >
                      <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-[#161922] border border-white/10 flex items-center justify-center group-hover:border-[#00bfff]/50 transition-colors shrink-0">
                        <span className="material-symbols-outlined text-[#86a8c3] group-hover:text-[#00bfff] transition-colors">
                          mail
                        </span>
                      </div>
                      <div className="min-w-0">
                        <p className="text-gray-400 text-[11px] font-bold uppercase tracking-widest mb-0.5">
                          Email Me
                        </p>
                        <p className="text-white font-bold text-sm sm:text-base truncate group-hover:text-[#00bfff] transition-colors">
                          renaldy.syaputra2103@gmail.com
                        </p>
                      </div>
                    </a>
                  </MotionCard>

                  <MotionCard index={1} tiltMax={4} className="rounded-2xl">
                    <div className="flex items-center gap-4 sm:gap-5 glass-card p-4 sm:p-5 rounded-2xl border border-white/10 hover:border-[#00bfff]/50 transition-colors">
                      <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-[#161922] border border-white/10 flex items-center justify-center group-hover:border-[#00bfff]/50 transition-colors shrink-0">
                        <span className="material-symbols-outlined text-[#86a8c3] group-hover:text-[#00bfff] transition-colors">
                          location_on
                        </span>
                      </div>
                      <div>
                        <p className="text-gray-400 text-[11px] font-bold uppercase tracking-widest mb-0.5">
                          Location
                        </p>
                        <p className="text-white font-bold text-sm sm:text-base">Malang, Indonesia</p>
                      </div>
                    </div>
                  </MotionCard>
                </div>
              </div>

              {/* Right Side: EmailJS Contact Form */}
              <motion.form
                ref={form}
                onSubmit={sendEmail}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.55 }}
                className="space-y-4 sm:space-y-5 flex flex-col justify-center"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">
                      Full Name
                    </label>
                    <input
                      name="name"
                      required
                      className="w-full bg-[#161922] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-[#00bfff] focus:ring-0 outline-none transition-all placeholder:text-gray-600"
                      placeholder="Your name"
                      type="text"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">
                      Email Address
                    </label>
                    <input
                      name="email"
                      required
                      className="w-full bg-[#161922] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-[#00bfff] focus:ring-0 outline-none transition-all placeholder:text-gray-600"
                      placeholder="email@example.com"
                      type="email"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">
                    Message Topic
                  </label>
                  <input
                    name="title"
                    required
                    className="w-full bg-[#161922] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-[#00bfff] focus:ring-0 outline-none transition-all placeholder:text-gray-600"
                    placeholder="Backend / Full-Stack / AI Collaboration"
                    type="text"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">
                    Message Details
                  </label>
                  <textarea
                    name="message"
                    required
                    className="w-full bg-[#161922] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-[#00bfff] focus:ring-0 outline-none transition-all placeholder:text-gray-600 min-h-[120px] sm:min-h-[140px] resize-y"
                    placeholder="How can I help you?"
                  ></textarea>
                </div>

                <MagneticButton strength={0.12} className="w-full">
                  <button
                    disabled={isSubmitting}
                    className={`w-full font-bold py-3.5 rounded-xl transition-all mt-1 text-xs sm:text-sm uppercase tracking-wider flex justify-center items-center gap-2 ${
                      isSubmitting
                        ? 'bg-gray-600 text-gray-300 cursor-not-allowed'
                        : 'bg-[#00bfff] text-black hover:shadow-[0_0_25px_rgba(0,191,255,0.45)] active:scale-[0.99]'
                    }`}
                    type="submit"
                  >
                    {isSubmitting ? 'SENDING MESSAGE...' : 'SEND MESSAGE NOW'}
                  </button>
                </MagneticButton>

                {submitStatus === 'success' && (
                  <p className="text-emerald-400 text-xs sm:text-sm text-center font-bold mt-2">
                    ✅ Your message has been sent!
                  </p>
                )}
                {submitStatus === 'error' && (
                  <p className="text-rose-400 text-xs sm:text-sm text-center font-bold mt-2">
                    ❌ Failed to send your message. Please try again.
                  </p>
                )}
              </motion.form>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Home;
