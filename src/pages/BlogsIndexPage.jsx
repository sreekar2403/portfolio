import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import '../portavia/portavia.css'
import Navbar from '../portavia/Navbar'
import Footer from '../portavia/Footer'
import { Reveal } from '../portavia/primitives'
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
      categories: Array.from(item.getElementsByTagName('category')).map((cat) => cat.textContent),
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
        } catch {
          // fall through
        }
      }
      if (!cancelled) setLoading(false)
    }
    fetchPosts()
    return () => {
      cancelled = true
    }
  }, [])

  const allPosts = [
    ...LOCAL_BLOG_POSTS.map((p) => ({ ...p, type: 'local' })),
    ...mediumPosts.map((p) => ({ ...p, type: 'medium' })),
  ].sort((a, b) => {
    const dateA = a.type === 'local' ? a.date : a.pubDate
    const dateB = b.type === 'local' ? b.date : b.pubDate
    return new Date(dateB) - new Date(dateA)
  })

  return (
    <div className="pv-page">
      <Navbar />
      <main className="pv-wrap pt-32 md:pt-40 pb-10">
        <Reveal>
          <p className="text-sm font-semibold" style={{ color: '#5E67E6' }}>
            <Link to="/" style={{ color: 'inherit' }}>
              Back to home
            </Link>
          </p>
          <h1 className="pv-display pv-h2 mt-3">Writing on local AI</h1>
          <p className="pv-lede mt-4">
            I run open models on a laptop GPU and write down what actually happens, speeds, failures, and the prompts
            in between. No benchmarks for their own sake.
          </p>
        </Reveal>

        {loading ? (
          <p className="pv-lede" style={{ padding: '3rem 0' }}>
            Gathering articles...
          </p>
        ) : allPosts.length === 0 ? (
          <p className="pv-lede" style={{ padding: '3rem 0' }}>
            No articles published yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-10">
            {allPosts.map((post, i) =>
              post.type === 'local' ? (
                <Reveal key={post.id} delay={0.06 * (i % 2)} className="h-full">
                  <Link to={`/blog/${post.id}`} className="pv-card block no-underline" style={{ color: 'inherit' }}>
                    {post.coverImage ? (
                      <div className="overflow-hidden" style={{ borderRadius: 16 }}>
                        <img
                          src={post.coverImage}
                          alt=""
                          loading="lazy"
                          className="w-full aspect-[16/9] object-cover"
                        />
                      </div>
                    ) : null}
                    <p className="text-xs font-mono uppercase tracking-widest mt-5" style={{ color: '#5E67E6' }}>
                      {post.category} · {post.date} · {post.readTime}
                    </p>
                    <h2 className="pv-display mt-2" style={{ fontSize: '1.6rem' }}>
                      {post.title}
                    </h2>
                    <p className="mt-3 text-[0.95rem] leading-relaxed" style={{ color: '#5b5b5b' }}>
                      {post.subtitle}
                    </p>
                    <span className="inline-flex items-center gap-1 mt-4 text-sm font-semibold">
                      Read article <ArrowUpRight size={15} />
                    </span>
                  </Link>
                </Reveal>
              ) : (
                <Reveal key={post.guid} delay={0.06 * (i % 2)} className="h-full">
                  <a
                    href={post.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pv-card block no-underline"
                    style={{ color: 'inherit' }}
                  >
                    <p className="text-xs font-mono uppercase tracking-widest mt-1" style={{ color: '#5E67E6' }}>
                      Medium · {formatDate(post.pubDate)}
                    </p>
                    <h2 className="pv-display mt-2" style={{ fontSize: '1.6rem' }}>
                      {post.title}
                    </h2>
                    <span className="inline-flex items-center gap-1 mt-4 text-sm font-semibold">
                      Read on Medium <ArrowUpRight size={15} />
                    </span>
                  </a>
                </Reveal>
              )
            )}
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}
