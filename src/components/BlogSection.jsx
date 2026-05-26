import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { HiArrowUpRight } from 'react-icons/hi2'
import { MEDIUM_URL } from '../data/constants'

gsap.registerPlugin(ScrollTrigger)

const RSS2JSON_URL =
  'https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@padarthi24sreekar2'

function formatDate(dateStr) {
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
}

export default function BlogSection() {
  const sectionRef = useRef(null)
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false

    const fetchPosts = async () => {
      try {
        const res = await fetch(RSS2JSON_URL)
        const data = await res.json()
        if (cancelled) return

        if (data.status === 'ok' && Array.isArray(data.items)) {
          setPosts(data.items)
        } else {
          setError('Unable to retrieve blog posts at this time.')
        }
      } catch {
        if (!cancelled) setError('Could not load blog posts.')
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    fetchPosts()
    return () => { cancelled = true }
  }, [])

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion || (posts.length === 0 && !loading)) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.blog-heading',
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

      if (posts.length > 0) {
        gsap.fromTo(
          '.blog-card',
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: 'power3.out',
            stagger: 0.1,
            scrollTrigger: {
              trigger: '.blog-grid',
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [posts, loading])

  return (
    <section ref={sectionRef} id="blogs" className="py-24 md:py-32 bg-surface-50/50">
      <div className="section-container">
        <div className="blog-heading" style={{ opacity: 0 }}>
          <p className="section-subheading">Blogs</p>
          <h2 className="section-heading mb-16">
            Latest <span className="text-gradient">Articles</span>
          </h2>
        </div>

        {/* Loading state */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <div className="w-8 h-8 border-2 border-primary-400 border-t-transparent rounded-full animate-spin" />
            <p className="text-sm text-slate-400 font-mono">Fetching latest articles...</p>
          </div>
        )}

        {/* Error state */}
        {error && (
          <div className="text-center py-20">
            <p className="text-slate-500 mb-6">{error}</p>
            <a
              href={MEDIUM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-xl text-sm font-semibold hover:bg-slate-800 transition-colors"
            >
              Visit My Medium
              <HiArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        )}

        {/* Empty state */}
        {!loading && !error && posts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-slate-500 mb-6">No articles published yet.</p>
            <a
              href={MEDIUM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-xl text-sm font-semibold hover:bg-slate-800 transition-colors"
            >
              Follow on Medium
              <HiArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        )}

        {/* Blog grid */}
        {!loading && !error && posts.length > 0 && (
          <>
            <div className="blog-grid grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {posts.map((post) => (
                <a
                  key={post.guid}
                  href={post.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="blog-card glass-card p-8 md:p-10 block group"
                  style={{ opacity: 0 }}
                >
                  <div className="flex flex-col h-full">
                    {/* Date */}
                    <div className="flex items-center gap-2 mb-4">
                      <span className="inline-block w-2 h-2 rounded-full bg-primary-500" />
                      <span className="text-xs font-mono text-slate-400 uppercase tracking-widest">
                        {formatDate(post.pubDate)}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl md:text-2xl font-bold font-display tracking-tight text-slate-900 mb-4 group-hover:text-primary-600 transition-colors">
                      {post.title}
                    </h3>

                    {/* Categories / tags */}
                    {post.categories?.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-6">
                        {post.categories.slice(0, 4).map((cat) => (
                          <span
                            key={cat}
                            className="skill-badge text-[0.55rem]"
                          >
                            {cat}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Spacer */}
                    <div className="flex-1" />

                    {/* Read link */}
                    <div className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 group-hover:text-primary-500 transition-colors">
                      Read on Medium
                      <HiArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </div>
                  </div>
                </a>
              ))}
            </div>

            {/* View all CTA */}
            <div className="text-center mt-12">
              <a
                href={MEDIUM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-xl text-sm font-semibold hover:bg-slate-800 transition-colors group"
              >
                View All on Medium
                <HiArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </div>
          </>
        )}
      </div>
    </section>
  )
}
