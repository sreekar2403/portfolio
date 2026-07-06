import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { FaQuoteLeft } from 'react-icons/fa6'

gsap.registerPlugin(ScrollTrigger)

const TESTIMONIALS = [
  {
    quote: "Sreekar's deep understanding of ML systems architecture transformed our approach to production inference. His work on our LLM pipeline reduced latency by 40% while maintaining accuracy.",
    author: "Engineering Lead",
    role: "Freshworks",
    avatar: "FL",
  },
  {
    quote: "An exceptional engineer who bridges the gap between research and production. Sreekar's ability to fine-tune and deploy models at scale is remarkable.",
    author: "Senior ML Engineer",
    role: "Colleague",
    avatar: "SM",
  },
  {
    quote: "Working with Sreekar on the MLOps migration was a game-changer. His systematic approach to pipeline design and documentation made the transition seamless.",
    author: "Tech Lead",
    role: "Freshworks",
    avatar: "TL",
  },
]

const AVATAR_COLORS = [
  'bg-blue-500',
  'bg-purple-500',
  'bg-emerald-500',
]

export default function TestimonialsSection() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.testimonials-heading',
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
        '.testimonial-card',
        { y: 50, opacity: 0, rotateY: -5 },
        {
          y: 0,
          opacity: 1,
          rotateY: 0,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.15,
          scrollTrigger: {
            trigger: '.testimonials-grid',
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="testimonials" className="py-24 md:py-32">
      <div className="section-container">
        <div className="testimonials-heading text-center mb-16" style={{ opacity: 0 }}>
          <p className="section-subheading">Testimonials</p>
          <h2 className="section-heading">
            What <span className="text-gradient">Colleagues</span> Say
          </h2>
        </div>

        <div className="testimonials-grid grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((testimonial, i) => (
            <div
              key={i}
              className="testimonial-card glass-card p-8 relative"
              style={{ opacity: 0, transformStyle: 'preserve-3d' }}
            >
              {/* Quote icon */}
              <div className="absolute top-6 right-6 text-slate-200">
                <FaQuoteLeft className="text-3xl" />
              </div>

              {/* Quote */}
              <p className="text-slate-600 text-sm leading-relaxed mb-8 relative z-10">
                "{testimonial.quote}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full ${AVATAR_COLORS[i]} flex items-center justify-center text-white text-xs font-bold`}>
                  {testimonial.avatar}
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">{testimonial.author}</p>
                  <p className="text-xs text-slate-500">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
