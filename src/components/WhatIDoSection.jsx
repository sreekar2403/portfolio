import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { HiOutlineSparkles } from 'react-icons/hi'
import { FaRocket } from 'react-icons/fa6'
import { WHAT_I_DO } from '../data/constants'

gsap.registerPlugin(ScrollTrigger)

const ICONS = {
  brain: <HiOutlineSparkles />,
  rocket: <FaRocket />,
}

const COLORS = {
  blue: {
    iconBg: 'bg-blue-50',
    iconText: 'text-blue-500',
    border: 'hover:border-blue-200',
    skillBg: 'bg-blue-50 text-blue-600 border-blue-100',
    glow: 'rgba(59, 130, 246, 0.08)',
  },
  emerald: {
    iconBg: 'bg-emerald-50',
    iconText: 'text-emerald-500',
    border: 'hover:border-emerald-200',
    skillBg: 'bg-emerald-50 text-emerald-600 border-emerald-100',
    glow: 'rgba(16, 185, 129, 0.08)',
  },
}

export default function WhatIDoSection() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.wid-heading',
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
        '.wid-card',
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.2,
          scrollTrigger: {
            trigger: '.wid-cards',
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="what-i-do" className="py-24 md:py-32">
      <div className="section-container">
        <div className="wid-heading" style={{ opacity: 0 }}>
          <p className="section-subheading">Expertise</p>
          <h2 className="section-heading mb-16">
            What I <span className="text-gradient">Do</span>
          </h2>
        </div>

        <div className="wid-cards grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {WHAT_I_DO.map((item) => {
            const c = COLORS[item.color]
            return (
              <div
                key={item.id}
                className={`wid-card glow-card what-i-do-card ${c.border}`}
                style={{ opacity: 0 }}
              >
                <span className="card-number">{`0${item.id}`}</span>

                <div className={`card-icon ${c.iconBg} ${c.iconText} text-xl`}>
                  {ICONS[item.icon]}
                </div>

                <h3 className="text-xl md:text-2xl font-bold font-display tracking-tight text-slate-900 mb-1">
                  {item.title}
                </h3>
                <p className="text-xs font-mono text-slate-400 uppercase tracking-widest mb-4">
                  {item.subtitle}
                </p>

                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  {item.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {item.skills.map((skill) => (
                    <span key={skill} className={`skill-badge ${c.skillBg}`}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
