import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { NAV_LINKS, PERSONAL } from '../data/constants'

function HoverLink({ text, href }) {
  return (
    <a href={href} className="hover-link nav-link" data-cursor="hover">
      <span className="top">{text}</span>
      <span className="bottom">{text}</span>
    </a>
  )
}

export default function Navbar() {
  const navRef = useRef(null)
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  // IntersectionObserver for active nav section tracking
  useEffect(() => {
    const sectionIds = NAV_LINKS.map(l => l.href.replace('#', ''))
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { rootMargin: '-50% 0px -50% 0px', threshold: 0 }
    )

    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      // Still set up scroll listener but skip animations
      const handleScroll = () => {
        setScrolled(window.scrollY > 50)
      }
      window.addEventListener('scroll', handleScroll)
      return () => window.removeEventListener('scroll', handleScroll)
    }

    const nav = navRef.current

    // Entrance animation
    gsap.fromTo(
      nav,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 2.5 }
    )

    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (e, href) => {
    e.preventDefault()
    setMenuOpen(false)
    const target = document.querySelector(href)
    if (target) {
      const offset = 80
      const y = target.getBoundingClientRect().top + window.pageYOffset - offset
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
  }

  return (
    <nav ref={navRef} className={`navbar ${scrolled ? 'scrolled' : ''}`} style={{ opacity: 0 }}>
      <div className="section-container flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="nav-logo" data-cursor="hover">
          {PERSONAL.firstName.toUpperCase()}
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => {
            const sectionId = link.href.replace('#', '')
            return (
              <a
                key={link.label}
                href={link.href}
                className={`nav-link ${activeSection === sectionId ? 'nav-link-active' : ''}`}
                data-cursor="hover"
                onClick={(e) => handleNavClick(e, link.href)}
              >
                {link.label}
              </a>
            )
          })}
          <div className="h-4 w-px bg-slate-200 mx-2" />
          <a
            href={PERSONAL.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="nav-link"
            data-cursor="hover"
          >
            LinkedIn ↗
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block w-5 h-0.5 bg-slate-800 transition-transform ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-5 h-0.5 bg-slate-800 transition-opacity ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-5 h-0.5 bg-slate-800 transition-transform ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-xl border-b border-slate-200 py-6 px-6">
          <div className="flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="nav-link text-base"
                onClick={(e) => handleNavClick(e, link.href)}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}
