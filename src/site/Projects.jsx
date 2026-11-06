import { ArrowUpRight } from 'lucide-react'
import { PROJECTS } from '../data/projects'
import { PERSONAL } from '../data/constants'
import { Reveal, SectionHead } from './primitives'
import { BuildFrame, ImageFrame } from './build/BuildFrame'

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })
}

function Card({ project, index }) {
  return (
    <div className="st-stack-card" style={{ top: 88 + index * 20 }}>
      <ImageFrame
        src={project.screenshot}
        alt={`${project.title} screenshot`}
        label={`cover · ${project.title.toLowerCase()}`}
        className="st-stack-media"
        imgClassName="h-full w-full"
      />
      <div className="st-stack-body">
        <BuildFrame kind="frame" label={`copy · ${project.title.toLowerCase()}`}>
          <span className="st-readout">
            <b>{String(index + 1).padStart(2, '0')}</b>
            <span>{project.subtitle}</span>
          </span>
          <h3 className="st-stack-title">{project.title}</h3>
          <p className="st-stack-desc">{project.description}</p>
          <dl className="st-spec">
            <div className="st-spec-row">
              <dt>Stack</dt>
              <dd>{project.tags.slice(0, 4).join(' · ')}</dd>
            </div>
            <div className="st-spec-row">
              <dt>Status</dt>
              <dd>{project.complexity}</dd>
            </div>
            <div className="st-spec-row">
              <dt>Updated</dt>
              <dd>{formatDate(project.completionDate)}</dd>
            </div>
          </dl>
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="st-btn st-btn-sm"
            style={{ alignSelf: 'flex-start', marginTop: 4 }}
          >
            View on GitHub <ArrowUpRight size={15} />
          </a>
        </BuildFrame>
      </div>
    </div>
  )
}

export default function Projects() {
  return (
    <section className="st-section" id="projects">
      <div className="st-wrap">
        <SectionHead
          index="03"
          kicker="Projects"
          title="Built for real users, on real hardware"
          lede="A few things I built and maintain. Each one runs for real users or on a real GPU, not just in a demo."
        />
        <div className="st-stack">
          {PROJECTS.map((p, i) => (
            <Reveal key={p.id} delay={i * 60}>
              <Card project={p} index={i} />
            </Reveal>
          ))}
        </div>
        <Reveal delay={60} className="text-center" >
          <a href={PERSONAL.github} target="_blank" rel="noreferrer" className="st-btn-ghost" style={{ marginTop: 40, display: 'inline-flex' }}>
            Browse all projects <ArrowUpRight size={15} />
          </a>
        </Reveal>
      </div>
    </section>
  )
}
