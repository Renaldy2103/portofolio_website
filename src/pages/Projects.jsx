import { useState, useMemo, lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { FaGithub, FaSearch, FaArrowLeft, FaEye } from 'react-icons/fa';
import { Box, LayoutGrid } from 'lucide-react';
import { projectsData, projectFilterTabs } from '../data/projectsData';
import SplitHeading from '../components/SplitHeading';
import MotionCard from '../components/MotionCard';
import Showcase3DCarousel from '../components/Showcase3DCarousel';

const CyberOrb3D = lazy(() => import('../components/three/CyberOrb3D'));
const ProjectDetailModal = lazy(() => import('../components/ProjectDetailModal'));

function Projects() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('3d'); // '3d' | 'grid'
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(null);

  const filteredProjects = useMemo(() => {
    return projectsData.filter((project) => {
      const matchesFilter =
        activeFilter === 'all' || project.filterType === activeFilter;

      const query = searchQuery.toLowerCase().trim();
      if (!query) return matchesFilter;

      const matchesSearch =
        project.title.toLowerCase().includes(query) ||
        project.category.toLowerCase().includes(query) ||
        project.description.toLowerCase().includes(query) ||
        (project.status && project.status.toLowerCase().includes(query)) ||
        project.tech.some((t) => t.toLowerCase().includes(query));

      return matchesFilter && matchesSearch;
    });
  }, [activeFilter, searchQuery]);

  const activeProject =
    selectedProjectIndex !== null ? filteredProjects[selectedProjectIndex] : null;

  const handlePrevProject = () => {
    setSelectedProjectIndex((prev) => {
      if (prev === null) return null;
      return (prev - 1 + filteredProjects.length) % filteredProjects.length;
    });
  };

  const handleNextProject = () => {
    setSelectedProjectIndex((prev) => {
      if (prev === null) return null;
      return (prev + 1) % filteredProjects.length;
    });
  };

  return (
    <main id="main-content" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 md:pt-36 pb-24 min-h-[85vh]">
      {/* Top Breadcrumb & Navigation */}
      <div className="mb-6">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-400 hover:text-[#00bfff] transition-colors group"
        >
          <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
          <span>Back to Home</span>
        </Link>
      </div>

      {/* Header with Interactive 3D Cyber Orb */}
      <div className="mb-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="flex-1">
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45 }}
            className="flex items-center gap-3 mb-2.5"
          >
            <div className="h-[2px] w-8 bg-[#00bfff]"></div>
            <span className="text-[#00bfff] font-bold text-xs uppercase tracking-widest">
              Portfolio Showcase
            </span>
          </motion.div>
          <SplitHeading
            as="h1"
            mode="hero"
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold uppercase text-white tracking-wide [text-shadow:0_0_20px_rgba(0,191,255,0.35)]"
          >
            All Projects &amp; Case Studies
          </SplitHeading>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="text-gray-400 text-xs sm:text-sm max-w-2xl mt-3 leading-relaxed"
          >
            A curated engineering showcase of backend architectures, mobile applications, AI/ML pipelines, and full-stack solutions — explore in 3D Stage or Grid mode.
          </motion.p>
        </div>

        <div className="hidden md:block w-44 h-44 lg:w-52 lg:h-52 shrink-0">
          <Suspense fallback={<div className="w-full h-full rounded-full bg-[#00bfff]/5 animate-pulse" />}>
            <CyberOrb3D compact eager />
          </Suspense>
        </div>
      </div>

      {/* Controls Bar: Filter Tabs, Search & 3D/Grid Switcher */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8 pb-5 border-b border-white/10">
        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          {projectFilterTabs.map((tab) => {
            const count =
              tab.value === 'all'
                ? projectsData.length
                : projectsData.filter((p) => p.filterType === tab.value).length;

            const isActive = activeFilter === tab.value;

            return (
              <button
                key={tab.value}
                onClick={() => setActiveFilter(tab.value)}
                className={`relative px-3.5 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider transition-colors duration-200 ${
                  isActive
                    ? 'text-black'
                    : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 border border-white/10'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="activeProjectFilterTab"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    className="absolute inset-0 rounded-full bg-[#00bfff] shadow-[0_0_14px_rgba(0,191,255,0.45)]"
                  />
                )}
                <span className="relative z-10">
                  {tab.label} <span className="opacity-70 font-mono text-[10px]">({count})</span>
                </span>
              </button>
            );
          })}
        </div>

        {/* Search + View Mode Switcher */}
        <div className="flex flex-wrap sm:flex-nowrap items-center gap-3">
          <div className="relative flex-1 sm:w-64">
            <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 text-xs pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search projects, stack..."
              className="w-full bg-[#111317] border border-white/15 focus:border-[#00bfff] rounded-full pl-9 pr-8 py-2 text-xs text-white placeholder-gray-500 outline-none transition-all shadow-inner focus:shadow-[0_0_12px_rgba(0,191,255,0.2)]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                aria-label="Clear search"
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white text-xs"
              >
                ✕
              </button>
            )}
          </div>

          <div
            role="group"
            aria-label="Display mode"
            className="inline-flex items-center rounded-full bg-white/[0.04] border border-white/10 p-1 shrink-0"
          >
            <button
              type="button"
              onClick={() => setViewMode('3d')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider transition-all ${
                viewMode === '3d'
                  ? 'bg-[#00bfff] text-black shadow-[0_0_12px_rgba(0,191,255,0.4)]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Box className="w-3.5 h-3.5" />
              <span>3D Stage</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('grid')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider transition-all ${
                viewMode === 'grid'
                  ? 'bg-[#00bfff] text-black shadow-[0_0_12px_rgba(0,191,255,0.4)]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Grid</span>
            </button>
          </div>
        </div>
      </div>

      {/* Count Indicator */}
      <div className="flex items-center justify-between text-xs text-gray-400 mb-6">
        <div>
          Showing <span className="text-[#00bfff] font-bold">{filteredProjects.length}</span> of{' '}
          {projectsData.length} projects
        </div>
        {(activeFilter !== 'all' || searchQuery) && (
          <button
            onClick={() => {
              setActiveFilter('all');
              setSearchQuery('');
            }}
            className="text-xs text-[#00bfff] hover:underline"
          >
            Reset Filters
          </button>
        )}
      </div>

      {/* Projects Display */}
      {filteredProjects.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#111317] border border-white/10 rounded-2xl p-10 text-center my-10"
        >
          <p className="text-gray-400 text-xs sm:text-sm mb-4">
            No projects found matching query &ldquo;{searchQuery}&rdquo;.
          </p>
          <button
            onClick={() => {
              setActiveFilter('all');
              setSearchQuery('');
            }}
            className="bg-[#00bfff] text-black px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider hover:scale-105 transition-all"
          >
            Show All Projects
          </button>
        </motion.div>
      ) : viewMode === '3d' ? (
        <Showcase3DCarousel
          key={activeFilter + searchQuery}
          items={filteredProjects}
          ariaLabel="Projects 3D Coverflow"
          onSelectActive={(idx) => setSelectedProjectIndex(idx)}
          renderCard={(project, _idx, isCenter) => {
            const isCompleted = project.status
              ? !project.status.toLowerCase().includes('progress')
              : true;

            return (
              <div className="flex flex-col justify-between h-full">
                <div>
                  <div className="aspect-[16/9] overflow-hidden relative bg-[#090d16]">
                    {project.image ? (
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
                    ) : null}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0d121c] via-black/15 to-transparent opacity-80" />

                    {isCenter && (
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/40 backdrop-blur-[2px]">
                        <span className="inline-flex items-center gap-1.5 bg-[#00bfff] text-black px-4 py-1.5 rounded-full font-bold text-[11px] uppercase tracking-wider shadow-[0_0_18px_rgba(0,191,255,0.65)]">
                          <FaEye size={12} />
                          <span>View Details</span>
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
                      <span className="truncate max-w-[190px]">{project.role || 'Software Project'}</span>
                      <span className="font-mono text-[10px] text-slate-500">{project.year || '2025'}</span>
                    </div>

                    <h3
                      className={`text-base sm:text-lg font-bold mb-1.5 line-clamp-1 transition-colors ${
                        isCenter ? 'text-white group-hover:text-[#00bfff]' : 'text-slate-200'
                      }`}
                    >
                      {project.title}
                    </h3>

                    <p className="text-slate-400 text-xs line-clamp-2 mb-3.5 leading-relaxed">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5">
                      {project.tech.slice(0, 3).map((item) => (
                        <span
                          key={item}
                          className="bg-[#00bfff]/8 text-[#00bfff] text-[10px] font-bold px-2 py-0.5 rounded-md border border-[#00bfff]/25"
                        >
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
      ) : (
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => {
              const isCompleted = project.status
                ? !project.status.toLowerCase().includes('progress')
                : true;

              return (
                <MotionCard
                  key={project.id || project.title}
                  index={idx}
                  tiltMax={8}
                  layout
                  onClick={() => setSelectedProjectIndex(idx)}
                  className="glass-card rounded-2xl overflow-hidden cursor-pointer border border-white/10 hover:border-[#00bfff]/60 transition-colors duration-300 hover:shadow-[0_12px_30px_rgba(0,191,255,0.16)] flex flex-col h-full bg-[#11141b]/70"
                >
                  <div className="aspect-[16/9] overflow-hidden relative bg-[#0c1017]">
                    {project.image ? (
                      <img
                        src={project.image}
                        alt={project.title}
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#121620] to-[#0a0d14] p-4 text-center">
                        <span className="text-[#00bfff] font-bold text-xs tracking-wider uppercase">
                          {project.title}
                        </span>
                      </div>
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-[#11141b] via-black/20 to-transparent opacity-70 group-hover:opacity-40 transition-opacity" />

                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/40 backdrop-blur-[2px]">
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

                  <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between text-[11px] text-gray-500 mb-1.5">
                        <span className="truncate max-w-[170px]">{project.role || 'Software Project'}</span>
                        <span className="font-mono text-[10px]">{project.year || '2025'}</span>
                      </div>

                      <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-[#00bfff] transition-colors mb-2 line-clamp-1">
                        {project.title}
                      </h3>

                      <p className="text-gray-400 text-xs line-clamp-2 mb-4 leading-relaxed">
                        {project.description}
                      </p>
                    </div>

                    <div>
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {project.tech.slice(0, 3).map((item) => (
                          <span
                            key={item}
                            className="bg-white/5 text-gray-300 text-[10px] font-semibold px-2 py-0.5 rounded-md border border-white/5"
                          >
                            {item}
                          </span>
                        ))}
                        {project.tech.length > 3 && (
                          <span className="text-[10px] text-gray-500 font-mono py-0.5 px-1">
                            +{project.tech.length - 3}
                          </span>
                        )}
                      </div>

                      <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs gap-2">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedProjectIndex(idx);
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
                            title={`Open ${project.title} on GitHub`}
                          >
                            <FaGithub size={12} />
                            <span>GitHub</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </MotionCard>
              );
            })}
          </AnimatePresence>
        </motion.div>
      )}

      {/* Project Detail Modal */}
      <AnimatePresence>
        {activeProject && (
          <Suspense fallback={null}>
            <ProjectDetailModal
              project={activeProject}
              onClose={() => setSelectedProjectIndex(null)}
              onPrev={handlePrevProject}
              onNext={handleNextProject}
              currentIndex={selectedProjectIndex}
              total={filteredProjects.length}
            />
          </Suspense>
        )}
      </AnimatePresence>
    </main>
  );
}

export default Projects;
