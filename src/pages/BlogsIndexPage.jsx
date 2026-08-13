import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { HiArrowLeft, HiArrowUpRight } from 'react-icons/hi2'
import { LOCAL_BLOG_POSTS } from '../data/localBlogs'

const MEDIUM_FEED_URL = 'https://medium.com/feed/@padarthi24sreekar2'
const RSS2JSON_URL = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(MEDIUM_FEED_URL)}`
const CORS_PROXY_URL = `https://api.allorigins.win/get?url=${encodeURIComponent(MEDIUM_FEED_URL)}&json`

function formatDate(dateStr) {
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
}

function parseXMLFeed(xmlString) {
  const parser = new DOMParser()
  const xmlDoc = parser.parseFromString(xmlString, 'text/xml')
  if (xmlDoc.getElementsByTagName('parsererror').length > 0) return null
  const items = xmlDoc.getElementsByTagName('item')
  const posts = []
  for (let i = 0; i < items.length; i++) {
    const item = items[i]
    const getTextContent = (tagName) => item.getElementsByTagName(tagName)[0]?.textContent || ''
    posts.push({
      title: getTextContent('title'),
      pubDate: getTextContent('pubDate'),
      link: getTextContent('link'),
      guid: getTextContent('guid'),
      description: getTextContent('description'),
      categories: Array.from(item.getElementsByTagName('category')).map(cat => cat.textContent)
    })
  }
  return posts.length > 0 ? posts : null
}

export default function BlogsIndexPage() {
  const [mediumPosts, setMediumPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    const fetchPosts = async () => {
      try {
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 8000)
        const res = await fetch(RSS2JSON_URL, { signal: controller.signal })
        clearTimeout(timeoutId)
        const data = await res.json()
        if (cancelled) return
        if (data.status === 'ok' && Array.isArray(data.items)) {
          setMediumPosts(data.items)
          setLoading(false)
          return
        }
      } catch {
        if (cancelled) return
        try {
          const controller = new AbortController()
          const timeoutId = setTimeout(() => controller.abort(), 8000)
          const corsRes = await fetch(CORS_PROXY_URL, { signal: controller.signal })
          clearTimeout(timeoutId)
          const corsData = await corsRes.json()
          if (cancelled) return
          const parsedPosts = parseXMLFeed(corsData.contents)
          if (parsedPosts) {
            setMediumPosts(parsedPosts)
            setLoading(false)
            return
          }
        } catch {}
      }
      if (!cancelled) setLoading(false)
    }
    fetchPosts()
    return () => { cancelled = true }
  }, [])

  const allPosts = [
    ...LOCAL_BLOG_POSTS.map(p => ({ ...p, type: 'local' })),
    ...mediumPosts.map(p => ({ ...p, type: 'medium' }))
  ].sort((a, b) => {
    const dateA = a.type === 'local' ? a.date : a.pubDate
    const dateB = b.type === 'local' ? b.date : b.pubDate
    return new Date(dateB) - new Date(dateA)
  })

  return (
    <div className="min-h-screen bg-surface-50 text-slate-900">
      <div className="noise-overlay" aria-hidden="true" />

      <header className="relative overflow-hidden bg-slate-950 text-white">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 via-transparent to-emerald-500/10" aria-hidden="true" />
        <div className="relative max-w-6xl mx-auto px-4 py-16 md:py-24">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-white/70 hover:text-white transition-colors mb-10"
          >
            <HiArrowLeft className="w-4 h-4" />
            Back to home
          </Link>

          <p className="section-subheading text-primary-200">Blogs</p>
          <h1 className="text-4xl md:text-6xl font-bold font-display tracking-tight mb-6">
            Latest <span className="text-gradient">Articles</span>
          </h1>
          <p className="max-w-2xl text-lg text-white/60 leading-relaxed">
            Field notes on local LLMs, agentic coding, MLOps, and the engineering work behind production AI systems.
          </p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-16 md:py-20">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <div className="w-8 h-8 border-2 border-primary-400 border-t-transparent rounded-full animate-spin" />
            <p className="text-sm text-slate-400 font-mono">Fetching articles...</p>
          </div>
        ) : allPosts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-slate-500">No articles published yet.</p>
          </div>
        ) : (
          <div className="blog-grid grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {allPosts.map((post) =>
              post.type === 'local' ? (
                <Link
                  key={post.id}
                  to={`/blog/${post.id}`}
                  className="blog-card glass-card overflow-hidden block group text-left"
                >
                  {post.coverImage && (
                    <div className="aspect-[16/9] overflow-hidden bg-slate-100 border-b border-slate-200">
                      <img
                        src={post.coverImage}
                        alt=""
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                  )}

                  <div className="p-8 md:p-10 flex flex-col min-h-[22rem]">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="inline-block w-2 h-2 rounded-full bg-emerald-500" />
                      <span className="text-xs font-mono text-slate-400 uppercase tracking-widest">
                        {post.date} · {post.readTime}
                      </span>
                    </div>

                    <p className="text-xs font-mono uppercase tracking-[0.18em] text-primary-500 mb-3">
                      {post.category}
                    </p>

                    <h2 className="text-2xl md:text-3xl font-bold font-display tracking-tight text-slate-900 mb-4 group-hover:text-primary-600 transition-colors">
                      {post.title}
                    </h2>

                    <p className="text-slate-500 leading-relaxed mb-6">
                      {post.subtitle}
                    </p>

                    {post.tags?.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-8">
                        {post.tags.map((tag) => (
                          <span key={tag} className="skill-badge text-[0.55rem]">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="flex-1" />

                    <div className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 group-hover:text-primary-500 transition-colors">
                      Read Article
                      <HiArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </div>
                  </div>
                </Link>
              ) : (
                <a
                  key={post.guid}
                  href={post.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="blog-card glass-card overflow-hidden block group"
                >
                  <div className="p-8 md:p-10 flex flex-col min-h-[22rem]">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="inline-block w-2 h-2 rounded-full bg-primary-500" />
                      <span className="text-xs font-mono text-slate-400 uppercase tracking-widest">
                        {formatDate(post.pubDate)}
                      </span>
                    </div>

                    <h2 className="text-2xl md:text-3xl font-bold font-display tracking-tight text-slate-900 mb-4 group-hover:text-primary-600 transition-colors">
                      {post.title}
                    </h2>

                    {post.categories?.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-8">
                        {post.categories.map((cat) => (
                          <span key={cat} className="skill-badge text-[0.55rem]">
                            {cat}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="flex-1" />

                    <div className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 group-hover:text-primary-500 transition-colors">
                      Read on Medium
                      <HiArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </div>
                  </div>
                </a>
              )
            )}
          </div>
        )}
      </main>
    </div>
  )
}
