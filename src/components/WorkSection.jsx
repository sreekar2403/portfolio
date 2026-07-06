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
            start: 'top 80%',
            toggleActions: 'play none none reverse',
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
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const featuredProject = PROJECTS.find(p => p.featured)
  const otherProjects = PROJECTS.filter(p => !p.featured)

  return (
    <section ref={sectionRef} id="projects" className="py-24 md:py-32">
      <div className="section-container">
        <div className="work-heading" style={{ opacity: 0 }}>
          <p className="section-subheading">Projects</p>
          <h2 className="section-heading mb-16">
            My <span className="text-gradient">Work</span>
          </h2>
        </div>

        {/* Featured Project - Full Width */}
        {featuredProject && (
          <div className="work-item work-card work-card-featured group mb-8 md:mb-12" style={{ opacity: 0 }}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              {/* Screenshot */}
              <div className="relative overflow-hidden bg-slate-100 aspect-[16/10] lg:aspect-auto">
                {featuredProject.screenshot ? (
                  <img
                    src={featuredProject.screenshot}
                    alt={`${featuredProject.title} screenshot`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
                    <span className="text-6xl font-display font-bold text-slate-200">{featuredProject.title[0]}</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/20 pointer-events-none" />
              </div>

              {/* Content */}
              <div className="p-8 md:p-12 relative z-10 flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-4">
                  <span className="inline-block w-2 h-2 rounded-full bg-emerald-500" />
                  <span className="text-xs font-mono text-slate-400 uppercase tracking-widest">
                    Featured • {featuredProject.complexity}
                  </span>
                </div>

                <h3 className="text-3xl md:text-4xl font-bold font-display tracking-tight text-slate-900 mb-4 group-hover:text-blue-600 transition-colors">
                  {featuredProject.title}
                </h3>

                <p className="text-lg text-slate-600 mb-4 font-medium">
                  {featuredProject.subtitle}
                </p>

                <p className="text-slate-600 text-sm leading-relaxed mb-8">
                  {featuredProject.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-8">
                  {featuredProject.tags.map((tag) => (
                    <span key={tag} className="skill-badge">
                      {tag}
                    </span>
                  ))}
                </div>

                <MagneticButton
                  className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-xl text-xs font-semibold uppercase tracking-wider hover:bg-slate-800 transition-all shadow-lg self-start"
                  onClick={() => window.open(featuredProject.githubUrl, '_blank')}
                >
                  <FaGithub className="text-sm" />
                  View Project
                  <HiArrowUpRight className="text-xs" />
                </MagneticButton>
              </div>
            </div>
          </div>
        )}

        {/* Other Projects Grid */}
        <div className="work-grid grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {otherProjects.map((project, idx) => (
            <div
              key={project.id}
              className="work-item work-card group"
              style={{ opacity: 0 }}
            >
              <div className="work-card-number">{`0${idx + (featuredProject ? 2 : 1)}`}</div>

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
                  <span className="inline-block w-2 h-2 rounded-full bg-blue-500" />
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
