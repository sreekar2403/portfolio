import { useRef, useCallback } from 'react'
import gsap from 'gsap'

export default function MagneticButton({ children, className = '', strength = 0.3, ...props }) {
  const btnRef = useRef(null)
  const textRef = useRef(null)

  const handleMouseMove = useCallback((e) => {
    const btn = btnRef.current
    if (!btn) return

    const rect = btn.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2

    gsap.to(btn, {
      x: x * strength,
      y: y * strength,
      duration: 0.4,
      ease: 'power2.out',
    })

    if (textRef.current) {
      gsap.to(textRef.current, {
        x: x * strength * 0.5,
        y: y * strength * 0.5,
        duration: 0.4,
        ease: 'power2.out',
      })
    }
  }, [strength])

  const handleMouseLeave = useCallback(() => {
    const btn = btnRef.current
    if (!btn) return

    gsap.to(btn, {
      x: 0,
      y: 0,
      duration: 0.7,
      ease: 'elastic.out(1, 0.3)',
    })

    if (textRef.current) {
      gsap.to(textRef.current, {
        x: 0,
        y: 0,
        duration: 0.7,
        ease: 'elastic.out(1, 0.3)',
      })
    }
  }, [])

  return (
    <button
      ref={btnRef}
      className={`magnetic-btn ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      <span ref={textRef} className="inline-flex items-center gap-2">
        {children}
      </span>
    </button>
  )
}
