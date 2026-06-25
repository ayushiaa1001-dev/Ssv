import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import './Footer.css'

const Footer = () => {
  const { t } = useTranslation()
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
    const basePath = import.meta.env.BASE_URL.replace(/\/$/, '')
    const currentPath = window.location.pathname.replace(/\/$/, '')
    const isHome = currentPath === basePath || currentPath === '' || currentPath === '/'
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
        <div className="footer__layout container">
          {/* Left Column (Logo + Brand Desc) */}
          <div className="footer__left">
            <div className="footer__logo footer__logo--left">
              <Link to="/" onClick={(e) => handleScrollTo(e, 'hero')}>
                <img src={`${import.meta.env.BASE_URL}ssv-logo.png?v=2`} alt="Ssv Logo" style={{ height: '100px', objectFit: 'contain', filter: 'brightness(0) invert(1)' }} />
              </Link>
            </div>
            <p className="footer__brand-desc" dangerouslySetInnerHTML={{ __html: t('footer.brandDesc') }} />
          </div>

          {/* Center Content */}
          <div className="footer__center">
            {/* Content Columns */}
            <div className="footer__inner">
              {/* Mission Column */}
              <div className="footer__col">
                <h4 className="footer__col-title">{t('footer.missionTitle')}</h4>
                <p className="footer__text" style={{ fontSize: '0.85rem', color: 'var(--color-gray-300)', lineHeight: '1.6' }}>
                  {t('footer.missionDesc')}
                </p>
              </div>

              {/* Quick Links Column */}
              <div className="footer__col">
                <h4 className="footer__col-title">{t('footer.quickLinksTitle')}</h4>
                <ul className="footer__links">
                  <li><Link to="/">{t('footer.links.home')}</Link></li>
                  <li><Link to="/about">{t('footer.links.about')}</Link></li>
                  <li><Link to="/products">{t('footer.links.products')}</Link></li>
                  <li><Link to="/events/culture">{t('footer.links.events')}</Link></li>
                  <li><Link to="/careers">{t('footer.links.careers')}</Link></li>
                </ul>
              </div>

              {/* Contact Column */}
              <div className="footer__col">
                <h4 className="footer__col-title">{t('footer.contactTitle')}</h4>
                <div className="footer__contact-list">
                  <span className="footer__contact-item footer__contact-item--static">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                      <circle cx="12" cy="10" r="3"/>
                    </svg>
                    <span style={{ whiteSpace: 'pre-line' }}>{t('footer.address')}</span>
                  </span>
                  <a href="tel:+918920606892" className="footer__contact-item">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
                    </svg>
                    <span>{t('footer.phone1')}</span>
                  </a>
                  <a href="tel:+919818977444" className="footer__contact-item">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
                    </svg>
                    <span>{t('footer.phone2')}</span>
                  </a>
                  <a href="mailto:info@ssvpharma.com" className="footer__contact-item">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                      <polyline points="22,6 12,13 2,6"/>
                    </svg>
                    <span>{t('footer.emailInfo')}</span>
                  </a>
                  <a href="mailto:hrssvpharma@gmail.com" className="footer__contact-item">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                      <polyline points="22,6 12,13 2,6"/>
                    </svg>
                    <span>{t('footer.emailHr')}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Logo */}
          <div className="footer__logo footer__logo--right">
            <img src={`${import.meta.env.BASE_URL}logo-pentagon.png`} alt="Ssv Quality Seal" style={{ height: '120px', objectFit: 'contain', opacity: '0.85' }} />
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <div className="footer__bottom-inner container">
          <p>{t('footer.copyright')}</p>
          <div className="footer__bottom-links">
            <span className="footer__bottom-link" aria-label="Privacy Policy (coming soon)">{t('footer.privacyPolicy')}</span>
            <span className="footer__bottom-link" aria-label="Terms of Service (coming soon)">{t('footer.termsOfService')}</span>
            <span className="footer__bottom-link" aria-label="Cookie Policy (coming soon)">{t('footer.cookiePolicy')}</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
