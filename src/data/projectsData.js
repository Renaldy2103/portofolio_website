export const projectsData = [
  {
    id: "this-portfolio-website",
    title: "Personal Portfolio Website",
    category: "WEB APP",
    filterType: "web",
    image: "/projects/my_web.jpeg",
    github: "https://github.com/Renaldy2103/portofolio_website",
    demo: "",
    description: "Personal web portfolio engineered for high performance and a futuristic cyber-aesthetic experience.",
    longDescription:
      "A modern personal portfolio website built with a cyber-dark aesthetic, cyan neon accents, glassmorphic surfaces, and responsive micro-interactions. Emphasizes swift load times, modular component structure, and full responsiveness across devices.",
    features: [
      "Responsive cyber-dark visual design featuring glassmorphism & glowing neon accents",
      "Modern frontend architecture powered by React 19, Tailwind CSS v4, and Vite bundler",
      "Real-time contact form delivery integrated with EmailJS service",
      "Interactive detail popups and certificate lightbox with intuitive keyboard navigation"
    ],
    tech: ["REACT JS", "TAILWIND CSS", "VITE", "UI/UX", "EMAILJS"],
    icon: "language",
    role: "Frontend & UI/UX Developer",
    year: "2025"
  },
  {
    id: "drowsiness-detection",
    title: "Drowsiness Detection System",
    category: "AI / ML",
    filterType: "ai-ml",
    image: "/projects/pendeteksi_kantuk.png",
    github: "https://github.com/Renaldy2103/pendeteksi_kantuk",
    demo: "",
    description:
      "A real-time Python and Computer Vision drowsiness detection system monitoring facial landmarks and eye state.",
    longDescription:
      "Real-time driver fatigue monitoring system utilizing Computer Vision. Tracks 68 facial landmarks to calculate Eye Aspect Ratio (EAR) continuously, triggering instant acoustic alarms whenever eye closure exceeds safety thresholds.",
    features: [
      "Real-time Eye Aspect Ratio (EAR) computation with 68 facial landmark detection",
      "Microsleep detection and abnormal blink frequency tracking under varying lighting conditions",
      "Instant acoustic emergency alarm trigger with ultra-low latency (< 250ms)",
      "Optimized webcam video processing pipeline using OpenCV and SciPy"
    ],
    tech: ["PYTHON", "OPENCV", "COMPUTER VISION", "DLIB", "SCIPY"],
    icon: "visibility",
    role: "AI & Computer Vision Engineer",
    year: "2024"
  },
  {
    id: "health-care",
    title: "Health Care Management System",
    category: "WEB APP",
    filterType: "web",
    image: "/projects/health_care.png",
    github: "https://github.com/Renaldy2103/health_care",
    demo: "",
    description:
      "A healthcare information system built with PHP & MySQL for managing patients, doctors, prescriptions, and payments.",
    longDescription:
      "Web-based clinical healthcare management platform designed to streamline complete hospital operations, including patient intake, physician scheduling, electronic medical records (EMR), pharmacy prescription dispensing, and cashier invoicing.",
    features: [
      "Integrated Electronic Medical Records (EMR) and doctor consultation logs",
      "Real-time patient queue workflow and specialist physician appointment scheduling",
      "Pharmacy & billing module featuring automated prescription pricing and invoice generation",
      "Role-Based Access Control (RBAC) across Admin, Doctor, Nurse, and Cashier roles"
    ],
    tech: ["PHP", "MYSQL", "JAVASCRIPT", "BOOTSTRAP", "WEB DEVELOPMENT"],
    icon: "medical_services",
    role: "Full Stack Web Developer",
    year: "2023"
  },
  {
    id: "smart-hospital",
    title: "Smart Hospital IoT Architecture",
    category: "HEALTHCARE",
    filterType: "web",
    image: "/projects/smart_hospital.png",
    github: "",
    demo: "",
    description: "An integrated healthcare platform combining IoT room telemetry, cloud processing, and capacity tracking.",
    longDescription:
      "Next-generation hospital infrastructure platform uniting IoT sensors (room environment & patient vital telemetry), real-time cloud data pipelines, and visual inpatient bed availability management to optimize medical response times.",
    features: [
      "Live environmental room telemetry dashboard (temperature, humidity, air quality)",
      "Interactive hospital ward bed allocation and real-time occupancy monitor",
      "Automated clinical threshold alerts triggered by IoT sensor streams",
      "Modular backend architecture with MySQL relational database and RESTful APIs"
    ],
    tech: ["PHP", "MYSQL", "IOT", "REST API", "CLOUD COMPUTING"],
    icon: "local_hospital",
    role: "Backend & IoT Integration",
    year: "2024"
  },
  {
    id: "game-marbot-simulator",
    title: "Marbot Simulator 3D",
    category: "GAME DEV",
    filterType: "mobile-game",
    image: "/projects/marbot_simulator.png",
    github: "https://github.com/Renaldy2103/game_marbot_simulator",
    demo: "",
    description:
      "A 3D simulation game set in a mosque marbot role, with missions to keep the environment clean and secure.",
    longDescription:
      "Immersive first-person 3D simulation game honoring the dedication of a mosque caretaker (Marbot). Players navigate daily routines including sanctuary sanitation, audio system calibration, timely call-to-prayer (Adhan), and compound security.",
    features: [
      "First-person 3D character mechanics with object physics and realistic architectural navigation",
      "Dynamic quest timeline tied to prayer schedules and caretaker task checkpoints",
      "Spatial 3D audio design for call-to-prayer acoustics, footstep soundscapes, and environmental ambiance",
      "Authentic Nusantara mosque architectural level design crafted in Unity 3D & C#"
    ],
    tech: ["UNITY 3D", "C#", "3D GAME", "BLENDER", "AUDIO SYSTEM"],
    icon: "sports_esports",
    role: "Game Developer",
    year: "2023"
  },
  {
    id: "ummat-agenda",
    title: "Ummat Agenda Mobile App",
    category: "FLUTTER",
    filterType: "mobile-game",
    image: "/projects/ummat_app.png",
    github: "https://github.com/Renaldy2103/Ummat_App",
    demo: "",
    description: "A Flutter-based mobile app for managing events and the Muslim community.",
    longDescription:
      "Cross-platform mobile app built for community members to coordinate lectures, charitable events, prayer timetables, and community interactions smoothly across Android and iOS devices.",
    features: [
      "Interactive community schedule calendar with timely push reminders",
      "Precise geolocation-based prayer time calculation algorithm",
      "Clean, modern UI designed with reusable custom Flutter & Dart widgets",
      "Offline-first local storage ensuring seamless access under weak network conditions"
    ],
    tech: ["FLUTTER", "DART", "MOBILE APP", "GEOLOCATION", "STATE MANAGEMENT"],
    icon: "event",
    role: "Mobile Application Developer",
    year: "2024"
  },
  {
    id: "yolov11-object-detection",
    title: "YOLOv11 Object Detection Pipeline",
    category: "AI / ML",
    filterType: "ai-ml",
    image: "/projects/deteksi_objek.png",
    github: "https://github.com/Renaldy2103/pendeteksi_kantuk",
    demo: "",
    description: "State-of-the-art YOLOv11 multi-class detection pipeline developed with Roboflow and Colab GPU acceleration.",
    longDescription:
      "Cutting-edge Computer Vision pipeline implementing YOLOv11 for high-speed multi-object recognition. Encompasses curated dataset annotation, Roboflow augmentation pipelines, GPU transfer learning, and rigorous mAP metric evaluations.",
    features: [
      "Automated image preprocessing and synthetic dataset augmentation via Roboflow",
      "YOLOv11 architecture training with hyperparameter tuning on Colab GPUs",
      "Model evaluation benchmarks: Precision, Recall, Confusion Matrix, and mAP@50-95",
      "Model weight conversion to ONNX & PyTorch formats for low-latency edge deployment"
    ],
    tech: ["YOLOV11", "ROBOFLOW", "GOOGLE COLAB", "PYTORCH", "OPENCV"],
    icon: "visibility",
    role: "Machine Learning Engineer",
    year: "2024"
  },
  {
    id: "dropshipflow",
    title: "DropshipFlow E-Commerce Platform",
    category: "FULL STACK",
    filterType: "fullstack",
    image: "/projects/sales_flow.png",
    github: "https://github.com/Renaldy2103/sales_flow",
    demo: "",
    description:
      "Collaborative dropship sales & management system to streamline order entry, collaboration, and delivery workflow.",
    longDescription:
      "Collaborative multi-tier dropshipping logistics and sales platform linking suppliers, store administrators, and resellers. Streamlines order intake, payment verification, packaging stages, courier waybill tracking, and automated revenue splitting.",
    features: [
      "Multi-tier collaborative dashboard tailored for Owners, Warehouse Managers, and Resellers",
      "End-to-end order tracking pipeline from creation, payment validation, packaging, to dispatch",
      "Decoupled architecture: Modern React frontend paired with high-performance Laravel REST APIs",
      "Automated reseller commission calculations and comprehensive ledger reporting"
    ],
    tech: ["LARAVEL", "REACT JS", "ROLE-BASED", "COLLAB", "MYSQL", "TAILWIND"],
    icon: "shopping_cart",
    role: "Full Stack Engineer",
    year: "2024"
  },
  {
    id: "software-effort-estimation",
    title: "Software Effort Estimation Tool",
    category: "AI / ML",
    filterType: "ai-ml",
    image: "/projects/software-effort.png",
    github: "https://github.com/Renaldy2103/software-effort-estimation",
    demo: "",
    description:
      "A web-based software effort estimation system using Elastic Net Regression with hyperparameter tuning and machine learning model integration.",
    longDescription:
      "Machine learning application predicting software development effort and staffing requirements. Leverages Elastic Net Regression balancing L1 (Lasso) and L2 (Ridge) penalties to overcome multicollinearity and prevent overfitting on historical project metrics.",
    features: [
      "Elastic Net regression implementation with fine-tuned Alpha & L1-Ratio parameters",
      "Interactive Streamlit web interface for simulating project effort and cost scenarios",
      "Comprehensive evaluation metrics display: Mean Absolute Error (MAE), RMSE, and R² Score",
      "Feature engineering and scaling pipeline for software size metrics (KLOC / Function Points)"
    ],
    tech: ["PYTHON", "STREAMLIT", "ELASTIC NET", "SCIKIT-LEARN", "MACHINE LEARNING"],
    icon: "analytics",
    role: "Data Scientist & ML Developer",
    year: "2024"
  },
  {
    id: "ai-news-detection-research",
    title: "AI News Detection & Entropy Research",
    category: "RESEARCH",
    filterType: "ai-ml",
    image: "/projects/deteksi_objek.png",
    github: "",
    demo: "",
    description:
      "Empirical research investigating statistical token probability and entropy distribution to distinguish AI-generated news from human journalism.",
    longDescription:
      "Analytical NLP research examining word entropy and probability distributions of generative AI text. Formulates discriminative indicators to differentiate human journalistic reporting from synthesized large language model (LLM) articles.",
    features: [
      "Perplexity and token burstiness analysis for synthetic AI text detection",
      "Statistical n-gram frequency and information entropy modeling over news corpora",
      "Comparative benchmark between human-authored datasets and contemporary LLM outputs",
      "Empirical analysis report and discriminative metric visual distributions"
    ],
    tech: ["NLP", "ANALYSIS", "STATISTICS", "PYTHON", "RESEARCH"],
    icon: "description",
    role: "NLP Researcher",
    year: "2024"
  }
];

export const projectFilterTabs = [
  { label: "ALL", value: "all" },
  { label: "AI / ML", value: "ai-ml" },
  { label: "WEB APP", value: "web" },
  { label: "FULL STACK", value: "fullstack" },
  { label: "MOBILE & GAME", value: "mobile-game" }
];
