import { useState } from 'react'
import { X, ArrowUpRight } from 'lucide-react'
import { designProjects } from '../data/projects.js'

const categories = ['All', ...new Set(designProjects.map(project => project.category))]

export default function GraphicDesign() {
  const [filter, setFilter] = useState('All')
  const [selected, setSelected] = useState(null)
  const visible = designProjects.filter(project => filter === 'All' || project.category === filter)

  return (
    <section className="section section-shell" id="design">
      <div className="section-heading section-heading--row">
        <div><p className="eyebrow">04 / VISUAL DESIGN</p><h2>Visuals with<br /><span>a point of view.</span></h2></div>
        <p className="section-aside">Brand identities, campaigns and visual experiments.</p>
      </div>
      <div className="filter-row">
        {categories.map(category => <button type="button" key={category} className={filter === category ? 'filter-chip is-selected' : 'filter-chip'} onClick={() => setFilter(category)}>{category}</button>)}
      </div>
      <div className="design-grid">
        {visible.map((project, index) => (
          <button className={`design-tile design-tile--${index % 4 + 1}`} type="button" key={project.id} onClick={() => setSelected(project)}>
            <img className="design-tile__image" src={project.image} alt={`${project.title} preview`} loading="lazy" />
            <span className="design-tile__number">0{index + 1}</span>
            <span className="design-tile__caption"><span><strong>{project.title}</strong><small>{project.category}</small></span><ArrowUpRight size={19} /></span>
          </button>
        ))}
      </div>
      {selected && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-labelledby="lightbox-title" onClick={() => setSelected(null)}>
          <div className="lightbox__panel glass-panel" onClick={event => event.stopPropagation()}>
            <button className="lightbox__close" type="button" onClick={() => setSelected(null)} aria-label="Close preview"><X /></button>
            <p className="eyebrow">{selected.category}</p>
            <h3 id="lightbox-title">{selected.title}</h3>
            <div className="lightbox__art">
              <img src={selected.image} alt={`${selected.title} preview`} />
            </div>
            <p>{selected.description}</p>
          </div>
        </div>
      )}
    </section>
  )
}