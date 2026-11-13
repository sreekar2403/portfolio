import { Suspense, lazy, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { ArrowDown, ArrowUpRight } from 'lucide-react'
import { ST_HERO } from './data'
import { BuildFrame, ImageFrame } from './build/BuildFrame'
import { useJobs } from './build/JobContext'

const HeroScene = lazy(() => import('./build/HeroScene'))

const FACTS = [
  { value: '5', label: 'years in production ML' },
  { value: '10+', label: 'projects shipped' },
  { value: 'arXiv', label: '2025, speculative decoding' },
  { value: 'Bengaluru', label: 'India, remote-friendly' },
]

export default function Hero() {
  const { heroEl } = useJobs()

  const factPoints = useCallback(
    (el) =>
      Array.from(el ? el.querySelectorAll('[data-fact]') : document.querySelectorAll('[data-fact]')).map((node) => {
        const r = node.getBoundingClientRect()
        return [r.left + r.width / 2, r.top + r.height / 2]
      }),
    []
  )

  return (
    <header className="st-hero" id="top" ref={heroEl}>
      <Suspense fallback={null}>
        <HeroScene />
      </Suspense>
      <div className="st-wrap" style={{ position: 'relative', zIndex: 1 }}>
        <div className="st-hero-grid">
          <div>
            <BuildFrame kind="frame" label="hero copy" style={{ borderRadius: 12 }}>
              <p className="st-readout" style={{ marginBottom: 20 }}>
                <b>{ST_HERO.name}</b>
                <span>{ST_HERO.role}</span>
              </p>
              <h1 className="st-hero-title" style={{ marginTop: 0 }}>
                {ST_HERO.line1}
                <br />
                {ST_HERO.line2}
              </h1>
              <p className="st-hero-sub">{ST_HERO.sub}</p>
              <div className="st-hero-actions">
                <a
                  href="#contact"
                  className="st-btn"
                  onClick={(e) => {
                    e.preventDefault()
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                  }}
                >
                  Start a conversation <ArrowDown size={16} />
                </a>
                <Link to="/blogs" className="st-btn-ghost">
                  Read the field notes <ArrowUpRight size={16} />
                </Link>
              </div>
            </BuildFrame>
          </div>

          <div>
            <ImageFrame
              src={ST_HERO.photo}
              alt={ST_HERO.photoAlt}
              label="portrait"
              eager
              className="st-photo"
              imgClassName="h-full w-full"
              style={{ aspectRatio: '4 / 5', maxWidth: 420, marginLeft: 'auto' }}
            />
          </div>
        </div>

        <BuildFrame
          kind="ticks"
          label="verifying facts"
          getPoints={factPoints}
          className="st-hero-facts"
          contentClassName="flex flex-wrap gap-x-6 gap-y-2"
          style={{ marginTop: 48 }}
        >
          {FACTS.map((f) => (
            <span key={f.label} className="st-hero-fact" data-fact="">
              <b>{f.value}</b> {f.label}
            </span>
          ))}
        </BuildFrame>
      </div>
    </header>
  )
}
