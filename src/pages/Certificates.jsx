import { useState, useMemo, lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { FaArrowLeft, FaSearch, FaEye, FaAward, FaCalendarAlt, FaCheckCircle } from 'react-icons/fa';
import { certificatesData, certificateFilterTabs } from '../data/certificatesData';
import CertificateModal from '../components/CertificateModal';
import SplitHeading from '../components/SplitHeading';
import MotionCard from '../components/MotionCard';

const CyberOrb3D = lazy(() => import('../components/three/CyberOrb3D'));

function Certificates() {
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCertIndex, setSelectedCertIndex] = useState(null);

  const filteredCertificates = useMemo(() => {
    return certificatesData.filter((cert) => {
      const matchesFilter =
        activeFilter === 'ALL' || cert.category === activeFilter;

      const query = searchQuery.toLowerCase().trim();
      if (!query) return matchesFilter;

      const matchesSearch =
        cert.title.toLowerCase().includes(query) ||
        cert.issuer.toLowerCase().includes(query) ||
        (cert.skills && cert.skills.some((s) => s.toLowerCase().includes(query))) ||
        (cert.description && cert.description.toLowerCase().includes(query));

      return matchesFilter && matchesSearch;
    });
  }, [activeFilter, searchQuery]);

  const activeCert =
    selectedCertIndex !== null ? filteredCertificates[selectedCertIndex] : null;

  const handlePrev = () => {
    setSelectedCertIndex((prev) => {
      if (prev === null) return null;
      return (prev - 1 + filteredCertificates.length) % filteredCertificates.length;
    });
  };

  const handleNext = () => {
    setSelectedCertIndex((prev) => {
      if (prev === null) return null;
      return (prev + 1) % filteredCertificates.length;
    });
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 md:pt-36 pb-24 min-h-[85vh]">
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
              Credentials &amp; Highlights
            </span>
          </motion.div>
          <SplitHeading
            as="h1"
            mode="hero"
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold uppercase text-white tracking-wide [text-shadow:0_0_20px_rgba(0,191,255,0.35)]"
          >
            All Certificates &amp; Achievements
          </SplitHeading>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="text-gray-400 text-xs sm:text-sm max-w-2xl mt-3 leading-relaxed"
          >
            Verified certifications, national vocational competencies, and professional credentials across software engineering, artificial intelligence, and industry collaboration.
          </motion.p>
        </div>

        <div className="hidden md:block w-44 h-44 lg:w-52 lg:h-52 shrink-0">
          <Suspense fallback={<div className="w-full h-full rounded-full bg-[#00bfff]/5 animate-pulse" />}>
            <CyberOrb3D compact eager />
          </Suspense>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8 pb-5 border-b border-white/10">
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          {certificateFilterTabs.map((tab) => {
            const count =
              tab.value === 'ALL'
                ? certificatesData.length
                : certificatesData.filter((c) => c.category === tab.value).length;
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
                    layoutId="activeCertFilterTab"
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

        <div className="relative w-full lg:w-72">
          <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 text-xs pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search certificates, issuers, skills..."
            className="w-full bg-[#111317] border border-white/15 focus:border-[#00bfff] rounded-full pl-9 pr-8 py-2 text-xs text-white placeholder-gray-500 outline-none transition-all shadow-inner focus:shadow-[0_0_12px_rgba(0,191,255,0.2)]"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white text-xs"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Count Info */}
      <div className="flex items-center justify-between text-xs text-gray-400 mb-6">
        <div>
          Showing <span className="text-[#00bfff] font-bold">{filteredCertificates.length}</span> of {certificatesData.length} certificates
        </div>
        {(activeFilter !== 'ALL' || searchQuery) && (
          <button
            onClick={() => {
              setActiveFilter('ALL');
              setSearchQuery('');
            }}
            className="text-xs text-[#00bfff] hover:underline"
          >
            Reset Filters
          </button>
        )}
      </div>

      {/* Grid */}
      {filteredCertificates.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#111317] border border-white/10 rounded-2xl p-10 text-center my-10"
        >
          <p className="text-gray-400 text-xs sm:text-sm mb-4">
            No certificates found matching query &ldquo;{searchQuery}&rdquo;.
          </p>
          <button
            onClick={() => {
              setActiveFilter('ALL');
              setSearchQuery('');
            }}
            className="bg-[#00bfff] text-black px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider hover:scale-105 transition-all"
          >
            Show All Certificates
          </button>
        </motion.div>
      ) : (
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          <AnimatePresence mode="popLayout">
            {filteredCertificates.map((cert, idx) => (
              <MotionCard
                key={cert.id}
                index={idx}
                layout
                onClick={() => setSelectedCertIndex(idx)}
                className="glass-card rounded-2xl overflow-hidden cursor-pointer border border-white/10 hover:border-[#00bfff]/60 transition-colors duration-300 hover:shadow-[0_12px_30px_rgba(0,191,255,0.16)] flex flex-col justify-between h-full bg-[#11141b]/70"
              >
                <div>
                  {/* Image Container with Hover Overlay */}
                  <div className="aspect-[4/3] bg-black/40 overflow-hidden relative">
                    <img
                      src={cert.image}
                      alt={cert.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#11141b] via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                    {/* Hover Button */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/40 backdrop-blur-[2px]">
                      <span className="inline-flex items-center gap-1.5 bg-[#00bfff] text-black px-3.5 py-1.5 rounded-full font-bold text-[11px] uppercase tracking-wider shadow-[0_0_15px_rgba(0,191,255,0.6)] transform translate-y-1.5 group-hover:translate-y-0 transition-transform duration-200">
                        <FaEye size={11} />
                        <span>View Credential</span>
                      </span>
                    </div>

                    {/* Top Badge */}
                    <div className="absolute top-3 left-3 z-10">
                      <span className="bg-black/75 backdrop-blur-md text-[#00bfff] px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider border border-[#00bfff]/30 flex items-center gap-1">
                        <FaAward size={10} />
                        {cert.category}
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-4 sm:p-5">
                    <div className="flex items-center gap-1.5 text-[11px] text-[#00bfff] font-bold uppercase tracking-wider mb-1.5">
                      <FaCheckCircle size={11} />
                      <span>Verified Credential</span>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-[#00bfff] transition-colors leading-snug mb-2 line-clamp-2">
                      {cert.title}
                    </h3>

                    {cert.description && (
                      <p className="text-gray-400 text-xs line-clamp-2 leading-relaxed mb-3">
                        {cert.description}
                      </p>
                    )}

                    {/* Skills Preview */}
                    {cert.skills && cert.skills.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {cert.skills.slice(0, 3).map((skill) => (
                          <span
                            key={skill}
                            className="bg-white/5 text-gray-300 text-[10px] font-semibold px-2 py-0.5 rounded-md border border-white/5"
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
                <div className="px-4 sm:px-5 py-3 border-t border-white/5 flex items-center justify-between text-xs text-gray-400">
                  <span className="truncate max-w-[65%] font-medium text-gray-300">
                    {cert.issuer}
                  </span>
                  <span className="font-mono text-[11px] flex items-center gap-1">
                    <FaCalendarAlt size={10} className="text-gray-500" />
                    {cert.date}
                  </span>
                </div>
              </MotionCard>
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      {/* Certificate Modal */}
      <AnimatePresence>
        {activeCert && (
          <CertificateModal
            certificate={activeCert}
            onClose={() => setSelectedCertIndex(null)}
            onPrev={handlePrev}
            onNext={handleNext}
            currentIndex={selectedCertIndex}
            total={filteredCertificates.length}
          />
        )}
      </AnimatePresence>
    </main>
  );
}

export default Certificates;
