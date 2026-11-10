import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaSearch, FaEye, FaAward, FaCalendarAlt, FaCheckCircle } from 'react-icons/fa';
import { certificatesData, certificateFilterTabs } from '../data/certificatesData';
import CertificateModal from '../components/CertificateModal';

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
            Credentials & Highlights
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold uppercase text-white tracking-wide [text-shadow:0_0_25px_rgba(0,191,255,0.4)]">
          All Certificates & Achievements
        </h1>
        <p className="text-gray-400 text-sm sm:text-base max-w-2xl mt-4">
          Verified certifications, national vocational competencies, and professional credentials across software engineering, artificial intelligence, and industry collaboration.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-10 pb-6 border-b border-white/10">
        <div className="flex flex-wrap items-center gap-2">
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

        <div className="relative w-full lg:w-80">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search certificates, issuers, skills..."
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

      {/* Count Info */}
      <div className="flex items-center justify-between text-xs text-gray-400 mb-8">
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
        <div className="bg-[#111317] border border-white/10 rounded-3xl p-12 text-center my-12">
          <p className="text-gray-400 text-sm mb-4">
            No certificates found matching query "{searchQuery}".
          </p>
          <button
            onClick={() => {
              setActiveFilter('ALL');
              setSearchQuery('');
            }}
            className="bg-[#00bfff] text-black px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider hover:scale-105 transition-all"
          >
            Show All Certificates
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCertificates.map((cert, idx) => (
            <div
              key={cert.id}
              onClick={() => setSelectedCertIndex(idx)}
              className="group relative glass-card rounded-[28px] overflow-hidden cursor-pointer border border-white/10 hover:border-[#00bfff]/60 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_0_30px_rgba(0,191,255,0.2)] flex flex-col justify-between"
            >
              <div>
                {/* Image Container with Hover Overlay */}
                <div className="aspect-[4/3] bg-black/40 overflow-hidden relative">
                  <img
                    src={cert.image}
                    alt={cert.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111317] via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                  {/* Hover Button */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 backdrop-blur-[2px]">
                    <span className="inline-flex items-center gap-2 bg-[#00bfff] text-black px-4 py-2 rounded-full font-bold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(0,191,255,0.6)] transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                      <FaEye size={13} />
                      <span>View Credential</span>
                    </span>
                  </div>

                  {/* Top Badge */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="bg-black/60 backdrop-blur-md text-[#00bfff] px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border border-[#00bfff]/30 flex items-center gap-1.5">
                      <FaAward size={11} />
                      {cert.category}
                    </span>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-6">
                  <div className="flex items-center gap-1.5 text-xs text-[#00bfff] font-bold uppercase tracking-wider mb-2">
                    <FaCheckCircle size={12} />
                    <span>Verified Credential</span>
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-[#00bfff] transition-colors leading-snug mb-3 line-clamp-2">
                    {cert.title}
                  </h3>

                  {cert.description && (
                    <p className="text-gray-400 text-xs sm:text-sm line-clamp-2 leading-relaxed mb-4">
                      {cert.description}
                    </p>
                  )}

                  {/* Skills Preview */}
                  {cert.skills && cert.skills.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-2">
                      {cert.skills.slice(0, 3).map((skill) => (
                        <span
                          key={skill}
                          className="bg-white/5 text-gray-300 text-[10px] font-semibold px-2 py-0.5 rounded border border-white/5"
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
              <div className="px-6 py-4 border-t border-white/5 flex items-center justify-between text-xs text-gray-400">
                <span className="truncate max-w-[65%] font-medium text-gray-300">
                  {cert.issuer}
                </span>
                <span className="font-mono flex items-center gap-1">
                  <FaCalendarAlt size={10} className="text-gray-500" />
                  {cert.date}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Certificate Modal */}
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
    </main>
  );
}

export default Certificates;
