// ============================================================================
// ⚠️  SINGLE SOURCE OF TRUTH FOR ALL PORTFOLIO CONTENT  ⚠️
// ----------------------------------------------------------------------------
// Every value below is a PLACEHOLDER. Nothing in the components should ever
// hold real content directly — edit it here and it updates everywhere.
//
// Search for "YOUR" / "PLACEHOLDER" / "COMPANY NAME" to find what to replace
// once you're ready to personalize the portfolio.
// ============================================================================

import type {
  PersonalInfo,
  SocialLink,
  Stat,
  SkillCategory,
  FeaturedProject,
  Project,
  ExperienceItem,
  EducationItem,
  Certification,
  NavLink,
  ResumeOption,
} from '../types/portfolio';

// ----------------------------------------------------------------------------
// Real images — uncomment once you've dropped a file into `src/assets/`.
// Vite turns the import into a usable URL string automatically:
//
   // Resized copy of avatar.jpg (the 30 MB original is kept but no longer shipped).
   import avatarImage from '../assets/avatar-optimized.jpg';
   import projectAlphaImage from '../assets/projects/project-alpha.png';
   import MataamGoImage from '../assets/projects/MatmaaGo.png';
   // `*-web.mp4` are compressed copies of the original screen recordings.
   import DemoOdooAi from '../assets/projects/demoOdooAIAssistant-web.mp4';
   import projectgammaImage from '../assets/projects/project-gamma.png';
   import crm from '../assets/projects/crm.png';
   import DemoGamma from '../assets/projects/project-gamma-web.mp4';
   import DemoCrm from '../assets/projects/demoCrm-web.mp4';
   import DemoMataamGo from '../assets/projects/Matmaago-web.mp4';
   import DemoFiAinina from '../assets/projects/ppp-web.mp4';
   // Frame taken from the Fi Ainina demo, used as its cover until a real screenshot exists.
   import FiAininaPoster from '../assets/projects/fi-ainina-poster.jpg';
//
// Then pass it as `avatarImage` / `image` below. Leave the import out (or the
// field undefined) to keep the elegant placeholder instead.
// ----------------------------------------------------------------------------

export const personalInfo: PersonalInfo = {
  name: 'Eya Zayeni',
  initials: 'EZ',
  role: 'Software Engineering Student',
  roles: [
    'Software Engineering Student',
    'AI & Full-Stack Developer',
    'Future Software Engineer',
  ],
  tagline:
    'I design and build intelligent digital experiences combining software engineering, artificial intelligence and modern web technologies.',
  location: 'tunis, tunisia',
  email: 'eyaazayeni@gmail.com',
  availability: 'Available for opportunities',
  avatarPlaceholder: 'YOUR PHOTO HERE',
  avatarImage,
  heroStack: ['React', 'TypeScript', 'Python', 'AI/ML'],
};

// ----------------------------------------------------------------------------
// CVs — PDFs live in `src/assets/cv/`. An option whose file is missing is shown
// as "Coming soon" instead of linking to a broken download.
// ----------------------------------------------------------------------------

export const resumes: ResumeOption[] = [
  {
    id: 'fr',
    lang: 'fr',
    label: 'CV en français',
    file: 'CV_French.pdf',
    downloadName: 'Eya_Zayeni_CV_FR.pdf',
  },
  {
    id: 'en',
    lang: 'en',
    label: 'CV in English',
    file: 'Eya_Zayeni_Resume.pdf',
    downloadName: 'Eya_Zayeni_CV_EN.pdf',
  },
];

export const socialLinks: SocialLink[] = [
  { label: 'GitHub', href: 'https://github.com/EyaZayeni1', icon: 'github' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/eya-zayeni-400152337', icon: 'linkedin' },
  { label: 'Email', href: 'mailto:eyaazayeni@gmail.com', icon: 'email' },
];

export const navLinks: NavLink[] = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Education', href: '#education' },
  { label: 'Contact', href: '#contact' },
];

// ----------------------------------------------------------------------------
// About / Stats — PLACEHOLDER values, replace with your real numbers later.
// ----------------------------------------------------------------------------

export const aboutText = {
  title: 'About Me',
  paragraphs: [
    "I'm a software engineering student passionate about building innovative digital products and exploring artificial intelligence.",
    "I enjoy turning complex problems into clean, well-crafted software — from full-stack web applications to machine learning pipelines. Currently focused on deepening my expertise in AI systems while staying sharp across the modern web stack.",
  ],
};

