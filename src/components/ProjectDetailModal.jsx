import { useEffect } from 'react';
import { FaGithub, FaExternalLinkAlt, FaTimes, FaArrowLeft, FaArrowRight, FaCogs, FaExclamationTriangle, FaBullseye, FaLayerGroup } from 'react-icons/fa';

function ProjectDetailModal({ project, onClose, onPrev, onNext, currentIndex, total }) {
  useEffect(() => {
    if (!project) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft' && onPrev) {
        onPrev();
      } else if (e.key === 'ArrowRight' && onNext) {
        onNext();
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose, onPrev, onNext]);

  if (!project) return null;

  const isCompleted = project.status ? !project.status.toLowerCase().includes('progress') : true;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-md p-3 sm:p-5 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-label={`Project Details: ${project.title}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-3xl bg-[#101216] border border-white/15 rounded-2xl sm:rounded-3xl shadow-[0_0_50px_rgba(0,191,255,0.18)] overflow-hidden my-auto flex flex-col max-h-[90vh] transition-all duration-300">
        
        {/* Modal Top Header */}
        <div className="flex items-center justify-between px-5 sm:px-7 py-4 border-b border-white/10 bg-[#14171d]/90 shrink-0">
          <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
            <span className="bg-[#00bfff]/15 text-[#00bfff] text-[10px] sm:text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-[#00bfff]/30 tracking-wider uppercase">
              {project.category}
            </span>

            {project.status && (
              <span
                className={`inline-flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-0.5 rounded-full border tracking-wide uppercase ${
                  isCompleted
                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                    : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    isCompleted ? 'bg-emerald-400' : 'bg-amber-400 animate-pulse'
                  }`}
                />
                {project.status}
              </span>
            )}

            {project.year && (
              <span className="text-gray-400 text-[11px] font-mono">
                {project.year}
              </span>
            )}

            {project.role && (
              <span className="hidden sm:inline-block text-gray-400 text-[11px] border-l border-white/10 pl-2.5 truncate max-w-[220px]">
                {project.role}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <span className="hidden md:inline-block text-[9px] text-gray-500 font-mono tracking-wider border border-white/10 px-1.5 py-0.5 rounded">
              ESC
            </span>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-gray-300 hover:text-white flex items-center justify-center transition-all active:scale-95"
              aria-label="Close modal"
            >
              <FaTimes size={14} />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Content */}
        <div className="overflow-y-auto px-5 sm:px-7 py-5 space-y-5 [scrollbar-width:thin] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-white/10">
          
          {/* Main Visual Banner */}
          {project.image && (
            <div className="relative rounded-xl overflow-hidden border border-white/10 aspect-[21/9] sm:aspect-[21/9] bg-[#0c1017] group">
              <img
                src={project.image}
                alt={project.title}
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#101216] via-transparent to-transparent opacity-80" />
              
              <a
                href={project.image}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-3 right-3 bg-black/60 hover:bg-[#00bfff] text-white hover:text-black text-[11px] font-semibold px-2.5 py-1 rounded-md border border-white/20 transition-all flex items-center gap-1.5 backdrop-blur-sm"
                title="Open full image in new tab"
              >
                <FaExternalLinkAlt size={10} />
                <span>Open Banner</span>
              </a>
            </div>
          )}

          {/* Project Title & Short Summary */}
          <div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-wide [text-shadow:0_0_15px_rgba(0,191,255,0.35)] mb-1.5">
              {project.title}
            </h2>

            {project.statusDetail && (
              <p className="text-[11px] font-mono text-amber-400/90 mb-2.5 flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded-md w-fit">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                <span>Note: {project.statusDetail}</span>
              </p>
            )}

            <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
              {project.longDescription || project.description}
            </p>
          </div>

          {/* Problem & Goal Grid */}
          {(project.problem || project.goal) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {project.problem && (
                <div className="bg-[#151821] border border-white/5 rounded-xl p-4">
                  <h3 className="text-[11px] font-bold text-rose-400 tracking-wider uppercase mb-1.5 flex items-center gap-1.5">
                    <FaExclamationTriangle size={11} />
                    <span>Problem Background</span>
                  </h3>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    {project.problem}
                  </p>
                </div>
              )}

              {project.goal && (
                <div className="bg-[#151821] border border-white/5 rounded-xl p-4">
                  <h3 className="text-[11px] font-bold text-[#00bfff] tracking-wider uppercase mb-1.5 flex items-center gap-1.5">
                    <FaBullseye size={11} />
                    <span>Engineering Objectives</span>
                  </h3>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    {project.goal}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Architecture / System Overview */}
          {project.architecture && (
            <div className="bg-[#12161f] border border-[#00bfff]/20 rounded-xl p-4 sm:p-5 shadow-inner">
              <h3 className="text-[11px] font-bold text-[#00bfff] tracking-wider uppercase mb-2 flex items-center gap-1.5">
                <FaLayerGroup size={11} />
                <span>System Architecture & Overview</span>
              </h3>
              <p className="text-xs text-gray-300 leading-relaxed">
                {project.architecture}
              </p>
            </div>
          )}

          {/* Key Features & Highlights */}
          {project.features && project.features.length > 0 && (
            <div className="bg-[#15181f] border border-white/5 rounded-xl p-4 sm:p-5">
              <h3 className="text-[11px] font-bold text-[#00bfff] tracking-wider uppercase mb-3 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00bfff]" />
                <span>Key Features & Implementations</span>
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-gray-300">
                {project.features.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-[#00bfff] font-bold text-xs select-none mt-0.5">✓</span>
                    <span className="leading-snug">{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Technical Challenges & Solutions */}
          {project.challenges && project.challenges.length > 0 && (
            <div className="bg-[#15181f] border border-white/5 rounded-xl p-4 sm:p-5">
              <h3 className="text-[11px] font-bold text-amber-400 tracking-wider uppercase mb-3 flex items-center gap-1.5">
                <FaCogs size={11} />
                <span>Technical Challenges & Solutions</span>
              </h3>
              <ul className="space-y-2 text-xs text-gray-300">
                {project.challenges.map((ch, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-amber-400 font-bold select-none text-[10px] mt-0.5">▪</span>
                    <span className="leading-snug">{ch}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Tech Stack Pills */}
          <div>
            <h3 className="text-[11px] font-bold text-gray-400 tracking-wider uppercase mb-2">
              Technologies & Tools
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="bg-white/5 hover:bg-[#00bfff]/10 hover:text-[#00bfff] text-gray-300 text-[11px] font-semibold px-2.5 py-1 rounded-md border border-white/10 transition-colors flex items-center gap-1.5"
                >
                  <span className="w-1 h-1 rounded-full bg-[#00bfff]" />
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Action Links */}
          <div className="pt-2 flex flex-wrap items-center gap-3">
            {project.github ? (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#00bfff] text-black px-5 py-2.5 rounded-full font-bold text-xs hover:scale-105 active:scale-95 transition-all shadow-[0_0_15px_rgba(0,191,255,0.4)]"
              >
                <FaGithub size={15} />
                <span>View Source on GitHub</span>
              </a>
            ) : (
              <span className="text-xs text-gray-500 italic py-1">
                Private repository / Internal project
              </span>
            )}

            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-[#00bfff]/50 text-[#00bfff] hover:bg-[#00bfff]/10 px-5 py-2.5 rounded-full font-bold text-xs transition-all"
              >
                <FaExternalLinkAlt size={12} />
                <span>Live Demo</span>
              </a>
            )}
          </div>

        </div>

        {/* Modal Bottom Navigation */}
        {(onPrev || onNext) && (
          <div className="flex items-center justify-between px-5 sm:px-7 py-3 border-t border-white/10 bg-[#14171d]/90 shrink-0">
            <button
              onClick={onPrev}
              disabled={!onPrev}
              className="inline-flex items-center gap-1.5 text-xs text-gray-300 hover:text-[#00bfff] disabled:opacity-40 disabled:hover:text-gray-300 transition-colors group"
            >
              <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
              <span>Previous</span>
              <span className="hidden sm:inline text-[9px] text-gray-500 font-mono">[←]</span>
            </button>

            {typeof currentIndex === 'number' && typeof total === 'number' && (
              <span className="text-[11px] font-mono text-gray-400">
                {currentIndex + 1} / {total}
              </span>
            )}

            <button
              onClick={onNext}
              disabled={!onNext}
              className="inline-flex items-center gap-1.5 text-xs text-gray-300 hover:text-[#00bfff] disabled:opacity-40 disabled:hover:text-gray-300 transition-colors group"
            >
              <span>Next</span>
              <span className="hidden sm:inline text-[9px] text-gray-500 font-mono">[→]</span>
              <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
}

export default ProjectDetailModal;
