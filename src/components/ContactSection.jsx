import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { FaGithub, FaLinkedinIn } from 'react-icons/fa6'
import { HiOutlineMail } from 'react-icons/hi'
import { HiArrowUpRight } from 'react-icons/hi2'
import { PERSONAL, PUBLICATION, EDUCATION } from '../data/constants'

gsap.registerPlugin(ScrollTrigger)

export default function ContactSection() {
  const sectionRef = useRef(null)

  useEffect(() => {
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
        '.contact-card',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power3.out',
          stagger: 0.1,
          scrollTrigger: {
            trigger: '.contact-grid',
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

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

        <div className="contact-grid grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Publication Card */}
          <div className="contact-card md:col-span-2 glass-card p-8 md:p-10" style={{ opacity: 0 }}>
            <p className="section-subheading">Research</p>
            <h3 className="text-xl md:text-2xl font-bold font-display tracking-tight text-slate-900 mb-3">
              {PUBLICATION.title}
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed mb-6">
              {PUBLICATION.description}
              <span className="inline-block ml-1 text-emerald-500 font-semibold">{PUBLICATION.venue}</span>
            </p>
            <a
              href={PUBLICATION.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-50 border border-emerald-100 text-emerald-600 rounded-lg text-xs font-semibold uppercase tracking-wider hover:bg-emerald-100 transition-all"
              data-cursor="hover"
            >
              Read on arXiv
              <HiArrowUpRight />
            </a>
          </div>

          {/* Education Card */}
          <div className="contact-card glass-card p-8 md:p-10" style={{ opacity: 0 }}>
            <p className="section-subheading">Education</p>
            <h3 className="text-xl font-bold font-display tracking-tight text-slate-900 mb-2">
              {EDUCATION.degree}
            </h3>
            <p className="text-xs font-mono text-blue-500 uppercase tracking-widest mb-4">
              {EDUCATION.institution}
            </p>
            <p className="text-sm text-slate-600">
              {EDUCATION.year}
            </p>
          </div>

          {/* Connect Card */}
          <div className="contact-card md:col-span-3 glass-card p-8 md:p-10" style={{ opacity: 0 }}>
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div>
                <p className="section-subheading">Connect</p>
                <h3 className="text-xl font-bold font-display tracking-tight text-slate-900">
                  Ready to collaborate?
                </h3>
                <p className="text-sm text-slate-600 mt-1">Let's build something incredible together.</p>
              </div>

              <div className="flex gap-3 flex-wrap">
                <a
                  href={`mailto:${PERSONAL.email}`}
                  className="inline-flex items-center gap-2 px-5 py-3 bg-slate-900 text-white rounded-xl text-xs font-semibold uppercase tracking-wider hover:bg-slate-800 transition-all shadow-lg"
                  data-cursor="hover"
                >
                  <HiOutlineMail className="text-sm" />
                  Say Hello
                </a>
                <a
                  href={PERSONAL.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 bg-white border border-slate-200 text-slate-800 rounded-xl text-xs font-semibold uppercase tracking-wider hover:bg-slate-50 transition-all"
                  data-cursor="hover"
                >
                  <FaGithub className="text-sm" />
                  GitHub
                </a>
                <a
                  href={PERSONAL.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 bg-white border border-slate-200 text-slate-800 rounded-xl text-xs font-semibold uppercase tracking-wider hover:bg-slate-50 transition-all"
                  data-cursor="hover"
                >
                  <FaLinkedinIn className="text-sm" />
                  LinkedIn
                </a>
              </div>
            </div>
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
