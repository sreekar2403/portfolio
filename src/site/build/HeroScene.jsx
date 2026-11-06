import { useEffect, useRef } from 'react'
import * as THREE from 'three'

/* Proposal: one quiet three.js moment in the hero — a slow wireframe
   icosahedron with a counter-rotating octahedron core, royal blue/teal on a
   transparent canvas behind the copy. Pointer parallax, pauses off-screen,
   static frame under reduced motion. Delete this component to ship without
   three.js — the square-box loaders are independent. */

const ACCENT = 0x2748c8
const TEAL = 0x0f766e

export default function HeroScene() {
  const mountRef = useRef(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let renderer
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'low-power' })
    } catch {
      return
    }
    if (!renderer.getContext()) return
    renderer.setPixelRatio(Math.min(1.75, window.devicePixelRatio || 1))
    renderer.setClearColor(0x000000, 0)
    const canvas = renderer.domElement
    canvas.setAttribute('aria-hidden', 'true')
    canvas.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;pointer-events:none'
    mount.appendChild(canvas)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 50)
    camera.position.set(0, 0, 6.5)

    const group = new THREE.Group()
    scene.add(group)

    const outer = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.55, 1),
      new THREE.MeshBasicMaterial({ color: ACCENT, wireframe: true, transparent: true, opacity: 0.3 })
    )
    const inner = new THREE.Mesh(
      new THREE.OctahedronGeometry(0.85, 0),
      new THREE.MeshBasicMaterial({ color: TEAL, wireframe: true, transparent: true, opacity: 0.55 })
    )
    group.add(outer, inner)
    group.position.set(0.6, 0.15, 0)

    // Soft node dust around the wireforms.
    const dustGeo = new THREE.BufferGeometry()
    const N = 90
    const dust = new Float32Array(N * 3)
    for (let i = 0; i < N; i++) {
      const r = 2.2 + Math.random() * 1.6
      const th = Math.random() * Math.PI * 2
      const ph = Math.acos(2 * Math.random() - 1)
      dust[i * 3] = r * Math.sin(ph) * Math.cos(th)
      dust[i * 3 + 1] = r * Math.cos(ph) * 0.7
      dust[i * 3 + 2] = r * Math.sin(ph) * Math.sin(th) - 0.6
    }
    dustGeo.setAttribute('position', new THREE.BufferAttribute(dust, 3))
    const dustPts = new THREE.Points(
      dustGeo,
      new THREE.PointsMaterial({ color: ACCENT, size: 0.035, transparent: true, opacity: 0.4, sizeAttenuation: true })
    )
    group.add(dustPts)

    let visible = true
    let pointer = { x: 0, y: 0 }
    let raf = 0
    let running = !reduce

    const resize = () => {
      const r = mount.getBoundingClientRect()
      const w = Math.max(1, r.width)
      const h = Math.max(1, r.height)
      renderer.setSize(w, h, false)
      camera.aspect = w / h
      camera.updateProjectionMatrix()
    }
    resize()
    window.addEventListener('resize', resize)

    const io = new IntersectionObserver(
      (entries) => {
        visible = entries[0]?.isIntersecting ?? false
        if (visible && reduce) {
          // Single static frame for reduced motion.
          renderer.render(scene, camera)
        }
      },
      { threshold: 0 }
    )
    io.observe(mount)

    const onPointer = (e) => {
      const r = mount.getBoundingClientRect()
      pointer.x = ((e.clientX - r.left) / r.width - 0.5) * 2
      pointer.y = ((e.clientY - r.top) / r.height - 0.5) * 2
    }
    window.addEventListener('pointermove', onPointer, { passive: true })

    const tick = (now) => {
      raf = requestAnimationFrame(tick)
      if (!visible) return
      const t = now / 1000
      outer.rotation.y = t * 0.14
      outer.rotation.x = Math.sin(t * 0.1) * 0.18
      inner.rotation.y = -t * 0.22
      inner.rotation.z = t * 0.07
      dustPts.rotation.y = t * 0.03
      group.position.y = 0.15 + Math.sin(t * 0.5) * 0.08
      group.rotation.y += (pointer.x * 0.35 - group.rotation.y) * 0.04
      group.rotation.x += (pointer.y * 0.22 - group.rotation.x) * 0.04
      renderer.render(scene, camera)
    }
    if (running) raf = requestAnimationFrame(tick)
    else renderer.render(scene, camera)

    return () => {
      cancelAnimationFrame(raf)
      running = false
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onPointer)
      io.disconnect()
      scene.traverse((obj) => {
        if (obj.geometry) obj.geometry.dispose()
        if (obj.material) {
          if (Array.isArray(obj.material)) obj.material.forEach((m) => m.dispose())
          else obj.material.dispose()
        }
      })
      renderer.dispose()
      if (canvas.parentNode) canvas.parentNode.removeChild(canvas)
    }
  }, [])

  return <div ref={mountRef} className="st-hero-scene" aria-hidden="true" />
}
