export const personalInfo = {
  name: "Rajeshwari Golande",
  title: "Python Backend Engineer | AI/ML Engineer | DevOps Enthusiast",
  summary:
    "Building scalable backend systems, AI-powered applications, and cloud-native solutions using Python, FastAPI, PostgreSQL, Docker, AWS, and LLM technologies.",
  email: "rajeshwari.golande@email.com",
  github: "https://github.com/rajeshwari-golande",
  linkedin: "https://linkedin.com/in/rajeshwari-golande",
  graduationYear: 2026,
};

export const aboutContent = {
  paragraphs: [
    "I am a Computer Engineering graduate from Pimpri Chinchwad College of Engineering (PCCOE), drawn to software not just as a craft, but as a way to build things that last and serve people well. I care deeply about systems that are reliable, scalable, and production-ready — because technology only creates real value when it works under pressure.",
    "I build primarily with Python and FastAPI: designing RESTful APIs, authentication, and PostgreSQL-backed data layers. Alongside that, I explore AI/ML engineering — RAG pipelines, LLM integration, and bringing models into real environments. Every project is a chance to learn how better engineering turns ideas into systems people can trust.",
    "Internships at PTC and ACTDBI taught me how MLOps, data analytics, and enterprise software come together in practice. Those experiences sharpened my curiosity for FinTech, backend infrastructure, and AI-powered products — spaces where thoughtful design can improve how people access information, make decisions, and build for the future.",
    "My goal is to grow as a backend and AI/ML engineer who ships meaningful, production-grade systems — and to use that craft in service of something larger: contributing to technology that advances knowledge, expands opportunity, and leaves the world a little better than I found it.",
  ],
};

export const experiences = [
  {
    id: "ptc",
    company: "PTC",
    role: "ML DevOps Intern",
    period: "May 2025 – Aug 2025",
    location: "Remote",
    responsibilities: [
      "Built and maintained CI/CD pipelines for ML model deployment using Docker and GitHub Actions",
      "Containerized ML inference services and integrated them with existing enterprise infrastructure",
      "Automated model versioning, testing, and rollback workflows for production ML systems",
      "Collaborated with ML engineers to optimize model serving latency and resource utilization",
      "Implemented monitoring dashboards for model performance drift and system health metrics",
    ],
    technologies: [
      "Python",
      "Docker",
      "GitHub Actions",
      "Kubernetes",
      "MLflow",
      "Linux",
      "AWS",
    ],
    achievements: [
      "Reduced model deployment time by 60% through automated CI/CD pipelines",
      "Designed containerized inference architecture serving 10K+ daily predictions",
      "Implemented automated rollback mechanism reducing production incident recovery to under 5 minutes",
    ],
    impact:
      "Enabled the ML team to ship models to production with confidence, improving deployment frequency from weekly to daily releases.",
  },
  {
    id: "actdbi",
    company: "ACTDBI",
    role: "Data Analytics / ML Intern",
    period: "Jan 2025 – Apr 2025",
    location: "Pune, India",
    responsibilities: [
      "Developed data pipelines for processing and analyzing large-scale business datasets",
      "Built predictive models using Scikit-Learn for customer behavior analysis",
      "Created interactive dashboards and reports for stakeholder decision-making",
      "Optimized SQL queries and database schemas for improved analytics performance",
      "Collaborated with cross-functional teams to translate business requirements into data solutions",
    ],
    technologies: [
      "Python",
      "Pandas",
      "Scikit-Learn",
      "SQL",
      "PostgreSQL",
      "Matplotlib",
      "Jupyter",
    ],
    achievements: [
      "Improved query performance by 45% through index optimization and query refactoring",
      "Built churn prediction model achieving 87% accuracy on validation set",
      "Delivered automated reporting pipeline saving 15+ hours of manual work per week",
    ],
    impact:
      "Provided actionable insights that informed product strategy and reduced manual reporting overhead across the analytics team.",
  },
];

export const education = {
  institution: "Pimpri Chinchwad College of Engineering (PCCOE)",
  degree: "B.E. Computer Engineering",
  period: "2022 – 2026",
  location: "Pune, Maharashtra",
  coursework: [
    "Data Structures & Algorithms",
    "DBMS",
    "Operating Systems",
    "Computer Networks",
    "Machine Learning",
    "Artificial Intelligence",
  ],
};

export const skillCategories = [
  {
    title: "Languages",
    skills: ["Python", "SQL", "C++"],
  },
  {
    title: "Backend",
    skills: ["FastAPI", "REST APIs", "Authentication", "JWT"],
  },
  {
    title: "Databases",
    skills: ["PostgreSQL", "MySQL"],
  },
  {
    title: "AI/ML",
    skills: ["Scikit-Learn", "LLMs", "RAG", "LangChain", "FAISS"],
  },
  {
    title: "Cloud",
    skills: ["AWS EC2", "AWS S3", "IAM"],
  },
  {
    title: "DevOps",
    skills: ["Docker", "Docker Compose", "GitHub Actions", "Linux"],
  },
  {
    title: "Concepts",
    skills: ["System Design", "OOP", "Microservices"],
  },
];

