import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { FaGithub } from 'react-icons/fa6'
import { HiArrowUpRight } from 'react-icons/hi2'
import { PROJECTS } from '../data/projects'

gsap.registerPlugin(ScrollTrigger)

export default function WorkSection() {
  const sectionRef = useRef(null)

  useEffect(() => {
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

  return (
    <section ref={sectionRef} id="projects" className="py-24 md:py-32">
      <div className="section-container">
        <div className="work-heading" style={{ opacity: 0 }}>
          <p className="section-subheading">Projects</p>
          <h2 className="section-heading mb-16">
            My <span className="text-gradient">Work</span>
          </h2>
        </div>

        <div className="work-grid grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {PROJECTS.map((project, idx) => (
            <div
              key={project.id}
              className="work-item work-card group"
              style={{ opacity: 0 }}
            >
              <div className="work-card-number">{`0${idx + 1}`}</div>

              <div className="p-8 md:p-10 relative z-10">
                {/* Category */}
                <div className="flex items-center gap-2 mb-4">
                  <span className="inline-block w-2 h-2 rounded-full bg-blue-500" />
                  <span className="text-xs font-mono text-slate-400 uppercase tracking-widest">
                    {project.complexity}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-2xl md:text-3xl font-bold font-display tracking-tight text-slate-900 mb-4 group-hover:text-blue-600 transition-colors">
                  {project.title}
                </h3>

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
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white rounded-lg text-xs font-semibold uppercase tracking-wider hover:bg-slate-800 transition-all"
                    data-cursor="hover"
                  >
                    <FaGithub className="text-sm" />
                    GitHub
                    <HiArrowUpRight className="text-xs" />
                  </a>
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
