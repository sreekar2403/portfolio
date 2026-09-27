import { useState } from 'react'
import { Send } from 'lucide-react'
import { PERSONAL } from '../data/constants'
import { PV_HERO } from './data'
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
    <section className="pv-wrap py-20 md:py-28" id="contact">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <Reveal>
          <div className="pv-photo-card aspect-[4/5]" style={{ maxWidth: 400 }}>
            <img src={PV_HERO.photo} alt={PV_HERO.photoAlt} loading="lazy" />
          </div>
          <p className="mt-4 text-lg">Hi, I&rsquo;m Sreekar. Tell me what you&rsquo;re building.</p>
        </Reveal>
        <div>
          <Reveal>
            <h2 className="pv-display pv-h2">Let&rsquo;s work together</h2>
            <p className="pv-lede mt-4">
              ML roles, local models, evals, or production reliability. Email is best, and I reply within a couple of
              days.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <form onSubmit={submit} className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="pv-field">
                <label htmlFor="pv-name">Name</label>
                <input id="pv-name" value={form.name} onChange={set('name')} placeholder="John Smith" required />
              </div>
              <div className="pv-field">
                <label htmlFor="pv-email">Email</label>
                <input
                  id="pv-email"
                  type="email"
                  value={form.email}
                  onChange={set('email')}
                  placeholder="johnsmith@gmail.com"
                  required
                />
              </div>
              <div className="pv-field sm:col-span-2">
                <label htmlFor="pv-service">Service Needed</label>
                <select id="pv-service" value={form.service} onChange={set('service')}>
                  <option>MLOps Pipeline</option>
                  <option>LLM Fine-tuning</option>
                  <option>ML Consultation</option>
                  <option>Just saying hello</option>
                </select>
              </div>
              <div className="pv-field sm:col-span-2">
                <label htmlFor="pv-message">What can I help with</label>
                <textarea
                  id="pv-message"
                  rows={4}
                  value={form.message}
                  onChange={set('message')}
                  placeholder="Hello, I would like to enquire about..."
                  required
                />
              </div>
              <div className="sm:col-span-2">
                <button type="submit" className="pv-btn">
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
