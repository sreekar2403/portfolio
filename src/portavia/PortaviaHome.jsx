import './portavia.css'
import Navbar from './Navbar'
import Hero from './Hero'
import Services from './Services'
import About from './About'
import Projects from './Projects'
import Testimonials from './Testimonials'
import Faq from './Faq'
import Insights from './Insights'
import Contact from './Contact'
import Footer from './Footer'

export default function PortaviaHome() {
  return (
    <div className="pv-page">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <About />
        <Projects />
        <Testimonials />
        <Faq />
        <Insights />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
