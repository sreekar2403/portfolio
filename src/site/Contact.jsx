import { useState } from 'react'
import { Send } from 'lucide-react'
import { PERSONAL } from '../data/constants'
import { ST_HERO } from './data'
import { Reveal } from './primitives'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', service: 'MLOps Pipeline', message: '' })
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value })

  const submit = (e) => {
    e.preventDefault()
    const subject = encodeURIComponent(`Website enquiry from ${form.name || 'a visitor'}: ${form.service}`)
    const body = encodeURIComponent(`${form.message}\n\nFrom: ${form.name} (${form.email})`)
    window.location.href = `mailto:${PERSONAL.email}?subject=${subject}&body=${body}`
  }

  return (
    <section className="st-wrap py-20 md:py-28" id="contact">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <Reveal>
          <div className="st-photo-card aspect-[4/5]" style={{ maxWidth: 400 }}>
            <img src={ST_HERO.photo} alt={ST_HERO.photoAlt} loading="lazy" />
          </div>
          <p className="mt-4 text-lg">Tell me what you&rsquo;re building.</p>
        </Reveal>
        <div>
          <Reveal>
            <h2 className="st-display st-h2">Let&rsquo;s work together</h2>
            <p className="st-lede mt-4">
              ML roles, local models, evals, or production reliability. Email is best, and I reply within a couple of
              days.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <form onSubmit={submit} className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="st-field">
                <label htmlFor="st-name">Name</label>
                <input id="st-name" value={form.name} onChange={set('name')} placeholder="John Smith" required />
              </div>
              <div className="st-field">
                <label htmlFor="st-email">Email</label>
                <input
                  id="st-email"
                  type="email"
                  value={form.email}
                  onChange={set('email')}
                  placeholder="johnsmith@gmail.com"
                  required
                />
              </div>
              <div className="st-field sm:col-span-2">
                <label htmlFor="st-service">Service Needed</label>
                <select id="st-service" value={form.service} onChange={set('service')}>
                  <option>MLOps Pipeline</option>
                  <option>LLM Fine-tuning</option>
                  <option>ML Consultation</option>
                  <option>Just saying hello</option>
                </select>
              </div>
              <div className="st-field sm:col-span-2">
                <label htmlFor="st-message">What can I help with</label>
                <textarea
                  id="st-message"
                  rows={4}
                  value={form.message}
                  onChange={set('message')}
                  placeholder="Hello, I would like to enquire about..."
                  required
                />
              </div>
              <div className="sm:col-span-2">
                <button type="submit" className="st-btn">
                  Submit <Send size={16} />
                </button>
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
