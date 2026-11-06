import { useState } from 'react'
import { useJob } from './JobContext'

/* A construction zone. While the swarm builds, a structural gray skeleton
   (bars mirroring the real layout) shimmers inside a dashed wireframe with a
   mono label. Real content fades in when the build completes. If the swarm
   is inactive (reduced motion, no WebGL) the registry's deferred fallback
   reveals the content instead. */

function SkeletonBars({ kind }) {
  if (kind === 'rule') {
    return (
      <>
        <i className="bf-bar" style={{ width: '26%', height: 12 }} />
        <i className="bf-bar bf-bar-line" />
      </>
    )
  }
  if (kind === 'ticks') {
    return (
      <>
        <i className="bf-bar" style={{ width: '38%', height: 12 }} />
        <i className="bf-bar" style={{ width: '56%', height: 12 }} />
        <i className="bf-bar" style={{ width: '44%', height: 12 }} />
      </>
    )
  }
  if (kind === 'caret') {
    return (
      <>
        <i className="bf-bar" style={{ width: '92%', height: 12 }} />
        <i className="bf-bar" style={{ width: '68%', height: 12 }} />
      </>
    )
  }
  // frame / default — headline, paragraph lines, action pill
  return (
    <>
      <i className="bf-bar bf-bar-title" style={{ width: '64%' }} />
      <i className="bf-bar" />
      <i className="bf-bar" style={{ width: '88%' }} />
      <i className="bf-bar" style={{ width: '60%' }} />
      <i className="bf-bar bf-bar-pill" style={{ width: 132 }} />
    </>
  )
}

export function BuildFrame({
  as,
  kind = 'frame',
  label = 'constructing',
  enabled = true,
  wire = true,
  skeleton = true,
  className = '',
  contentClassName = '',
  style,
  children,
  ...rest
}) {
  const Tag = as || 'div'
  const { elRef, built } = useJob({ kind, enabled })
  return (
    <Tag
      ref={elRef}
      className={`bf ${className}`}
      data-built={built ? 'true' : 'false'}
      style={style}
      {...rest}
    >
      {enabled && wire ? <span className="bf-wire" data-label={label} aria-hidden="true" /> : null}
      {enabled && skeleton ? (
        <span className="bf-skel" aria-hidden="true">
          <SkeletonBars kind={kind} />
        </span>
      ) : null}
      <div className={`bf-content ${contentClassName}`}>{children}</div>
    </Tag>
  )
}

/* Images are decoupled from the frame build: text never waits on a photo.
   The wireframe still traces the box when the swarm visits, but the picture
   renders on its own — shimmer until the bytes land, then a soft fade. */
export function ImageFrame({
  src,
  alt = '',
  kind = 'frame',
  label = 'fetching',
  className = '',
  imgClassName = '',
  enabled = true,
  eager = false,
  ...rest
}) {
  const { elRef, built } = useJob({ kind, enabled })
  return (
    <div
      ref={elRef}
      className={`bf ${className}`}
      data-built={built ? 'true' : 'false'}
      {...rest}
    >
      {enabled ? <span className="bf-wire" data-label={label} aria-hidden="true" /> : null}
      <div className={`st-img-wrap ${imgClassName}`}>
        <FrameImage src={src} alt={alt} eager={eager} />
      </div>
    </div>
  )
}

function FrameImage({ src, alt, eager }) {
  const [loaded, setLoaded] = useState(false)
  const [failed, setFailed] = useState(false)
  return (
    <div className="st-img-frame">
      {!loaded && !failed ? <div className="sk st-img-shimmer" /> : null}
      {failed ? (
        <div className="st-img-failed">
          <span className="st-mono">image unavailable</span>
        </div>
      ) : null}
      <img
        src={src}
        alt={alt}
        loading={eager ? 'eager' : 'lazy'}
        fetchPriority={eager ? 'high' : 'auto'}
        decoding="async"
        onLoad={() => setLoaded(true)}
        onError={() => setFailed(true)}
        className="st-img"
        style={{ opacity: loaded ? 1 : 0 }}
      />
    </div>
  )
}
