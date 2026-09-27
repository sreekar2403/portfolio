import { useState } from 'react'
import { AnimatePresence, motion as Motion, useReducedMotion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router-dom'
import { ST_NAV, ST_SOCIALS } from './data'
import { ST_HERO } from './data'
import { PERSONAL } from '../data/constants'

function scrollToHash(href) {
  const id = href.replace('#', '')
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const reduce = useReducedMotion()
  const navigate = useNavigate()
  const location = useLocation()

  const go = (href) => {
    setOpen(false)
    if (location.pathname !== '/') {
      navigate('/')
      setTimeout(() => scrollToHash(href), 120)
    } else {
      scrollToHash(href)
    }
  }

  return (
    <>
      <div className="st-pillnav">
        <img src={ST_HERO.photo} alt="" width="72" height="72" />
        <button
          onClick={() => go('#contact')}
          className="text-sm font-medium"
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit' }}
        >
          Available for work
        </button>
        <span className="st-status-dot" aria-hidden="true" />
        <button className="st-menu-btn" onClick={() => setOpen(true)} aria-label="Open menu">
          <Menu size={18} />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <Motion.div
            className="st-overlay"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <button
              className="st-menu-btn"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              style={{ position: 'absolute', top: 24, right: '8vw' }}
            >
              <X size={18} />
            </button>
            <nav>
              {ST_NAV.map((item, i) => (
                <Motion.div
                  key={item.href}
                  initial={reduce ? false : { opacity: 0, x: -32 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.06 * i, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                >
                  <a
                    href={item.href}
                    className="st-overlay-link"
                    onClick={(e) => {
                      e.preventDefault()
                      go(item.href)
                    }}
                  >
                    <span className="st-overlay-index">{item.index}</span>
                    {item.label}
                  </a>
                </Motion.div>
              ))}
            </nav>
            <Motion.div
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 }}
              className="mt-10 flex flex-wrap gap-x-8 gap-y-2 text-sm"
              style={{ color: 'rgba(255,255,255,0.7)' }}
            >
              <a href={`mailto:${PERSONAL.email}`}>{PERSONAL.email}</a>
              {ST_SOCIALS.slice(0, 3).map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noreferrer">
                  {s.label}
                </a>
              ))}
            </Motion.div>
          </Motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
