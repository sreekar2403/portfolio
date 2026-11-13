import { useState } from 'react'
import { AnimatePresence, motion as Motion, useReducedMotion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router-dom'
import { ST_NAV, ST_SOCIALS, ST_HERO } from './data'
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
      setTimeout(() => scrollToHash(href), 140)
    } else {
      scrollToHash(href)
    }
  }

  return (
    <>
      <header className="st-topbar">
        <div className="st-topbar-inner">
          <a href="/portfolio/" className="st-brand" onClick={(e) => { e.preventDefault(); go('#top') }}>
            <img src="/portfolio/title_icon.svg" alt="" width="24" height="24" />
            PVSM Sreekar
          </a>

          <nav className="st-navlinks" aria-label="Sections">
            {ST_NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="st-navlink"
                onClick={(e) => {
                  e.preventDefault()
                  go(item.href)
                }}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="st-topbar-right">
            <span className="st-availability">
              <span className="st-dot" aria-hidden="true" />
              Available for work
            </span>
            <a href="#contact" className="st-btn st-btn-sm" onClick={(e) => { e.preventDefault(); go('#contact') }}>
              Contact
            </a>
            <button className="st-menu-btn" onClick={() => setOpen(true)} aria-label="Open menu">
              <Menu size={17} />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <Motion.div
            className="st-overlay"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
          >
            <div className="st-overlay-top">
              <span className="st-brand" style={{ pointerEvents: 'none' }}>
                <img src="/portfolio/title_icon.svg" alt="" width="24" height="24" />
                PVSM Sreekar
              </span>
              <button className="st-menu-btn" onClick={() => setOpen(false)} aria-label="Close menu">
                <X size={17} />
              </button>
            </div>

            <nav aria-label="Sections">
              {ST_NAV.map((item, i) => (
                <Motion.div
                  key={item.href}
                  initial={reduce ? false : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.04 * i, duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
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

            <div className="st-overlay-foot">
              <a href={`mailto:${PERSONAL.email}`}>{PERSONAL.email}</a>
              {ST_SOCIALS.slice(0, 3).map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noreferrer">
                  {s.label}
                </a>
              ))}
              <span style={{ color: 'var(--st-ink-3)' }}>{ST_HERO.location}</span>
            </div>
          </Motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
