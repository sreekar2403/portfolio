import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function CustomCursor() {
  const cursorRef = useRef(null)

  useEffect(() => {
    const cursor = cursorRef.current
    if (!cursor) return
    if (window.innerWidth <= 1024) return

    const mousePos = { x: 0, y: 0 }
    const cursorPos = { x: 0, y: 0 }
    let hovering = false

    const onMouseMove = (e) => {
      mousePos.x = e.clientX
      mousePos.y = e.clientY
    }

    const onMouseDown = () => cursor.classList.add('cursor-active')
    const onMouseUp = () => cursor.classList.remove('cursor-active')

    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mousedown', onMouseDown)
    document.addEventListener('mouseup', onMouseUp)

    // Smooth follow loop
    const loop = () => {
      if (!hovering) {
        const delay = 6
        cursorPos.x += (mousePos.x - cursorPos.x) / delay
        cursorPos.y += (mousePos.y - cursorPos.y) / delay
        gsap.set(cursor, { x: cursorPos.x, y: cursorPos.y })
      }
      requestAnimationFrame(loop)
    }
    requestAnimationFrame(loop)

    // Hover detection for links and buttons
    const setupHoverListeners = () => {
      const hoverElements = document.querySelectorAll('a, button, [data-cursor="hover"]')
      hoverElements.forEach((el) => {
        el.addEventListener('mouseenter', () => {
          cursor.classList.add('cursor-hover')
          hovering = false
        })
        el.addEventListener('mouseleave', () => {
          cursor.classList.remove('cursor-hover')
          hovering = false
        })
      })
    }

    // Wait a bit for DOM to be ready
    const timer = setTimeout(setupHoverListeners, 1000)

    // Re-setup on mutations
    const observer = new MutationObserver(() => {
      setupHoverListeners()
    })
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mousedown', onMouseDown)
      document.removeEventListener('mouseup', onMouseUp)
      clearTimeout(timer)
      observer.disconnect()
    }
  }, [])

  return <div className="custom-cursor" ref={cursorRef} />
}
