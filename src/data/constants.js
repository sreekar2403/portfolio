export const PERSONAL = {
  name: 'PVSM SREEKAR',
  firstName: 'Sreekar',
  greeting: "Hello! I'm",
  role: 'Lead Machine Learning Engineer',
  company: 'Freshworks',
  tagline: 'Engineering Future AI',
  subtitle: 'Building end-to-end MLOps architectures and fine-tuning disruptive LLMs that redefine scalable SaaS intelligence.',
  email: 'padarthi24sreekar2@gmail.com',
  github: 'https://github.com/sreekar2403',
  linkedin: 'https://www.linkedin.com/in/p-v-s-m-sreekar-21b888149/',
  resumeUrl: '/portfolio/resume.pdf',
}

export const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#what-i-do' },
  { label: 'Career', href: '#career' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]

export const ABOUT_TEXT = `I am a Lead Machine Learning Engineer at Freshworks with 5+ years of experience building production-grade AI systems. My work spans end-to-end MLOps pipeline design, large language model fine-tuning, and architecting scalable inference platforms for SaaS products serving millions of users. I thrive at the intersection of cutting-edge research and real-world engineering — transforming complex ML problems into reliable, high-throughput production services.`

export const WHAT_I_DO = [
  {
    id: 1,
    title: 'AI & MLOps',
    subtitle: 'Production ML Systems at Scale',
    description: 'Specializing in building end-to-end ML pipelines, LLM fine-tuning, and scalable inference architectures. From model training to deployment — designing systems that serve millions of predictions reliably.',
    skills: ['PyTorch', 'Databricks', 'MLflow', 'LLMs', 'Optuna', 'FastAPI'],
    icon: 'brain',
    color: 'blue',
  },
  {
    id: 2,
    title: 'Build & Scale',
    subtitle: 'Shipping AI in Production',
    description: 'Engineering robust microservice architectures, real-time data pipelines with Kafka, and automated CI/CD workflows. Building the infrastructure that makes AI work at enterprise scale.',
    skills: ['Kafka', 'PySpark', 'Docker', 'Jenkins', 'Kubernetes', 'REST APIs'],
    icon: 'rocket',
    color: 'emerald',
  },
]

export const CAREER = [
  {
    role: 'Lead Machine Learning Engineer',
    company: 'Freshworks',
    period: 'Jan 2025 — Present',
    current: true,
    description: [
      'Driving architectural migration to open-source LLMs, enhancing horizontal scalability by 20%.',
      'Engineered proprietary speculative decoding frameworks for high-fidelity model evaluation.',
      'Mentoring a high-performance team of engineers on distributed AI systems and MLOps.',
    ],
    skills: ['LLMs', 'Speculative Decoding', 'MLOps'],
  },
  {
    role: 'Senior Data Scientist',
    company: 'Freshworks',
    period: 'Oct 2022 — Jan 2025',
    current: false,
    description: [
      'Spearheaded end-to-end automation for Auto-triage and Smart Reply leveraging Databricks and Kafka.',
      'Realized 50% surge in operational throughput via predictive ticket routing and automated response systems.',
      'Unified ML microservice standards using modular FastAPI templates for rapid deployment.',
    ],
    skills: ['Databricks', 'Kafka', 'PySpark', 'Jenkins'],
  },
  {
    role: 'Senior Machine Learning Engineer',
    company: 'Freshworks',
    period: 'Oct 2020 — Oct 2022',
    current: false,
    description: [
      'Optimized sentiment engines and escalation predictors for multi-tenant SaaS environments.',
      'Built state-of-the-art Q&A backend infrastructure for zero-touch query resolution.',
      'Architected hyperparameter search spaces using Optuna, compressing R&D cycles by 30%.',
    ],
    skills: ['PyTorch', 'Optuna', 'NLP'],
  },
  {
    role: 'Machine Learning Intern',
    company: 'Freshworks',
    period: 'Jan 2020 — Oct 2020',
    current: false,
    description: [
      'Executed research in pronoun replacement to enhance structural NLP readability.',
      'Curated large-scale synthetic datasets for transformer fine-tuning and evaluation.',
    ],
    skills: ['NLP Research', 'Transformers'],
  },
]

export const PUBLICATION = {
  title: 'A Multi-Model Adaptation of Speculative Decoding for Classification',
  venue: 'arXiv (2025)',
  link: 'https://arxiv.org/abs/2503.18076',
  description: 'Research analyzing efficiency gains in speculative decoding architectures for production classification engines.',
}

export const EDUCATION = {
  degree: 'B.Tech Computer Science',
  institution: 'BML Munjal University, Haryana',
  year: 'Class of 2016',
}

export const STATS = [
  { label: 'Latency Reduction', value: '40%', color: 'emerald' },
  { label: 'Time Saved Annually', value: '500+ Hrs', color: 'blue' },
  { label: 'Resolution Improvement', value: '35%', color: 'purple' },
]
