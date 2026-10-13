import { ArrowDownToLine, ArrowUpRight, FileText } from 'lucide-react'
import AnimatedButton from '../components/AnimatedButton.jsx'

export default function Resume() {
  return (
    <section className="section section-shell resume-section" id="resume">
      <div className="section-heading">
        <p className="eyebrow">05 / THE CV</p>
        <h2>A little more<br /><span>about my journey.</span></h2>
      </div>
      <div className="resume-layout">
        <div className="resume-copy">
          <p className="lead">Want the full picture?</p>
          <p>My CV includes my education, skills, experience and selected work. Open it in your browser or download a copy for later.</p>
          <div className="resume-actions">
            <AnimatedButton href="/cv.pdf" icon="up">View CV in browser</AnimatedButton>
            <AnimatedButton href="/cv.pdf" variant="secondary" download icon="down">Download PDF</AnimatedButton>
          </div>
          <p className="small-note">Add your actual PDF to <code>public/cv.pdf</code> before publishing.</p>
        </div>
        <div className="resume-card-wrap">
          <div className="resume-card glass-panel">
            <div className="resume-card__top"><span>MN.</span><span>CURRICULUM VITAE / 2026</span></div>
            <div className="resume-card__main"><FileText size={48} strokeWidth={1} /><p>MY PROFESSIONAL<br />JOURNEY</p><span>SOFTWARE · DESIGN · IDEAS</span></div>
            <div className="resume-card__bottom"><span>Mwayi Njiragoma</span><ArrowDownToLine size={18} /></div>
          </div>
        </div>
      </div>
    </section>
  )
}