export const stats: Stat[] = [
  { id: 'projects', value: '8+', label: 'Projects' },
  { id: 'technologies', value: '15+', label: 'Technologies' },
  { id: 'internships', value: '2', label: 'Internships' },
  { id: 'years', value: '2+', label: 'Years Coding' },
];

// ----------------------------------------------------------------------------
// Skills
// ----------------------------------------------------------------------------

export const skillCategories: SkillCategory[] = [
  {
    id: 'languages',
    title: 'Languages',
    icon: 'Code2',
    skills: [
      { name: 'Python', icon: 'python' },
      { name: 'Java', icon: 'java' },
      { name: 'JavaScript', icon: 'javascript' },
      { name: 'TypeScript', icon: 'typescript' },
      { name: 'PHP', icon: 'php' },
      { name: 'C', icon: 'c' },
      { name: 'C#', icon: 'csharp' },
      { name: 'C++', icon: 'cpp' },
    ],
  },
  {
    id: 'frontend',
    title: 'Frontend',
    icon: 'LayoutTemplate',
    skills: [
      { name: 'React', icon: 'react' },
      { name: 'Tailwind CSS', icon: 'tailwind' },
      { name: 'HTML5', icon: 'html5' },
      { name: 'CSS3', icon: 'css3' },      
      { name: 'Owl', icon: 'Owl' },

    ],
  },
  {
    id: 'backend',
    title: 'Backend',
    icon: 'Server',
    skills: [
      { name: 'FastAPI', icon: 'fastapi' },
      { name: 'Node.js', icon: 'nodejs' },
      { name: 'Nest.js', icon: 'nest.js' },
      { name: 'Symfony', icon: 'symfony' },
      { name: 'Odoo/Odoo 19', icon: 'odoo' },
      { name: 'REST APIs', icon: 'api' },
      { name: 'GraphQL', icon: 'graphql' },
    ],
  },
  {
    id: 'ai-ml',
    title: 'AI & Machine Learning',
    icon: 'BrainCircuit',
    skills: [
      { name: 'Machine Learning', icon: 'ml' },
      { name: 'LLM', icon: 'llm' },
      { name: 'RAG', icon: 'rag' },
      { name: 'Scikit-learn', icon: 'Scikit-learn' },
      { name: 'LightGBM', icon: 'LightGBM' },
      { name: 'Prophet', icon: 'prophet' },
      { name: 'Embeddings', icon: 'Embeddings' },
      { name: 'XAI', icon: 'XAI' },
      { name: 'Anomaly detection', icon: 'Anomaly detection' },
    ],
  },
  {
    id: 'databases',
    title: 'Databases',
    icon: 'Database',
    skills: [
      { name: 'PostgreSQL', icon: 'postgresql' },
      { name: 'MySQL', icon: 'mysql' },
      { name: 'MongoDB', icon: 'mongodb' },
      { name: 'Redis', icon: 'redis' },
      { name: 'supabase', icon: 'supabase' },
      { name: 'Qdrant/vector stores', icon: 'vector stores' },
    ],
  },
  {
    id: 'tools',
    title: 'Tools & DevOps',
    icon: 'Wrench',
    skills: [
      { name: 'Git', icon: 'git' },
      { name: 'Docker', icon: 'docker' },
      { name: 'GitHub Actions', icon: 'github-actions' },
      { name: 'Linux', icon: 'linux' },      
      { name: 'Cloud', icon: 'cloud' },
      { name: 'CI/CD', icon: 'cicd' },
    ],
  },
];

// ----------------------------------------------------------------------------
// Featured Projects — large showcase (3 placeholders)
// ----------------------------------------------------------------------------

