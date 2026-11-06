import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { LOCAL_BLOG_POSTS } from '../data/localBlogs'
import { SectionHead } from './primitives'
import { BuildFrame, ImageFrame } from './build/BuildFrame'

export default function Insights() {
  const posts = LOCAL_BLOG_POSTS.slice(0, 2)
  return (
    <section className="st-section" id="insights">
      <div className="st-wrap">
        <SectionHead
          index="06"
          kicker="Field notes"
          title="What happens when open models run on a laptop GPU"
          lede="I run open models on real hardware and write down what actually happens. Speeds, failures, and the prompts in between."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {posts.map((p) => (
            <BuildFrame
              key={p.id}
              kind="frame"
              label="post"
              className="st-card"
              contentClassName="h-full"
              style={{ borderRadius: 'var(--st-r-card)' }}
            >
              <Link to={`/blog/${p.id}`} className="block h-full no-underline" style={{ color: 'inherit' }}>
                {p.coverImage ? (
                  <ImageFrame
                    src={p.coverImage}
                    alt=""
                    label="cover"
                    imgClassName="w-full"
                    style={{ aspectRatio: '16 / 9', borderRadius: 8 }}
                  />
                ) : null}
                <p className="st-mono" style={{ marginTop: 20, color: 'var(--st-accent)' }}>
                  {p.category} · {p.date}
                </p>
                <h3 className="st-h3" style={{ marginTop: 8 }}>
                  {p.title}
                </h3>
                <p className="st-body" style={{ marginTop: 8, fontSize: 14, lineHeight: 1.65 }}>
                  {p.subtitle}
                </p>
                <span className="inline-flex items-center gap-1" style={{ marginTop: 16, fontSize: 14, fontWeight: 500, color: 'var(--st-accent)' }}>
                  Read article <ArrowUpRight size={15} />
                </span>
              </Link>
            </BuildFrame>
          ))}
        </div>

        <div className="text-center" style={{ marginTop: 40 }}>
          <Link to="/blogs" className="st-btn-ghost" style={{ display: 'inline-flex' }}>
            Browse all field notes <ArrowUpRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  )
}
