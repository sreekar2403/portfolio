import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import PortaviaHome from './portavia/PortaviaHome'
import BlogPostPage from './pages/BlogPostPage'
import BlogsIndexPage from './pages/BlogsIndexPage'

export default function App() {
  return (
    <BrowserRouter basename="/portfolio">
      <Routes>
        <Route path="/" element={<PortaviaHome />} />
        <Route path="/blogs" element={<BlogsIndexPage />} />
        <Route path="/blog/:slug" element={<BlogPostPage />} />
      </Routes>
    </BrowserRouter>
  )
}
