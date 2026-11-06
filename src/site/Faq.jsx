import { useState } from 'react'
import { ST_FAQS } from './data'
import { SectionHead } from './primitives'
import { BuildFrame } from './build/BuildFrame'

export default function Faq() {
  const [open, setOpen] = useState(0)
  return (
    <section className="st-section" id="faq">
      <div className="st-wrap">
        <SectionHead
          index="05"
          kicker="Questions"
          title="Honest answers, before you ask"
          lede="The questions I get most often. Anything else, my email is at the bottom."
        />
        <div>
          {ST_FAQS.map((f, i) => {
            const isOpen = open === i
            return (
              <div key={f.q} className={`st-acc-item${isOpen ? ' open' : ''}`} onClick={() => setOpen(isOpen ? -1 : i)}>
                <div className="st-acc-head">
                  <span className="st-acc-num">{String(i + 1).padStart(2, '0')}</span>
                  <span className="st-acc-title" style={{ fontSize: '1.05rem' }}>
                    {f.q}
                  </span>
                  <span className="st-acc-icon" aria-hidden="true" style={{ fontSize: 16, fontWeight: 500 }}>
                    {isOpen ? '−' : '+'}
                  </span>
                </div>
                <div className="st-acc-body">
                  <div className="st-acc-body-inner">
                    {isOpen && (
                      <BuildFrame kind="caret" wire={false} label="answer">
                        <p style={{ padding: '0 4px 24px 36px', maxWidth: '46rem', color: 'var(--st-ink-2)', lineHeight: 1.7 }}>
                          {f.a}
                        </p>
                      </BuildFrame>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
