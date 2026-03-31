import { useEffect, useState, useCallback } from 'react'

const MARQUEE_ITEMS = [
  'Lead ML Engineer',
  '•',
  'AI Architect',
  '•',
  'MLOps',
  '•',
  'LLM Systems',
  '•',
  'Full Stack AI',
  '•',
  'Software Engineer',
  '•',
]

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0)
  const [dismissed, setDismissed] = useState(false)

  const handleComplete = useCallback(() => {
    setDismissed(true)
    setTimeout(() => onComplete?.(), 600)
  }, [onComplete])

  useEffect(() => {
    let frame = 0
    const totalFrames = 12

    const tick = () => {
      frame++
      setProgress(Math.min((frame / totalFrames) * 100, 100))

      if (frame >= totalFrames) {
        setTimeout(handleComplete, 500)
        return
      }
      setTimeout(tick, 150)
    }

    setTimeout(tick, 300)
  }, [handleComplete])

  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white transition-all duration-700"
      style={{
        opacity: dismissed ? 0 : 1,
        pointerEvents: dismissed ? 'none' : 'auto',
        visibility: dismissed ? 'hidden' : 'visible',
      }}
    >
      {/* Top marquee */}
      <div className="w-full overflow-hidden mb-4">
        <div
          className="flex whitespace-nowrap"
          style={{ animation: 'marquee-slide 15s linear infinite' }}
        >
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span
              key={i}
              className="px-6 font-display font-bold uppercase tracking-wide"
              style={{
                fontSize: 'clamp(1.5rem, 4vw, 3rem)',
                color: item === '•' ? '#cbd5e1' : 'transparent',
                backgroundImage: item !== '•' ? 'linear-gradient(135deg, #3b82f6, #915EFF)' : 'none',
                backgroundClip: item !== '•' ? 'text' : 'initial',
                WebkitBackgroundClip: item !== '•' ? 'text' : 'initial',
                WebkitTextFillColor: item !== '•' ? 'transparent' : '#cbd5e1',
              }}
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom reversed marquee */}
      <div className="w-full overflow-hidden">
        <div
          className="flex whitespace-nowrap"
          style={{ animation: 'marquee-slide 15s linear infinite reverse' }}
        >
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span
              key={i}
              className="px-6 font-display font-bold uppercase tracking-wide"
              style={{
                fontSize: 'clamp(1.5rem, 4vw, 3rem)',
                opacity: 0.12,
                color: '#0f172a',
              }}
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-48 h-0.5 bg-slate-200 rounded-full mt-12 overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-300"
          style={{
            width: `${Math.min(progress, 100)}%`,
            background: 'linear-gradient(90deg, #3b82f6, #915EFF)',
          }}
        />
      </div>

      <p className="mt-6 text-xs font-mono tracking-[0.2em] uppercase text-slate-400">
        Loading experience...
      </p>
    </div>
  )
}
