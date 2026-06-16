import { Link, useNavigate } from 'react-router-dom'
import './Footer.css'

const Footer = () => {
  const navigate = useNavigate()

  const scrollToEl = (id) => {
    const el = document.getElementById(id)
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 120, behavior: 'smooth' })
  }

  const handleScrollTo = (e, sectionId) => {
    e.preventDefault()
    if (sectionId === 'contact') {
      scrollToEl('contact')
      return
    }
    const isHome = window.location.hash === '#/' || window.location.hash === '' || window.location.hash === '#'
    if (!isHome) {
      navigate('/')
      setTimeout(() => {
        scrollToEl(sectionId)
      }, 300)
    } else {
      scrollToEl(sectionId)
    }
  }

  return (
    <footer className="footer" id="contact">
      <div className="footer__top">
        <div className="footer__inner container">
          {/* Brand Column */}
          <div className="footer__brand">
            <Link to="/" className="footer__logo" onClick={(e) => handleScrollTo(e, 'hero')}>
              <div className="footer__logo-icon">
                <img src={`${import.meta.env.BASE_URL}logo-star.png`} alt="SSV Logo" style={{ height: '100px', objectFit: 'contain', filter: 'brightness(0) invert(1)' }} />
              </div>
            </Link>
            <p className="footer__brand-desc">
              Committed to delivering high-quality pharmaceutical formulations and healthcare solutions globally.
            </p>

          </div>

          {/* Mission Column */}
          <div className="footer__col">
            <h4 className="footer__col-title">Our Mission</h4>
            <p className="footer__text" style={{ fontSize: '0.85rem', color: 'var(--color-gray-300)', lineHeight: '1.6' }}>
              To deliver safe, effective, and affordable pharmaceutical solutions through continuous research, ethical practices, and unwavering commitment to quality.
            </p>
          </div>

          {/* Quick Links Column */}
          <div className="footer__col">
            <h4 className="footer__col-title">Quick Links</h4>
            <ul className="footer__links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/products">Products</Link></li>
              <li><Link to="/events/culture">Events</Link></li>
              <li><Link to="/careers">Careers</Link></li>
            </ul>
          </div>

          {/* Contact Column */}
          <div className="footer__col">
            <h4 className="footer__col-title">Contact Us</h4>
            <div className="footer__contact-list">
              <span className="footer__contact-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                <span>SSV Pharmaceuticals, Plot No. 2,<br/>1st Floor, Malabar Colony, Hazari Pahad Road,<br/>Seminary Hills, Nagpur - 440006</span>
              </span>
              <a href="tel:+919818977444" className="footer__contact-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
                </svg>
                <span>+91 98189 77444</span>
              </a>
              <a href="tel:+918920606892" className="footer__contact-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
                </svg>
                <span>+91 89206 06892</span>
              </a>
              <a href="mailto:info@ssvpharma.com" className="footer__contact-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
                <span>info@ssvpharma.com</span>
              </a>
              <a href="mailto:hrssvpharma@gmail.com" className="footer__contact-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
                <span>hrssvpharma@gmail.com</span>
              </a>
            </div>
          </div>

          {/* Quality Seal Column */}
          <div className="footer__col footer__col--seal">
            <h4 className="footer__col-title">Quality Seal</h4>
            <div className="footer__seal" style={{ opacity: '0.85' }}>
              <img src={`${import.meta.env.BASE_URL}logo-pentagon.png`} alt="SSV Quality Seal" style={{ width: '140px', height: '140px', objectFit: 'contain' }} />
            </div>
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <div className="footer__bottom-inner container">
          <p>&copy; 2026 SSV Pharmaceuticals. All rights reserved. Committed to Health. Driven by Science.</p>
          <div className="footer__bottom-links">
            <span className="footer__bottom-link" aria-label="Privacy Policy (coming soon)">Privacy Policy</span>
            <span className="footer__bottom-link" aria-label="Terms of Service (coming soon)">Terms of Service</span>
            <span className="footer__bottom-link" aria-label="Cookie Policy (coming soon)">Cookie Policy</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
