import { useState, useEffect } from 'react'
import './Navbar.css'

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`} id="navbar">
      <div className="navbar__inner container">
        {/* Logo */}
        <a href="#" className="navbar__logo" id="logo">
          <div className="navbar__logo-icon">
            <img src={`${import.meta.env.BASE_URL}logo-star.png`} alt="SSV Logo" style={{ width: '80px', height: '80px', objectFit: 'contain' }} />
          </div>
        </a>

        {/* Desktop Nav */}
        <ul className="navbar__menu" id="nav-menu">
          <li className="navbar__item">
            <a href="#hero" className="navbar__link">Home</a>
          </li>
          <li className="navbar__item navbar__item--dropdown"
              onMouseEnter={() => setActiveDropdown('about')}
              onMouseLeave={() => setActiveDropdown(null)}>
            <a href="#about" className="navbar__link">
              About Us
              <svg width="10" height="6" viewBox="0 0 10 6" fill="none"><path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
            </a>
            {activeDropdown === 'about' && (
              <ul className="navbar__dropdown">
                <li><a href="#about">Who We Are</a></li>
                <li><a href="#vision">Vision & Values</a></li>
                <li><a href="#milestones">Milestones</a></li>
                <li><a href="#quality">Quality</a></li>
              </ul>
            )}
          </li>
          <li className="navbar__item navbar__item--dropdown"
              onMouseEnter={() => setActiveDropdown('products')}
              onMouseLeave={() => setActiveDropdown(null)}>
            <a href="#products" className="navbar__link">
              Products
              <svg width="10" height="6" viewBox="0 0 10 6" fill="none"><path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
            </a>
            {activeDropdown === 'products' && (
              <ul className="navbar__dropdown">
                <li><a href="#products">Cough & Anti Cold Range</a></li>
                <li><a href="#products">Pain Management</a></li>
                <li><a href="#products">Gynae</a></li>
                <li><a href="#products">Gastro</a></li>
                <li><a href="#products">General</a></li>
                <li><a href="#products">All Products</a></li>
              </ul>
            )}
          </li>
          <li className="navbar__item">
            <a href="#careers" className="navbar__link">Careers</a>
          </li>
        </ul>

        {/* Right Side Actions */}
        <div className="navbar__actions">
          <a href="#contact" className="btn navbar__cta" id="contact-btn">Contact Us</a>
          <div className="navbar__badge" title="SSV Pharmaceuticals Quality Seal">
            <img src={`${import.meta.env.BASE_URL}logo-pentagon.png`} alt="SSV Quality Seal" style={{ width: '140px', height: '140px', objectFit: 'contain' }} />
          </div>
        </div>

        {/* Mobile Toggle */}
        <button
          className={`navbar__hamburger ${mobileOpen ? 'active' : ''}`}
          onClick={() => setMobileOpen(!mobileOpen)}
          id="mobile-toggle"
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="navbar__mobile" id="mobile-menu">
          <a href="#hero" onClick={() => setMobileOpen(false)}>Home</a>
          <a href="#about" onClick={() => setMobileOpen(false)}>About Us</a>
          <a href="#vision" onClick={() => setMobileOpen(false)}>Vision & Values</a>
          <a href="#milestones" onClick={() => setMobileOpen(false)}>Milestones</a>
          <a href="#products" onClick={() => setMobileOpen(false)}>Products</a>
          <a href="#quality" onClick={() => setMobileOpen(false)}>Quality & Certifications</a>
          <a href="#careers" onClick={() => setMobileOpen(false)}>Careers</a>
          <a href="#contact" className="btn btn-dark" style={{ marginTop: '10px' }} onClick={() => setMobileOpen(false)}>Contact Us</a>
        </div>
      )}
    </nav>
  )
}

export default Navbar
