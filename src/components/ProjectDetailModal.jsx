import { useEffect } from 'react';
import { FaGithub, FaExternalLinkAlt, FaTimes, FaArrowLeft, FaArrowRight } from 'react-icons/fa';

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

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-3 sm:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-label={`Project Details: ${project.title}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-4xl bg-[#101216] border border-white/15 rounded-[28px] sm:rounded-[36px] shadow-[0_0_60px_rgba(0,191,255,0.2)] overflow-hidden my-auto flex flex-col max-h-[92vh] transition-all duration-300">
        
        {/* Modal Top Header */}
        <div className="flex items-center justify-between px-6 sm:px-8 py-5 border-b border-white/10 bg-[#14171d]/80 shrink-0">
          <div className="flex items-center gap-3">
            <span className="bg-[#00bfff]/15 text-[#00bfff] text-[11px] sm:text-xs font-bold px-3 py-1 rounded-full border border-[#00bfff]/30 tracking-widest uppercase">
              {project.category}
            </span>
            {project.year && (
              <span className="text-gray-400 text-xs font-mono">
                {project.year}
              </span>
            )}
            {project.role && (
              <span className="hidden sm:inline-block text-gray-400 text-xs border-l border-white/10 pl-3">
                {project.role}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <span className="hidden md:inline-block text-[10px] text-gray-500 font-mono tracking-wider border border-white/10 px-2 py-0.5 rounded">
              ESC
            </span>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-gray-300 hover:text-white flex items-center justify-center transition-all active:scale-95"
              aria-label="Close modal"
            >
              <FaTimes size={16} />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Content */}
        <div className="overflow-y-auto px-6 sm:px-8 py-6 space-y-6 [scrollbar-width:thin] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-white/10">
          
          {/* Main Visual Banner */}
          <div className="relative rounded-2xl overflow-hidden border border-white/10 aspect-[16/9] sm:aspect-[21/9] bg-black/40 group">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#101216] via-transparent to-transparent opacity-80" />
            
            <a
              href={project.image}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-4 right-4 bg-black/60 hover:bg-[#00bfff] text-white hover:text-black text-xs font-semibold px-3 py-1.5 rounded-lg border border-white/20 transition-all flex items-center gap-1.5 backdrop-blur-sm"
              title="Open full image in new tab"
            >
              <FaExternalLinkAlt size={11} />
              <span>Open Full Image</span>
            </a>
          </div>

          {/* Project Title & Short Summary */}
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-wide mb-3 [text-shadow:0_0_20px_rgba(0,191,255,0.4)]">
              {project.title}
            </h2>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
              {project.longDescription || project.description}
            </p>
          </div>

          {/* Key Features & Highlights */}
          {project.features && project.features.length > 0 && (
            <div className="bg-[#15181f] border border-white/5 rounded-2xl p-5 sm:p-6">
              <h3 className="text-xs font-bold text-[#00bfff] tracking-widest uppercase mb-4 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00bfff]" />
                Key Features & Highlights
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-300">
                {project.features.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="text-[#00bfff] font-bold text-base leading-none select-none">✓</span>
                    <span className="leading-snug">{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Tech Stack Pills */}
          <div>
            <h3 className="text-xs font-bold text-gray-400 tracking-widest uppercase mb-3">
              Technologies & Tools
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="bg-white/5 hover:bg-[#00bfff]/10 hover:text-[#00bfff] text-gray-200 text-xs font-semibold px-3 py-1.5 rounded-lg border border-white/10 transition-colors flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00bfff]" />
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
                className="inline-flex items-center gap-2 bg-[#00bfff] text-black px-6 py-3 rounded-full font-bold text-sm hover:scale-105 active:scale-95 transition-all shadow-[0_0_20px_rgba(0,191,255,0.4)]"
              >
                <FaGithub size={18} />
                <span>View Source on GitHub</span>
              </a>
            ) : (
              <span className="text-xs text-gray-500 italic py-2">
                Private repository / Internal project
              </span>
            )}

            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-[#00bfff]/50 text-[#00bfff] hover:bg-[#00bfff]/10 px-6 py-3 rounded-full font-bold text-sm transition-all"
              >
                <FaExternalLinkAlt size={14} />
                <span>Live Demo</span>
              </a>
            )}
          </div>

        </div>

        {/* Modal Bottom Navigation */}
        {(onPrev || onNext) && (
          <div className="flex items-center justify-between px-6 sm:px-8 py-4 border-t border-white/10 bg-[#14171d]/90 shrink-0">
            <button
              onClick={onPrev}
              disabled={!onPrev}
              className="inline-flex items-center gap-2 text-xs sm:text-sm text-gray-300 hover:text-[#00bfff] disabled:opacity-40 disabled:hover:text-gray-300 transition-colors group"
            >
              <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
              <span>Previous</span>
              <span className="hidden sm:inline text-[10px] text-gray-500 font-mono">[←]</span>
            </button>

            {typeof currentIndex === 'number' && typeof total === 'number' && (
              <span className="text-xs font-mono text-gray-400">
                {currentIndex + 1} / {total}
              </span>
            )}

            <button
              onClick={onNext}
              disabled={!onNext}
              className="inline-flex items-center gap-2 text-xs sm:text-sm text-gray-300 hover:text-[#00bfff] disabled:opacity-40 disabled:hover:text-gray-300 transition-colors group"
            >
              <span>Next</span>
              <span className="hidden sm:inline text-[10px] text-gray-500 font-mono">[→]</span>
              <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
}

export default ProjectDetailModal;
