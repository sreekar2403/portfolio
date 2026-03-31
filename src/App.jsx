import { useState } from 'react'
import './App.css'
import LoadingScreen from './components/LoadingScreen'
import CustomCursor from './components/CustomCursor'
import Navbar from './components/Navbar'
import SocialIcons from './components/SocialIcons'
import HeroSection from './components/HeroSection'
import AboutSection from './components/AboutSection'
import WhatIDoSection from './components/WhatIDoSection'
import CareerSection from './components/CareerSection'
import WorkSection from './components/WorkSection'
import ContactSection from './components/ContactSection'

export default function App() {
  const [loaded, setLoaded] = useState(false)

  return (
    <div className="relative">
      {/* Loading Screen */}
      <LoadingScreen onComplete={() => setLoaded(true)} />

      {/* Custom Cursor (desktop only) */}
      <CustomCursor />

      {/* Noise overlay for premium texture */}
      <div className="noise-overlay" aria-hidden="true" />

      {/* Navigation */}
      <Navbar />

      {/* Social Sidebar */}
      <SocialIcons />

      {/* Main Content */}
      <main style={{ opacity: loaded ? 1 : 0, transition: 'opacity 0.8s ease' }}>
        <HeroSection isLoaded={loaded} />
        <AboutSection />
        <WhatIDoSection />
        <CareerSection />
        <WorkSection />
        <ContactSection />
      </main>
    </div>
  )
}
