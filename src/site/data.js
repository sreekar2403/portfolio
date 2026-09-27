import { PERSONAL } from '../data/constants'

export const ST_HERO = {
  greeting: 'Hi',
  name: 'PVSM Sreekar',
  line1: 'Machine',
  line2: 'Learning',
  sub: "I'm a Bengaluru-based Lead ML Engineer at Freshworks. I build AI systems that survive production.",
  photo: '/portfolio/figurine.png',
  photoAlt: 'Portrait of PVSM Sreekar',
}

export const ST_SERVICES = [
  {
    title: 'MLOps and LLM Systems',
    points: [
      'Fine-tuning open-source LLMs for real tasks',
      'Eval pipelines and speculative decoding setups',
      'Scalable inference services for SaaS products',
      'Monitoring models that run every day',
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
      'Q and A backends for zero-touch resolution',
      'Predictive ticket routing at scale',
    ],
  },
  {
    title: 'Leadership and Delivery',
    points: [
      'Mentoring engineers on distributed AI systems',
      'Shared microservice templates for fast shipping',
      'Moving research ideas into production',
      'Reviews, roadmaps, and honest timelines',
    ],
  },
]

export const ST_STATS = [
  { value: 5, suffix: '', label: 'Years of Experience' },
  { value: 10, suffix: '', label: 'Projects Shipped' },
  { value: 1, suffix: 'M+', label: 'Users Served' },
]

export const ST_FAQS = [
  {
    q: 'What services do you offer?',
    a: 'End-to-end ML systems: data pipelines, model training and fine-tuning, evaluation, inference infrastructure, and MLOps automation. Mostly for support software and SaaS products.',
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
      "Sreekar's deep understanding of ML systems architecture transformed our approach to production inference. His work on our LLM pipeline reduced latency by 40 percent while maintaining accuracy.",
    author: 'Engineering Lead',
    role: 'Freshworks',
    initials: 'EL',
  },
  {
    quote:
      'An exceptional engineer who bridges the gap between research and production. Sreekar can fine-tune and deploy models at scale, and he documents everything along the way.',
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
  { index: '01', label: 'About', href: '#about' },
  { index: '02', label: 'Services', href: '#services' },
  { index: '03', label: 'Projects', href: '#projects' },
  { index: '04', label: 'Insights', href: '#insights' },
  { index: '05', label: 'Contact', href: '#contact' },
]
