import { useLayoutEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import SiteHome from './site/SiteHome'
import BlogPostPage from './pages/BlogPostPage'
import BlogsIndexPage from './pages/BlogsIndexPage'
import { JobProvider } from './site/build/JobProvider'

if (typeof history !== 'undefined' && 'scrollRestoration' in history) {
  history.scrollRestoration = 'manual'
}

function ScrollToTop() {
  const { pathname, hash } = useLocation()
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    const raf = requestAnimationFrame(() => window.scrollTo({ top: 0, left: 0, behavior: 'instant' }))
    return () => cancelAnimationFrame(raf)
  }, [pathname, hash])
  return null
}

export default function App() {
  return (
    <BrowserRouter basename="/portfolio">
      <ScrollToTop />
      <JobProvider>
        <SiteRoutes />
      </JobProvider>
    </BrowserRouter>
  )
}

function SiteRoutes() {
  const location = useLocation()
  return (
    <Routes location={location} key={location.pathname}>
      <Route path="/" element={<SiteHome />} />
      <Route path="/blogs" element={<BlogsIndexPage />} />
      <Route path="/blog/:slug" element={<BlogPostPage />} />
    </Routes>
  )
}
