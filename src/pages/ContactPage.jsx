import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import './ContactPage.css'

const ContactPage = () => {
  const [heroVisible, setHeroVisible] = useState(false)
  useDocumentTitle('Contact Us')
  const [submitted, setSubmitted] = useState(false)

  const [formName, setFormName] = useState('')
  const [formEmail, setFormEmail] = useState('')
  const [formPhone, setFormPhone] = useState('')
  const [formSubject, setFormSubject] = useState('')
  const [formMessage, setFormMessage] = useState('')

  const [formRef, formVisible] = useIntersectionObserver()
  const [infoRef, infoVisible] = useIntersectionObserver()

  useEffect(() => {
    const timer = setTimeout(() => setHeroVisible(true), 200)
    return () => clearTimeout(timer)
  }, [])

  const handleFormSubmit = (e) => {
    e.preventDefault()
    // NOTE: No backend is connected. Form data is shown in the console for debugging.
    // Replace this with an actual API call when a backend is available.
    console.warn('[Ssv Contact] Message submitted (no backend connected):', {
      name: formName,
      email: formEmail,
      phone: formPhone || undefined,
      subject: formSubject,
      message: formMessage,
    })
    setTimeout(() => {
      setSubmitted(true)
      setFormName('')
      setFormEmail('')
      setFormPhone('')
      setFormSubject('')
      setFormMessage('')
    }, 400)
  }

  const resetForm = () => {
    setSubmitted(false)
  }

  return (
    <div className="contact-page">
      {/* ── Hero Banner ── */}
      <section className="ct-hero">
        <div className="ct-hero__bg">
          <img
            src="https://images.unsplash.com/photo-1596524430615-b46475ddff6e?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Contact Ssv Pharmaceuticals"
            loading="lazy"
          />
          <div className="ct-hero__overlay"></div>
        </div>
        <div className="ct-hero__content">
          <div className={`ct-hero__text scroll-reveal ${heroVisible ? 'scroll-reveal--visible' : ''}`}>
            <Link to="/" className="ct-back-btn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
              Back to Home
            </Link>
            <span className="ct-hero__label">Get in Touch</span>
            <h1 className="ct-hero__title">Contact Us</h1>
            <p className="ct-hero__sub">
              Have a question, partnership inquiry, or need information about our products? We&apos;d love to hear from you. Our team is ready to assist.
            </p>
          </div>
        </div>
      </section>

      {/* ── Contact Form + Info Section ── */}
      <section className="ct-section">
        <div className="container">
          <div className="ct-layout">

            {/* Left — Form */}
            <div
              ref={formRef}
              className={`ct-form-card scroll-reveal ${formVisible ? 'scroll-reveal--visible' : ''}`}
            >
              {!submitted ? (
                <form className="ct-form" onSubmit={handleFormSubmit}>
                  <h2 className="ct-form__title">Send Us a Message</h2>
                  <p className="ct-form__sub">Fill out the form below and we&apos;ll get back to you within 24 hours.</p>

                  <div className="ct-form__row">
                    <div className="ct-form__group">
                      <label htmlFor="ct-name">Full Name *</label>
                      <input
                        id="ct-name"
                        type="text"
                        required
                        placeholder="John Doe"
                        value={formName}
                        onChange={e => setFormName(e.target.value)}
                      />
                    </div>
                    <div className="ct-form__group">
                      <label htmlFor="ct-email">Email Address *</label>
                      <input
                        id="ct-email"
                        type="email"
                        required
                        placeholder="john@example.com"
                        value={formEmail}
                        onChange={e => setFormEmail(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="ct-form__row">
                    <div className="ct-form__group">
                      <label htmlFor="ct-phone">Phone Number</label>
                      <input
                        id="ct-phone"
                        type="tel"
                        placeholder="+91 98765 43210"
                        value={formPhone}
                        onChange={e => setFormPhone(e.target.value)}
                      />
                    </div>
                    <div className="ct-form__group">
                      <label htmlFor="ct-subject">Subject *</label>
                      <select
                        id="ct-subject"
                        required
                        value={formSubject}
                        onChange={e => setFormSubject(e.target.value)}
                      >
                        <option value="">Select a subject</option>
                        <option value="general">General Inquiry</option>
                        <option value="products">Product Information</option>
                        <option value="partnership">Partnership / Distribution</option>
                        <option value="exports">Export Inquiry</option>
                        <option value="careers">Careers</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div className="ct-form__group">
                    <label htmlFor="ct-message">Message *</label>
                    <textarea
                      id="ct-message"
                      required
                      rows="5"
                      placeholder="Tell us how we can help you..."
                      value={formMessage}
                      onChange={e => setFormMessage(e.target.value)}
                    ></textarea>
                  </div>

                  <button type="submit" className="btn btn-dark ct-form__submit">
                    Send Message
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
                  </button>
                </form>
              ) : (
                <div className="ct-success">
                  <div className="ct-success__icon">
                    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  </div>
                  <h3>Message Sent!</h3>
                  <p>Thank you for reaching out. Our team will review your message and respond within 24 hours.</p>
                  <button className="btn btn-dark" onClick={resetForm} style={{ marginTop: '24px' }}>
                    Send Another Message
                  </button>
                </div>
              )}
            </div>

            {/* Right — Contact Info */}
            <div
              ref={infoRef}
              className={`ct-info scroll-reveal ${infoVisible ? 'scroll-reveal--visible' : ''}`}
            >
              <div className="ct-info__card">
                <div className="ct-info__icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                </div>
                <div>
                  <h4>Our Address</h4>
                  <p>Ssv Pharmaceuticals,<br/>Plot No. 2, 1st Floor,<br/>Malabar Colony,<br/>Hazari Pahad Road,<br/>Seminary Hills,<br/>Nagpur, 440006</p>
                </div>
              </div>

              <div className="ct-info__card">
                <div className="ct-info__icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg>
                </div>
                <h4>Phone</h4>
                <div className="ct-phone-pills">
                  <a href="tel:+919818977444" className="ct-phone-pill">
                    +91 98189 77444
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7"/><path d="M7 7h10v10"/></svg>
                  </a>
                  <a href="tel:+918920606892" className="ct-phone-pill">
                    +91 89206 06892
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7"/><path d="M7 7h10v10"/></svg>
                  </a>
                </div>
              </div>

              <div className="ct-info__card">
                <div className="ct-info__icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                </div>
                <h4>Email</h4>
                <div className="ct-phone-pills">
                  <a href="mailto:info@ssvpharma.com" className="ct-phone-pill">
                    info@ssvpharma.com
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7"/><path d="M7 7h10v10"/></svg>
                  </a>
                  <a href="mailto:hrssvpharma@gmail.com" className="ct-phone-pill">
                    hrssvpharma@gmail.com
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7"/><path d="M7 7h10v10"/></svg>
                  </a>
                </div>
              </div>

              <div className="ct-info__card">
                <div className="ct-info__icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                </div>
                <h4>Business Hours</h4>
                <p>Mon – Sat: 10:00 AM – 6:00 PM<br/>Sunday: Closed</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ContactPage
