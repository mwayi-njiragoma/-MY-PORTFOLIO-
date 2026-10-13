import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'

const links = [
  ['About', '#about'],
  ['Selected work', '#selected-work'],
  ['Development', '#development'],
  ['Design', '#design'],
  ['CV', '#resume'],
  ['Contact', '#contact'],
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [active, setActive] = useState('#home')

  useEffect(() => {
    const sections = document.querySelectorAll('main section[id]')
    const observer = new IntersectionObserver(
      entries => entries.forEach(entry => {
        if (entry.isIntersecting) setActive(`#${entry.target.id}`)
      }),
      { rootMargin: '-35% 0px -55% 0px' },
    )
    sections.forEach(section => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  return (
    <header className="site-header">
      <nav className="navbar glass-panel" aria-label="Main navigation">
        <a className="brand" href="#home" aria-label="MN home">MN<span>.</span></a>
        <div className={`nav-links ${menuOpen ? 'nav-links--open' : ''}`}>
          {links.map(([label, href]) => (
            <a
              key={href}
              href={href}
              className={active === href ? 'nav-link is-active' : 'nav-link'}
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </a>
          ))}
        </div>
        <a className="nav-availability" href="#contact"><span /> Available for opportunities</a>
        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(value => !value)}
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
      </nav>
    </header>
  )
}