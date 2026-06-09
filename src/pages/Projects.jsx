function Projects() {
  return (
    <main className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop pt-40 min-h-[80vh]">
      <div className="mb-16">
        <div className="flex items-center gap-4 mb-4">
          <div className="h-px w-12 bg-primary"></div>
          <span className="text-primary font-label-caps uppercase tracking-widest">Complete Archive</span>
        </div>
        <h1 className="font-headline-lg text-headline-lg uppercase text-white cyber-text-glow">All Projects</h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter mb-20">
        {/* Project 1 */}
        <div className="group relative glass-card rounded-[32px] overflow-hidden cursor-pointer card-glow transition-all duration-500">
          <div className="aspect-[16/10] overflow-hidden">
            <img alt="Object Detection Visualization" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 grayscale group-hover:grayscale-0" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBUX4hwqCCxvXWfjYFHEYPnmD6YCt6atMRrxPQAQ4qZAxVJISqyBZFlk-c5xORBDc7Hbc34rWtHbvNKGVbUNTf8gynRZj48NT0p3sVtZqf2xElHiCgHMRovJiH0VOVJbeC-YTXc4ufvkXt-o5I_86Bf4U5wHiaZ47vf07OcyF_QMZF8yC0rlB4T0iDOU3oA7riqu3yewu9PQn5drSXTurPYU3o9r9cmzI6SF-68UYHN2xOYq2NYL2n8Q3570km3SfgBBIwWdJ2-Iu0"/>
            <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
              <span className="material-symbols-outlined text-6xl text-white">visibility</span>
            </div>
          </div>
          <div className="p-10">
            <div className="flex justify-between items-start mb-6">
              <h3 className="font-title-md text-2xl text-white group-hover:text-primary transition-colors">Object Detection with YOLOv11</h3>
              <span className="bg-primary-container/20 text-primary-container px-4 py-1.5 rounded-lg text-xs font-bold uppercase tracking-widest border border-primary/20">AI/ML</span>
            </div>
            <p className="font-body-sm text-on-surface-variant mb-8 text-base line-clamp-2">
              Training state-of-the-art computer vision models using Python, Google Colab, and Roboflow for high-accuracy object recognition tasks.
            </p>
            <div className="flex flex-wrap gap-4">
              <span className="text-xs text-primary font-bold tracking-widest flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-primary"></span> PYTHON</span>
              <span className="text-xs text-primary font-bold tracking-widest flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-primary"></span> ROBOFLOW</span>
              <span className="text-xs text-primary font-bold tracking-widest flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-primary"></span> COLAB</span>
            </div>
          </div>
        </div>
        {/* Project 2 */}
        <div className="group relative glass-card rounded-[32px] overflow-hidden cursor-pointer card-glow transition-all duration-500">
          <div className="aspect-[16/10] overflow-hidden">
            <img alt="AI Detection Research" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 grayscale group-hover:grayscale-0" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBYH2NPLelPbAO-aUIPhipiBVsJuu4qaEE_g7HR0b7oQtCFKJdazVDscISRfZezVVvYYJog6rXDciXLlHNs0oo93ZskjVBQ3MlDlJZZMToAsIjuu6VbJoK2HhHUzVdtE1kyfHluWkclU_3mwCuT8vzusHP96l5AUrBctAF0A6SCJxk3FEb1uJcf1ofd-SDvebM5FwVzIfWJbTvaQuNIur9zL88JeqS2uvL5V58_-vtGPZYTzeX2STzkpP97AyZYDfNq2TOwU8CpaTQ"/>
            <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none backdrop-blur-[2px]">
              <span className="material-symbols-outlined text-6xl text-white">description</span>
            </div>
          </div>
          <div className="p-10">
            <div className="flex justify-between items-start mb-6">
              <h3 className="font-title-md text-2xl text-white group-hover:text-primary transition-colors">AI News Detection Research</h3>
              <span className="bg-primary-container/20 text-primary-container px-4 py-1.5 rounded-lg text-xs font-bold uppercase tracking-widest border border-primary/20">Research</span>
            </div>
            <p className="font-body-sm text-on-surface-variant mb-8 text-base line-clamp-2">
              Deep dive into entropy-based analysis for probability distribution of AI-generated text, distinguishing between human and machine authorship.
            </p>
            <div className="flex flex-wrap gap-4">
              <span className="text-xs text-primary font-bold tracking-widest flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-primary"></span> NLP</span>
              <span className="text-xs text-primary font-bold tracking-widest flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-primary"></span> ANALYSIS</span>
              <span className="text-xs text-primary font-bold tracking-widest flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-primary"></span> STATISTICS</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Projects;
