import { useRef, useState, lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { FaGithub, FaEye, FaArrowRight } from 'react-icons/fa';
import Elias from '@/components/ui/elias-author-hero';
import LogoLoop from '../components/LogoLoop';
import JourneyTimeline from '../components/JourneyTimeline';
import SplitHeading from '../components/SplitHeading';
import MotionCard from '../components/MotionCard';
import MagneticButton from '../components/MagneticButton';
import Showcase3DCarousel from '../components/Showcase3DCarousel';
import LazyViewport from '../components/LazyViewport';
import { projectsData } from '../data/projectsData';
import { certificatesData } from '../data/certificatesData';
import useMediaQuery from '../hooks/useMediaQuery';

const TechGlobe3D = lazy(() => import('../components/three/TechGlobe3D'));
const CyberOrb3D = lazy(() => import('../components/three/CyberOrb3D'));
const ProjectDetailModal = lazy(() => import('../components/ProjectDetailModal'));
const CertificateModal = lazy(() => import('../components/CertificateModal'));

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

  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');

  // EmailJS contact form state
  const form = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  // Modal state for Project & Certificate details
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(null);
  const [selectedCertificateIndex, setSelectedCertificateIndex] = useState(null);

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

  const sendEmail = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { default: emailjs } = await import('@emailjs/browser');
      await emailjs.sendForm(
        'service_r56up9s',
        'template_jbyg2as',
        form.current,
        'pHjP0kFkJyJPehZYM'
      );
      setSubmitStatus('success');
      form.current?.reset();
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(null), 5000);
    } catch {
      setSubmitStatus('error');
      setIsSubmitting(false);
    }
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

          {/* 3D Orbiting Tech Stack Globe (#3) — network-loaded only near viewport */}
          {!prefersReducedMotion && (
            <LazyViewport
              rootMargin="360px"
              className="mt-12"
              fallback={
                <div className="w-full h-[280px] sm:h-[360px] md:h-[400px] rounded-2xl sm:rounded-3xl glass-card border border-white/10 flex items-center justify-center text-xs font-mono text-gray-400">
                  INITIALIZING 3D TECH GLOBE...
                </div>
              }
            >
              <Suspense
                fallback={
                  <div className="w-full h-[280px] sm:h-[360px] md:h-[400px] rounded-2xl sm:rounded-3xl glass-card border border-white/10 flex items-center justify-center text-xs font-mono text-gray-400">
                    INITIALIZING 3D TECH GLOBE...
                  </div>
                }
              >
                <TechGlobe3D />
              </Suspense>
            </LazyViewport>
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
            </div>
          </div>

          {/* 3D PERSPECTIVE COVERFLOW SHOWCASE FOR WORK */}
          <Showcase3DCarousel
            items={projects}
            ariaLabel="Featured Projects 3D Showcase"
            onSelectActive={(idx) => setSelectedProjectIndex(idx)}
            renderCard={(project, idx, isCenter) => {
              const isCompleted = project.status
                ? !project.status.toLowerCase().includes('progress')
                : true;

              return (
                <div className="flex flex-col justify-between h-full">
                  <div>
                    <div className="aspect-[16/9] overflow-hidden relative bg-[#090d16]">
                      <img
                        src={project.image}
                        alt={project.title}
                        loading="lazy"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                        className={`w-full h-full object-cover transition-transform duration-700 ${
                          isCenter ? 'group-hover:scale-105' : ''
                        }`}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0d121c] via-black/15 to-transparent opacity-80" />

                      {isCenter && (
                        <div className="absolute inset-0 bg-black/35 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                          <span className="inline-flex items-center gap-1.5 bg-[#00bfff] text-black px-4 py-1.5 rounded-full font-bold text-[11px] uppercase tracking-wider shadow-[0_0_18px_rgba(0,191,255,0.65)]">
                            <FaEye size={12} />
                            <span>View Case Study</span>
                          </span>
                        </div>
                      )}

                      <div className="absolute top-3 left-3 z-10">
                        <span className="bg-black/80 backdrop-blur-md text-[#00bfff] px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider border border-[#00bfff]/30">
                          {project.category}
                        </span>
                      </div>

                      {project.status && (
                        <div className="absolute top-3 right-3 z-10">
                          <span
                            className={`backdrop-blur-md px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider border flex items-center gap-1.5 ${
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
                      <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1.5">
                        <span className="truncate max-w-[200px]">
                          {project.role || 'Software Project'}
                        </span>
                        <span className="font-mono text-[10px] text-slate-500">
                          {project.year || '2025'}
                        </span>
                      </div>

                      <h3
                        className={`text-base sm:text-lg font-bold mb-1.5 line-clamp-1 transition-colors ${
                          isCenter ? 'text-white group-hover:text-[#00bfff]' : 'text-slate-200'
                        }`}
                      >
                        {project.title}
                      </h3>

                      <p className="text-slate-400 mb-3.5 text-xs leading-relaxed line-clamp-2">
                        {project.description}
                      </p>

                      <div className="flex flex-wrap gap-1.5">
                        {project.tech.slice(0, 3).map((item) => (
                          <span
                            key={item}
                            className="text-[10px] text-[#00bfff] font-bold tracking-wider flex items-center gap-1 bg-[#00bfff]/8 border border-[#00bfff]/25 px-2 py-0.5 rounded-md"
                          >
                            <span className="w-1 h-1 rounded-full bg-[#00bfff]" />
                            {item}
                          </span>
                        ))}
                        {project.tech.length > 3 && (
                          <span className="text-[10px] text-slate-500 font-mono py-0.5 px-1">
                            +{project.tech.length - 3}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="px-4 sm:px-5 py-3 border-t border-white/[0.06] flex items-center justify-between text-xs gap-2">
                    <span className="text-[#00bfff] font-bold flex items-center gap-1 text-xs">
                      <span>{isCenter ? 'View Details' : 'Click to Focus'}</span>
                      <span>↗</span>
                    </span>

                    {project.github && isCenter && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="relative z-30 inline-flex items-center gap-1.5 text-slate-200 hover:text-white bg-white/5 hover:bg-[#00bfff]/20 hover:border-[#00bfff]/50 border border-white/10 px-3 py-1 rounded-full transition-all text-[10px] font-semibold"
                        aria-label={`GitHub repo for ${project.title}`}
                      >
                        <FaGithub size={12} />
                        <span>GitHub</span>
                      </a>
                    )}
                  </div>
                </div>
              );
            }}
          />

          <AnimatePresence>
            {selectedProjectIndex !== null && (
              <Suspense fallback={null}>
                <ProjectDetailModal
                  project={projects[selectedProjectIndex]}
                  onClose={() => setSelectedProjectIndex(null)}
                  onPrev={handlePrevProject}
                  onNext={handleNextProject}
                  currentIndex={selectedProjectIndex}
                  total={projects.length}
                />
              </Suspense>
            )}
          </AnimatePresence>
        </section>

        {/* =========================================
            CERTIFICATES & ACHIEVEMENTS 3D SECTION
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
                Official industry credentials, national vocational competencies, and verified technical certificates — swipe or click any 3D card to inspect.
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
            </div>
          </div>

          {/* 3D PERSPECTIVE COVERFLOW SHOWCASE FOR CERTIFICATES */}
          <Showcase3DCarousel
            items={certificatesData}
            ariaLabel="Certificates 3D Showcase"
            autoPlayInterval={5200}
            onSelectActive={(idx) => setSelectedCertificateIndex(idx)}
            renderCard={(cert, _idx, isCenter) => (
              <div className="flex flex-col justify-between h-full">
                <div>
                  <div className="aspect-[16/10] bg-[#080c14] overflow-hidden relative">
                    <img
                      src={cert.image}
                      alt={cert.title}
                      loading="lazy"
                      className={`w-full h-full object-cover transition-transform duration-700 ${
                        isCenter ? 'group-hover:scale-105' : ''
                      }`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0d121c] via-transparent to-transparent opacity-75" />

                    {isCenter && (
                      <div className="absolute inset-0 bg-black/35 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                        <span className="inline-flex items-center gap-1.5 bg-[#00bfff] text-black px-4 py-1.5 rounded-full font-bold text-[11px] uppercase tracking-wider shadow-[0_0_18px_rgba(0,191,255,0.65)]">
                          <FaEye size={12} />
                          <span>Inspect Credential</span>
                        </span>
                      </div>
                    )}

                    <div className="absolute top-3 left-3 z-10">
                      <span className="bg-black/80 backdrop-blur-md text-[#00bfff] px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider border border-[#00bfff]/30">
                        {cert.category}
                      </span>
                    </div>

                    <div className="absolute top-3 right-3 z-10">
                      <span className="bg-emerald-500/20 backdrop-blur-md text-emerald-300 px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider border border-emerald-500/40 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        Verified
                      </span>
                    </div>
                  </div>

                  <div className="p-4 sm:p-5">
                    <h3
                      className={`font-bold text-base leading-snug line-clamp-2 mb-2 transition-colors ${
                        isCenter ? 'text-white group-hover:text-[#00bfff]' : 'text-slate-200'
                      }`}
                    >
                      {cert.title}
                    </h3>
                    {cert.description && (
                      <p className="text-slate-400 text-xs line-clamp-2 leading-relaxed mb-3">
                        {cert.description}
                      </p>
                    )}
                    {cert.skills && cert.skills.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {cert.skills.slice(0, 3).map((skill) => (
                          <span
                            key={skill}
                            className="bg-white/5 text-slate-300 text-[10px] px-2 py-0.5 rounded-md border border-white/10"
                          >
                            {skill}
                          </span>
                        ))}
                        {cert.skills.length > 3 && (
                          <span className="text-[10px] text-slate-500 font-mono py-0.5 px-1">
                            +{cert.skills.length - 3}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                <div className="px-4 sm:px-5 py-3 border-t border-white/[0.06] flex justify-between items-center text-xs">
                  <span className="truncate max-w-[66%] font-medium text-slate-300">{cert.issuer}</span>
                  <span className="font-mono text-[11px] text-[#00bfff]">{cert.date}</span>
                </div>
              </div>
            )}
          />

          <AnimatePresence>
            {selectedCertificateIndex !== null && (
              <Suspense fallback={null}>
                <CertificateModal
                  certificate={certificatesData[selectedCertificateIndex]}
                  onClose={() => setSelectedCertificateIndex(null)}
                  onPrev={handlePrevCert}
                  onNext={handleNextCert}
                  currentIndex={selectedCertificateIndex}
                  total={certificatesData.length}
                />
              </Suspense>
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
                    <LazyViewport
                      rootMargin="320px"
                      className="hidden sm:block w-36 h-36 md:w-44 md:h-44 shrink-0"
                      fallback={<div className="w-full h-full rounded-full bg-[#00bfff]/5 animate-pulse" />}
                    >
                      <Suspense fallback={<div className="w-full h-full rounded-full bg-[#00bfff]/5 animate-pulse" />}>
                        <CyberOrb3D compact />
                      </Suspense>
                    </LazyViewport>
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
