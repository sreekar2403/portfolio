import { PERSONAL } from '../data/constants'

export const ST_HERO = {
  name: 'PVSM Sreekar',
  role: 'Lead ML Engineer, Bengaluru',
  line1: 'AI systems that',
  line2: 'survive production',
  sub: 'Five years building triage, replies, evaluation, and inference for support software that runs every day, currently as Lead ML Engineer at Freshworks.',
  photo: '/portfolio/figurine.png',
  photoAlt: 'Portrait of PVSM Sreekar',
  location: 'Bengaluru, India',
}

export const ST_SERVICES = [
  {
    title: 'MLOps and LLM Systems',
    points: [
      'Fine-tuned open-source LLMs for support tasks',
      'Built eval pipelines and speculative decoding',
      'Run scalable inference services for SaaS',
      'Monitor models that run every day',
    ],
  },
  {
    title: 'Data Pipelines and Streaming',
    points: [
      'Real-time pipelines with Kafka',
      'Batch processing with PySpark and Databricks',
      'Multi-tenant data design for SaaS',
      'Workflow automation with Jenkins',
    ],
  },
  {
    title: 'Applied NLP and Classification',
    points: [
      'Sentiment and escalation prediction',
      'Auto-triage and smart reply systems',
      'Q&A backends for zero-touch resolution',
      'Predictive ticket routing at scale',
    ],
  },
  {
    title: 'Leadership and Delivery',
    points: [
      'Mentor engineers on distributed AI systems',
      'Share microservice templates for fast shipping',
      'Move research ideas into production',
      'Run reviews, roadmaps, and honest timelines',
    ],
  },
]

export const ST_STATS = [
  { value: 5, suffix: '+', label: 'Years building production ML', note: 'Freshworks, since 2020' },
  { value: 10, suffix: '+', label: 'Projects shipped', note: 'Open source and internal' },
  { value: 1, suffix: 'M+', label: 'Users served', note: 'Across Freshworks support products' },
]

export const ST_FAQS = [
  {
    q: 'What services do you offer?',
    a: 'End-to-end ML systems: data pipelines, model training and fine-tuning, evaluation, inference infrastructure, and MLOps automation, mostly for support software and SaaS products.',
  },
  {
    q: 'How does the process work?',
    a: 'We start with the problem and the data, agree on one success metric, ship a baseline fast, then iterate against evals until it is reliable enough for production.',
  },
  {
    q: 'How long does production ML take?',
    a: 'A focused pilot usually takes weeks, not months. Full production hardening depends on scale, data quality, and how strict the reliability bar is.',
  },
  {
    q: 'What do you need from me before starting?',
    a: 'A clear problem statement, access to representative data, and one metric that defines success. Everything else we figure out together.',
  },
  {
    q: 'Do you work with existing engineering teams?',
    a: 'Yes. I embed with teams, set standards like shared service templates, mentor engineers, and leave behind systems the team can run without me.',
  },
  {
    q: 'How do we get started?',
    a: 'Send an email describing your problem in a few lines. I reply within a couple of days with honest thoughts on whether ML is even the right tool.',
  },
]

export const ST_TESTIMONIALS = [
  {
    quote:
      "Sreekar's deep understanding of ML systems architecture changed how we approach production inference. His work on our LLM pipeline cut latency by 40 percent without losing accuracy.",
    author: 'Engineering Lead',
    role: 'Freshworks',
    initials: 'EL',
  },
  {
    quote:
      'An exceptional engineer who bridges research and production. Sreekar can fine-tune and deploy models at scale, and he documents everything along the way.',
    author: 'Senior ML Engineer',
    role: 'Colleague',
    initials: 'SM',
  },
  {
    quote:
      'Working with Sreekar on the MLOps migration was a game-changer. His systematic approach to pipeline design made a complex transition feel straightforward.',
    author: 'Tech Lead',
    role: 'Freshworks',
    initials: 'TL',
  },
]

export const ST_SOCIALS = [
  { label: 'GitHub', href: PERSONAL.github },
  { label: 'LinkedIn', href: PERSONAL.linkedin },
  { label: 'Medium', href: PERSONAL.medium },
  { label: 'Email', href: `mailto:${PERSONAL.email}` },
]

export const ST_NAV = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Projects', href: '#projects' },
  { label: 'Insights', href: '#insights' },
  { label: 'Contact', href: '#contact' },
]
