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
  const [textRevealed, setTextRevealed] = useState(false)

  const handleComplete = useCallback(() => {
    setDismissed(true)
    setTimeout(() => onComplete?.(), 600)
  }, [onComplete])

  useEffect(() => {
    // Text reveal animation
    setTimeout(() => setTextRevealed(true), 200)

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
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-white to-purple-50/50 pointer-events-none" />

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

      {/* Center name reveal */}
      <div className="relative z-10 my-8">
        <div className="overflow-hidden">
          <h1
            className="font-display font-bold text-slate-900 transition-all duration-1000 ease-out"
            style={{
              fontSize: 'clamp(2rem, 6vw, 4rem)',
              letterSpacing: '-0.05em',
              transform: textRevealed ? 'translateY(0)' : 'translateY(100%)',
              opacity: textRevealed ? 1 : 0,
            }}
          >
            PVSM SREEKAR
          </h1>
        </div>
        <div className="overflow-hidden mt-2">
          <p
            className="font-mono text-sm text-slate-500 uppercase tracking-[0.3em] transition-all duration-1000 ease-out delay-200"
            style={{
              transform: textRevealed ? 'translateY(0)' : 'translateY(100%)',
              opacity: textRevealed ? 1 : 0,
            }}
          >
            Engineering Future AI
          </p>
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
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
        <div className="w-48 h-0.5 bg-slate-200 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-300"
            style={{
              width: `${Math.min(progress, 100)}%`,
              background: 'linear-gradient(90deg, #3b82f6, #915EFF)',
            }}
          />
        </div>
        <p className="mt-4 text-xs font-mono tracking-[0.2em] uppercase text-slate-400 text-center">
          Loading experience...
        </p>
      </div>
    </div>
  )
}
