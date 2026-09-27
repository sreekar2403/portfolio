import { useState } from 'react'
import { AnimatePresence, motion as Motion, useReducedMotion } from 'framer-motion'
import { ST_FAQS } from './data'
import { Reveal, SectionHead } from './primitives'

export default function Faq() {
  const [open, setOpen] = useState(0)
  const reduce = useReducedMotion()
  return (
    <section className="st-wrap py-20 md:py-28" id="faq">
      <SectionHead
        title="Frequently Asked Questions"
        lede="Honest answers to the questions I get most often. Anything else, my email is at the bottom."
      />
      <Reveal delay={0.1} className="mt-10">
        <div>
          {ST_FAQS.map((f, i) => {
            const isOpen = open === i
            return (
              <div key={f.q} className={`st-acc-item${isOpen ? ' open' : ''}`} onClick={() => setOpen(isOpen ? -1 : i)}>
                <div className="st-acc-head">
                  <span className="st-acc-num">{i + 1}.</span>
                  <span className="st-acc-title" style={{ fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)' }}>
                    {f.q}
                  </span>
                  <span className="st-acc-icon" aria-hidden="true" style={{ fontSize: 20, fontWeight: 600 }}>
                    {isOpen ? '−' : '+'}
                  </span>
                </div>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <Motion.div
                      initial={reduce ? false : { height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      style={{ overflow: 'hidden' }}
                    >
                      <p className="pb-8 pl-12 pr-4 leading-relaxed" style={{ color: '#5b5b5b', maxWidth: '46rem' }}>
                        {f.a}
                      </p>
                    </Motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </Reveal>
    </section>
  )
}
