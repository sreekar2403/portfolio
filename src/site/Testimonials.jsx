import { ST_TESTIMONIALS } from './data'
import { CountUp, SectionHead } from './primitives'
import { BuildFrame } from './build/BuildFrame'

export default function Testimonials() {
  return (
    <section className="st-section" id="testimonials">
      <div className="st-wrap">
        <SectionHead
          index="04"
          kicker="Colleagues"
          title="Notes from people I have shipped with"
          lede="Their trust is the part of this work I take most seriously."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {ST_TESTIMONIALS.map((t) => (
            <BuildFrame key={t.author} kind="frame" label="quote" className="st-card" contentClassName="flex flex-col h-full" style={{ borderRadius: 'var(--st-r-card)' }}>
              <figure className="flex flex-col h-full" style={{ margin: 0 }}>
                <blockquote className="st-quote" style={{ margin: 0 }}>
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="flex items-center gap-3" style={{ marginTop: 24 }}>
                  <span className="st-avatar" aria-hidden="true">
                    {t.initials}
                  </span>
                  <span>
                    <span className="st-person-name">{t.author}</span>
                    <span className="st-person-role">{t.role}</span>
                  </span>
                </figcaption>
              </figure>
            </BuildFrame>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" style={{ marginTop: 16 }}>
          <BuildFrame kind="frame" label="result" className="st-card" style={{ borderRadius: 'var(--st-r-card)' }}>
            <p style={{ fontSize: 14, color: 'var(--st-ink-2)' }}>
              Auto-triage systems I built handle thousands of tickets a week
            </p>
            <div className="st-stat-figure" style={{ marginTop: 16 }}>
              <CountUp value={50} suffix="%" />
            </div>
            <p className="st-stat-label">Throughput lift</p>
            <p className="st-stat-note">vs manual triage at Freshworks</p>
          </BuildFrame>
          <BuildFrame kind="frame" label="result" className="st-card" style={{ borderRadius: 'var(--st-r-card)' }}>
            <p style={{ fontSize: 14, color: 'var(--st-ink-2)' }}>
              Moving to open-source LLMs cut inference spend and scaled horizontally
            </p>
            <div className="st-stat-figure" style={{ marginTop: 16 }}>
              <CountUp value={20} suffix="%" />
            </div>
            <p className="st-stat-label">Scalability gain</p>
            <p className="st-stat-note">vs the previous inference setup</p>
          </BuildFrame>
        </div>
      </div>
    </section>
  )
}
