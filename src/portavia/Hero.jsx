import { motion as Motion, useReducedMotion } from 'framer-motion'
import { ArrowDown, Cpu, Sparkles } from 'lucide-react'
import { PV_HERO } from './data'

const ease = [0.16, 1, 0.3, 1]

export default function Hero() {
  const reduce = useReducedMotion()
  const rise = (delay) => ({
    initial: reduce ? false : { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.9, delay, ease },
  })

  return (
    <header className="pv-wrap pt-32 md:pt-40 pb-10 relative" id="top">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-4 order-2 lg:order-1">
          <Motion.div {...rise(0.35)} className="relative mx-auto" style={{ maxWidth: 340 }}>
            <div className="pv-photo-card aspect-[3/4]">
              <img src={PV_HERO.photo} alt={PV_HERO.photoAlt} loading="eager" />
            </div>
            <div className="pv-float-btn" style={{ left: -28, bottom: 64 }} aria-hidden="true">
              <Sparkles size={28} />
            </div>
            <div
              className="pv-float-btn"
              style={{ right: -24, top: 48, animationDelay: '1.2s', width: 64, height: 64 }}
              aria-hidden="true"
            >
              <Cpu size={24} />
            </div>
          </Motion.div>
        </div>

        <div className="lg:col-span-8 order-1 lg:order-2">
          <Motion.p {...rise(0)} className="text-lg mb-2">
            {PV_HERO.greeting}, I&rsquo;m {PV_HERO.name}
          </Motion.p>
          <Motion.h1 {...rise(0.1)} className="pv-display pv-hero-title">
            <span className="block">{PV_HERO.line1}</span>
            <span className="block">{PV_HERO.line2}</span>
          </Motion.h1>
          <div className="flex flex-wrap items-end gap-6">
            <Motion.p {...rise(0.3)} className="pv-lede pb-3" style={{ maxWidth: '22rem' }}>
              {PV_HERO.sub}
            </Motion.p>
          </div>
          <Motion.div {...rise(0.4)} className="mt-8">
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault()
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="pv-btn"
            >
              Let&rsquo;s talk <ArrowDown size={16} />
            </a>
          </Motion.div>
        </div>
      </div>
    </header>
  )
}