export const featuredProjects: FeaturedProject[] = [
  {
    id: 'project-alpha',
    name: 'Contextual AI Assistant for Odoo 19 Sales / Purchase / Inventory / CRM',
    description:
      'An AI-powered contextual assistant integrated into Odoo 19, helping users quickly access business information across Sales, Purchase, Inventory, and CRM.',
    longDescription:
      'An intelligent contextual assistant integrated directly into Odoo 19 Community Edition. It combines RAG, semantic search, and LLM-based reasoning to provide contextual answers from business documentation and authorized Odoo data. Built with a decoupled Odoo and FastAPI architecture, the platform includes permission-aware data access, a Qdrant vector store, and an Owl-based chatbot interface.',
    technologies: ['Odoo 19', 'Python', 'FastAPI', 'RAG', 'LLM', 'Qdrant', 'PostgreSQL', 'Docker', 'Owl'],
    githubUrl: 'https://github.com/YonnProjetJuiAou26/Team01-E26',
    liveUrl: '',
    demoVideo: DemoOdooAi,
    imagePlaceholder: 'PROJECT ALPHA — SCREENSHOT PLACEHOLDER',
    image: projectAlphaImage, // <- uncomment once you've imported a real screenshot above
    category: 'AI',
    highlights: [
          'Built a contextual AI assistant integrated directly into Odoo 19 for Sales, Purchase, Inventory, and CRM',
          'Implemented a RAG pipeline with semantic search, embeddings, and Qdrant for contextual document retrieval',
          'Designed a secure Odoo–FastAPI architecture with permission-aware access to business data',
          'Containerized the complete stack with Docker Compose, including Odoo, PostgreSQL, FastAPI, and Qdrant',
],
  },
  {
    id: 'project-beta',
    name: 'Fi Ainina',
    description:
      'An intelligent multimodal AI companion for elderly people, combining computer vision, voice interaction, contextual LLM reasoning, and proactive alerts to improve safety and assistance at home.',
    longDescription:
      'Fi Ainina is a multimodal AI platform designed to assist and monitor elderly people living alone at home. The system combines a contextual LLM agent, real-time computer vision for fall and emotion detection, hands-free voice interaction, and a progressive alert system that can notify caregivers and emergency contacts. Built with a microservices architecture, the platform uses FastAPI, React, PostgreSQL, Redis, and Docker for a modular and portable deployment. I was responsible for the Alerts module and the Docker infrastructure, implementing the progressive alert workflow, real-time event communication, multi-channel notifications, and service containerization.',
    technologies: ['Python',
      'FastAPI',
      'Redis',
      'WebSockets',
      'Docker',
      'Docker Compose'],
    githubUrl: '', // TODO: add the real repository URL
    liveUrl: '',
    demoVideo: DemoFiAinina,
    image: FiAininaPoster,
    imagePlaceholder: 'Fi Ainina', // shown until a screenshot is added via `image`
    category: 'AI & DevOps',
    highlights: [
      'Developed the Alerts microservice with a progressive escalation workflow, from fall detection and voice confirmation to emergency notification',
      'Implemented real-time alert communication using Redis pub/sub and WebSockets',
      'Integrated multi-channel notifications through Email and SMS/WhatsApp for emergency contacts',
      'Containerized and orchestrated the distributed services using Docker and Docker Compose',
    ],
  },
  {
    id: 'project-gamma',
    name: 'UniSmart',
    description:
      'AI-powered university management platform that transforms operational data into predictive insights, automated workflows, and intelligent recommendations.',
    longDescription:
      'UniSmart is an AI-driven platform for integrated university and institutional management. It combines time-series forecasting, anomaly detection, OCR-based document intelligence, and Google Gemini to transform raw operational data into actionable insights, natural-language explanations, and automated workflows.',
    technologies: ['Python',
    'FastAPI',
    'React',
    'Prophet',
    'XAI',
    'Anomaly Detection',
    'Supabase',
    'PostgreSQL',],
    githubUrl: '', // TODO: add the real repository URL
    liveUrl: '',
    demoVideo: DemoGamma,
    image: projectgammaImage,
    imagePlaceholder: 'PROJECT GAMMA — SCREENSHOT PLACEHOLDER',
    category: 'AI',
    highlights: [
      'Developed a prediction system using Prophet for time-series forecasting',
      'Implemented anomaly detection to identify abnormal patterns in operational data',
      'Built an alerting mechanism triggered by detected anomalies',
      'Integrated XAI techniques to explain prediction results and model behavior',
    ],
  },
];

// ----------------------------------------------------------------------------
// Other Projects — smaller grid with category filtering
// ----------------------------------------------------------------------------

