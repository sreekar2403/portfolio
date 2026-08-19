import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { FaGithub } from 'react-icons/fa6'
import { HiArrowUpRight } from 'react-icons/hi2'
import { PROJECTS } from '../data/projects'
import MagneticButton from './MagneticButton'

gsap.registerPlugin(ScrollTrigger)

export default function WorkSection() {
  const sectionRef = useRef(null)

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    
    if (prefersReducedMotion) return

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
            start: 'top 65%',
            end: 'bottom 20%',
            toggleActions: 'play none none none',
          },
        }
      )

      gsap.fromTo(
        '.work-item',
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.15,
          scrollTrigger: {
            trigger: '.work-grid',
            start: 'top 65%',
            end: 'bottom 20%',
            toggleActions: 'play none none none',
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="projects" className="py-24 md:py-32">
      <div className="section-container">
        <div className="work-heading" style={{ opacity: 0 }}>
          <p className="section-subheading">Projects</p>
          <h2 className="section-heading mb-16">
            My <span className="text-gradient">Work</span>
          </h2>
        </div>

        {/* Projects Grid - Equal Footing */}
        <div className="work-grid grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {PROJECTS.map((project, idx) => (
            <div
              key={project.id}
              className="work-item work-card group"
              style={{ opacity: 0 }}
            >
              {/* Featured badge */}
              {project.featured && (
                <div className="absolute top-4 right-4 z-20">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500/10 text-emerald-600 text-xs font-semibold uppercase tracking-wider rounded-full border border-emerald-500/20">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Featured
                  </span>
                </div>
              )}

              <div className="work-card-number">{`0${idx + 1}`}</div>

              {/* Screenshot Preview */}
              {project.screenshot && (
                <div className="relative overflow-hidden bg-slate-100 aspect-[16/9] m-4 rounded-xl">
                  <img
                    src={project.screenshot}
                    alt={`${project.title} screenshot`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white/40 to-transparent pointer-events-none" />
                </div>
              )}

              <div className="p-8 md:p-10 relative z-10">
                {/* Category */}
                <div className="flex items-center gap-2 mb-4">
                  <span className={`inline-block w-2 h-2 rounded-full ${project.featured ? 'bg-emerald-500' : 'bg-blue-500'}`} />
                  <span className="text-xs font-mono text-slate-400 uppercase tracking-widest">
                    {project.complexity}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-2xl md:text-3xl font-bold font-display tracking-tight text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {project.title}
                </h3>

                <p className="text-sm text-slate-500 mb-4">{project.subtitle}</p>

                {/* Description */}
                <div className="text-slate-600 text-sm leading-relaxed mb-6">
                  {project.description}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.tags.map((tag) => (
                    <span key={tag} className="skill-badge">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <MagneticButton
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white rounded-lg text-xs font-semibold uppercase tracking-wider hover:bg-slate-800 transition-all"
                    onClick={() => window.open(project.githubUrl, '_blank')}
                  >
                    <FaGithub className="text-sm" />
                    GitHub
                    <HiArrowUpRight className="text-xs" />
                  </MagneticButton>
                </div>
              </div>

              {/* Hover glow */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500/5 blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
