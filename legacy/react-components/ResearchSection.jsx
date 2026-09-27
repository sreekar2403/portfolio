import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { HiArrowUpRight } from 'react-icons/hi2'
import { PUBLICATION } from '../data/constants'

gsap.registerPlugin(ScrollTrigger)

export default function ResearchSection() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.research-heading',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      )

      gsap.fromTo(
        '.research-card',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.research-content',
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="research" className="py-24 md:py-32">
      <div className="section-container">
        <div className="research-heading" style={{ opacity: 0 }}>
          <p className="section-subheading">Research</p>
          <h2 className="section-heading mb-16">
            Published <span className="text-gradient">Work</span>
          </h2>
        </div>

        <div className="research-content max-w-3xl">
          <div className="research-card glass-card p-8 md:p-10" style={{ opacity: 0 }}>
            <h3 className="text-xl md:text-2xl font-bold font-display tracking-tight text-slate-900 mb-3">
              {PUBLICATION.title}
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed mb-6">
              {PUBLICATION.description}
              <span className="inline-block ml-1 text-emerald-500 font-semibold">{PUBLICATION.venue}</span>
            </p>
            <a
              href={PUBLICATION.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-50 border border-emerald-100 text-emerald-600 rounded-lg text-xs font-semibold uppercase tracking-wider hover:bg-emerald-100 transition-all"
              data-cursor="hover"
            >
              Read on arXiv
              <HiArrowUpRight />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
