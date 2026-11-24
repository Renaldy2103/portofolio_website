import { useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import SplitHeading from './SplitHeading';
import MotionCard from './MotionCard';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const timelineData = [
  {
    date: 'Jul 2019 - May 2022',
    category: 'Education',
    title: 'SMK Negeri 8 Malang',
    subtitle: 'Vocational High School - Software Engineering',
    description:
      'Building a strong foundation in software engineering and object-oriented programming (C++ and Java). Developing interactive web applications using HTML, CSS, and PHP, and designing & managing relational databases.',
  },
  {
    date: 'Jan 2021 - May 2021',
    category: 'Work Experience',
    title: 'Web Developer Intern',
    subtitle: 'Ezy Industries - Malang, Indonesia',
    description:
      'Developed and maintained dynamic web pages using HTML and PHP. Supported responsive UI design, debugged codebases, and proactively learned modern frameworks such as Laravel for backend and Vue.js for frontend.',
  },
  {
    date: 'Aug 2023 - Present',
    category: 'Education',
    title: 'UIN Maulana Malik Ibrahim Malang',
    subtitle: 'Bachelor of Informatics Engineering',
    description:
      'Undergraduate student focusing on full-stack software development and Artificial Intelligence (Python). Building responsive interfaces and secure APIs (Laravel, Node.js, TailwindCSS), as well as developing cross-platform apps (Flutter) and interactive games (Unity).',
  },
  {
    date: 'Jul 2024 - Aug 2024',
    category: 'Work Experience',
    title: 'Game Developer Intern',
    subtitle: 'PT Naraya Telematika - Malang, Indonesia',
    description:
      "Completed a 1-month internship developing 'Naraya Penyelamat Kota Robot', an educational 2D adventure-puzzle game for children built with Unity 2D (C#). Designed an engaging storyline, interactive puzzle mechanics, and progressive stage-based levels.",
  },
];

const JourneyTimeline = () => {
  const sectionRef = useRef(null);
  const progressLineRef = useRef(null);

  // Animate vertical glowing timeline line along scroll with GSAP ScrollTrigger
  useGSAP(
    () => {
      if (!progressLineRef.current || !sectionRef.current) return undefined;
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReduced) return undefined;

      gsap.fromTo(
        progressLineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            end: 'bottom 75%',
            scrub: 0.4,
          },
        }
      );
      return undefined;
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="py-20 relative px-4 sm:px-6 md:px-0" id="journey">
      {/* Section Heading */}
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="flex items-center justify-center gap-4 mb-4"
        >
          <div className="h-[2px] w-8 bg-[#86a8c3]"></div>
          <span className="text-[#86a8c3] font-bold text-sm uppercase tracking-widest">EXPERIENCE</span>
          <div className="h-[2px] w-8 bg-[#86a8c3]"></div>
        </motion.div>
        <SplitHeading as="h2" className="text-3xl md:text-4xl font-bold text-white mb-2">
          My Journey
        </SplitHeading>
      </div>

      {/* Main Timeline Container */}
      <div className="relative max-w-5xl mx-auto">
        {/* Background + Scrubbed Active Vertical Line */}
        <div className="absolute left-[22px] md:left-1/2 w-[2px] transform md:-translate-x-1/2 top-0 bottom-0 z-0">
          <div className="w-full bg-[#1e293b] h-full rounded-full" />
          <div
            ref={progressLineRef}
            className="absolute inset-0 w-full bg-gradient-to-b from-[#00bfff] via-[#3b82f6] to-[#00bfff] rounded-full origin-top shadow-[0_0_14px_rgba(0,191,255,0.7)]"
          />
        </div>

        {timelineData.map((item, index) => {
          const isLeft = index % 2 === 0;

          return (
            <div
              key={index}
              className={`relative w-full mb-12 flex ${isLeft ? 'md:justify-start' : 'md:justify-end'} justify-start`}
            >
              {/* Timeline Node Dot */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ type: 'spring', stiffness: 320, damping: 20 }}
                className="absolute left-[22px] md:left-1/2 w-10 transform -translate-x-1/2 top-1/2 -translate-y-1/2 flex justify-center z-10"
              >
                <div className="w-4 h-4 rounded-full bg-[#00bfff] ring-4 ring-[#050505] shadow-[0_0_16px_rgba(0,191,255,0.75)]" />
              </motion.div>

              {/* Card Wrapper */}
              <div className={`w-full md:w-[45%] pl-12 sm:pl-14 md:pl-0 ${isLeft ? 'md:pr-10' : 'md:pl-10'}`}>
                <MotionCard
                  index={index}
                  tiltMax={5}
                  className={`p-5 sm:p-6 rounded-2xl glass-card hover:border-[#00bfff]/50 transition-colors duration-300 shadow-xl ${
                    isLeft ? 'md:text-right' : 'md:text-left'
                  } text-left`}
                >
                  <div
                    className={`flex flex-col md:flex-row items-start md:items-center justify-between mb-3.5 gap-2.5 ${
                      isLeft ? 'md:flex-row-reverse' : ''
                    }`}
                  >
                    <span
                      className={`px-3.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        item.category === 'Work Experience'
                          ? 'bg-[#10b981]/10 text-[#10b981] border border-[#10b981]/25'
                          : 'bg-[#00bfff]/10 text-[#00bfff] border border-[#00bfff]/25'
                      }`}
                    >
                      {item.category}
                    </span>
                    <span className="text-[#8b949e] font-mono text-xs">{item.date}</span>
                  </div>

                  <h3 className="text-lg md:text-xl font-bold text-white mb-1.5 group-hover:text-[#00bfff] transition-colors">
                    {item.title}
                  </h3>
                  <h4 className="text-[#86a8c3] font-medium text-xs sm:text-sm mb-3.5">{item.subtitle}</h4>
                  <p className="text-[#8b949e] leading-relaxed text-xs sm:text-sm">{item.description}</p>
                </MotionCard>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default JourneyTimeline;
