import { useEffect, useState, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'
import CountUp from '../components/CountUp'
import './CareersPage.css'

const OPENINGS = [
  {
    id: 'rd-associate',
    title: 'Research Associate — R&D',
    department: 'Research & Development',
    location: 'Mumbai, MH',
    type: 'Full-time',
    experience: '2–4 Years',
    education: 'M.Pharm / M.Sc in Organic Chemistry',
    desc: 'Develop new formulations, perform stability testing, and optimize active pharmaceutical ingredients (APIs).',
    responsibilities: [
      'Conduct formulation development trials for solid oral dosages.',
      'Document and maintain lab notebooks with complete traceability.',
      'Collaborate with Analytical Development (ADL) to review test results.',
      'Ensure compliance with GMP guidelines and safety standards in the lab.'
    ]
  },
  {
    id: 'qc-executive',
    title: 'Quality Control Executive',
    department: 'Quality Assurance & Control',
    location: 'Mumbai, MH',
    type: 'Full-time',
    experience: '3–5 Years',
    education: 'B.Pharm / M.Sc in Chemistry',
    desc: 'Conduct analysis of raw materials, packaging materials, in-process samples, and finished products.',
    responsibilities: [
      'Perform HPLC, UV-Vis, and dissolution testing of drug samples.',
      'Review raw data and analytical reports for regulatory compliance.',
      'Investigate Out of Specification (OOS) and Out of Trend (OOT) results.',
      'Maintain and calibrate QC laboratory instruments.'
    ]
  },
  {
    id: 'med-rep',
    title: 'Medical Representative',
    department: 'Sales & Marketing',
    location: 'Pune / Mumbai, MH',
    type: 'Full-time',
    experience: '1–3 Years',
    education: 'B.Sc / B.Pharm / D.Pharm',
    desc: 'Build relationships with healthcare professionals, promote the SSV product portfolio, and achieve sales targets.',
    responsibilities: [
      'Conduct regular doctor visits and product presentations.',
      'Organize medical conferences and roundtable meetings.',
      'Collect feedback from clinicians and report market intelligence.',
      'Achieve monthly and quarterly territory sales targets.'
    ]
  }
]

const CareersPage = () => {
  const location = useLocation()
  const [heroVisible, setHeroVisible] = useState(false)
  const [expandedJob, setExpandedJob] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedJobTitle, setSelectedJobTitle] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const [formName, setFormName] = useState('')
  const [formEmail, setFormEmail] = useState('')
  const [formPhone, setFormPhone] = useState('')
  const [formResume, setFormResume] = useState('')

  const [benefitsRef, benefitsVisible] = useIntersectionObserver()
  const [openingsRef, openingsVisible] = useIntersectionObserver()

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
            <span className="cp-hero__label">Join Our Team</span>
            <h1 className="cp-hero__title">Careers</h1>
            <p className="cp-hero__sub">
              Build a meaningful career advancing science and improving lives. We are always looking for passionate, driven, and talented professionals.
            </p>
            <div className="cp-hero__buttons">
              <a href="#openings-section" onClick={(e) => {
                e.preventDefault()
                document.getElementById('openings-section')?.scrollIntoView({ behavior: 'smooth' })
              }} className="btn btn-primary">
                View Openings
              </a>
              <a href="#benefits-section" onClick={(e) => {
                e.preventDefault()
                document.getElementById('benefits-section')?.scrollIntoView({ behavior: 'smooth' })
              }} className="btn btn-outline">
                Why SSV?
              </a>
            </div>
          </div>
        </div>

        <div className={`cp-hero__stats ${heroVisible ? 'cp-hero__stats--visible' : ''}`}>
          <div className="cp-hero__stats-inner container">
            <div className="cp-hero__stat" style={{ animationDelay: '0.6s' }}>
              <span className="cp-hero__stat-number">
                <CountUp end="500" suffix="+" />
              </span>
              <span className="cp-hero__stat-label">Professionals</span>
            </div>
            <div className="cp-hero__stat" style={{ animationDelay: '0.75s' }}>
              <span className="cp-hero__stat-number">
                <CountUp end="38" suffix="+" />
              </span>
              <span className="cp-hero__stat-label">Years of Trust</span>
            </div>
            <div className="cp-hero__stat" style={{ animationDelay: '0.9s' }}>
              <span className="cp-hero__stat-number">WHO-GMP</span>
              <span className="cp-hero__stat-label">Compliant Labs</span>
            </div>
            <div className="cp-hero__stat" style={{ animationDelay: '1.05s' }}>
              <span className="cp-hero__stat-number">
                <CountUp end="12" suffix="+" />
              </span>
              <span className="cp-hero__stat-label">Export Markets</span>
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

      {/* ── Benefits Section ── */}
      <section className={`cp-section cp-benefits scroll-reveal ${benefitsVisible ? 'scroll-reveal--visible' : ''}`} id="benefits-section" ref={benefitsRef}>
        <div className="container">
          <div className="cp-section-header">
            <span className="section-label">Why SSV</span>
            <h2 className="section-title">Work Environment</h2>
          </div>

          <div className="cp-benefits__grid">
            <div className="cp-benefit-card">
              <div className="cp-benefit-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>
              </div>
              <h4>Competitive Compensation</h4>
              <p>Industry-standard salaries, health benefits, and performance incentives.</p>
            </div>
            <div className="cp-benefit-card">
              <div className="cp-benefit-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14 9 11"/></svg>
              </div>
              <h4>Quality-Driven Culture</h4>
              <p>Work under WHO-GMP compliance guidelines with advanced scientific methodologies.</p>
            </div>
            <div className="cp-benefit-card">
              <div className="cp-benefit-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>
              </div>
              <h4>Professional Growth</h4>
              <p>Continuous learning programs, mentorships, and structured career paths.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Openings Section ── */}
      <section className={`cp-section cp-openings scroll-reveal ${openingsVisible ? 'scroll-reveal--visible' : ''}`} id="openings-section" ref={openingsRef}>
        <div className="container">
          <div className="cp-section-header">
            <span className="section-label">Opportunities</span>
            <h2 className="section-title">Current Openings</h2>
          </div>

          <div className="cp-list">
            {OPENINGS.map((job) => (
              <div 
                key={job.id} 
                className={`cp-item ${expandedJob === job.id ? 'cp-item--open' : ''}`}
              >
                <button 
                  className="cp-item-trigger"
                  onClick={() => setExpandedJob(expandedJob === job.id ? null : job.id)}
                >
                  <div className="cp-item-header-text">
                    <span className="cp-item-dept">{job.department}</span>
                    <h4>{job.title}</h4>
                  </div>
                  <div className="cp-item-meta">
                    <span>{job.location}</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="cp-item-chevron">
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </div>
                </button>

                {expandedJob === job.id && (
                  <div className="cp-item-details">
                    <p className="cp-job-desc">{job.desc}</p>
                    
                    <div className="cp-job-specs">
                      <div><strong>Education:</strong> {job.education}</div>
                      <div><strong>Experience Required:</strong> {job.experience}</div>
                      <div><strong>Employment Type:</strong> {job.type}</div>
                    </div>

                    <div className="cp-job-responsibilities">
                      <h5>Key Responsibilities:</h5>
                      <ul>
                        {job.responsibilities.map((resp, i) => (
                          <li key={i}>{resp}</li>
                        ))}
                      </ul>
                    </div>

                    <button 
                      className="btn btn-dark cp-apply-btn"
                      onClick={() => handleApplyClick(job.title)}
                    >
                      Apply Now
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal Application Form */}
      {modalOpen && (
        <div className="cp-modal">
          <div className="cp-modal__backdrop" onClick={() => setModalOpen(false)}></div>
          <div className="cp-modal__content">
            <button className="cp-modal__close" onClick={() => setModalOpen(false)}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>

            {!submitted ? (
              <form className="cp-modal__form" onSubmit={handleFormSubmit}>
                <h3>Apply for Position</h3>
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
