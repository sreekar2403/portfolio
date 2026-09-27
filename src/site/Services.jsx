import { useState } from 'react'
import { AnimatePresence, motion as Motion, useReducedMotion } from 'framer-motion'
import { Plus } from 'lucide-react'
import { ST_SERVICES } from './data'
import { Reveal, SectionHead } from './primitives'

function Item({ index, title, points, open, onToggle }) {
  const reduce = useReducedMotion()
  return (
    <div className={`st-acc-item${open ? ' open' : ''}`} onClick={onToggle}>
      <div className="st-acc-head">
        <span className="st-acc-num">{String(index + 1).padStart(2, '0')}</span>
        <span className="st-acc-title">{title}</span>
        <span className="st-acc-icon" aria-hidden="true">
          <Plus size={20} />
        </span>
      </div>
      <AnimatePresence initial={false}>
        {open && (
          <Motion.div
            initial={reduce ? false : { height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <ul className="pb-8 pl-12 pr-4 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
              {points.map((p) => (
                <li key={p} className="flex items-start gap-3 text-[0.95rem] leading-relaxed" style={{ color: '#5b5b5b' }}>
                  <span
                    aria-hidden="true"
                    style={{ width: 6, height: 6, borderRadius: 999, background: '#5E67E6', marginTop: 8, flexShrink: 0 }}
                  />
                  {p}
                </li>
              ))}
            </ul>
          </Motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function Services() {
  const [open, setOpen] = useState(0)
  return (
    <section className="st-wrap py-20 md:py-28" id="services">
      <SectionHead
        title="What I can do for you"
        lede="Production ML is mostly unglamorous work done well: good data, honest evals, and systems that stay up. Here is where I help."
      />
      <Reveal delay={0.1} className="mt-10">
        <div>
          {ST_SERVICES.map((s, i) => (
            <Item
              key={s.title}
              index={i}
              title={s.title}
              points={s.points}
              open={open === i}
              onToggle={() => setOpen(open === i ? -1 : i)}
            />
          ))}
        </div>
      </Reveal>
    </section>
  )
}
