import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowUpRight } from 'lucide-react'
import { codingProjects } from '../data/projects.js'

gsap.registerPlugin(ScrollTrigger)

export default function HorizontalProjects() {
  const sectionRef = useRef(null)
  const trackRef = useRef(null)

  useLayoutEffect(() => {
    const section = sectionRef.current
    const track = trackRef.current
    if (!section || !track || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      const getDistance = () => Math.max(0, track.scrollWidth - section.clientWidth)
      gsap.to(track, {
        x: () => -getDistance(),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'bottom bottom',
          end: () => `+=${getDistance()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      })
    }, section)

    const refresh = () => ScrollTrigger.refresh()
    window.addEventListener('load', refresh)
    return () => {
      window.removeEventListener('load', refresh)
      ctx.revert()
    }
  }, [])

  return (
    <section className="horizontal-section" id="selected-work" ref={sectionRef}>
      <div className="horizontal-intro">
        <p className="eyebrow">02 / SELECTED WORK</p>
        <h2>Made with purpose.<br /><span>Built to be useful.</span></h2>
        <p>A few projects across development, product thinking and digital experiences.</p>
        <span className="horizontal-hint">SCROLL TO EXPLORE <span>↔</span></span>
      </div>
      <div className="horizontal-track" ref={trackRef}>
        {codingProjects.filter(project => project.featured).map((project, index) => (
          <article className="horizontal-project glass-panel" key={project.id}>
            <div className={`project-art project-art--${index + 1}`}>
              <img src={project.image} alt={`${project.title} preview`} loading="lazy" />
              <span className="project-art__index">0{index + 1} / FEATURED</span>
              <span className="project-art__caption">SELECTED PROJECT</span>
            </div>
            <div className="horizontal-project__body">
              <p className="eyebrow">{project.category}</p>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="tag-list">{project.technologies.map(tag => <span key={tag}>{tag}</span>)}</div>
              <a
                className="text-link"
                href={project.liveUrl || project.sourceUrl || '#development'}
                target={project.liveUrl || project.sourceUrl ? '_blank' : undefined}
                rel={project.liveUrl || project.sourceUrl ? 'noreferrer' : undefined}
              >
                Explore project <ArrowUpRight size={16} />
              </a>
            </div>
          </article>
        ))}
        <div className="horizontal-end-card">
          <p className="eyebrow">MORE IN THE WORKS</p>
          <h3>Good work<br />keeps evolving.</h3>
          <a className="button button--secondary" href="#contact">Start a conversation <ArrowUpRight size={16} /></a>
        </div>
      </div>
    </section>
  )
}