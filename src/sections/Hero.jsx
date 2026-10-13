import { motion } from 'motion/react'
import { ArrowDown, ArrowUpRight } from 'lucide-react'
import HeroScene from '../three/HeroScene.jsx'

export default function Hero() {
  return (
    <section className="hero section-shell" id="home">
      <div className="hero-copy">
        <motion.p className="eyebrow" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          SOFTWARE DEVELOPER <span>·</span> GRAPHIC DESIGNER
        </motion.p>
        <motion.h1 initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, delay: 0.1 }}>
          Ideas into<br /><span>digital experiences.</span>
        </motion.h1>
        <motion.p className="hero-description" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.25 }}>
          I’m Mwayi — a Computer Science student creating useful software and thoughtful visual identities through code, design and experimentation.
        </motion.p>
        <motion.div className="hero-actions" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <a className="button button--primary" href="#selected-work">Explore my work <ArrowUpRight size={17} /></a>
          <a className="button button--secondary" href="/cv.pdf" target="_blank" rel="noreferrer">View CV <ArrowUpRight size={17} /></a>
        </motion.div>
        <div className="hero-meta"><span>BASED IN MALAWI</span><span>BUILDING WITH INTENTION</span></div>
      </div>
      <HeroScene />
      <a className="scroll-cue" href="#about"><span className="scroll-cue__icon"><ArrowDown size={15} /></span> Scroll to explore</a>
      <div className="hero-index">PORTFOLIO / 2026</div>
    </section>
  )
}