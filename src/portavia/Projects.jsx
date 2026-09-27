import { motion as Motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { PROJECTS } from '../data/projects'
import { PERSONAL } from '../data/constants'
import { Reveal, SectionHead } from './primitives'

const TAGS = {
  hive: 'Open Source',
  'multi-agentic-platform': 'Local AI',
  'local-image-gen': 'Local AI',
}

function Card({ project, index }) {
  return (
    <div className="pv-stack-card" style={{ top: 84 + index * 24, background: '#1e1e1e' }}>
      {project.screenshot ? (
        <img className="pv-stack-bg" src={project.screenshot} alt={`${project.title} cover`} loading="lazy" />
      ) : null}
      <div className="pv-stack-scrim" aria-hidden="true" />
      <div className="relative p-8 md:p-14 w-full" style={{ maxWidth: 800 }}>
        <span className="pv-tag">{TAGS[project.id] || 'Project'}</span>
        <h3 className="pv-display mt-5" style={{ fontSize: 'clamp(2.2rem, 6vw, 4.5rem)', color: '#fff' }}>
          {project.title}
        </h3>
        <p className="mt-4 text-white/80 leading-relaxed" style={{ maxWidth: '36rem' }}>
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2 mt-5">
          {project.tags?.slice(0, 4).map((t) => (
            <span
              key={t}
              className="text-xs font-mono px-3 py-1 rounded-full border border-white/25 text-white/80"
            >
              {t}
            </span>
          ))}
        </div>
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noreferrer"
          className="pv-btn mt-7"
        >
          View on GitHub <ArrowUpRight size={16} />
        </a>
      </div>
    </div>
  )
}

export default function Projects() {
  return (
    <section className="pv-wrap py-20 md:py-28" id="projects">
      <SectionHead
        title="Featured Projects"
        lede="A few things I built and maintain. Each one runs for real users or on real hardware, not just in a demo."
      />
      <div className="mt-10 flex flex-col gap-6">
        {PROJECTS.map((p, i) => (
          <Motion.div
            key={p.id}
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <Card project={p} index={i} />
          </Motion.div>
        ))}
      </div>
      <Reveal delay={0.05} className="mt-10 text-center">
        <a href={PERSONAL.github} target="_blank" rel="noreferrer" className="pv-btn">
          Browse All Projects <ArrowUpRight size={16} />
        </a>
      </Reveal>
    </section>
  )
}
