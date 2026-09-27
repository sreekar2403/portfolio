import { EXPERIENCE } from '../../data/content.human'

export default function MinimalExperience() {
  return (
    <section className="minimal-wrap minimal-section" id="experience" aria-labelledby="experience-title">
      <div className="minimal-section-head" id="about">
        <h2 id="experience-title">From prototypes to production.</h2>
        <p>Selected experience</p>
      </div>
      <div className="minimal-role-grid">
        {EXPERIENCE.map((r) => (
          <a className="minimal-role" href="#experience" key={r.role}>
            <span className="minimal-role-period">{r.period}</span>
            <h3>{r.company}</h3>
            <p>
              <strong>{r.role}.</strong> {r.summary}
            </p>
            <span className="minimal-role-link">
              {r.linkLabel} <span aria-hidden="true">↗</span>
            </span>
          </a>
        ))}
      </div>
    </section>
  )
}
