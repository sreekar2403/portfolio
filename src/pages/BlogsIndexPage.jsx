import { Link } from 'react-router-dom'
import { HiArrowLeft, HiArrowUpRight } from 'react-icons/hi2'
import { LOCAL_BLOG_POSTS } from '../data/localBlogs'

export default function BlogsIndexPage() {
  const posts = [...LOCAL_BLOG_POSTS].sort((a, b) => new Date(b.date) - new Date(a.date))

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
        {posts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-slate-500">No articles published yet.</p>
          </div>
        ) : (
          <div className="blog-grid grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {posts.map((post) => (
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
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
