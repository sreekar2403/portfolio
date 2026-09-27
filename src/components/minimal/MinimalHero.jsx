import { HUMAN } from '../../data/content.human'

export default function MinimalHero() {
  return (
    <section className="minimal-wrap minimal-hero" id="top" aria-labelledby="home-title">
      <div>
        <p className="minimal-eyebrow">{HUMAN.eyebrow}</p>
        <h1 className="minimal-h1" id="home-title">
          ML systems,
          <br />
          built for production.
        </h1>
        <div className="minimal-acts">
          <a className="minimal-btn" href={HUMAN.primaryCta.href}>
            {HUMAN.primaryCta.label} <span aria-hidden="true">↗</span>
          </a>
          <a className="minimal-text-link" href={HUMAN.secondaryCta.href}>
            {HUMAN.secondaryCta.label} <span aria-hidden="true">↓</span>
          </a>
        </div>
      </div>
      <div>
        <p className="minimal-lede">{HUMAN.intro} {HUMAN.lede}</p>
        <p className="minimal-bio">{HUMAN.bio}</p>
        <a className="minimal-person" href="#about">
          <img src={HUMAN.photo} alt={HUMAN.photoAlt} width="144" height="144" loading="eager" />
          <span>
            PVSM Sreekar
            <small>
              {HUMAN.location} · More about me ↗
            </small>
          </span>
        </a>
      </div>
    </section>
  )
}
