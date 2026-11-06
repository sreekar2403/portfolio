import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import '../site/site.css'
import Navbar from '../site/Navbar'
import Footer from '../site/Footer'
import { BuildFrame, ImageFrame } from '../site/build/BuildFrame'
import { SkeletonCard } from '../site/Skeleton'
import { LOCAL_BLOG_POSTS } from '../data/localBlogs'

const MEDIUM_FEED_URL = 'https://medium.com/feed/@padarthi24sreekar2'
const RSS2JSON_URL = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(MEDIUM_FEED_URL)}`
const CORS_PROXY_URL = `https://api.allorigins.win/get?url=${encodeURIComponent(MEDIUM_FEED_URL)}&json`

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
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
    <div className="st-page st-route">
      <Navbar />
      <main className="st-wrap" style={{ paddingTop: 128, paddingBottom: 16 }}>
        <header style={{ marginBottom: 48 }}>
          <BuildFrame
            kind="rule"
            label="section 01"
            className="st-readout"
            contentClassName="flex items-center gap-3"
          >
            <b>01</b>
            <span>Writing</span>
          </BuildFrame>
          <h1 className="st-display" style={{ fontSize: 'clamp(2rem, 4.6vw, 3.25rem)', marginTop: 16 }}>
            Field notes on local models
          </h1>
          <p className="st-lede" style={{ marginTop: 12 }}>
            I run open models on a laptop GPU and write down what actually happens. Speeds, failures, and the prompts
            in between. No benchmarks for their own sake.
          </p>
          <p style={{ marginTop: 24 }}>
            <Link to="/" className="st-mono" style={{ textDecoration: 'none', color: 'var(--st-accent)' }}>
              Back to home
            </Link>
          </p>
        </header>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </div>
        ) : allPosts.length === 0 ? (
          <p className="st-lede" style={{ padding: '3rem 0' }}>
            No articles published yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {allPosts.map((post) =>
              post.type === 'local' ? (
                <BuildFrame
                  key={post.id}
                  kind="frame"
                  label="post"
                  className="st-card"
                  contentClassName="h-full"
                  style={{ borderRadius: 'var(--st-r-card)' }}
                >
                  <Link to={`/blog/${post.id}`} className="block h-full no-underline" style={{ color: 'inherit' }}>
                    {post.coverImage ? (
                      <ImageFrame
                        src={post.coverImage}
                        alt=""
                        label="cover"
                        imgClassName="w-full"
                        style={{ aspectRatio: '16 / 9', borderRadius: 8 }}
                      />
                    ) : null}
                    <p className="st-mono" style={{ marginTop: 20, color: 'var(--st-accent)' }}>
                      {post.category} · {post.date} · {post.readTime}
                    </p>
                    <h2 className="st-h3" style={{ marginTop: 8 }}>
                      {post.title}
                    </h2>
                    <p className="st-body" style={{ marginTop: 8, fontSize: 14, lineHeight: 1.65 }}>
                      {post.subtitle}
                    </p>
                    <span
                      className="inline-flex items-center gap-1"
                      style={{ marginTop: 16, fontSize: 14, fontWeight: 500, color: 'var(--st-accent)' }}
                    >
                      Read article <ArrowUpRight size={15} />
                    </span>
                  </Link>
                </BuildFrame>
              ) : (
                <BuildFrame
                  key={post.guid}
                  kind="frame"
                  label="post"
                  className="st-card"
                  contentClassName="h-full"
                  style={{ borderRadius: 'var(--st-r-card)' }}
                >
                  <a
                    href={post.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block h-full no-underline"
                    style={{ color: 'inherit' }}
                  >
                    <p className="st-mono" style={{ color: 'var(--st-accent)' }}>
                      Medium · {formatDate(post.pubDate)}
                    </p>
                    <h2 className="st-h3" style={{ marginTop: 8 }}>
                      {post.title}
                    </h2>
                    <span
                      className="inline-flex items-center gap-1"
                      style={{ marginTop: 16, fontSize: 14, fontWeight: 500, color: 'var(--st-accent)' }}
                    >
                      Read on Medium <ArrowUpRight size={15} />
                    </span>
                  </a>
                </BuildFrame>
              )
            )}
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}
