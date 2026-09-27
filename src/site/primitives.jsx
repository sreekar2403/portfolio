import { motion as Motion, useReducedMotion, useInView } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

export function Reveal({ children, delay = 0, y = 36, className }) {
  const reduce = useReducedMotion()
  return (
    <Motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </Motion.div>
  )
}

export function CountUp({ value, suffix = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const reduce = useReducedMotion()
  const [n, setN] = useState(reduce ? value : 0)

  useEffect(() => {
    if (!inView || reduce) return
    let raf = 0
    const start = performance.now()
    const dur = 1400
    const tick = (t) => {
      const p = Math.min(1, (t - start) / dur)
      const eased = 1 - Math.pow(1 - p, 3)
      setN(Math.round(eased * value))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, value, reduce])

  return (
    <span ref={ref}>
      {n}
      {suffix}
    </span>
  )
}

export function SectionHead({ title, lede }) {
  return (
    <Reveal>
      <h2 className="st-display st-h2">{title}</h2>
      {lede ? <p className="st-lede mt-4">{lede}</p> : null}
    </Reveal>
  )
}
