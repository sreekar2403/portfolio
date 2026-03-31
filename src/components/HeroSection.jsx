import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { PERSONAL, STATS } from '../data/constants'
import HeroBackground from './HeroBackground'
import ErrorBoundary from './ErrorBoundary'

const STAT_COLORS = {
  emerald: { bg: 'bg-emerald-50', text: 'text-emerald-600', border: 'border-emerald-100' },
  blue: { bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-100' },
  purple: { bg: 'bg-purple-50', text: 'text-purple-600', border: 'border-purple-100' },
}

export default function HeroSection({ isLoaded }) {
  const sectionRef = useRef(null)
  const nameRef = useRef(null)
  const contentRef = useRef(null)
  const figurineRef = useRef(null)
  const statsRef = useRef(null)

  useEffect(() => {
    if (!isLoaded) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.5 })

      // Greeting animation
      tl.fromTo(
        '.hero-greeting',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
      )

      // Name characters animation
      tl.fromTo(
        '.hero-name-char',
        { y: 100, opacity: 0, rotateX: -90 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.04,
        },
        '-=0.4'
      )

      // Subtitle
      tl.fromTo(
        '.hero-subtitle',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' },
        '-=0.3'
      )

      // Description
      tl.fromTo(
        '.hero-desc',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' },
        '-=0.2'
      )

      // CTA Buttons
      tl.fromTo(
        '.hero-cta',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out', stagger: 0.1 },
        '-=0.2'
      )

      // Figurine
      tl.fromTo(
        figurineRef.current,
        { scale: 0.8, opacity: 0, y: 60, rotateY: 30, rotateX: -10 },
        { scale: 1, opacity: 1, y: 0, rotateY: 0, rotateX: 0, duration: 1.2, ease: 'back.out(1.7)' },
        '-=0.8'
      )

      // Stats
      tl.fromTo(
        '.stat-card',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out', stagger: 0.1 },
        '-=0.4'
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [isLoaded])

  const nameChars = PERSONAL.name.split('')

  return (
    <section ref={sectionRef} className="hero-section" id="hero">
      {/* Background */}
      <ErrorBoundary fallback={<div className="hero-bg-fallback absolute inset-0 opacity-40 bg-gradient-to-br from-blue-50 via-white to-purple-50" />}>
        <HeroBackground />
      </ErrorBoundary>

      {/* Content */}
      <div className="section-container relative z-10 py-32 md:py-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center min-h-screen pt-24 lg:pt-0">
          {/* Left - Text */}
          <div ref={contentRef} className="order-2 lg:order-1">
            <p className="hero-greeting" style={{ opacity: 0 }}>
              {PERSONAL.greeting}
            </p>

            <h1 ref={nameRef} className="hero-name mt-2 mb-6">
              <div className="overflow-hidden">
                {"PVSM".split("").map((char, i) => (
                  <span
                    key={i}
                    className="hero-name-char inline-block"
                    style={{ opacity: 0 }}
                  >
                    {char}
                  </span>
                ))}
              </div>
              <div className="overflow-hidden -mt-2 lg:-mt-4">
                {"SREEKAR".split("").map((char, i) => (
                  <span
                    key={i}
                    className="hero-name-char inline-block"
                    style={{ opacity: 0 }}
                  >
                    {char}
                  </span>
                ))}
              </div>
            </h1>

            <div className="hero-subtitle" style={{ opacity: 0 }}>
              {PERSONAL.role} @ {PERSONAL.company}
            </div>

            <p className="hero-desc mt-6 text-slate-600 text-base md:text-lg leading-relaxed max-w-lg font-light" style={{ opacity: 0 }}>
              {PERSONAL.subtitle}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <a
                href="#career"
                className="hero-cta inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-slate-900 text-white rounded-xl font-semibold text-sm tracking-wide hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl"
                data-cursor="hover"
                style={{ opacity: 0 }}
                onClick={(e) => {
                  e.preventDefault()
                  const target = document.getElementById('career')
                  if (target) {
                    const y = target.getBoundingClientRect().top + window.pageYOffset - 80
                    window.scrollTo({ top: y, behavior: 'smooth' })
                  }
                }}
              >
                Explore Journey
                <span className="text-lg">→</span>
              </a>
              <a
                href={PERSONAL.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hero-cta inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white border border-slate-200 text-slate-800 rounded-xl font-semibold text-sm tracking-wide hover:bg-slate-50 hover:border-slate-300 transition-all"
                data-cursor="hover"
                style={{ opacity: 0 }}
              >
                View Resume
                <span className="text-xs">↗</span>
              </a>
            </div>

            {/* Stats Row */}
            <div ref={statsRef} className="flex flex-wrap gap-4 mt-12">
              {STATS.map((stat, i) => {
                const c = STAT_COLORS[stat.color]
                return (
                  <div
                    key={i}
                    className={`stat-card flex items-center gap-3 px-5 py-3 rounded-xl border ${c.border} ${c.bg}`}
                    style={{ opacity: 0 }}
                  >
                    <span className={`text-2xl font-bold font-display tracking-tight ${c.text}`}>{stat.value}</span>
                    <span className="text-xs text-slate-500 font-medium uppercase tracking-wider leading-tight">
                      {stat.label}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Right - Figurine */}
          <div ref={figurineRef} className="order-1 lg:order-2 hero-figurine-container" style={{ opacity: 0 }}>
            <div className="relative">
              <img
                src="/portfolio/figurine.png"
                alt="PVSM Sreekar - ML Engineer Figurine"
                className="hero-figurine"
                loading="eager"
              />
              <div className="hero-figurine-glow" />
              <div className="hero-figurine-base" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
