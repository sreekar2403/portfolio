import { CONTACT } from '../../data/content.human'

export default function MinimalContact() {
  return (
    <>
      <section className="minimal-wrap minimal-contact" id="contact" aria-labelledby="contact-title">
        <div>
          <h2 id="contact-title">{CONTACT.headline}</h2>
          <p className="minimal-bio">{CONTACT.body}</p>
        </div>
        <div className="minimal-contact-links">
          <a href={`mailto:${CONTACT.email}`}>
            {CONTACT.email} <span aria-hidden="true">↗</span>
          </a>
          <a href={CONTACT.linkedin} target="_blank" rel="noreferrer">
            Connect on LinkedIn <span aria-hidden="true">↗</span>
          </a>
          <a href={CONTACT.github} target="_blank" rel="noreferrer">
            GitHub <span aria-hidden="true">↗</span>
          </a>
        </div>
      </section>
      <footer className="minimal-wrap minimal-footer">
        <span>© {new Date().getFullYear()} PVSM Sreekar</span>
        <span>Chennai, India</span>
      </footer>
    </>
  )
}
