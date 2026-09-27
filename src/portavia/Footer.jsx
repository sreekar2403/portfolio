import { PERSONAL } from '../data/constants'
import { PV_SOCIALS } from './data'
import { Reveal } from './primitives'

export default function Footer() {
  return (
    <footer className="pv-footer mt-10">
      <div className="pv-wrap py-14">
        <Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div>
              <p className="pv-footer-label">Email</p>
              <a href={`mailto:${PERSONAL.email}`} className="hover:underline break-all">
                {PERSONAL.email}
              </a>
            </div>
            <div>
              <p className="pv-footer-label">Currently</p>
              <p>
                {PERSONAL.role}, {PERSONAL.company}
              </p>
              <p style={{ color: 'rgba(255,255,255,0.55)' }}>Bengaluru, India</p>
            </div>
            <div>
              <p className="pv-footer-label">Social</p>
              <div className="flex flex-wrap gap-x-6 gap-y-2">
                {PV_SOCIALS.map((s) => (
                  <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="hover:underline">
                    {s.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
        <div
          className="mt-12 pt-6 text-sm"
          style={{ borderTop: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.55)' }}
        >
          <span>© {new Date().getFullYear()} PVSM Sreekar. All rights reserved.</span>
        </div>
      </div>
    </footer>
  )
}
