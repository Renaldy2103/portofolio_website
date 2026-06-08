function Footer() {
  return (
    <footer className="border-t border-white/5 pt-12 pb-12 bg-[#0a0a0a]">
      {/* Menggunakan padding dan max-width standar Tailwind */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 flex flex-col md:flex-row justify-between items-center md:items-end gap-8">
        
        {/* Bagian Kiri: Nama Berukuran Raksasa dengan Warna Gelap */}
        <div className="text-center md:text-left w-full md:w-auto">
          {/* Menggunakan font-display dan warna biru-abu gelap (#1e2a38) agar menyerupai watermark */}
        <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-[50px] uppercase text-[#1e2a38] leading-[0.9] tracking-normal">
          MOCH RENALDY <br className="hidden md:block lg:hidden" /> SYAPUTRA
        </h2>
        </div>  

        {/* Bagian Kanan: Link Sosial Media & Copyright */}
        <div className="flex flex-col items-center md:items-end gap-4 w-full md:w-auto">
          
          {/* Link Sosial Media (Bentuk Teks) */}
          <div className="flex flex-wrap justify-center md:justify-end gap-6 text-sm md:text-base text-[#86a8c3]">
            <a href="https://www.linkedin.com/in/moch-renaldy-syaputra-a19552288/" target="_blank" rel="noopener noreferrer" className="hover:text-[#00bfff] transition-colors">LinkedIn</a>
            <a href="https://github.com/Renaldy2103/Renaldy2103" className="hover:text-[#00bfff] transition-colors">GitHub</a>
          </div>

          {/* Teks Copyright */}
          <p className="text-gray-400 text-xs md:text-sm uppercase tracking-widest text-center md:text-right">
            © 2026 MOCH RENALDY SYAPUTRA. ALL RIGHTS RESERVED.
          </p>
          
        </div>
      </div>
    </footer>
  );
}

export default Footer;