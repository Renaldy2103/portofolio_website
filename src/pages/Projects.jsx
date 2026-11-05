import { FaGithub } from "react-icons/fa";

function Projects() {
  const projects = [
    {
      title: "Object Detection with YOLOv11",
      category: "AI/ML",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBUX4hwqCCxvXWfjYFHEYPnmD6YCt6atMRrxPQAQ4qZAxVJISqyBZFlk-c5xORBDc7Hbc34rWtHbvNKGVbUNTf8gynRZj48NT0p3sVtZqf2xElHiCgHMRovJiH0VOVJbeC-YTXc4ufvkXt-o5I_86Bf4U5wHiaZ47vf07OcyF_QMZF8yC0rlB4T0iDOU3oA7riqu3yewu9PQn5drSXTurPYU3o9r9cmzI6SF-68UYHN2xOYq2NYL2n8Q3570km3SfgBBIwWdJ2-Iu0",
      description:
        "Training state-of-the-art computer vision models using Python, Google Colab, and Roboflow for high-accuracy object recognition tasks.",
      tech: ["PYTHON", "ROBOFLOW", "COLAB"],
      github: "https://github.com/Renaldy2103/pendeteksi_kantuk",
      icon: "visibility",
    },
    {
      title: "AI News Detection Research",
      category: "Research",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBYH2NPLelPbAO-aUIPhipiBVsJuu4qaEE_g7HR0b7oQtCFKJdazVDscISRfZezVVvYYJog6rXDciXLlHNs0oo93ZskjVBQ3MlDlJZZMToAsIjuu6VbJoK2HhHUzVdtE1kyfHluWkclU_3mwCuT8vzusHP96l5AUrBctAF0A6SCJxk3FEb1uJcf1ofd-SDvebM5FwVzIfWJbTvaQuNIur9zL88JeqS2uvL5V58_-vtGPZYTzeX2STzkpP97AyZYDfNq2TOwU8CpaTQ",
      description:
        "Deep dive into entropy-based analysis for probability distribution of AI-generated text, distinguishing between human and machine authorship.",
      tech: ["NLP", "ANALYSIS", "STATISTICS"],
      github: "",
      icon: "description",
    },
    {
      title: "DropshipFlow",
      category: "FULL STACK",
      image: "/projects/sales_flow.png",
      description:
        "Collaborative dropship sales & management system to streamline order entry, collaboration, and delivery workflow.",
      tech: ["LARAVEL", "REACT", "ROLE-BASED", "COLLAB"],
      github: "https://github.com/Renaldy2103/sales_flow",
      icon: "shopping_cart",
    },
    {
      title: "Software Effort Estimation",
      category: "ML/AI",
      image: "/projects/software-effort.png",
      description:
        "A web-based software effort estimation system using Elastic Net Regression with hyperparameter tuning and machine learning model integration.",
      tech: ["PYTHON", "STREAMLIT", "ELASTIC NET", "ML"],
      github: "https://github.com/Renaldy2103/software-effort-estimation",
      icon: "analytics",
    },
  ];

  return (
    <main className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop pt-40 min-h-[80vh]">
      <div className="mb-16">
        <div className="flex items-center gap-4 mb-4">
          <div className="h-px w-12 bg-primary" />
          <span className="text-primary font-label-caps uppercase tracking-widest">
            Complete Archive
          </span>
        </div>
        <h1 className="font-headline-lg text-headline-lg uppercase text-white cyber-text-glow">
          All Projects
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter mb-20">
        {projects.map((project) => (
          <div
            key={project.title}
            className="group relative glass-card rounded-[32px] overflow-hidden cursor-pointer card-glow transition-all duration-500"
          >
            <div className="aspect-[16/10] overflow-hidden">
              <img
                alt={project.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 grayscale group-hover:grayscale-0"
                src={project.image}
              />
              <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                <span className="material-symbols-outlined text-6xl text-white">
                  {project.icon}
                </span>
              </div>
            </div>

            <div className="p-10">
              <div className="flex justify-between items-start mb-6 gap-4">
                <h3 className="font-title-md text-2xl text-white group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <span className="bg-primary-container/20 text-primary-container px-4 py-1.5 rounded-lg text-xs font-bold uppercase tracking-widest border border-primary/20 whitespace-nowrap">
                  {project.category}
                </span>
              </div>

              <p className="font-body-sm text-on-surface-variant mb-8 text-base line-clamp-2">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-4 items-center justify-between">
                <div className="flex flex-wrap gap-4">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="text-xs text-primary font-bold tracking-widest flex items-center gap-1"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-primary" /> {t}
                    </span>
                  ))}
                </div>

                {!!project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-[#00bfff] transition mt-2 sm:mt-0"
                    aria-label={`GitHub ${project.title}`}
                  >
                    <FaGithub size={24} />
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

export default Projects;

