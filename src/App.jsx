import { useLayoutEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import SiteHome from './site/SiteHome'
import BlogPostPage from './pages/BlogPostPage'
import BlogsIndexPage from './pages/BlogsIndexPage'

if (typeof history !== 'undefined' && 'scrollRestoration' in history) {
  history.scrollRestoration = 'manual'
}

function ScrollToTop() {
  const { pathname } = useLocation()
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    const raf = requestAnimationFrame(() => window.scrollTo({ top: 0, left: 0, behavior: 'instant' }))
    return () => cancelAnimationFrame(raf)
  }, [pathname])
  return null
}

export default function App() {
  return (
    <BrowserRouter basename="/portfolio">
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<SiteHome />} />
        <Route path="/blogs" element={<BlogsIndexPage />} />
        <Route path="/blog/:slug" element={<BlogPostPage />} />
      </Routes>
    </BrowserRouter>
  )
}
