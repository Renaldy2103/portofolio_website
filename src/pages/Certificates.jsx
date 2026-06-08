function Certificates() {
  return (
    <main className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop pt-40 min-h-[80vh]">
      <div className="mb-16">
        <div className="flex items-center gap-4 mb-4">
          <div className="h-px w-12 bg-primary"></div>
          <span className="text-primary font-label-caps uppercase tracking-widest">Complete Archive</span>
        </div>
        <h1 className="font-headline-lg text-headline-lg uppercase text-white cyber-text-glow">All Certificates</h1>
      </div>

      <div className="flex flex-wrap gap-4 mb-16">
        <button className="bg-primary text-on-primary px-8 py-3.5 rounded-full font-bold transition-all shadow-lg shadow-primary/20" id="filter-all">SEMUA</button>
        <button className="bg-surface-container-high text-on-surface-variant px-8 py-3.5 rounded-full font-bold border border-white/5 hover:text-primary transition-all" id="filter-technical">TECHNICAL &amp; IT</button>
        <button className="bg-surface-container-high text-on-surface-variant px-8 py-3.5 rounded-full font-bold border border-white/5 hover:text-primary transition-all" id="filter-softskill">SOFT SKILLS</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
        {/* Cert 1 */}
        <div className="group bg-surface-container-low rounded-[24px] border border-white/10 overflow-hidden transition-all duration-500 hover:-translate-y-2 card-glow flex flex-col">
          <div className="aspect-video bg-surface-container-highest flex items-center justify-center overflow-hidden relative">
            <img alt="Advanced Python" className="w-full h-full object-cover opacity-30 group-hover:opacity-60 transition-opacity" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCNiO-CCxKjynXZd7QQhoktKrvyCOgy04j5LZg3vJo-niUQzTpPvDIPfESCAb46dFfY3yz_IlDFpx7MaK9Yqo53TLNsk4I39XsQhAwZKXTHb5vdwpuX0j62HMwIQN8RaSe5q41_jWdWUpt4WCP00jbjzPfGRuN8PEGL4iVzj-eRcYiHWSlSTREnAWy_tmAD27xJyeFekTv1Lb6vPHcr9oVyTN4iUgfBkG7yqFdSh9T7oU_730b1D29g47lgLiWZEcZ8MmaYKsCgtOU"/>
            <span className="material-symbols-outlined text-primary text-5xl absolute cyber-text-glow">verified</span>
          </div>
          <div className="p-8 flex-1 flex flex-col">
            <div className="flex justify-between items-start mb-4">
              <span className="text-[10px] bg-primary/10 text-primary font-label-caps px-3 py-1 rounded-full border border-primary/20">TECHNICAL</span>
              <span className="text-on-surface-variant text-xs font-bold">JAN 2024</span>
            </div>
            <h3 className="font-title-md text-xl text-white mb-4 group-hover:text-primary transition-colors">Advanced Python Programming</h3>
            <div className="mt-auto flex items-center gap-2 text-on-surface-variant text-sm">
              <span className="material-symbols-outlined text-sm">corporate_fare</span>
              <span>Google via Coursera</span>
            </div>
          </div>
        </div>
        {/* Cert 2 */}
        <div className="group bg-surface-container-low rounded-[24px] border border-white/10 overflow-hidden transition-all duration-500 hover:-translate-y-2 card-glow flex flex-col">
          <div className="aspect-video bg-surface-container-highest flex items-center justify-center overflow-hidden relative">
            <img alt="Agile Leadership" className="w-full h-full object-cover opacity-30 group-hover:opacity-60 transition-opacity" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDdf1pzwosMhUTMYtPbCtOcNfpsqYChWTKmWcDeKKWLu2WiAu1N3SahoQg45TC5WSDp8WoAmTpzqt65IamC98Dlb7Jt1Ix5en65eZJOyeXwCMfFxlJUHwNnhMRft6_UYEjtzXIktzSxjeRk_9gV671B6DgiTaukCF2MmEIVlme7T8ZRVOcp2O1dVwAhrsfu7BoUX5gQlxqvcjHLLKGJYZcPMzTvKrzgGWBWy21LUw8UIAehH8JJy-YYmd3tbFqK7eLZj7tCUI7tWyg"/>
            <span className="material-symbols-outlined text-primary text-5xl absolute cyber-text-glow">military_tech</span>
          </div>
          <div className="p-8 flex-1 flex flex-col">
            <div className="flex justify-between items-start mb-4">
              <span className="text-[10px] bg-primary-container/10 text-primary-container font-label-caps px-3 py-1 rounded-full border border-primary-container/20">SOFT SKILL</span>
              <span className="text-on-surface-variant text-xs font-bold">NOV 2023</span>
            </div>
            <h3 className="font-title-md text-xl text-white mb-4 group-hover:text-primary transition-colors">Agile Leadership Certification</h3>
            <div className="mt-auto flex items-center gap-2 text-on-surface-variant text-sm">
              <span className="material-symbols-outlined text-sm">school</span>
              <span>HIMATIF UMM</span>
            </div>
          </div>
        </div>
        {/* Cert 3 */}
        <div className="group bg-surface-container-low rounded-[24px] border border-white/10 overflow-hidden transition-all duration-500 hover:-translate-y-2 card-glow flex flex-col">
          <div className="aspect-video bg-surface-container-highest flex items-center justify-center overflow-hidden relative">
            <img alt="MLOps" className="w-full h-full object-cover opacity-30 group-hover:opacity-60 transition-opacity" src="https://lh3.googleusercontent.com/aida-public/AB6AXuASsuzu1IIkB9gyCFnxWq8dlgx9Sc_riygloZPmmjbQv47uD23ilSC4CWGbrpz55Yy51r5O4M9LueksBKM8W8JaJo2N9-xPAJPBAC3w0LL11JeKzO6AZPqbejeH9hF-lK9taG4-GkP-9KAYhTQBFviJF03BY6hDMcR5jhaBLD2eb5vnLskjeQKRf-FcC1x7dkj3qwMM0m11Va9iNwsq5GNxjimMpOzuDvSVQe1oyql4BUXFW19xDXFb6fBLz9Rqg1D7XAMTXxWbyIs"/>
            <span className="material-symbols-outlined text-primary text-5xl absolute cyber-text-glow">model_training</span>
          </div>
          <div className="p-8 flex-1 flex flex-col">
            <div className="flex justify-between items-start mb-4">
              <span className="text-[10px] bg-primary/10 text-primary font-label-caps px-3 py-1 rounded-full border border-primary/20">TECHNICAL</span>
              <span className="text-on-surface-variant text-xs font-bold">MAR 2024</span>
            </div>
            <h3 className="font-title-md text-xl text-white mb-4 group-hover:text-primary transition-colors">MLOps Professional</h3>
            <div className="mt-auto flex items-center gap-2 text-on-surface-variant text-sm">
              <span className="material-symbols-outlined text-sm">verified_user</span>
              <span>Dicoding Indonesia</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Certificates;
