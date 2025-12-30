import React, { useMemo, useState } from 'react'
import { motion as MOTION } from 'framer-motion'
import { Github, CalendarDays, Tag, ArrowDownAZ } from 'lucide-react'
import { PROJECTS, TAG_COLORS } from '../data/projects'

function TechBadge({ label }) {
  const color = TAG_COLORS[label] || 'text-slate-600 bg-slate-50 border-slate-200'
  return (
    <span
      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full border text-[10px] font-black uppercase tracking-widest ${color}`}
      aria-label={`Technology: ${label}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current" />
      {label}
    </span>
  )
}

function MetaBadge({ children }) {
  return (
    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-50 border border-slate-200 text-[10px] font-bold uppercase tracking-widest text-slate-700">
      {children}
    </span>
  )
}

export default function Projects() {
  const [selectedTags, setSelectedTags] = useState([])
  const [sortBy] = useState('date')

  const allTags = useMemo(() => {
    const s = new Set()
    PROJECTS.forEach(p => p.tags.forEach(t => s.add(t)))
    return Array.from(s).sort()
  }, [])

  const filtered = useMemo(() => {
    const withinTagLimits = p => p.tags.length >= 1 && p.tags.length <= 5
    let list = PROJECTS.filter(withinTagLimits)
    if (selectedTags.length > 0) {
      list = list.filter(p => selectedTags.every(t => p.tags.includes(t)))
    }
    if (sortBy === 'alpha') {
      list = [...list].sort((a, b) => a.title.localeCompare(b.title))
    } else {
      list = [...list].sort((a, b) => new Date(b.completionDate) - new Date(a.completionDate))
    }
    return list
  }, [selectedTags, sortBy])

  const variants = {
    container: { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } },
    item: { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } },
  }

  const toggleTag = t => {
    setSelectedTags(prev => (prev.includes(t) ? prev.filter(x => x !== t) : [...prev, t]))
  }

  return (
    <MOTION.section
      id="projects"
      aria-label="Personal Projects"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="py-16 md:py-24 px-4 md:px-6 max-w-6xl mx-auto relative z-10"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 md:mb-12 gap-6">
        <div>
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tighter uppercase flex items-center gap-3">
            <Tag size={28} className="text-blue-500" />
            Personal Projects
          </h2>
          <p className="text-slate-600 mt-3 font-bold tracking-[0.2em] uppercase text-[10px] md:text-xs border-l-2 border-blue-500 pl-4 ml-1">
            Built with production-grade ML and modern web systems
          </p>
        </div>
        <div
          className="flex flex-wrap gap-2 md:gap-3 items-center"
          style={{ padding: 'var(--space-2)' }}
        >
          <label className="sr-only" htmlFor="sort-projects">Sort Projects</label>
          <div className="hidden md:flex flex-wrap gap-2 md:gap-3">
            {allTags.map(t => (
              <button
                key={t}
                type="button"
                onClick={() => toggleTag(t)}
                aria-pressed={selectedTags.includes(t)}
                className={`px-3 py-1 rounded-full border text-[10px] font-black uppercase tracking-widest transition-all ${
                  selectedTags.includes(t)
                    ? 'bg-blue-500/20 border-blue-500/30 text-blue-700'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>

      <MOTION.div
        variants={variants.container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
      >
        {filtered.map((p) => (
          <MOTION.article
            key={p.id}
            variants={variants.item}
            whileHover={{ y: -8, scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            className="group p-6 rounded-[1.5rem] bg-white border border-slate-200 backdrop-blur-md shadow-[0_20px_50px_rgba(0,0,0,0.06)] relative overflow-hidden"
            aria-labelledby={`project-${p.id}-title`}
          >
            {p.media?.src && (
              <img
                src={p.media.src}
                alt={p.media.alt || `${p.title} media`}
                loading="lazy"
                className="rounded-2xl border border-slate-200 w-full h-36 object-cover mb-4 transition-all group-hover:brightness-110"
              />
            )}

            <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 blur-[40px] group-hover:bg-blue-500/10 transition-colors" />

            <h3 id={`project-${p.id}-title`} className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">
              {p.title}
            </h3>

            <div className="mt-2 flex gap-2 flex-wrap items-center">
              <MetaBadge>
                <CalendarDays size={14} className="text-slate-500" />
                <span className="sr-only">Completion Date</span>
                <span>{new Date(p.completionDate).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: '2-digit' })}</span>
              </MetaBadge>
              <MetaBadge>
                <span className="sr-only">Complexity</span>
                {p.complexity}
              </MetaBadge>
            </div>

            <div className="mt-4">{p.description}</div>

            <div className="mt-5 flex gap-2 flex-wrap">
              {p.tags.map(t => (
                <TechBadge key={`${p.id}-${t}`} label={t} />
              ))}
            </div>

            <div className="mt-6 flex justify-between items-center">
              <a
                href={p.githubUrl}
                target="_blank"
                rel="noopener"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-700 text-[10px] font-black uppercase tracking-widest hover:bg-blue-500/20 transition-all"
                aria-label={`View on GitHub: ${p.title}`}
              >
                <Github size={16} />
                View on GitHub
              </a>
            </div>
          </MOTION.article>
        ))}
      </MOTION.div>
    </MOTION.section>
  )
}
