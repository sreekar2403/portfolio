import { useCallback, useState } from 'react'
import { Plus } from 'lucide-react'
import { ST_SERVICES } from './data'
import { SectionHead } from './primitives'
import { BuildFrame } from './build/BuildFrame'

function Item({ index, title, points, open, onToggle }) {
  const pointsFn = useCallback(
    (el) =>
      Array.from(el ? el.querySelectorAll('li[data-point]') : []).map((node) => {
        const r = node.getBoundingClientRect()
        return [r.left + 14, r.top + r.height / 2]
      }),
    []
  )

  return (
    <div className={`st-acc-item${open ? ' open' : ''}`} onClick={onToggle}>
      <div className="st-acc-head">
        <span className="st-acc-num">{String(index + 1).padStart(2, '0')}</span>
        <span className="st-acc-title">{title}</span>
        <span className="st-acc-icon" aria-hidden="true">
          <Plus size={16} />
        </span>
      </div>
      <div className="st-acc-body">
        <div className="st-acc-body-inner">
          {open && (
            <BuildFrame kind="ticks" wire={false} getPoints={pointsFn}>
              <ul className="st-acc-points">
                {points.map((p) => (
                  <li key={p} data-point="">
                    {p}
                  </li>
                ))}
              </ul>
            </BuildFrame>
          )}
        </div>
      </div>
    </div>
  )
}

export default function Services() {
  return (
    <section className="st-section" id="services">
      <div className="st-wrap">
        <SectionHead
          index="01"
          kicker="Services"
          title="Mostly unglamorous work, done well"
          lede="Production ML means good data, honest evals, and systems that stay up. This is where I help."
        />
        <div>
          <Accordion />
        </div>
      </div>
    </section>
  )
}

function Accordion() {
  const [open, setOpen] = useState(-1)
  return (
    <>
      {ST_SERVICES.map((s, i) => (
        <Item
          key={s.title}
          index={i}
          title={s.title}
          points={s.points}
          open={open === i}
          onToggle={() => setOpen(open === i ? -1 : i)}
        />
      ))}
    </>
  )
}
