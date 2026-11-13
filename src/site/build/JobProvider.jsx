import { useCallback, useMemo, useRef } from 'react'
import { JobContext } from './JobContext'

export function JobProvider({ children }) {
  const registry = useRef(new Map())
  const activeRef = useRef(false)
  const heroEl = useRef(null)
  const listeners = useRef(new Set())

  const notify = useCallback(() => {
    listeners.current.forEach((fn) => fn())
  }, [])

  const register = useCallback(
    (job) => {
      registry.current.set(job.id, job)
      notify()
      let removed = false
      return () => {
        if (removed) return
        removed = true
        const current = registry.current.get(job.id)
        if (current) current.orphan = true
        registry.current.delete(job.id)
      }
    },
    [notify]
  )

  const setVisible = useCallback(
    (id, visible) => {
      const job = registry.current.get(id)
      if (job && job.visible !== visible) {
        job.visible = visible
        notify()
      }
    },
    [notify]
  )

  const complete = useCallback(
    (id) => {
      const job = registry.current.get(id)
      if (!job || job.built) return
      job.built = true
      job.onBuilt?.()
      notify()
    },
    [notify]
  )

  const subscribe = useCallback((fn) => {
    listeners.current.add(fn)
    return () => listeners.current.delete(fn)
  }, [])

  const value = useMemo(
    () => ({ register, setVisible, complete, notify, subscribe, registry, activeRef, heroEl }),
    [register, setVisible, complete, notify, subscribe]
  )

  return <JobContext.Provider value={value}>{children}</JobContext.Provider>
}
