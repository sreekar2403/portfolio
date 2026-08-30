import { useState, useEffect, useRef, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { FaGithub } from 'react-icons/fa6'
import { HiArrowUpRight } from 'react-icons/hi2'
import { PROJECTS } from '../data/projects'
import ProjectCoverflow from './ProjectCoverflow'
import MagneticButton from './MagneticButton'

gsap.registerPlugin(ScrollTrigger)

export default function WorkSection() {
  const sectionRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const handleActiveChange = useCallback((idx) => {
    setActiveIndex(idx)
  }, [])

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      gsap.set('.work-heading, .coverflow-wrapper', { opacity: 1, y: 0 })
      return
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.work-heading',
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
        '.coverflow-wrapper',
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          delay: 0.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none none',
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const slides = PROJECTS.map((p) => ({
    image: p.screenshot,
    title: p.title,
    alt: `${p.title} screenshot`,
  }))

  const activeProject = PROJECTS[activeIndex]

  return (
    <section ref={sectionRef} id="projects" className="py-24 md:py-32">
      <div className="section-container">
        <div className="work-heading" style={{ opacity: 0 }}>
          <p className="section-subheading">Projects</p>
          <h2 className="section-heading mb-16">
            My <span className="text-gradient">Work</span>
          </h2>
        </div>

        <div className="coverflow-wrapper" style={{ opacity: 0 }}>
          <ProjectCoverflow
            slides={slides}
            cardWidth={380}
            cardHeight={290}
            tilt={12}
            sideTilt={8}
            gap={8}
            opacity={54}
            showTitle={true}
            onActiveChange={handleActiveChange}
          />

          {/* Active project info panel */}
          {activeProject && (
            <div className="coverflow-info mt-10 md:mt-14">
              <div className="flex items-center gap-2 mb-3">
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-500" />
                <span className="text-xs font-mono text-slate-400 uppercase tracking-widest">
                  {activeProject.complexity}
                </span>
              </div>

              <h3 className="text-3xl md:text-4xl font-bold font-display tracking-tight text-slate-900 mb-2">
                {activeProject.title}
              </h3>

              <p className="text-base md:text-lg text-slate-500 mb-4 font-medium">
                {activeProject.subtitle}
              </p>

              <p className="text-slate-600 text-sm leading-relaxed mb-6 max-w-2xl">
                {activeProject.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-8">
                {activeProject.tags.map((tag) => (
                  <span key={tag} className="skill-badge">
                    {tag}
                  </span>
                ))}
              </div>

              <MagneticButton
                className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-xl text-xs font-semibold uppercase tracking-wider hover:bg-slate-800 transition-all shadow-lg"
                onClick={() => window.open(activeProject.githubUrl, '_blank')}
              >
                <FaGithub className="text-sm" />
                View Project
                <HiArrowUpRight className="text-xs" />
              </MagneticButton>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
