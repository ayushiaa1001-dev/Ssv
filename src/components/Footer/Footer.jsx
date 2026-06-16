import { Link, useNavigate } from 'react-router-dom'
import './Footer.css'

const Footer = () => {
  const navigate = useNavigate()

  const handleScrollTo = (e, sectionId) => {
    e.preventDefault()
    if (sectionId === 'contact') {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
      return
    }
    const isHome = window.location.hash === '#/' || window.location.hash === '' || window.location.hash === '#'
    if (!isHome) {
      navigate('/')
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })
      }, 300)
    } else {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })
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
              <li><a href="#hero" onClick={(e) => handleScrollTo(e, 'hero')}>Home</a></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/products">Products</Link></li>
              <li><Link to="/careers">Careers</Link></li>
              <li><Link to="/events/culture">Events</Link></li>
            </ul>
          </div>

          {/* Contact Column */}
          <div className="footer__col">
            <h4 className="footer__col-title">Contact Us</h4>
            <div className="footer__contact-list">
              <div className="footer__contact-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                <span>123 Pharma Avenue, Andheri East,<br/>Mumbai 400069, Maharashtra, India</span>
              </div>
              <div className="footer__contact-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
                </svg>
                <span>+91 22 1234 5678</span>
              </div>
              <div className="footer__contact-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
                <span>info@ssvpharma.com</span>
              </div>
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
            <a href="/ssv/#/privacy" aria-label="Privacy Policy (coming soon)" style={{ cursor: 'default', pointerEvents: 'none' }}>Privacy Policy</a>
            <a href="/ssv/#/terms" aria-label="Terms of Service (coming soon)" style={{ cursor: 'default', pointerEvents: 'none' }}>Terms of Service</a>
            <a href="/ssv/#/cookies" aria-label="Cookie Policy (coming soon)" style={{ cursor: 'default', pointerEvents: 'none' }}>Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
