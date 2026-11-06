import { useState } from 'react'
import { Send } from 'lucide-react'
import { PERSONAL } from '../data/constants'
import { ST_HERO } from './data'
import { SectionHead } from './primitives'
import { BuildFrame, ImageFrame } from './build/BuildFrame'

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
    <section className="st-section" id="contact">
      <div className="st-wrap">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <div>
            <ImageFrame
              src={ST_HERO.photo}
              alt={ST_HERO.photoAlt}
              label="portrait"
              className="st-photo"
              imgClassName="h-full w-full"
              style={{ aspectRatio: '4 / 5', maxWidth: 360 }}
            />
            <p style={{ marginTop: 16, fontSize: 17, fontWeight: 500 }}>Tell me what you&rsquo;re building.</p>
            <p className="st-body" style={{ marginTop: 4, fontSize: 14 }}>
              ML roles, local models, evals, or production reliability. Email is best and I reply within a couple of days.
            </p>
          </div>

          <div>
            <SectionHead
              index="07"
              kicker="Contact"
              title="Let&rsquo;s work together"
            />

            <BuildFrame kind="frame" label="form" style={{ borderRadius: 'var(--st-r-card)' }}>
              <form onSubmit={submit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                  <label htmlFor="st-service">Service needed</label>
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
                    Send enquiry <Send size={16} />
                  </button>
                </div>
              </form>
            </BuildFrame>
          </div>
        </div>
      </div>
    </section>
  )
}
