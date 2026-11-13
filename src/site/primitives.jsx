import { useEffect, useRef, useState } from 'react'
import { BuildFrame } from './build/BuildFrame'

/* Simple in-view reveal for blocks that are not construction frames. */
export function Reveal({ children, delay = 0, className = '', as }) {
  const Tag = as || 'div'
  const ref = useRef(null)
  const [shown, setShown] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )

  useEffect(() => {
    const el = ref.current
    if (!el || shown) return
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setShown(true)
          io.disconnect()
        }
      },
      { threshold: 0.15, rootMargin: '40px 0px' }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [shown])

  return (
    <Tag
      ref={ref}
      className={`st-reveal ${shown ? 'in' : ''} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  )
}

export function CountUp({ value, suffix = '', prefix = '' }) {
  const ref = useRef(null)
  const [n, setN] = useState(value)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let raf = 0
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return
        io.disconnect()
        const from = 0
        setN(from)
        const t0 = performance.now()
        const dur = 1100
        const tick = (now) => {
          const p = Math.min(1, (now - t0) / dur)
          const eased = 1 - Math.pow(1 - p, 3)
          setN(Math.round(from + (value - from) * eased))
          if (p < 1) raf = requestAnimationFrame(tick)
        }
        raf = requestAnimationFrame(tick)
      },
      { threshold: 0.5 }
    )
    io.observe(el)
    return () => {
      io.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [value])

  return (
    <span ref={ref}>
      {prefix}
      {n}
      {suffix}
    </span>
  )
}

/* Section heading with the mono readout signature. An agent draws the rule
   under the readout before the headline arrives. */
export function SectionHead({ index, kicker, title, lede }) {
  return (
    <header className="mb-12">
      <BuildFrame
        kind="rule"
        label={`section ${index}`}
        className="st-readout"
        contentClassName="flex items-center gap-3"
      >
        <b>{index}</b>
        <span>{kicker}</span>
      </BuildFrame>
      <BuildFrame kind="frame" label="headline" style={{ borderRadius: 10 }}>
        <h2 className="st-h2" style={{ marginTop: 16 }}>
          {title}
        </h2>
        {lede ? (
          <p className="st-lede" style={{ marginTop: 12 }}>
            {lede}
          </p>
        ) : null}
      </BuildFrame>
    </header>
  )
}
