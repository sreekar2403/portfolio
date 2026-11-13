import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'

/* Registry of "construction jobs". Each job is a DOM element that the agent
   swarm builds: it draws a wireframe, ticks a list, rules a line, or blinks a
   caret, then the real content fades in. The swarm reads this registry
   imperatively (no re-renders), frames report completion through callbacks. */

export const JobContext = createContext(null)

let jobCounter = 0

export function useJobs() {
  return useContext(JobContext)
}

/* Registers one element as a construction job. Returns the element ref, the
   built flag and helpers for the frame components. */
export function useJob({ kind = 'frame', enabled = true, getPoints } = {}) {
  const { register, setVisible, complete, activeRef, registry } = useJobs()
  const idRef = useRef(null)
  if (idRef.current === null) idRef.current = `job-${++jobCounter}`
  const elRef = useRef(null)
  const builtRef = useRef(false)
  const [built, setBuilt] = useState(false)

  const markBuilt = useCallback(() => {
    if (builtRef.current) return
    builtRef.current = true
    setBuilt(true)
  }, [])

  useEffect(() => {
    if (!enabled) {
      markBuilt()
      return
    }
    const id = idRef.current
    const el = elRef.current
    let unregister = () => {}
    let io = null
    let fallback = 0

    if (el) {
      unregister = register({
        id,
        el,
        kind,
        getPoints,
        visible: false,
        built: false,
        claimedBy: null,
        onBuilt: markBuilt,
      })

      io = new IntersectionObserver(
        (entries) => {
          const visible = entries[0]?.isIntersecting ?? false
          setVisible(id, visible)
          if (visible && !builtRef.current) {
            // The swarm chunk is lazy — give it time to load before giving up.
            // Check activeRef at expiry (not at schedule time) so a late swarm
            // still gets to build instead of finding a live page.
            let attempts = 0
            const arm = (delay) => {
              if (fallback) window.clearTimeout(fallback)
              fallback = window.setTimeout(() => {
                if (builtRef.current) return
                const job = registry.current.get(id)
                if (activeRef.current && job && !job.orphan) {
                  // Swarm is live and this job is claimed (or claimable) —
                  // leave it alone for a while longer.
                  if (job.claimedBy) return
                  attempts++
                  if (attempts < 3) {
                    arm(1400)
                    return
                  }
                  // Swarm is live but never claimed us in ~7s — release.
                }
                if (!builtRef.current) complete(id)
              }, delay)
            }
            arm(activeRef.current ? 2800 : 750)
          } else if (fallback) {
            window.clearTimeout(fallback)
            fallback = 0
          }
        },
        { threshold: 0.15, rootMargin: '60px 0px' }
      )
      io.observe(el)
    }

    return () => {
      if (fallback) window.clearTimeout(fallback)
      io?.disconnect()
      unregister()
    }
  }, [kind, enabled, getPoints, register, setVisible, complete, activeRef, registry, markBuilt])

  return { elRef, built }
}
