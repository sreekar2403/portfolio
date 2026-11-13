import { PERSONAL } from '../data/constants'
import { ST_SOCIALS } from './data'

export default function Footer() {
  return (
    <footer className="st-footer">
      <div className="st-wrap" style={{ paddingTop: 64, paddingBottom: 32 }}>
        <p className="st-readout" style={{ marginBottom: 24 }}>
          <b>08</b>
          <span>Say hello</span>
        </p>

        <a href={`mailto:${PERSONAL.email}`} className="st-footer-mail">
          {PERSONAL.email}
        </a>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8" style={{ marginTop: 48 }}>
          <div>
            <p className="st-footer-label">Currently</p>
            <p>
              {PERSONAL.role}, {PERSONAL.company}
            </p>
            <p style={{ color: 'var(--st-ink-3)' }}>Bengaluru, India</p>
          </div>
          <div>
            <p className="st-footer-label">Elsewhere</p>
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {ST_SOCIALS.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noreferrer">
                  {s.label}
                </a>
              ))}
            </div>
          </div>
          <div>
            <p className="st-footer-label">Résumé</p>
            <a href={PERSONAL.resumeUrl} target="_blank" rel="noreferrer">
              Download PDF
            </a>
          </div>
        </div>

        <div className="st-footer-bottom">
          <span>© {new Date().getFullYear()} PVSM Sreekar. All rights reserved.</span>
          <span className="st-mono">constructed by ten agents</span>
        </div>
      </div>
    </footer>
  )
}
