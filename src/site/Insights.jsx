import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { LOCAL_BLOG_POSTS } from '../data/localBlogs'
import { Reveal, SectionHead } from './primitives'

export default function Insights() {
  const posts = LOCAL_BLOG_POSTS.slice(0, 2)
  return (
    <section className="st-wrap py-20 md:py-28" id="insights">
      <SectionHead
        title="Insights and Ideas"
        lede="I run open models on a laptop GPU and write down what actually happens. Speeds, failures, and the prompts in between."
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-10">
        {posts.map((p, i) => (
          <Reveal key={p.id} delay={0.08 * i} className="h-full">
            <Link to={`/blog/${p.id}`} className="st-card block no-underline" style={{ color: 'inherit' }}>
              {p.coverImage ? (
                <div className="overflow-hidden" style={{ borderRadius: 16 }}>
                  <img src={p.coverImage} alt="" loading="lazy" className="w-full aspect-[16/9] object-cover" />
                </div>
              ) : null}
              <p className="text-xs font-mono uppercase tracking-widest mt-5" style={{ color: '#5E67E6' }}>
                {p.category} · {p.date}
              </p>
              <h3 className="st-display mt-2" style={{ fontSize: '1.6rem' }}>
                {p.title}
              </h3>
              <p className="mt-3 text-[0.95rem] leading-relaxed" style={{ color: '#5b5b5b' }}>
                {p.subtitle}
              </p>
            </Link>
          </Reveal>
        ))}
      </div>
      <Reveal delay={0.05} className="mt-10 text-center">
        <Link to="/blogs" className="st-btn">
          Browse All Insights <ArrowUpRight size={16} />
        </Link>
      </Reveal>
    </section>
  )
}
