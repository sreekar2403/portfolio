import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ABOUT_TEXT } from '../data/constants'

gsap.registerPlugin(ScrollTrigger)

export default function AboutSection() {
  const sectionRef = useRef(null)
  const textRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(
        '.about-heading',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            end: 'top 50%',
            toggleActions: 'play none none reverse',
          },
        }
      )

      // Text lines animation - each word fades in
      const words = textRef.current?.querySelectorAll('.about-word')
      if (words?.length) {
        gsap.fromTo(
          words,
          { opacity: 0.1 },
          {
            opacity: 1,
            duration: 0.3,
            stagger: 0.02,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: textRef.current,
              start: 'top 85%',
              end: 'bottom 60%',
              scrub: 1,
            },
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const words = ABOUT_TEXT.split(' ')

  return (
    <section ref={sectionRef} id="about" className="py-32 md:py-40">
      <div className="section-container">
        <div className="max-w-4xl">
          <div className="about-heading" style={{ opacity: 0 }}>
            <p className="section-subheading">About Me</p>
            <h2 className="section-heading mb-12">
              The <span className="text-gradient">Engineer</span> Behind the Code
            </h2>
          </div>

          <p ref={textRef} className="about-text">
            {words.map((word, i) => (
              <span key={i} className="about-word inline-block mr-[0.3em]" style={{ opacity: 0.1 }}>
                {word}
              </span>
            ))}
          </p>
        </div>
      </div>
    </section>
  )
}