export const projects: Project[] = [
  {
    id: 'project-delta',
    name: 'MataamGo : A Food Delivery Web Application',
    description: 'A food delivery platform where users can browse restaurants, place orders, and track their order status in real time.',
    technologies: ['NestJS',
      'REST API',
      'GraphQL',
      'WebSockets',
      'Server-Sent Events',
      'Webhooks'],
    githubUrl: 'https://github.com/sarrabouslama/food-delivery-app',
    liveUrl: '', // only for a deployed site — the demo goes in `demoVideo`
    demoVideo: DemoMataamGo,
    image: MataamGoImage, // <- uncomment once you've imported a real screenshot above
    imagePlaceholder: 'PROJECT DELTA — SCREENSHOT PLACEHOLDER',
    category: 'Web',
  },
  {
    id: 'project-epsilon',
    name: 'CRM PromoBiotech',
    description: 'Full-stack CRM platform that centralizes the sales lifecycle with automated price controls, approval workflows, and complete action traceability.',
    technologies: ['React', 'NestJS', 'TypeScript', 'PostgreSQL', 'Git'],
    githubUrl: '', // TODO: add the real repository URL
    liveUrl: '',
    demoVideo: DemoCrm,
    image: crm,
    category: 'Full-Stack',
  },
  {
    id: 'project-zeta',
    name: 'Insurance Bundle Predictor',
    description: 'Machine learning application that predicts insurance bundle choices across 10 classes using LightGBM, with a FastAPI inference API and real-time performance monitoring.',
    technologies: ['Python',
    'LightGBM',
    'FastAPI',
    'Docker',
    'Streamlit',],
    githubUrl: '', // TODO: add the real repository URL
    liveUrl: '',
    category: 'ML',
  },
 
];

// ----------------------------------------------------------------------------
// Experience — timeline
// ----------------------------------------------------------------------------

export const experience: ExperienceItem[] = [
  {
    id: 'exp-1',
    role: 'AI Intern',
    company: 'Yonnovia',
    companyUrl: 'https://www.linkedin.com/company/yonnovia.fr/',
    period: '2 months ',
    location: 'remote',
    description:
      'Collaborated in a team of 3 to develop a contextual AI assistant integrated into Odoo 19, supporting Sales, Purchase, Inventory, and CRM workflows.',
    missions: [
      'Implemented access control for custom AI assistant modules using Odoo groups, ACLs, and record rules.',
      'Secured custom models such as chatbot conversations, messages, and AI configuration based on user roles.',
      'Developed permission-aware connectors for Sales, Purchase, Inventory, and CRM modules.',
      'Collaborated on the development of a RAG-based AI assistant integrated into Odoo 19',
      'Participated in testing, improving response reliability, and documenting the solution',


    ],
    technologies: ['Python',
      'FastAPI',
      'Odoo 19',
      'RAG',
      'LLMs',
      'Embeddings',
      'PostgreSQL',
      'Owl',],
  },
  {
    id: 'exp-2',
    role: 'Software Development Intern – Digitalization & Automation',
    company: 'Pâtisserie Layla',
    companyUrl: 'https://layla.com.tn/',
    period: '2 months',
    location: 'Remote',
    description:
      'Contributed to the digitalization and automation of repetitive business processes by developing solutions that streamlined workflows, reduced manual tasks, improved information management, and enhanced overall operational efficiency.',
    missions: [
      'Automated packaging artwork generation using parametrized SVG templates.',
      'Contributed to the digitalization and automation of repetitive packaging workflows.',
    ],
    technologies: [],
  },
];

// ----------------------------------------------------------------------------
// Education — timeline
// ----------------------------------------------------------------------------

export const education: EducationItem[] = [
  {
    id: 'edu-1',
    degree: 'Degree in Software Engineering',
    school: 'National Institute of Applied Sciences and Technology of Tunis INSAT',
    period: '2025 — 2028',
    location: 'Tunis, tunisia',
    description:
      'Specialization in software engineering with a focus on artificial intelligence and modern application development.',
  },
  {
    id: 'edu-2',
    degree: 'Integrated Preparatory Program in Mathematics, Physics & Sciences',
    school: 'National Institute of Applied Sciences and Technology of Tunis INSAT',
    period: '2023 — 2025',
    location: 'Tunis, Tunisia',
    description: "",
  },
];

// ----------------------------------------------------------------------------
// Certifications — the section stays hidden while this list is empty.
// ----------------------------------------------------------------------------

export const certifications: Certification[] = [];

// ----------------------------------------------------------------------------
// Contact section copy
// ----------------------------------------------------------------------------

export const contactText = {
  title: "Let's Work Together",
  subtitle:
    "I'm always interested in discussing new projects, opportunities and innovative ideas.",
};

export const footerText = {
  tagline: personalInfo.role,
};
