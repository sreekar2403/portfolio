import { useState, useEffect, useCallback, useRef } from 'react'

const PERSPECTIVE = 1600
const SCALE_STEP = 0.16
const MAX_VISIBLE = 2
const DEPTH = 240

function cssTransition(t) {
  const dur = t && typeof t.duration === 'number' ? t.duration : 0.6
  let ease = 'cubic-bezier(0.22, 1, 0.36, 1)'
  const e = t?.ease
  if (Array.isArray(e) && e.length === 4) {
    ease = `cubic-bezier(${e[0]}, ${e[1]}, ${e[2]}, ${e[3]})`
  } else if (typeof e === 'string') {
    const map = { linear: 'linear', easeIn: 'ease-in', easeOut: 'ease-out', easeInOut: 'ease-in-out' }
    ease = map[e] || 'ease'
  }
  return { dur, ease }
}

export default function ProjectCoverflow({
  slides,
  cardWidth: propCardWidth,
  cardHeight: propCardHeight,
  tilt = 12,
  sideTilt = 8,
  gap = 8,
  opacity = 60,
  transition,
  showTitle = true,
  onActiveChange,
}) {
  const t = transition || { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  const [active, setActive] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const lockRef = useRef(false)
  const containerRef = useRef(null)

  const list = slides && slides.length ? slides : []
  const n = list.length

  // Responsive card sizing
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const cardWidth = isMobile ? 320 : propCardWidth || 480
  const cardHeight = isMobile ? 280 : propCardHeight || 400

  useEffect(() => {
    setActive((a) => Math.max(0, Math.min(n - 1, a)))
  }, [n])

  useEffect(() => {
    onActiveChange?.(active)
  }, [active, onActiveChange])

  const moveDur = t.duration || 0.6
  const lock = useCallback(() => {
    lockRef.current = true
    window.setTimeout(() => { lockRef.current = false }, Math.max(50, moveDur * 1000))
  }, [moveDur])

  const step = useCallback((dir) => {
    if (lockRef.current) return
    lock()
    setActive((a) => (((a + dir) % n) + n) % n)
  }, [n, lock])

  const handleCardClick = useCallback((i) => {
    if (lockRef.current) return
    lock()
    setActive((a) => (i === a ? (a + 1) % n : i))
  }, [n, lock])

  const onKeyDown = useCallback((e) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); step(1) }
    else if (e.key === 'ArrowLeft') { e.preventDefault(); step(-1) }
  }, [step])

  // Auto-advance when idle and in view
  const idleTimerRef = useRef(null)
  const isInViewRef = useRef(false)

  const resetIdleTimer = useCallback(() => {
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current)
    if (isInViewRef.current) {
      idleTimerRef.current = setTimeout(() => {
        setActive((a) => (((a + 1) % n) + n) % n)
      }, 3000)
    }
  }, [n])

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        isInViewRef.current = entry.isIntersecting
        if (entry.isIntersecting) resetIdleTimer()
        else if (idleTimerRef.current) clearTimeout(idleTimerRef.current)
      },
      { threshold: 0.4 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [resetIdleTimer])

  useEffect(() => {
    resetIdleTimer()
    return () => { if (idleTimerRef.current) clearTimeout(idleTimerRef.current) }
  }, [active, resetIdleTimer])

  const { dur, ease } = cssTransition(t)
  const transitionCss = `transform ${dur}s ${ease}, opacity ${dur}s ${ease}`
  const effectiveRadius = 16
  const dim = 1 - Math.max(0, Math.min(100, opacity)) / 100

  if (!n) return null

  return (
    <div
      ref={containerRef}
      className="project-coverflow"
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        minWidth: 320,
        minHeight: isMobile ? 360 : 500,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        perspective: `${PERSPECTIVE}px`,
        overflow: 'hidden',
        outline: 'none',
      }}
      tabIndex={0}
      role="group"
      aria-roledescription="carousel"
      onKeyDown={onKeyDown}
    >
      <div
        style={{
          position: 'relative',
          width: cardWidth,
          height: cardHeight,
          transformStyle: 'preserve-3d',
        }}
      >
        {list.map((slide, i) => {
          let rel = i - active
          if (rel > n / 2) rel -= n
          if (rel < -n / 2) rel += n
          const ax = Math.abs(rel)
          const visible = ax <= MAX_VISIBLE
          const isActive = rel === 0
          const sc = Math.max(0.4, 1 - ax * SCALE_STEP)
          const tx = rel * (gap * 30)
          const tz = -ax * DEPTH
          const ry = -rel * tilt
          const rz = rel * sideTilt
          const src = slide.image

          return (
            <div
              key={i}
              style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                width: cardWidth,
                height: cardHeight,
                borderRadius: effectiveRadius,
                overflow: 'hidden',
                transformStyle: 'preserve-3d',
                transformOrigin: 'center center',
                transform: `translate(-50%, -50%) translateX(${tx}px) translateZ(${tz}px) rotateY(${ry}deg) rotateZ(${rz}deg) scale(${sc})`,
                transition: transitionCss,
                opacity: visible ? 1 : 0,
                cursor: isActive ? 'default' : 'pointer',
                pointerEvents: visible ? 'auto' : 'none',
                backgroundColor: '#111827',
              }}
              onClick={() => handleCardClick(i)}
              aria-label={slide.title}
              aria-hidden={!visible}
            >
              {src ? (
                <img
                  src={src}
                  alt={slide.alt || slide.title || ''}
                  draggable={false}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                    userSelect: 'none',
                  }}
                />
              ) : (
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'linear-gradient(135deg, #1e293b, #0f172a)',
                }}>
                  <span style={{
                    fontSize: 48,
                    fontWeight: 700,
                    color: 'rgba(255,255,255,0.1)',
                    fontFamily: "'Space Grotesk', sans-serif",
                  }}>
                    {slide.title?.[0] || ''}
                  </span>
                </div>
              )}

              {showTitle && (
                <>
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(180deg, rgba(0,0,0,0) 20%, rgba(0,0,0,0.85) 100%)',
                    pointerEvents: 'none',
                  }} />
                  <div style={{
                    position: 'absolute',
                    left: 20,
                    right: 20,
                    bottom: 20,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 6,
                    pointerEvents: 'none',
                  }}>
                    <span style={{
                      color: '#ffffff',
                      fontSize: isMobile ? 18 : 22,
                      fontWeight: 700,
                      lineHeight: '1.1em',
                      letterSpacing: '-0.02em',
                      whiteSpace: 'pre-line',
                      textShadow: '0 2px 10px rgba(0,0,0,0.4)',
                      fontFamily: "'Space Grotesk', sans-serif",
                    }}>
                      {slide.title}
                    </span>
                    {slide.description && (
                      <span style={{
                        color: 'rgba(255,255,255,0.7)',
                        fontSize: isMobile ? 11 : 13,
                        lineHeight: '1.3em',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        fontFamily: "'Space Grotesk', sans-serif",
                      }}>
                        {slide.description}
                      </span>
                    )}
                    {slide.githubUrl && (
                      <a
                        href={slide.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        style={{
                          pointerEvents: 'auto',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 6,
                          color: 'rgba(255,255,255,0.85)',
                          fontSize: 12,
                          fontWeight: 500,
                          textDecoration: 'none',
                          marginTop: 4,
                          fontFamily: "'Space Grotesk', sans-serif",
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.color = '#ffffff' }}
                        onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.85)' }}
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                        View on GitHub
                      </a>
                    )}
                  </div>
                </>
              )}

              <div style={{
                position: 'absolute',
                inset: 0,
                background: '#000000',
                opacity: isActive ? 0 : dim,
                transition: `opacity ${dur}s ${ease}`,
                pointerEvents: 'none',
              }} />
            </div>
          )
        })}
      </div>
    </div>
  )
}
