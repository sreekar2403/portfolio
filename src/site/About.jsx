import { Github, Linkedin, Mail, Rss } from 'lucide-react'
import { PERSONAL } from '../data/constants'
import { ST_HERO, ST_SOCIALS, ST_STATS } from './data'
import { CountUp, Reveal, SectionHead } from './primitives'

const ICONS = { GitHub: Github, LinkedIn: Linkedin, Medium: Rss, Email: Mail }

export default function About() {
  return (
    <section className="py-20 md:py-28" id="about" style={{ background: '#F5F5F5', borderRadius: 28 }}>
      <div className="st-wrap">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <SectionHead
              title="About me"
              lede="Hi, I'm Sreekar, a Lead ML Engineer at Freshworks. For five years I have built ML systems for support software used by thousands of teams: triage, replies, evaluation, and inference."
            />
            <Reveal delay={0.1}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-10">
                {ST_STATS.map((s) => (
                  <div key={s.label}>
                    <div className="st-stat-num">
                      <CountUp value={s.value} suffix={s.suffix} />
                      {s.suffix === '' && '+'}
                    </div>
                    <p className="font-semibold mt-1">{s.label}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.15}>
            <div className="st-photo-card aspect-[4/5]" style={{ maxWidth: 420 }}>
              <img src={ST_HERO.photo} alt={ST_HERO.photoAlt} loading="lazy" />
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-14">
            <div>
              <p className="text-sm font-semibold">Email</p>
              <a href={`mailto:${PERSONAL.email}`} className="hover:underline break-all">
                {PERSONAL.email}
              </a>
            </div>
            <div>
              <p className="text-sm font-semibold">Currently</p>
              <p>
                {PERSONAL.role} at {PERSONAL.company}
              </p>
            </div>
            <div>
              <p className="text-sm font-semibold">Social</p>
              <div className="flex gap-3 mt-1">
                {ST_SOCIALS.map((s) => {
                  const Icon = ICONS[s.label] || Mail
                  return (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={s.label}
                      className="inline-flex items-center justify-center transition-transform hover:-translate-y-1"
                      style={{ width: 40, height: 40, borderRadius: 999, background: '#303030', color: '#fff' }}
                    >
                      <Icon size={17} />
                    </a>
                  )
                })}
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-10">
            <a href={PERSONAL.resumeUrl} target="_blank" rel="noreferrer" className="st-btn">
              My Story
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
