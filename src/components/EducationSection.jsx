import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { EDUCATION } from '../data/constants'

gsap.registerPlugin(ScrollTrigger)

export default function EducationSection() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.education-heading',
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
        '.education-card',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.education-content',
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="education" className="py-24 md:py-32">
      <div className="section-container">
        <div className="education-heading" style={{ opacity: 0 }}>
          <p className="section-subheading">Education</p>
          <h2 className="section-heading mb-16">
            Academic <span className="text-gradient">Background</span>
          </h2>
        </div>

        <div className="education-content max-w-3xl">
          <div className="education-card glass-card p-8 md:p-10" style={{ opacity: 0 }}>
            <h3 className="text-xl md:text-2xl font-bold font-display tracking-tight text-slate-900 mb-2">
              {EDUCATION.degree}
            </h3>
            <p className="text-xs font-mono text-blue-500 uppercase tracking-widest mb-4">
              {EDUCATION.institution}
            </p>
            <p className="text-sm text-slate-600">
              {EDUCATION.year}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
