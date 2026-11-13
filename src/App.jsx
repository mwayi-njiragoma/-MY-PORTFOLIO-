import { lazy, Suspense } from 'react'
import Navbar from './components/Navbar.jsx'
import WaterCursor from './components/WaterCursor.jsx'
import WaterMotion from './components/WaterMotion.jsx'
import Hero from './sections/Hero.jsx'
import About from './sections/About.jsx'
import HorizontalProjects from './sections/HorizontalProjects.jsx'
import CodingProjects from './sections/CodingProjects.jsx'
import GraphicDesign from './sections/GraphicDesign.jsx'
import Resume from './sections/Resume.jsx'
import Contact from './sections/Contact.jsx'

const ScrollingCsScene = lazy(() => import('./three/ScrollingCsScene.jsx'))

export default function App() {
  return (
    <>
      <div className="ambient ambient--one" />
      <div className="ambient ambient--two" />
      <Suspense fallback={null}>
        <ScrollingCsScene />
      </Suspense>
      <WaterCursor />
      <WaterMotion />
      <Navbar />
      <main>
        <Hero />
        <About />
        <HorizontalProjects />
        <CodingProjects />
        <GraphicDesign />
        <Resume />
        <Contact />
      </main>
      <footer className="site-footer section-shell">
        <a className="brand" href="#home">MN<span>.</span></a>
        <p>Designed with intention. Built with curiosity.</p>
        <span>© {new Date().getFullYear()} Mwayi Njiragoma</span>
      </footer>
    </>
  )
}