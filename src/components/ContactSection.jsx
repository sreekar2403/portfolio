import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { FaGithub, FaLinkedinIn } from 'react-icons/fa6'
import { HiOutlineMail, HiOutlinePaperAirplane } from 'react-icons/hi'
import { PERSONAL } from '../data/constants'
import MagneticButton from './MagneticButton'

gsap.registerPlugin(ScrollTrigger)

export default function ContactSection() {
  const sectionRef = useRef(null)
  const [formState, setFormState] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.contact-heading',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      )

      gsap.fromTo(
        '.contact-cta',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.contact-cta',
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      )

      gsap.fromTo(
        '.contact-card',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.contact-content',
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      )

      gsap.fromTo(
        '.contact-form',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.contact-form',
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    // In production, this would send to a backend
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
    setFormState({ name: '', email: '', message: '' })
  }

  return (
    <section ref={sectionRef} id="contact" className="contact-section py-24 md:py-32 relative">
      <div className="contact-grid-bg" />

      <div className="section-container relative z-10">
        <div className="contact-heading" style={{ opacity: 0 }}>
          <p className="section-subheading">Get in Touch</p>
          <h2 className="section-heading mb-16">
            Let's <span className="text-gradient">Connect</span>
          </h2>
        </div>

        {/* Big CTA */}
        <div className="contact-cta mb-16" style={{ opacity: 0 }}>
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-12 md:p-16 text-center">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-40 h-40 bg-blue-500 rounded-full blur-[100px]" />
              <div className="absolute bottom-0 right-0 w-60 h-60 bg-purple-500 rounded-full blur-[120px]" />
            </div>
            
            <div className="relative z-10">
              <h3 className="text-3xl md:text-5xl font-bold font-display text-white mb-4">
                Ready to build something <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">extraordinary</span>?
              </h3>
              <p className="text-slate-400 text-lg mb-8 max-w-2xl mx-auto">
                I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
              </p>
              <MagneticButton
                className="inline-flex items-center gap-3 px-8 py-4 bg-white text-slate-900 rounded-xl font-semibold text-sm tracking-wide hover:bg-slate-100 transition-all shadow-xl hover:shadow-2xl"
                onClick={() => window.location.href = `mailto:${PERSONAL.email}`}
              >
                <HiOutlineMail className="text-lg" />
                Start a Conversation
                <span className="text-lg">→</span>
              </MagneticButton>
            </div>
          </div>
        </div>

        <div className="contact-content grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Info Card */}
          <div className="contact-card glass-card p-8 md:p-10" style={{ opacity: 0 }}>
            <h3 className="text-xl font-bold font-display tracking-tight text-slate-900 mb-6">
              Contact Details
            </h3>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
                  <HiOutlineMail className="text-blue-500" />
                </div>
                <div>
                  <p className="text-sm text-slate-500 mb-1">Email</p>
                  <a href={`mailto:${PERSONAL.email}`} className="text-slate-900 font-medium hover:text-blue-600 transition-colors">
                    {PERSONAL.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center flex-shrink-0">
                  <FaLinkedinIn className="text-purple-500" />
                </div>
                <div>
                  <p className="text-sm text-slate-500 mb-1">LinkedIn</p>
                  <a href={PERSONAL.linkedin} target="_blank" rel="noopener noreferrer" className="text-slate-900 font-medium hover:text-blue-600 transition-colors">
                    Connect on LinkedIn
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center flex-shrink-0">
                  <FaGithub className="text-emerald-500" />
                </div>
                <div>
                  <p className="text-sm text-slate-500 mb-1">GitHub</p>
                  <a href={PERSONAL.github} target="_blank" rel="noopener noreferrer" className="text-slate-900 font-medium hover:text-blue-600 transition-colors">
                    View Projects
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-slate-200">
              <p className="text-xs text-slate-400 font-mono uppercase tracking-wider">
                Based in India • Open to remote work
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="contact-form glass-card p-8 md:p-10" style={{ opacity: 0 }}>
            <h3 className="text-xl font-bold font-display tracking-tight text-slate-900 mb-6">
              Send a Message
            </h3>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Your name"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={formState.email}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="your@email.com"
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                  placeholder="Tell me about your project..."
                  required
                />
              </div>

              <MagneticButton
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-slate-900 text-white rounded-xl font-semibold text-sm tracking-wide hover:bg-slate-800 transition-all shadow-lg"
              >
                {submitted ? (
                  <>
                    <span className="text-emerald-400">✓</span>
                    Message Sent!
                  </>
                ) : (
                  <>
                    <HiOutlinePaperAirplane className="text-sm" />
                    Send Message
                  </>
                )}
              </MagneticButton>
            </form>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="section-container relative z-10 mt-24 pt-8 border-t border-slate-200">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs font-mono text-slate-400 uppercase tracking-widest">
            Designed & Built by {PERSONAL.name}
          </p>
          <p className="text-xs font-mono text-slate-400 uppercase tracking-widest">
            © {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </section>
  )
}
