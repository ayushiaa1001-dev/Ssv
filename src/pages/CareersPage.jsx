import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'
import './CareersPage.css'

const OPENINGS = [
  {
    id: 'formulation-scientist',
    title: 'Senior Formulation Scientist',
    location: 'Mumbai (HQ)',
    posted: 'Jun 2, 2026',
  },
  {
    id: 'regulatory-manager',
    title: 'Regulatory Affairs Manager',
    location: 'Hyderabad',
    posted: 'Jun 5, 2026',
  },
  {
    id: 'clinical-analyst',
    title: 'Clinical Data Analyst',
    location: 'Bangalore',
    posted: 'Jun 8, 2026',
  },
  {
    id: 'qa-officer',
    title: 'Quality Assurance Officer',
    location: 'Mumbai (HQ)',
    posted: 'Jun 10, 2026',
  },
  {
    id: 'med-rep',
    title: 'Medical Sales Representative',
    location: 'Pan India',
    posted: 'Jun 12, 2026',
  }
]

const CareersPage = () => {
  const location = useLocation()
  const [heroVisible, setHeroVisible] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedJobTitle, setSelectedJobTitle] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const [formName, setFormName] = useState('')
  const [formEmail, setFormEmail] = useState('')
  const [formPhone, setFormPhone] = useState('')
  const [formResume, setFormResume] = useState('')

  const [cultureRef, cultureVisible] = useIntersectionObserver()
  const [openingsRef, openingsVisible] = useIntersectionObserver()
  const [contactRef, contactVisible] = useIntersectionObserver()

  useEffect(() => {
    const timer = setTimeout(() => setHeroVisible(true), 200)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (location.state?.scrollTo) {
      const targetId = location.state.scrollTo
      window.history.replaceState({}, document.title)
      setTimeout(() => {
        document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    } else {
      window.scrollTo(0, 0)
    }
  }, [location])

  useEffect(() => {
    if (!modalOpen) return

    const handleEscape = (e) => {
      if (e.key === 'Escape') setModalOpen(false)
    }

    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', handleEscape)
    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', handleEscape)
    }
  }, [modalOpen])

  const handleApplyClick = (jobTitle) => {
    setSelectedJobTitle(jobTitle)
    setModalOpen(true)
    setSubmitted(false)
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    setTimeout(() => {
      setSubmitted(true)
      setFormName('')
      setFormEmail('')
      setFormPhone('')
      setFormResume('')
    }, 400)
  }

  return (
    <div className="careers-page">
      {/* ── Hero Banner ── */}
      <section className="cp-hero">
        <div className="cp-hero__bg">
          <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1600&auto=format&fit=crop&q=80" alt="SSV Careers Team" />
          <div className="cp-hero__overlay" />
        </div>
        
        <div className="cp-hero__content">
          <div className={`cp-hero__text scroll-reveal ${heroVisible ? 'scroll-reveal--visible' : ''}`}>
            <Link to="/" className="cp-back-btn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
              Back to Home
            </Link>
            <span className="cp-hero__label">JOIN OUR TEAM</span>
            <h1 className="cp-hero__title">Build a Career That Shapes Healthcare</h1>
            <p className="cp-hero__sub">
              At SSV Pharmaceuticals, every role contributes to something greater — better medicines, healthier lives, and a stronger healthcare ecosystem for India.
            </p>
            <div className="cp-hero__buttons">
              <a href="#openings-section" onClick={(e) => {
                e.preventDefault()
                document.getElementById('openings-section')?.scrollIntoView({ behavior: 'smooth' })
              }} className="btn btn-primary cp-btn-filled">
                View Openings
              </a>
              <a href="#contact-section" onClick={(e) => {
                e.preventDefault()
                document.getElementById('contact-section')?.scrollIntoView({ behavior: 'smooth' })
              }} className="btn btn-outline cp-btn-outline">
                Send Your CV
              </a>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="cp-hero__scroll">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </section>

      {/* ── Culture Section ── */}
      <section className={`cp-section cp-culture scroll-reveal ${cultureVisible ? 'scroll-reveal--visible' : ''}`} id="culture-section" ref={cultureRef}>
        <div className="container">
          <div className="cp-culture__layout">
            <div className="cp-culture__header">
              <span className="section-label">WHY WORK AT SSV?</span>
              <h2 className="section-title">A Culture of Excellence & Care</h2>
            </div>

            <div className="cp-culture__pillars">
              <div className="cp-pillar">
                <div className="cp-pillar__icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>
                </div>
                <div className="cp-pillar__content">
                  <h4>Innovative R&D Projects</h4>
                  <p>Work on cutting-edge pharmaceutical research that directly impacts patient lives across India and beyond.</p>
                </div>
              </div>
              
              <div className="cp-pillar">
                <div className="cp-pillar__icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17" /><polyline points="16 7 22 7 22 13" /></svg>
                </div>
                <div className="cp-pillar__content">
                  <h4>Professional Development & Growth</h4>
                  <p>Continuous learning paths, mentorship programmes, and clear career progression at every level.</p>
                </div>
              </div>

              <div className="cp-pillar">
                <div className="cp-pillar__icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>
                </div>
                <div className="cp-pillar__content">
                  <h4>Collaborative, Dynamic Environment</h4>
                  <p>Join a team of 500+ passionate professionals who thrive on teamwork, curiosity, and purpose.</p>
                </div>
              </div>

              <div className="cp-pillar">
                <div className="cp-pillar__icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
                </div>
                <div className="cp-pillar__content">
                  <h4>Comprehensive Benefits Package</h4>
                  <p>Competitive salaries, health cover, annual bonuses, and flexible leave policies designed for your wellbeing.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="cp-culture__image-container">
            <img className="cp-culture__image" src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&auto=format&fit=crop&q=80" alt="SSV Laboratory Professionals" />
            <div className="cp-culture__stats-card">
              <span className="cp-culture__stats-number">500+</span>
              <span className="cp-culture__stats-label">Team Members</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Openings Section ── */}
      <section className={`cp-section cp-openings scroll-reveal ${openingsVisible ? 'scroll-reveal--visible' : ''}`} id="openings-section" ref={openingsRef}>
        <div className="container">
          <div className="cp-section-header cp-openings-header">
            <span className="section-label">OPPORTUNITIES</span>
            <h2 className="section-title">Current Openings</h2>
          </div>

          <div className="cp-table-container">
            <table className="cp-jobs-table">
              <thead>
                <tr>
                  <th>JOB TITLE</th>
                  <th>LOCATION</th>
                  <th>POSTED</th>
                  <th>ACTION</th>
                </tr>
              </thead>
              <tbody>
                {OPENINGS.map((job) => (
                  <tr key={job.id}>
                    <td className="cp-job-title-col">
                      <h4>{job.title}</h4>
                    </td>
                    <td className="cp-job-loc-col">
                      <span>{job.location}</span>
                    </td>
                    <td className="cp-job-date-col">
                      <span>{job.posted}</span>
                    </td>
                    <td className="cp-job-action-col">
                      <button 
                        className="btn btn-dark cp-apply-btn-sm"
                        onClick={() => handleApplyClick(job.title)}
                      >
                        Apply Now
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── Ready to Join Us Section ── */}
      <section className={`cp-section cp-contact scroll-reveal ${contactVisible ? 'scroll-reveal--visible' : ''}`} id="contact-section" ref={contactRef}>
        <div className="container">
          <div className="cp-contact-card">
            <div className="cp-contact-icon-wrapper">
              <div className="cp-contact-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              </div>
            </div>
            <h2 className="cp-contact-title">Ready to Join Us?</h2>
            <p className="cp-contact-sub">To apply, please send your updated resume to:</p>
            <a href="mailto:ssvpharma@gmail.com" className="cp-contact-email">ssvpharma@gmail.com</a>
            <p className="cp-contact-footer">Please mention the job title in the subject line. · We respond within 5 business days.</p>
          </div>
        </div>
      </section>

      {/* Modal Application Form */}
      {modalOpen && (
        <div className="cp-modal" role="dialog" aria-modal="true" aria-labelledby="apply-modal-title">
          <div className="cp-modal__backdrop" onClick={() => setModalOpen(false)} aria-hidden="true"></div>
          <div className="cp-modal__content">
            <button className="cp-modal__close" onClick={() => setModalOpen(false)} aria-label="Close application form">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>

            {!submitted ? (
              <form className="cp-modal__form" onSubmit={handleFormSubmit}>
                <h3 id="apply-modal-title">Apply for Position</h3>
                <span className="cp-modal__job-badge">{selectedJobTitle}</span>
                
                <div className="cp-modal__form-group">
                  <label htmlFor="applicant-name">Full Name *</label>
                  <input 
                    id="applicant-name"
                    type="text" 
                    required 
                    placeholder="John Doe"
                    value={formName}
                    onChange={e => setFormName(e.target.value)}
                  />
                </div>

                <div className="cp-modal__form-group">
                  <label htmlFor="applicant-email">Email Address *</label>
                  <input 
                    id="applicant-email"
                    type="email" 
                    required 
                    placeholder="john@example.com"
                    value={formEmail}
                    onChange={e => setFormEmail(e.target.value)}
                  />
                </div>

                <div className="cp-modal__form-group">
                  <label htmlFor="applicant-phone">Phone Number *</label>
                  <input 
                    id="applicant-phone"
                    type="tel" 
                    required 
                    placeholder="+91 98765 43210"
                    value={formPhone}
                    onChange={e => setFormPhone(e.target.value)}
                  />
                </div>

                <div className="cp-modal__form-group">
                  <label htmlFor="applicant-resume">Resume URL (e.g. Google Drive / Dropbox link) *</label>
                  <input 
                    id="applicant-resume"
                    type="url" 
                    required 
                    placeholder="https://drive.google.com/..."
                    value={formResume}
                    onChange={e => setFormResume(e.target.value)}
                  />
                </div>

                <button type="submit" className="btn btn-dark cp-modal__submit-btn">
                  Submit Application
                </button>
              </form>
            ) : (
              <div className="cp-modal__success">
                <div className="cp-modal__success-icon">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                </div>
                <h3>Application Submitted!</h3>
                <p>Thank you for applying. Our HR team will review your details and resume, and get back to you shortly.</p>
                <button className="btn btn-dark" style={{ marginTop: '20px' }} onClick={() => setModalOpen(false)}>
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default CareersPage

