import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import '../minimal.css'
import MinimalNav from '../components/minimal/MinimalNav'
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
    <div className="minimal-page">
      <MinimalNav />
      <main className="minimal-wrap">
        <div className="minimal-blog-head">
          <Link to="/" className="minimal-back">
            ← Back to home
          </Link>
          <h1>Writing on local AI.</h1>
          <p className="minimal-blog-lede">
            I run open models on a laptop GPU and write down what actually happens, speeds, failures,
            and the prompts in between. No benchmarks for their own sake.
          </p>
        </div>

        {loading ? (
          <p className="minimal-blog-lede" style={{ padding: '3rem 0' }}>
            Gathering articles…
          </p>
        ) : allPosts.length === 0 ? (
          <p className="minimal-blog-lede" style={{ padding: '3rem 0' }}>
            No articles published yet.
          </p>
        ) : (
          <ul className="minimal-post-list">
            {allPosts.map((post) =>
              post.type === 'local' ? (
                <li key={post.id}>
                  <Link to={`/blog/${post.id}`} className="minimal-post-row">
                    <div className="minimal-post-top">
                      <span className="minimal-post-date">
                        {post.date} · {post.readTime}
                      </span>
                    </div>
                    <h2 className="minimal-post-title">{post.title}</h2>
                    <p className="minimal-post-sub">{post.subtitle}</p>
                    {post.tags?.length > 0 && (
                      <div className="minimal-tags">
                        {post.tags.slice(0, 4).map((tag) => (
                          <span key={tag} className="minimal-tag">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </Link>
                </li>
              ) : (
                <li key={post.guid}>
                  <a href={post.link} target="_blank" rel="noopener noreferrer" className="minimal-post-row">
                    <div className="minimal-post-top">
                      <span className="minimal-post-date">{formatDate(post.pubDate)} · Medium ↗</span>
                    </div>
                    <h2 className="minimal-post-title">{post.title}</h2>
                    {post.categories?.length > 0 && (
                      <div className="minimal-tags">
                        {post.categories.slice(0, 4).map((cat) => (
                          <span key={cat} className="minimal-tag">
                            {cat}
                          </span>
                        ))}
                      </div>
                    )}
                  </a>
                </li>
              )
            )}
          </ul>
        )}

        <footer className="minimal-footer">
          <span>© {new Date().getFullYear()} PVSM Sreekar</span>
          <span>Chennai, India</span>
        </footer>
      </main>
    </div>
  )
}
