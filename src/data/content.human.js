import { PERSONAL } from './constants'
import { PROJECTS } from './projects'
import { LOCAL_BLOG_POSTS } from './localBlogs'

export const HUMAN = {
  eyebrow: 'Lead Machine Learning Engineer',
  headline: 'ML systems, built for production.',
  intro: `I'm Sreekar. I lead machine learning at ${PERSONAL.company}.`,
  lede:
    'I work on the parts of AI that have to run every day, triage, replies, evaluation, and inference.',
  bio: 'For the past five years I have built ML systems for support software used by thousands of teams. I like small models, clear evals, and pipelines other engineers can debug at 2am.',
  location: 'Chennai, India',
  primaryCta: { label: 'View career profile', href: '#experience' },
  secondaryCta: { label: 'Explore my work', href: '#work' },
  photo: '/portfolio/figurine.png',
  photoAlt: 'Sreekar',
}

export const EXPERIENCE = [
  {
    period: '2025-present',
    company: 'Freshworks',
    role: 'Lead ML Engineer',
    summary: 'Open-source LLMs, evals, and inference that stays up.',
    linkLabel: 'Current role',
  },
  {
    period: '2022-2025',
    company: 'Freshworks',
    role: 'Senior Data Scientist',
    summary: 'Auto-triage and smart replies on Databricks + Kafka. About 50% more throughput.',
    linkLabel: 'Engineering work',
  },
  {
    period: '2020-2022',
    company: 'Freshworks',
    role: 'ML Engineer',
    summary: 'Sentiment, escalation prediction, and Q&A backends for multi-tenant SaaS.',
    linkLabel: 'Early work',
  },
]

const friday = PROJECTS.find((p) => p.id === 'multi-agentic-platform')
const hive = PROJECTS.find((p) => p.id === 'hive')

export const FEATURED = {
  meta: 'Open-source project · Built and maintained by me',
  title: 'Run agents where your data lives.',
  name: friday?.title ?? 'FRIDAY',
  body: 'FRIDAY is a small multi-agent setup that runs on local models through Ollama. It tracks short and long term goals and turns repeat work into workflows. No data leaves the machine.',
  detail: 'Python, Ollama, LangChain. Works offline on consumer hardware.',
  link: { label: 'Explore FRIDAY', href: friday?.githubUrl ?? PERSONAL.github },
  image: friday?.screenshot,
  caption: 'FRIDAY · Local agents, goals, and workflows',
}

export const SECONDARY_WORK = [
  {
    meta: 'Open-source · Decentralized',
    title: hive?.title ?? 'Hive',
    body: hive?.subtitle ?? 'Peer-to-peer collaboration without a central server.',
    link: { label: 'See Hive', href: hive?.githubUrl ?? PERSONAL.github },
  },
  {
    meta: `${LOCAL_BLOG_POSTS[0]?.category ?? 'Local models'} · ${LOCAL_BLOG_POSTS[0]?.readTime ?? '14 min'}`,
    title: LOCAL_BLOG_POSTS[0]?.title ?? 'Running 27B models on a laptop',
    body: LOCAL_BLOG_POSTS[0]?.subtitle ?? 'What actually works on 8 GB VRAM.',
    link: { label: 'Read the notes', href: `/portfolio/blog/${LOCAL_BLOG_POSTS[0]?.id ?? ''}` },
  },
]

export const CONTACT = {
  headline: 'Let’s build AI people can rely on.',
  body: 'I am happy to talk about ML roles, local models, evals, and production reliability. Email is best.',
  email: PERSONAL.email,
  linkedin: PERSONAL.linkedin,
  github: PERSONAL.github,
}
