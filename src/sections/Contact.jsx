import { useState } from 'react'
import { ArrowUpRight, Mail, Linkedin, Github } from 'lucide-react'
import GlassCard from '../components/GlassCard.jsx'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('')
  const emailAddress = 'your.email@example.com' // Replace with your preferred public email.

  function handleSubmit(event) {
    event.preventDefault()
    const subject = encodeURIComponent(`Portfolio enquiry from ${form.name}`)
    const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`)
    window.location.href = `mailto:${emailAddress}?subject=${subject}&body=${body}`
    setStatus('Your email app should open with the message prepared. Configure a form service later if you want in-page delivery.')
  }

  return (
    <section className="section section-shell contact-section" id="contact">
      <div className="section-heading">
        <p className="eyebrow">06 / GET IN TOUCH</p>
        <h2>Have something<br /><span>in mind?</span></h2>
        <p className="section-intro">Have a project, an opportunity, or just want to connect? Send a message.</p>
      </div>
      <div className="contact-layout">
        <GlassCard className="contact-card">
          <p className="eyebrow">SEND A MESSAGE</p>
          <form onSubmit={handleSubmit}>
            <label>Your name<input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Jane Smith" /></label>
            <label>Email address<input required type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="jane@example.com" /></label>
            <label>What would you like to discuss?<textarea required rows="4" value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} placeholder="Tell me a little about it..." /></label>
            <button className="button button--primary" type="submit">Prepare email <ArrowUpRight size={17} /></button>
            {status && <p className="form-status" role="status">{status}</p>}
          </form>
        </GlassCard>
        <div className="contact-side">
          <p className="lead">Let’s make something meaningful.</p>
          <p>I'm interested in thoughtful collaborations across software, design and digital products.</p>
          <a className="contact-email" href={`mailto:${emailAddress}`}><Mail size={18} /> {emailAddress} <ArrowUpRight size={16} /></a>
          <div className="social-links">
            <a href="https://github.com/" target="_blank" rel="noreferrer" aria-label="GitHub"><Github /></a>
            <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin /></a>
          </div>
          <p className="small-note">Replace the email and social links with your real contact details before publishing.</p>
        </div>
      </div>
    </section>
  )
}