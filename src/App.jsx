import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import MinimalHome from './components/minimal/MinimalHome'
import BlogPostPage from './pages/BlogPostPage'
import BlogsIndexPage from './pages/BlogsIndexPage'

function HomePage() {
  return <MinimalHome />
}

export default function App() {
  return (
    <BrowserRouter basename="/portfolio">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/blogs" element={<BlogsIndexPage />} />
        <Route path="/blog/:slug" element={<BlogPostPage />} />
      </Routes>
    </BrowserRouter>
  )
}
