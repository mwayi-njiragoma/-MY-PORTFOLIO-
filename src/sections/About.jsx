import { motion } from 'motion/react'
import { Code2, PenTool, Layers3 } from 'lucide-react'
import GlassCard from '../components/GlassCard.jsx'

const capabilities = [
  { icon: Code2, title: 'Software development', text: 'Building useful, maintainable applications and responsive web experiences.' },
  { icon: PenTool, title: 'Graphic design', text: 'Creating visual identities, promotional materials and clear visual communication.' },
  { icon: Layers3, title: 'Product thinking', text: 'Bringing structure, usability and thoughtful detail together in digital products.' },
]

export default function About() {
  return (
    <section className="section section-shell" id="about">
      <div className="section-heading">
        <p className="eyebrow">01 / A LITTLE ABOUT ME</p>
        <h2>Technical thinking.<br /><span>Creative perspective.</span></h2>
      </div>
      <div className="about-layout">
        <div className="about-copy">
          <p className="lead">I work at the intersection of logic and visual expression.</p>
          <p>I’m a Computer Science student interested in building digital tools that solve practical problems. Alongside development, graphic design lets me explore how a product communicates before someone even uses it.</p>
          <p>This portfolio brings those two sides together: the systems I build, the visuals I create, and the process behind each project.</p>
          <a className="text-link" href="#contact">Let’s work together <span>↗</span></a>
        </div>
        <div className="capability-list">
          {capabilities.map((item, index) => {
            const Icon = item.icon
            return (
              <motion.div key={item.title} initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ delay: index * 0.12 }}>
                <GlassCard className="capability-card">
                  <span className="capability-icon"><Icon size={21} /></span>
                  <div><h3>{item.title}</h3><p>{item.text}</p></div>
                  <span className="capability-number">0{index + 1}</span>
                </GlassCard>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}