import { useEffect, useRef, useState } from 'react'
import './Careers.css'

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

const Careers = () => {
  const [visible, setVisible] = useState(false)
  const [expandedJob, setExpandedJob] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedJobTitle, setSelectedJobTitle] = useState('')
  const [submitted, setSubmitted] = useState(false)
  
  const [formName, setFormName] = useState('')
  const [formEmail, setFormEmail] = useState('')
  const [formPhone, setFormPhone] = useState('')
  const [formResume, setFormResume] = useState('')

  const sectionRef = useRef()

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.15 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const handleApplyClick = (jobTitle) => {
    setSelectedJobTitle(jobTitle)
    setModalOpen(true)
    setSubmitted(false)
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    // Simulated API call
    setTimeout(() => {
      setSubmitted(true)
      // Reset form
      setFormName('')
      setFormEmail('')
      setFormPhone('')
      setFormResume('')
    }, 400)
  }

  return (
    <section className="careers" id="careers" ref={sectionRef}>
      <div className={`careers__inner container scroll-reveal ${visible ? 'scroll-reveal--visible' : ''}`}>
        
        {/* Header */}
        <div className="careers__header">
          <span className="section-label">Join Our Team</span>
          <h2 className="section-title">Careers at <span>SSV</span></h2>
          <p className="careers__subtitle">
            At SSV Pharmaceuticals, we believe that healthcare advances when scientists, researchers, and professionals work together in an environment of excellence, integrity, and innovation.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="careers__benefits">
          <div className="careers__benefit-card">
            <div className="careers__benefit-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>
            </div>
            <h4>Competitive Compensation</h4>
            <p>Industry-standard salaries, health benefits, and performance incentives.</p>
          </div>
          <div className="careers__benefit-card">
            <div className="careers__benefit-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14 9 11"/></svg>
            </div>
            <h4>Quality-Driven Culture</h4>
            <p>Work under WHO-GMP compliance guidelines with advanced scientific methodologies.</p>
          </div>
          <div className="careers__benefit-card">
            <div className="careers__benefit-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>
            </div>
            <h4>Professional Growth</h4>
            <p>Continuous learning programs, mentorships, and structured career paths.</p>
          </div>
        </div>

        {/* Openings Section */}
        <div className="careers__openings">
          <h3 className="careers__openings-title">Current Openings</h3>
          
          <div className="careers__list">
            {OPENINGS.map((job) => (
              <div 
                key={job.id} 
                className={`careers__item ${expandedJob === job.id ? 'careers__item--open' : ''}`}
              >
                <button 
                  className="careers__item-trigger"
                  onClick={() => setExpandedJob(expandedJob === job.id ? null : job.id)}
                >
                  <div className="careers__item-header-text">
                    <span className="careers__item-dept">{job.department}</span>
                    <h4>{job.title}</h4>
                  </div>
                  <div className="careers__item-meta">
                    <span>{job.location}</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="careers__item-chevron">
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </div>
                </button>

                {expandedJob === job.id && (
                  <div className="careers__item-details">
                    <p className="careers__job-desc">{job.desc}</p>
                    
                    <div className="careers__job-specs">
                      <div><strong>Education:</strong> {job.education}</div>
                      <div><strong>Experience Required:</strong> {job.experience}</div>
                      <div><strong>Employment Type:</strong> {job.type}</div>
                    </div>

                    <div className="careers__job-responsibilities">
                      <h5>Key Responsibilities:</h5>
                      <ul>
                        {job.responsibilities.map((resp, i) => (
                          <li key={i}>{resp}</li>
                        ))}
                      </ul>
                    </div>

                    <button 
                      className="btn btn-dark careers__apply-btn"
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

      </div>

      {/* Modal Application Form */}
      {modalOpen && (
        <div className="careers-modal">
          <div className="careers-modal__backdrop" onClick={() => setModalOpen(false)}></div>
          <div className="careers-modal__content">
            <button className="careers-modal__close" onClick={() => setModalOpen(false)}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>

            {!submitted ? (
              <form className="careers-modal__form" onSubmit={handleFormSubmit}>
                <h3>Apply for Position</h3>
                <span className="careers-modal__job-badge">{selectedJobTitle}</span>
                
                <div className="careers-modal__form-group">
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

                <div className="careers-modal__form-group">
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

                <div className="careers-modal__form-group">
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

                <div className="careers-modal__form-group">
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

                <button type="submit" className="btn btn-dark careers-modal__submit-btn">
                  Submit Application
                </button>
              </form>
            ) : (
              <div className="careers-modal__success">
                <div className="careers-modal__success-icon">
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
    </section>
  )
}

export default Careers
