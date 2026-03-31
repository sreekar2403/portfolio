import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { CAREER } from '../data/constants'

gsap.registerPlugin(ScrollTrigger)

export default function CareerSection() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(
        '.career-heading',
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

      // Timeline entries
      gsap.fromTo(
        '.career-entry',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power3.out',
          stagger: 0.2,
          scrollTrigger: {
            trigger: '.career-timeline',
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      )

      // Timeline line grows
      gsap.fromTo(
        '.timeline-line-inner',
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: '.career-timeline',
            start: 'top 70%',
            end: 'bottom 50%',
            scrub: 1,
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="career" className="py-24 md:py-32">
      <div className="section-container">
        <div className="career-heading" style={{ opacity: 0 }}>
          <p className="section-subheading">Experience</p>
          <h2 className="section-heading mb-16">
            Career & <span className="text-gradient">Journey</span>
          </h2>
        </div>

        <div className="career-timeline relative">
          {/* Timeline line */}
          <div className="absolute left-[28px] md:left-1/2 md:-translate-x-px top-0 bottom-0 w-[2px] bg-slate-100">
            <div
              className="timeline-line-inner w-full h-full bg-gradient-to-b from-blue-400 via-blue-300 to-transparent"
              style={{ transformOrigin: 'top', transform: 'scaleY(0)' }}
            />
          </div>

          {/* Entries */}
          {CAREER.map((item, idx) => (
            <div
              key={idx}
              className={`career-entry relative flex flex-col md:flex-row gap-8 md:gap-16 pb-16 last:pb-0 ${
                idx % 2 === 0 ? '' : 'md:flex-row-reverse'
              }`}
              style={{ opacity: 0 }}
            >
              {/* Left/Right Content */}
              <div className={`flex-1 ${idx % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                <div className="hidden md:block">
                  <h3 className="text-xl md:text-2xl font-bold font-display tracking-tight text-slate-900">
                    {item.role}
                  </h3>
                  <p className="text-xs font-mono text-blue-500 mt-1 uppercase tracking-widest">
                    {item.company} • {item.period}
                  </p>
                </div>
              </div>

              {/* Dot */}
              <div className="absolute left-[22px] md:left-1/2 md:-translate-x-1/2 z-10 mt-1">
                <div className={`timeline-dot ${item.current ? 'active' : ''}`} />
              </div>

              {/* Right/Left Content */}
              <div className="flex-1 pl-14 md:pl-0">
                {/* Mobile header */}
                <div className="md:hidden mb-3">
                  <h3 className="text-xl font-bold font-display tracking-tight text-slate-900">
                    {item.role}
                  </h3>
                  <p className="text-xs font-mono text-blue-500 mt-1 uppercase tracking-widest">
                    {item.company} • {item.period}
                  </p>
                </div>

                <ul className="space-y-3 mt-0 md:mt-1">
                  {item.description.map((d, i) => (
                    <li key={i} className="text-sm text-slate-600 leading-relaxed flex gap-2">
                      <span className="text-blue-400 mt-1.5 flex-shrink-0">•</span>
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex gap-2 mt-4 flex-wrap">
                  {item.skills?.map((s) => (
                    <span key={s} className="skill-badge">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
