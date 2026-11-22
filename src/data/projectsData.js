export const projectsData = [
  {
    id: "inventory-management-system",
    title: "Inventory Management System",
    category: "BACKEND / FULL STACK",
    filterType: "fullstack",
    status: "In Progress",
    statusDetail: "Phase 1–3 Complete (Architecture, ERD, API Contracts & FastAPI Setup)",
    image: "/projects/inventory_management.svg",
    github: "https://github.com/Renaldy2103/InventoryManagementSystem",
    demo: "",
    description:
      "Enterprise inventory management platform focused on high-concurrency stock consistency, row-level locking, complete audit trails, and role-based access control.",
    longDescription:
      "An enterprise-grade inventory management system designed to showcase robust backend engineering principles for junior backend & full-stack development. Focuses on bulletproof stock consistency under concurrent loads using row-level database locking (SELECT FOR UPDATE), immutable transaction audit trails for every stock movement, and fine-grained role-based access control (RBAC) across Admin, Manager, and Staff roles.",
    problem:
      "High-concurrency inventory environments routinely suffer from race conditions, overselling, missing transaction audit records, and unauthorized inventory adjustments when business logic is coupled with HTTP routers or database integrity constraints are omitted.",
    goal:
      "Construct a decoupled, production-ready backend following clean layered architecture (Router → Dependencies → Service → Repository → PostgreSQL) that guarantees atomic stock movements, prevents negative stock, ensures transaction idempotency, and records full audit accountability.",
    architecture:
      "Modular layered architecture dividing concerns cleanly: FastAPI Routers parse incoming HTTP requests and validate schemas with Pydantic; Dependency Injection provides DB sessions and validates JWT roles; Service layer enforces business rules and manages transaction boundaries with SELECT FOR UPDATE; SQLAlchemy 2.x Repository isolates database queries; and PostgreSQL acts as the ultimate line of defense via CHECK (stock_quantity >= 0) constraints.",
    challenges: [
      "Eliminating race conditions during peak concurrent stock-out operations via pessimistic row-level locking (SELECT ... FOR UPDATE) and atomic database transactions.",
      "Enforcing three-tier defense against overselling: Pydantic validation (quantity > 0), service-level transactional checks, and PostgreSQL CHECK constraints.",
      "Implementing transaction audit trail without impacting system throughput by tracking every mutation with timestamp, actor, quantity, and reason.",
      "Dual-token authentication security: Short-lived 15-minute JWT access token paired with hashed refresh token stored securely in httpOnly cookies."
    ],
    features: [
      "Clean Layered Backend Architecture: Router → Dependencies → Service → Repository → PostgreSQL",
      "High-concurrency stock consistency with row-level locking (SELECT ... FOR UPDATE)",
      "Three-tier validation: Pydantic schemas, Service checks, and PostgreSQL CHECK constraints",
      "Comprehensive transaction audit trail (Stock In, Stock Out, Adjustments)",
      "Dual-token authentication: Short-lived 15m JWT access token + hashed refresh token in httpOnly cookie",
      "Role-Based Access Control (RBAC) supporting Admin, Manager, and Staff roles",
      "Fully documented OpenAPI/Swagger specifications and comprehensive Pytest test suites",
      "Containerized development workflow with Docker Compose"
    ],
    tech: [
      "PYTHON",
      "FASTAPI",
      "POSTGRESQL",
      "SQLALCHEMY 2.X",
      "ALEMBIC",
      "PYDANTIC",
      "JWT",
      "PYTEST",
      "REACT",
      "TYPESCRIPT",
      "TAILWIND CSS",
      "DOCKER COMPOSE"
    ],
    icon: "inventory_2",
    role: "Junior Backend & Full-Stack Developer",
    year: "2025"
  },
  {
    id: "scamshield",
    title: "ScamShield 🛡️",
    category: "MOBILE APP",
    filterType: "mobile-game",
    status: "Completed",
    statusDetail: "Portfolio Project / Production Ready",
    image: "/projects/scamshield.svg",
    github: "https://github.com/Renaldy2103/ScamShield",
    demo: "",
    description:
      "Mobile threat defense application built with React Native and Expo SDK 52 to detect phishing links, deceptive SMS messages, fake job postings, and OTP credential theft.",
    longDescription:
      "A production-grade mobile security application engineered with React Native and Expo SDK 52. Acts as a proactive first line of digital fraud defense for mobile users by identifying malicious URLs, scanning deceptive SMS messages, calculating an explainable 0–100 risk score, and educating users on cybersecurity threats—all with zero PII logging and 100% offline resilience.",
    problem:
      "The rapid surge of sophisticated social engineering attacks in Indonesia (banking phishing, fake job offers, lottery traps, malicious APK distributions, and OTP theft) severely affects job seekers, students, and mobile users who lack immediate tools to verify suspicious messages and links before taking action.",
    goal:
      "Provide a fast, privacy-preserving, and accessible mobile threat detection tool that evaluates risks in real-time without relying strictly on external servers or exposing user private data.",
    architecture:
      "Mobile-first client architecture using Expo Router v4 (file-based navigation and native tabs) paired with TypeScript in strict mode. Domain logic is separated into heuristic analysis engines, storage adapters, and Supabase Edge Function proxies. Implements local fallback mock datasets whenever offline to maintain 100% availability.",
    challenges: [
      "Conducting instant heuristic security analysis on-device without running unsafe automated WebViews that could compromise device security.",
      "Privacy preservation: Automatically sanitizing and redacting sensitive PII (phone numbers, emails, tokens, card details) before writing to AsyncStorage.",
      "Zero-connectivity resilience: Ensuring heuristic engines, educational modules, and local risk calculation remain 100% functional without network access.",
      "Accessible & ergonomic mobile design: Strict WCAG contrast compliance, touch targets min 44x44, and seamless Dark/Light Mode switching."
    ],
    features: [
      "Real-time URL Checker: Validates schemes, blocks dangerous protocols (javascript:, data:), and detects suspicious TLDs/subdomains",
      "Message & SMS Scanner: Extracts hidden URLs, flags artificial urgency, and identifies OTP/credential theft patterns",
      "Transparent 0–100 Risk Score across 5 color-coded risk tiers (Safe, Low, Moderate, High, Critical)",
      "Privacy-First Local Storage: Automated PII redaction for phone numbers, emails, and credentials with AsyncStorage",
      "Interactive Cybersecurity Education: Practical modules on Phishing, OTP defense, domain spoofing, and emergency responses",
      "Official reporting channel directory integrating Kominfo, OJK, and Patroli Siber Polri",
      "100% Offline Resilience with built-in local heuristic engine and mock datasets",
      "39 Jest unit test suites covering URL normalization, heuristic analysis, redaction, and error handling",
      "WCAG-compliant contrast, Touch target min 44x44, and seamless Dark/Light Mode support"
    ],
    tech: [
      "REACT NATIVE",
      "EXPO SDK 52",
      "TYPESCRIPT",
      "EXPO ROUTER",
      "SUPABASE EDGE",
      "ASYNCSTORAGE",
      "JEST",
      "TAILWIND CSS"
    ],
    icon: "security",
    role: "Mobile Application & Security Developer",
    year: "2025"
  },
  {
    id: "this-portfolio-website",
    title: "Personal Portfolio Website",
    category: "WEB APP",
    filterType: "web",
    status: "Completed",
    image: "/projects/my_web.jpeg",
    github: "https://github.com/Renaldy2103/portofolio_website",
    demo: "",
    description: "Personal web portfolio engineered for high performance and a futuristic cyber-aesthetic experience.",
    longDescription:
      "A modern personal portfolio website built with a cyber-dark aesthetic, cyan neon accents, glassmorphic surfaces, and responsive micro-interactions. Emphasizes swift load times, modular component structure, and full responsiveness across devices.",
    problem:
      "Developers often struggle to present diverse capabilities across backend systems, AI pipelines, and frontend applications in an engaging, cohesive, and recruiter-friendly presentation.",
    goal:
      "Build a cutting-edge portfolio showcasing full-stack proficiency, responsive UI design, interactive 3D elements, and structured engineering case studies.",
    architecture:
      "Single Page Application (SPA) leveraging React 19, Tailwind CSS v4, and React Router v7 with modular data architectures and EmailJS contact integrations.",
    challenges: [
      "Balancing rich visual effects (WebGL aurora, 3D tilt, glassmorphism) with optimal 60fps rendering performance.",
      "Designing responsive layouts supporting seamless navigation across mobile, tablet, and desktop screens."
    ],
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
    status: "Completed",
    image: "/projects/pendeteksi_kantuk.png",
    github: "https://github.com/Renaldy2103/pendeteksi_kantuk",
    demo: "",
    description:
      "A real-time Python and Computer Vision drowsiness detection system monitoring facial landmarks and eye state.",
    longDescription:
      "Real-time driver fatigue monitoring system utilizing Computer Vision. Tracks 68 facial landmarks to calculate Eye Aspect Ratio (EAR) continuously, triggering instant acoustic alarms whenever eye closure exceeds safety thresholds.",
    problem:
      "Driver fatigue and microsleep are leading causes of severe road accidents, requiring low-latency automated visual alert systems.",
    goal:
      "Develop a lightweight edge-capable computer vision system detecting eyelid closure and blink duration in real-time.",
    architecture:
      "OpenCV video feed stream coupled with Dlib 68-point facial landmark detector and SciPy Euclidean distance calculations for EAR.",
    challenges: [
      "Maintaining high detection accuracy under challenging lighting conditions and varying head angles.",
      "Achieving ultra-low acoustic alarm trigger latency (< 250ms) without false positives."
    ],
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
    status: "Completed",
    image: "/projects/health_care.png",
    github: "https://github.com/Renaldy2103/health_care",
    demo: "",
    description:
      "A healthcare information system built with PHP & MySQL for managing patients, doctors, prescriptions, and payments.",
    longDescription:
      "Web-based clinical healthcare management platform designed to streamline complete hospital operations, including patient intake, physician scheduling, electronic medical records (EMR), pharmacy prescription dispensing, and cashier invoicing.",
    problem:
      "Paper-based hospital records create operational bottlenecks, prescription errors, and slow down emergency patient care.",
    goal:
      "Digitize outpatient and inpatient workflows with relational database management and role-based operational modules.",
    architecture:
      "MVC architecture built with PHP and MySQL relational schemas with normalized tables for patients, doctors, prescriptions, and invoices.",
    challenges: [
      "Designing relational data integrity across complex prescription and multi-step billing cycles.",
      "Ensuring strict role-based data segregation between doctors, nurses, pharmacists, and cashiers."
    ],
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
    status: "Completed",
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
    status: "Completed",
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
    status: "Completed",
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
    status: "Completed",
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
    status: "Completed",
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
    status: "Completed",
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
    status: "Completed",
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
  { label: "FULL STACK & BACKEND", value: "fullstack" },
  { label: "MOBILE & GAME", value: "mobile-game" },
  { label: "AI / ML", value: "ai-ml" },
  { label: "WEB APP", value: "web" }
];