export const projects = [
  {
    id: "finsight-ai",
    name: "FinSight AI",
    tagline: "Enterprise Financial Research Assistant",
    problem:
      "Financial analysts spend hours manually researching market data, earnings reports, and regulatory filings. Existing tools lack contextual AI assistance and cannot synthesize information across multiple document sources.",
    architecture:
      "Microservices architecture with FastAPI backend, Next.js frontend, PostgreSQL for metadata, FAISS vector store for document embeddings, and Gemini API for generation. Documents are ingested via S3, chunked, embedded, and indexed for RAG retrieval.",
    features: [
      "Natural language queries over financial documents",
      "Multi-document RAG with citation tracking",
      "Real-time market data integration",
      "Role-based authentication with JWT",
      "Exportable research reports in PDF format",
      "Conversation history with context persistence",
    ],
    techStack: [
      "Python",
      "FastAPI",
      "Next.js",
      "PostgreSQL",
      "LangChain",
      "FAISS",
      "Gemini API",
      "Docker",
      "AWS S3",
    ],
    metrics: {
      "Query Latency": "< 2s P95",
      "Documents Indexed": "10K+",
      "Retrieval Accuracy": "92% MRR@5",
      Uptime: "99.5%",
    },
    github: "https://github.com/rajeshwari-golande/finsight-ai",
    demo: "https://finsight-ai.demo.com",
    color: "accent",
  },
  {
    id: "mlopshub",
    name: "MLOpsHub",
    tagline: "Automated ML Lifecycle Platform",
    problem:
      "ML teams struggle with fragmented tooling for experiment tracking, model registry, deployment, and monitoring. Manual processes lead to inconsistent deployments and poor reproducibility.",
    architecture:
      "Modular platform with experiment tracking service, model registry API, deployment orchestrator, and monitoring agent. PostgreSQL stores metadata, S3 stores artifacts, and Docker containers handle isolated training and inference environments.",
    features: [
      "Automated experiment tracking and comparison",
      "Model versioning with artifact storage on S3",
      "One-click deployment to Docker containers",
      "Performance monitoring and drift detection",
      "Pipeline orchestration with GitHub Actions",
      "REST API for programmatic access",
    ],
    techStack: [
      "Python",
      "FastAPI",
      "PostgreSQL",
      "Docker",
      "GitHub Actions",
      "AWS S3",
      "Scikit-Learn",
      "MLflow",
    ],
    metrics: {
      "Deploy Time": "< 3 min",
      "Models Managed": "50+",
      "Pipeline Success": "98%",
      "Cost Reduction": "40%",
    },
    github: "https://github.com/rajeshwari-golande/mlopshub",
    demo: "https://mlopshub.demo.com",
    color: "accent-red",
  },
  {
    id: "interview-ai",
    name: "InterviewAI",
    tagline: "AI-Powered Coding Interview Platform",
    problem:
      "Technical interview preparation lacks realistic, adaptive practice environments. Candidates need personalized feedback, difficulty adjustment, and structured problem-solving guidance.",
    architecture:
      "Full-stack platform with FastAPI backend handling code execution in sandboxed Docker containers, Gemini API for intelligent feedback generation, PostgreSQL for user progress tracking, and Next.js frontend with Monaco editor integration.",
    features: [
      "Adaptive difficulty based on performance history",
      "AI-generated hints and detailed code review",
      "Real-time code execution in isolated containers",
      "Progress tracking with skill gap analysis",
      "Curated problem sets by company and topic",
      "Mock interview sessions with timed constraints",
    ],
    techStack: [
      "Python",
      "FastAPI",
      "Next.js",
      "PostgreSQL",
      "Docker",
      "Gemini API",
      "Monaco Editor",
      "Redis",
    ],
    metrics: {
      "Active Users": "500+",
      "Problems Solved": "15K+",
      "Feedback Score": "4.7/5",
      "Avg Session": "45 min",
    },
    github: "https://github.com/rajeshwari-golande/interview-ai",
    demo: "https://interview-ai.demo.com",
    color: "accent",
  },
];

export const achievements = {
  coding: [
    { platform: "LeetCode", stat: "350+ Problems Solved", detail: "Top 15% globally" },
    { platform: "CodeChef", stat: "3-Star Rating", detail: "Long Challenge Specialist" },
  ],
  hackathons: [
    { event: "Smart India Hackathon 2025", result: "National Finalist", detail: "FinTech track" },
    { event: "HackPCCOE 2024", result: "1st Place", detail: "AI/ML category" },
    { event: "CodeForGood JPMorgan", result: "Participant", detail: "Social impact challenge" },
  ],
  internships: [
    { company: "PTC", role: "ML DevOps Intern", period: "2025" },
    { company: "ACTDBI", role: "Data Analytics / ML Intern", period: "2025" },
  ],
  research: [
    {
      title: "Optimizing RAG Retrieval for Domain-Specific Financial Documents",
      venue: "PCCOE Research Symposium 2025",
      status: "Presented",
    },
  ],
  certifications: [
    { name: "AWS Cloud Practitioner", issuer: "Amazon Web Services", year: "2025" },
    { name: "Docker Essentials", issuer: "Docker Inc.", year: "2024" },
    { name: "PostgreSQL for Developers", issuer: "Coursera", year: "2024" },
  ],
};

export const navLinks = [
  { href: "/#home", label: "Home" },
  { href: "/#about", label: "About" },
  { href: "/#experience", label: "Experience" },
  { href: "/#education", label: "Education" },
  { href: "/#skills", label: "Skills" },
  { href: "/#projects", label: "Projects" },
  { href: "/#achievements", label: "Achievements" },
  { href: "/blog", label: "Technical Blog" },
  { href: "/resume", label: "Resume" },
  { href: "/#contact", label: "Contact" },
];

export const sampleChatQuestions = [
  "What projects has Rajeshwari built?",
  "What technologies does she know?",
  "Tell me about her PTC internship.",
  "What backend technologies has she worked with?",
];
