import { PV_TESTIMONIALS } from './data'
import { CountUp, Reveal, SectionHead } from './primitives'

export default function Testimonials() {
  return (
    <section className="pv-wrap py-20 md:py-28" id="testimonials">
      <SectionHead
        title="What Colleagues Say"
        lede="Notes from people I have shipped with. Their trust is the part of this work I take most seriously."
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-10">
        {PV_TESTIMONIALS.map((t, i) => (
          <Reveal key={t.author} delay={0.08 * i} className="h-full">
            <figure className="pv-card flex flex-col">
              <blockquote className="leading-relaxed flex-1">&ldquo;{t.quote}&rdquo;</blockquote>
              <figcaption className="flex items-center gap-3 mt-6">
                <span className="pv-avatar" aria-hidden="true">
                  {t.initials}
                </span>
                <span>
                  <span className="block font-semibold">{t.author}</span>
                  <span className="block text-sm" style={{ color: '#777' }}>
                    {t.role}
                  </span>
                </span>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5">
        <Reveal delay={0.05}>
          <div className="pv-card">
            <p className="font-semibold">Auto-triage systems I built handle thousands of tickets a week</p>
            <div className="pv-stat-num mt-3">
              <CountUp value={50} suffix="%" />
            </div>
            <p className="font-semibold mt-1">Throughput Lift</p>
          </div>
        </Reveal>
        <Reveal delay={0.12}>
          <div className="pv-card">
            <p className="font-semibold">Moving to open-source LLMs cut inference spend and scaled horizontally</p>
            <div className="pv-stat-num mt-3">
              <CountUp value={20} suffix="%" />
            </div>
            <p className="font-semibold mt-1">Scalability Gain</p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
