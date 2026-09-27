import { PERSONAL, NAV_LINKS } from '../../data/constants'

const LINKS = NAV_LINKS.filter((l) =>
  ['#about', '#experience', '#work', '#blogs', '#contact'].includes(l.href)
)

export default function MinimalNav() {
  return (
    <header className="minimal-nav">
      <div className="minimal-wrap minimal-nav-inner">
        <a className="minimal-brand" href="#top">
          {PERSONAL.firstName}
        </a>
        <nav className="minimal-links" aria-label="Primary">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href}>
              {l.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  )
}
