import { useEffect } from 'react';
import { FaExternalLinkAlt, FaTimes, FaArrowLeft, FaArrowRight, FaCheckCircle } from 'react-icons/fa';

function CertificateModal({ certificate, onClose, onPrev, onNext, currentIndex, total }) {
  useEffect(() => {
    if (!certificate) return;

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
  }, [certificate, onClose, onPrev, onNext]);

  if (!certificate) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-md p-3 sm:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-label={`Certificate: ${certificate.title}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-5xl bg-[#101216] border border-white/15 rounded-[28px] sm:rounded-[36px] shadow-[0_0_60px_rgba(0,191,255,0.2)] overflow-hidden my-auto flex flex-col max-h-[94vh] transition-all duration-300">
        
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 sm:px-8 py-4 sm:py-5 border-b border-white/10 bg-[#14171d]/90 shrink-0">
          <div className="flex items-center gap-3">
            <span className="bg-[#00bfff]/15 text-[#00bfff] text-[11px] sm:text-xs font-bold px-3 py-1 rounded-full border border-[#00bfff]/30 tracking-widest uppercase">
              {certificate.category}
            </span>
            <span className="text-gray-400 text-xs font-mono">
              {certificate.date}
            </span>
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

        {/* Scrollable Main Area */}
        <div className="overflow-y-auto px-6 sm:px-8 py-6 space-y-6 [scrollbar-width:thin] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-white/10">
          
          {/* Certificate Image Canvas */}
          <div className="relative w-full min-h-[260px] sm:min-h-[420px] max-h-[58vh] bg-[#08090b] border border-white/10 rounded-2xl overflow-hidden flex items-center justify-center group">
            <img
              src={certificate.image}
              alt={certificate.title}
              className="w-full h-full max-h-[58vh] object-contain transition-transform duration-500 group-hover:scale-[1.01]"
            />

            <a
              href={certificate.image}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-4 right-4 bg-black/70 hover:bg-[#00bfff] text-white hover:text-black text-xs font-semibold px-3.5 py-2 rounded-xl border border-white/20 transition-all flex items-center gap-2 backdrop-blur-md shadow-lg"
              title="Open full resolution certificate in new tab"
            >
              <FaExternalLinkAlt size={12} />
              <span>Open Full Image</span>
            </a>
          </div>

          {/* Certificate Details */}
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-2 text-[#00bfff] text-xs font-bold uppercase tracking-wider mb-2">
                <FaCheckCircle />
                <span>Verified Credential</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2 leading-tight">
                {certificate.title}
              </h2>
              <div className="flex items-center gap-2 text-gray-300 text-sm mb-3">
                <span className="material-symbols-outlined text-sm text-[#00bfff]">corporate_fare</span>
                <span className="font-medium text-white">{certificate.issuer}</span>
                <span className="text-gray-500">•</span>
                <span className="text-gray-400 font-mono">{certificate.date}</span>
              </div>
              {certificate.description && (
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                  {certificate.description}
                </p>
              )}
            </div>

            {/* Skills Pills */}
            {certificate.skills && certificate.skills.length > 0 && (
              <div className="md:w-72 shrink-0 bg-[#15181f] border border-white/5 rounded-2xl p-4">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-3">
                  Related Competencies
                </span>
                <div className="flex flex-wrap gap-2">
                  {certificate.skills.map((skill) => (
                    <span
                      key={skill}
                      className="bg-white/5 text-gray-200 text-xs px-2.5 py-1 rounded-md border border-white/10"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

        </div>

        {/* Modal Bottom Navigation */}
        <div className="flex items-center justify-between px-6 sm:px-8 py-4 border-t border-white/10 bg-[#14171d]/90 shrink-0">
          <button
            onClick={onPrev}
            className="inline-flex items-center gap-2 text-xs sm:text-sm text-gray-300 hover:text-[#00bfff] transition-colors group"
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
            className="inline-flex items-center gap-2 text-xs sm:text-sm text-gray-300 hover:text-[#00bfff] transition-colors group"
          >
            <span>Next</span>
            <span className="hidden sm:inline text-[10px] text-gray-500 font-mono">[→]</span>
            <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>
    </div>
  );
}

export default CertificateModal;
