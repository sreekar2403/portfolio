import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ABOUT_TEXT, INTERESTS } from '../data/constants'
import { FaCode, FaLightbulb, FaMusic, FaGlobe } from 'react-icons/fa6'

gsap.registerPlugin(ScrollTrigger)

const INTEREST_ICONS = {
  code: <FaCode />,
  lightbulb: <FaLightbulb />,
  music: <FaMusic />,
  globe: <FaGlobe />,
}

const INTEREST_COLORS = {
  blue: 'bg-blue-50 text-blue-600 border-blue-100',
  purple: 'bg-purple-50 text-purple-600 border-purple-100',
  emerald: 'bg-emerald-50 text-emerald-600 border-emerald-100',
  amber: 'bg-amber-50 text-amber-600 border-amber-100',
}

export default function AboutSection() {
  const sectionRef = useRef(null)
  const textRef = useRef(null)

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    
    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(
        '.about-heading',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            end: 'top 50%',
            toggleActions: 'play none none reverse',
          },
        }
      )

      // Text lines animation - each word fades in
      const words = textRef.current?.querySelectorAll('.about-word')
      if (words?.length) {
        gsap.fromTo(
          words,
          { opacity: 0.1 },
          {
            opacity: 1,
            duration: 0.3,
            stagger: 0.02,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: textRef.current,
              start: 'top 85%',
              end: 'bottom 60%',
              scrub: 1,
            },
          }
        )
      }

      // Interest cards animation
      gsap.fromTo(
        '.interest-card',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power3.out',
          stagger: 0.1,
          scrollTrigger: {
            trigger: '.interests-grid',
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      )

      // Stats animation
      gsap.fromTo(
        '.about-stat',
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: 'power3.out',
          stagger: 0.1,
          scrollTrigger: {
            trigger: '.about-stats',
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const words = ABOUT_TEXT.split(' ')

  return (
    <section ref={sectionRef} id="about" className="py-32 md:py-40">
      <div className="section-container">
        <div className="about-heading" style={{ opacity: 0 }}>
          <p className="section-subheading">About Me</p>
          <h2 className="section-heading mb-16">
            The <span className="text-gradient">Engineer</span> Behind the Code
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Main Text - 3 columns */}
          <div className="lg:col-span-3">
            <p ref={textRef} className="about-text">
              {words.map((word, i) => (
                <span key={i} className="about-word inline-block mr-[0.3em]" style={{ opacity: 0.1 }}>
                  {word}
                </span>
              ))}
            </p>

            {/* Quick Stats */}
            <div className="about-stats grid grid-cols-3 gap-6 mt-12 pt-12 border-t border-slate-200">
              <div className="about-stat" style={{ opacity: 0 }}>
                <div className="text-3xl md:text-4xl font-bold font-display text-slate-900">5+</div>
                <div className="text-xs text-slate-500 font-mono uppercase tracking-wider mt-1">Years Experience</div>
              </div>
              <div className="about-stat" style={{ opacity: 0 }}>
                <div className="text-3xl md:text-4xl font-bold font-display text-slate-900">10+</div>
                <div className="text-xs text-slate-500 font-mono uppercase tracking-wider mt-1">ML Projects</div>
              </div>
              <div className="about-stat" style={{ opacity: 0 }}>
                <div className="text-3xl md:text-4xl font-bold font-display text-slate-900">1M+</div>
                <div className="text-xs text-slate-500 font-mono uppercase tracking-wider mt-1">Users Served</div>
              </div>
            </div>
          </div>

          {/* Interests Column - 2 columns */}
          <div className="lg:col-span-2">
            <h3 className="text-sm font-mono uppercase tracking-widest text-slate-400 mb-6">Beyond Work</h3>
            <div className="interests-grid grid grid-cols-2 gap-3">
              {INTERESTS.map((interest, i) => (
                <div
                  key={i}
                  className={`interest-card glass-card p-4 text-center ${INTEREST_COLORS[interest.color]}`}
                  style={{ opacity: 0 }}
                >
                  <div className="text-2xl mb-2">
                    {INTEREST_ICONS[interest.icon]}
                  </div>
                  <div className="text-xs font-semibold uppercase tracking-wider">{interest.label}</div>
                </div>
              ))}
            </div>

            {/* Currently */}
            <div className="glass-card p-6 mt-6">
              <h4 className="text-xs font-mono uppercase tracking-widest text-slate-400 mb-3">Currently</h4>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm text-slate-600">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  Building AI agents with local LLMs
                </li>
                <li className="flex items-center gap-2 text-sm text-slate-600">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  Exploring multimodal architectures
                </li>
                <li className="flex items-center gap-2 text-sm text-slate-600">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                  Contributing to open-source ML tools
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
