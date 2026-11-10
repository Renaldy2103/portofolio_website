import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { FaGithub, FaSearch, FaArrowLeft, FaEye } from 'react-icons/fa';
import { projectsData, projectFilterTabs } from '../data/projectsData';
import ProjectDetailModal from '../components/ProjectDetailModal';

function Projects() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(null);

  // Filter & Search logic
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
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 md:pt-40 pb-28 min-h-[85vh]">
      
      {/* Top Breadcrumb & Navigation */}
      <div className="mb-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-widest text-gray-400 hover:text-[#00bfff] transition-colors group"
        >
          <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
          <span>Back to Home</span>
        </Link>
      </div>

      {/* Header */}
      <div className="mb-12">
        <div className="flex items-center gap-4 mb-3">
          <div className="h-[2px] w-10 bg-[#00bfff]"></div>
          <span className="text-[#00bfff] font-bold text-xs uppercase tracking-widest">
            Portfolio Showcase
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold uppercase text-white tracking-wide [text-shadow:0_0_25px_rgba(0,191,255,0.4)]">
          All Projects & Case Studies
        </h1>
        <p className="text-gray-400 text-sm sm:text-base max-w-2xl mt-4">
          A comprehensive showcase of software engineering systems, AI/ML pipelines, modern web applications, 3D simulations, and research initiatives designed and deployed by me.
        </p>
      </div>

      {/* Controls Bar: Filter Tabs & Search */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-10 pb-6 border-b border-white/10">
        
        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2">
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
                className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                  isActive
                    ? 'bg-[#00bfff] text-black shadow-[0_0_15px_rgba(0,191,255,0.4)] scale-105'
                    : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 border border-white/10'
                }`}
              >
                {tab.label} ({count})
              </button>
            );
          })}
        </div>

        {/* Search Bar */}
        <div className="relative w-full lg:w-80">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search projects, technologies..."
            className="w-full bg-[#111317] border border-white/15 focus:border-[#00bfff] rounded-full pl-11 pr-4 py-2.5 text-xs text-white placeholder-gray-500 outline-none transition-all shadow-inner focus:shadow-[0_0_15px_rgba(0,191,255,0.2)]"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white text-xs"
            >
              ✕
            </button>
          )}
        </div>

      </div>

      {/* Count Indicator */}
      <div className="flex items-center justify-between text-xs text-gray-400 mb-8">
        <div>
          Showing <span className="text-[#00bfff] font-bold">{filteredProjects.length}</span> of {projectsData.length} projects
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

      {/* Projects Grid */}
      {filteredProjects.length === 0 ? (
        <div className="bg-[#111317] border border-white/10 rounded-3xl p-12 text-center my-12">
          <p className="text-gray-400 text-sm mb-4">
            No projects found matching query "{searchQuery}".
          </p>
          <button
            onClick={() => {
              setActiveFilter('all');
              setSearchQuery('');
            }}
            className="bg-[#00bfff] text-black px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider hover:scale-105 transition-all"
          >
            Show All Projects
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, idx) => (
            <div
              key={project.id || project.title}
              onClick={() => setSelectedProjectIndex(idx)}
              className="group relative glass-card rounded-[28px] overflow-hidden cursor-pointer border border-white/10 hover:border-[#00bfff]/60 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_0_30px_rgba(0,191,255,0.2)] flex flex-col"
            >
              {/* Image Preview with Hover Overlay */}
              <div className="aspect-[16/10] overflow-hidden relative bg-black/40">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />

                {/* Cyber Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#111317] via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                {/* Hover CTA Pill */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 backdrop-blur-[2px]">
                  <span className="inline-flex items-center gap-2 bg-[#00bfff] text-black px-4 py-2 rounded-full font-bold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(0,191,255,0.6)] transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <FaEye size={13} />
                    <span>View Details</span>
                  </span>
                </div>

                {/* Top Corner Category Badge */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="bg-black/60 backdrop-blur-md text-[#00bfff] px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border border-[#00bfff]/30">
                    {project.category}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                    <span>{project.role || 'Software Project'}</span>
                    <span className="font-mono">{project.year || '2024'}</span>
                  </div>

                  <h3 className="text-xl font-bold text-white group-hover:text-[#00bfff] transition-colors mb-3 line-clamp-1">
                    {project.title}
                  </h3>

                  <p className="text-gray-400 text-xs sm:text-sm line-clamp-3 mb-5 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                <div>
                  {/* Tech Stack Chips */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {project.tech.slice(0, 3).map((item) => (
                      <span
                        key={item}
                        className="bg-white/5 text-gray-300 text-[10px] font-semibold px-2.5 py-1 rounded-md border border-white/5"
                      >
                        {item}
                      </span>
                    ))}
                    {project.tech.length > 3 && (
                      <span className="text-[10px] text-gray-500 font-mono py-1 px-1">
                        +{project.tech.length - 3}
                      </span>
                    )}
                  </div>

                  {/* Card Bottom Actions */}
                  <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs">
                    <span className="text-[#00bfff] font-bold group-hover:underline flex items-center gap-1">
                      <span>View Details</span>
                      <span className="text-sm">↗</span>
                    </span>

                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="text-gray-400 hover:text-white transition-colors p-1.5 hover:bg-white/10 rounded-full"
                        title="Open GitHub Repository"
                      >
                        <FaGithub size={18} />
                      </a>
                    )}
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>
      )}

      {/* Project Detail Modal */}
      {activeProject && (
        <ProjectDetailModal
          project={activeProject}
          onClose={() => setSelectedProjectIndex(null)}
          onPrev={handlePrevProject}
          onNext={handleNextProject}
          currentIndex={selectedProjectIndex}
          total={filteredProjects.length}
        />
      )}

    </main>
  );
}

export default Projects;

