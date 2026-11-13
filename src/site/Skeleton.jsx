/* Loading skeletons. Used while the Medium feed resolves; the agent swarm
   covers construction on the main sections. */

export function SkeletonBlock({ w = '100%', h = 12, radius = 4 }) {
  return <div className="sk" style={{ width: w, height: h, borderRadius: radius }} />
}

export function SkeletonText({ lines = 3 }) {
  const widths = ['100%', '92%', '76%', '64%', '88%']
  return (
    <div>
      {Array.from({ length: lines }).map((_, i) => (
        <div key={i} className="sk sk-line" style={{ width: widths[i % widths.length] }} />
      ))}
    </div>
  )
}

export function SkeletonCard() {
  return (
    <div className="st-card" style={{ borderRadius: 'var(--st-r-card)' }}>
      <div className="sk" style={{ aspectRatio: '16 / 9', borderRadius: 8 }} />
      <div style={{ marginTop: 20 }}>
        <SkeletonBlock w="30%" h={10} />
      </div>
      <div style={{ marginTop: 12 }}>
        <SkeletonBlock w="80%" h={16} radius={5} />
      </div>
      <div style={{ marginTop: 12 }}>
        <SkeletonText lines={2} />
      </div>
    </div>
  )
}
