import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const TECH_STACK = [
  { name: 'Python', category: 'Languages' },
  { name: 'TypeScript', category: 'Languages' },
  { name: 'PyTorch', category: 'ML/AI' },
  { name: 'TensorFlow', category: 'ML/AI' },
  { name: 'Hugging Face', category: 'ML/AI' },
  { name: 'LangChain', category: 'ML/AI' },
  { name: 'FastAPI', category: 'Backend' },
  { name: 'Node.js', category: 'Backend' },
  { name: 'Docker', category: 'DevOps' },
  { name: 'Kubernetes', category: 'DevOps' },
  { name: 'AWS', category: 'Cloud' },
  { name: 'MLflow', category: 'MLOps' },
  { name: 'Databricks', category: 'MLOps' },
  { name: 'Kafka', category: 'Data' },
  { name: 'Spark', category: 'Data' },
  { name: 'PostgreSQL', category: 'Data' },
]

const COLORS = {
  Languages: 'bg-blue-50 text-blue-600 border-blue-100',
  'ML/AI': 'bg-purple-50 text-purple-600 border-purple-100',
  Backend: 'bg-emerald-50 text-emerald-600 border-emerald-100',
  DevOps: 'bg-amber-50 text-amber-600 border-amber-100',
  Cloud: 'bg-cyan-50 text-cyan-600 border-cyan-100',
  MLOps: 'bg-rose-50 text-rose-600 border-rose-100',
  Data: 'bg-indigo-50 text-indigo-600 border-indigo-100',
}

export default function TechStackSection() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.tech-heading',
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
        '.tech-marquee-track',
        { x: 0 },
        {
          x: '-50%',
          duration: 30,
          ease: 'none',
          repeat: -1,
        }
      )

      gsap.fromTo(
        '.tech-marquee-track-reverse',
        { x: '-50%' },
        {
          x: 0,
          duration: 25,
          ease: 'none',
          repeat: -1,
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="tech-stack" className="py-24 md:py-32 overflow-hidden">
      <div className="section-container">
        <div className="tech-heading text-center mb-16" style={{ opacity: 0 }}>
          <p className="section-subheading">Toolkit</p>
          <h2 className="section-heading">
            Tech <span className="text-gradient">Stack</span>
          </h2>
        </div>
      </div>

      {/* Marquee Row 1 - Forward */}
      <div className="relative mb-4">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10" />
        
        <div className="flex tech-marquee-track whitespace-nowrap">
          {[...TECH_STACK, ...TECH_STACK, ...TECH_STACK].map((tech, i) => (
            <div
              key={i}
              className={`inline-flex items-center gap-2 px-6 py-3 mx-2 rounded-full border ${COLORS[tech.category]} transition-all hover:scale-105`}
            >
              <span className="text-sm font-semibold">{tech.name}</span>
              <span className="text-[10px] opacity-60">{tech.category}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Marquee Row 2 - Reverse */}
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10" />
        
        <div className="flex tech-marquee-track-reverse whitespace-nowrap">
          {[...TECH_STACK.reverse(), ...TECH_STACK, ...TECH_STACK].map((tech, i) => (
            <div
              key={i}
              className={`inline-flex items-center gap-2 px-6 py-3 mx-2 rounded-full border ${COLORS[tech.category]} transition-all hover:scale-105`}
            >
              <span className="text-sm font-semibold">{tech.name}</span>
              <span className="text-[10px] opacity-60">{tech.category}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
