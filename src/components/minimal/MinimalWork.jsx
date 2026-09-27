import { Link } from 'react-router-dom'
import { FEATURED, SECONDARY_WORK } from '../../data/content.human'

export default function MinimalWork() {
  return (
    <section className="minimal-wrap minimal-section" id="work" aria-labelledby="work-title">
      <div className="minimal-section-head">
        <h2 id="work-title">Built, explained, shared.</h2>
        <p>A closer look at my work</p>
      </div>

      <article className="minimal-feature" aria-labelledby="featured-title">
        <div>
          <p className="minimal-meta">{FEATURED.meta}</p>
          <h3 id="featured-title">
            {FEATURED.title}
            <br />
            {FEATURED.name} in focus.
          </h3>
          <p>{FEATURED.body}</p>
          <p>{FEATURED.detail}</p>
          <p>
            <a className="minimal-text-link" href={FEATURED.link.href} target="_blank" rel="noreferrer">
              {FEATURED.link.label} <span aria-hidden="true">↗</span>
            </a>
          </p>
        </div>
        {FEATURED.image ? (
          <figure className="minimal-project-image">
            <img src={FEATURED.image} alt={`${FEATURED.name} screenshot`} loading="lazy" />
            <figcaption>{FEATURED.caption}</figcaption>
          </figure>
        ) : null}
      </article>

      <div className="minimal-writing-grid" id="blogs">
        {SECONDARY_WORK.map((w) => (
          <div className="minimal-card" key={w.title}>
            <p className="minimal-meta">{w.meta}</p>
            <h3>{w.title}</h3>
            <p>{w.body}</p>
            {w.link.href.startsWith('/portfolio/blog') ? (
              <p>
                <Link className="minimal-text-link" to={w.link.href.replace('/portfolio', '')}>
                  {w.link.label} <span aria-hidden="true">↗</span>
                </Link>
              </p>
            ) : (
              <p>
                <a className="minimal-text-link" href={w.link.href} target="_blank" rel="noreferrer">
                  {w.link.label} <span aria-hidden="true">↗</span>
                </a>
              </p>
            )}
          </div>
        ))}
      </div>

      <div className="minimal-more">
        <p>
          I also write about running local models on a laptop GPU.
        </p>
        <Link className="minimal-text-link" to="/blogs">
          All technical writing <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </section>
  )
}
