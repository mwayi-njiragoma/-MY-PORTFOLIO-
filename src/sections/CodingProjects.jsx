import { useState } from 'react'
import { ArrowUpRight, } from "lucide-react";
import { codingProjects } from '../data/projects.js'
import GlassCard from '../components/GlassCard.jsx'

const categories = ['All', ...new Set(codingProjects.map(project => project.category))]

export default function CodingProjects() {
  const [filter, setFilter] = useState('All')
  const visible = codingProjects.filter(project => filter === 'All' || project.category === filter)

  return (
    <section className="section section-shell" id="development">
      <div className="section-heading section-heading--row">
        <div><p className="eyebrow">03 / DEVELOPMENT</p><h2>Things I’ve been<br /><span>building.</span></h2></div>
        <p className="section-aside">Applications, experiments and systems designed to solve real problems.</p>
      </div>
      <div className="filter-row" aria-label="Filter coding projects">
        {categories.map(category => <button type="button" key={category} className={filter === category ? 'filter-chip is-selected' : 'filter-chip'} onClick={() => setFilter(category)}>{category}</button>)}
      </div>
      <div className="project-grid">
        {visible.map(project => (
          <GlassCard className="project-card" key={project.id}>
            <div className="project-card__visual">
              <div className="project-card__placeholder"><span>{project.title.split(' ').map(word => word[0]).slice(0, 3).join('')}</span></div>
              <span className="project-category">{project.category}</span>
            </div>
            <div className="project-card__body">
              <div className="project-card__title"><h3>{project.title}</h3><ArrowUpRight size={18} /></div>
              <p>{project.description}</p>
              <div className="tag-list">{project.technologies.map(tag => <span key={tag}>{tag}</span>)}</div>
              <div className="project-links">
                {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noreferrer">Live demo <ArrowUpRight size={14} /></a>}
                {project.sourceUrl && <a href={project.sourceUrl} target="_blank" rel="noreferrer"><span>GitHub</span> Source code</a>}
                {!project.liveUrl && !project.sourceUrl && <span className="project-link-placeholder">Add demo / repository links</span>}
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </section>
  )
}