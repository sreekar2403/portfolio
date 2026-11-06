import { Github, Linkedin, Mail, Rss } from 'lucide-react'
import { PERSONAL } from '../data/constants'
import { ST_HERO, ST_SOCIALS, ST_STATS } from './data'
import { CountUp, SectionHead } from './primitives'
import { ImageFrame } from './build/BuildFrame'

const ICONS = { GitHub: Github, LinkedIn: Linkedin, Medium: Rss, Email: Mail }

export default function About() {
  return (
    <section className="st-section" id="about" style={{ background: 'var(--st-card)', borderTop: '1px solid var(--st-hairline)', borderBottom: '1px solid var(--st-hairline)' }}>
      <div className="st-wrap">
        <SectionHead
          index="02"
          kicker="About"
          title="Five years of ML systems for support software"
          lede="Lead ML Engineer at Freshworks. I build triage, replies, evaluation, and inference for products used by thousands of teams, and I mentor the engineers who keep them running."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {ST_STATS.map((s) => (
                <div key={s.label} className="st-card" style={{ padding: 20 }}>
                  <div className="st-stat-figure">
                    <CountUp value={s.value} suffix={s.suffix} />
                  </div>
                  <p className="st-stat-label">{s.label}</p>
                  <p className="st-stat-note">{s.note}</p>
                </div>
              ))}
            </div>

            <dl className="st-spec" style={{ marginTop: 32 }}>
              <div className="st-spec-row">
                <dt>Email</dt>
                <dd>
                  <a href={`mailto:${PERSONAL.email}`} style={{ color: 'var(--st-ink)', textDecoration: 'none' }}>
                    {PERSONAL.email}
                  </a>
                </dd>
              </div>
              <div className="st-spec-row">
                <dt>Currently</dt>
                <dd>
                  {PERSONAL.role}, {PERSONAL.company}
                </dd>
              </div>
              <div className="st-spec-row">
                <dt>Research</dt>
                <dd>
                  <a
                    href="https://arxiv.org/abs/2503.18076"
                    target="_blank"
                    rel="noreferrer"
                    style={{ color: 'var(--st-ink)', textDecoration: 'none' }}
                  >
                    Speculative decoding for classification, arXiv 2025
                  </a>
                </dd>
              </div>
            </dl>

            <div className="flex flex-wrap items-center gap-3" style={{ marginTop: 32 }}>
              {ST_SOCIALS.map((s) => {
                const Icon = ICONS[s.label] || Mail
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={s.label}
                    className="st-icon-btn"
                  >
                    <Icon size={17} strokeWidth={1.5} />
                  </a>
                )
              })}
              <a href={PERSONAL.resumeUrl} target="_blank" rel="noreferrer" className="st-btn-ghost st-btn-sm" style={{ marginLeft: 4 }}>
                Résumé
              </a>
            </div>
          </div>

          <ImageFrame
            src={ST_HERO.photo}
            alt={ST_HERO.photoAlt}
            label="portrait"
            className="st-photo"
            imgClassName="h-full w-full"
            style={{ aspectRatio: '4 / 5', maxWidth: 400 }}
          />
        </div>
      </div>
    </section>
  )
}
