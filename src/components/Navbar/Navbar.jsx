import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import './Navbar.css'

// All searchable content across the site
const SEARCH_INDEX = [
  { title: 'Home', description: 'Welcome to SSV Pharmaceuticals', section: '#hero', keywords: ['home', 'hero', 'welcome', 'ssv'] },
  { title: 'About Us', description: 'Who we are — 38+ years of pharmaceutical excellence', section: '#about-story', keywords: ['about', 'who we are', 'history', 'founded', 'experience', 'story'] },
  { title: 'Vision & Values', description: 'Our vision, mission and core values', section: '#about-philosophy', keywords: ['vision', 'mission', 'values', 'goals'] },
  { title: 'Milestones', description: 'Key milestones in our journey', section: '#about-journey', keywords: ['milestones', 'achievements', 'journey', 'history', 'timeline'] },
  { title: 'Quality & Certifications', description: 'Our quality standards and certifications', section: '#about-standards', keywords: ['quality', 'certifications', 'gmp', 'iso', 'standards'] },
  { title: 'Products', description: 'Our pharmaceutical product portfolio', section: 'products', keywords: ['products', 'portfolio', 'medicines', 'drugs', 'formulations'] },
  { title: 'Cough & Anti Cold Range', description: 'Cough syrups, cold relief medicines', section: 'products/cough-cold', keywords: ['cough', 'cold', 'anti cold', 'syrup', 'fever'] },
  { title: 'Pain Management', description: 'Pain relief and analgesic products', section: 'products/pain-management', keywords: ['pain', 'analgesic', 'relief', 'tablet'] },
  { title: 'Gynae', description: 'Gynaecology product range', section: 'products/gynae', keywords: ['gynae', 'gynaecology', 'women', 'health'] },
  { title: 'Gastro', description: 'Gastroenterology products', section: 'products/gastro', keywords: ['gastro', 'digestive', 'stomach', 'gastroenterology'] },
  { title: 'General Products', description: 'General medicine formulations', section: 'products/general', keywords: ['general', 'medicine', 'tablets', 'capsules'] },
  { title: 'Careers', description: 'Join our team at SSV Pharmaceuticals', section: 'careers', keywords: ['careers', 'jobs', 'hiring', 'work', 'employment', 'join'] },
  { title: 'Culture at SSV', description: 'Our cultural pillars and annual events', section: 'events/culture', keywords: ['culture', 'events', 'pillars', 'annual', 'gala', 'founders'] },
  { title: 'Gallery', description: 'Photo gallery of life at SSV', section: 'events/gallery', keywords: ['gallery', 'photos', 'images', 'snapshots'] },
  { title: 'Contact Us', description: 'Get in touch with SSV Pharmaceuticals', section: 'contact-page', keywords: ['contact', 'reach', 'email', 'phone', 'address', 'touch'] },
  { title: 'Export Countries', description: 'We export to 12+ countries globally', section: '#about-story', keywords: ['export', 'countries', 'global', 'international'] },
  { title: 'Professionals', description: '500+ skilled professionals in our team', section: '#about-story', keywords: ['professionals', 'team', 'staff', 'employees'] },
]

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const [activeDropdown, setActiveDropdown] = useState(null)

  // Derive active page from current path
  const activePath = location.pathname

  // Search state
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [highlightIndex, setHighlightIndex] = useState(-1)
  const [dropdownVisible, setDropdownVisible] = useState(false)
  const searchRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Mobile menu: lock body scroll and handle Escape key
  useEffect(() => {
    if (!mobileOpen) return
    document.body.style.overflow = 'hidden'
    const handleEscape = (e) => {
      if (e.key === 'Escape') setMobileOpen(false)
    }
    document.addEventListener('keydown', handleEscape)
    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', handleEscape)
    }
  }, [mobileOpen])

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setDropdownVisible(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSearch = (query) => {
    setSearchQuery(query)
    setHighlightIndex(-1)
    if (!query.trim()) {
      setSearchResults([])
      setDropdownVisible(false)
      return
    }
    const q = query.toLowerCase()
    const results = SEARCH_INDEX.filter(item =>
      item.title.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q) ||
      item.keywords.some(k => k.includes(q))
    )
    setSearchResults(results)
    setDropdownVisible(true)
  }

  const handleSelect = (section) => {
    if (section.startsWith('products')) {
      if (section === 'products') {
        scrollToProductsSection(null)
      } else {
        scrollToProductsSection(section.split('/')[1])
      }
    } else if (section.startsWith('#about-')) {
      scrollToAboutSection(section.substring(1))
    } else if (section === 'careers') {
      navigate('/careers')
    } else if (section === 'contact-page') {
      navigate('/contact')
    } else if (section.startsWith('events/')) {
      navigate('/' + section)
    } else if (section.startsWith('#')) {
      scrollToSection(section.substring(1))
    }
    setSearchQuery('')
    setSearchResults([])
    setDropdownVisible(false)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setHighlightIndex(i => Math.min(i + 1, searchResults.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setHighlightIndex(i => Math.max(i - 1, 0))
    } else if (e.key === 'Enter') {
      if (highlightIndex >= 0 && searchResults[highlightIndex]) {
        handleSelect(searchResults[highlightIndex].section)
      } else if (searchResults.length > 0) {
        handleSelect(searchResults[0].section)
      }
    } else if (e.key === 'Escape') {
      setSearchQuery('')
      setSearchResults([])
      setDropdownVisible(false)
    }
  }

  // Scroll to an element with offset for the fixed navbar
  const scrollToElementWithOffset = (elementId, offset = 120) => {
    const el = document.getElementById(elementId)
    if (!el) return
    const top = el.getBoundingClientRect().top + window.scrollY - offset
    window.scrollTo({ top, behavior: 'smooth' })
  }

  // Navigate to home page section safely with BrowserRouter
  const scrollToSection = (sectionId) => {
    const basePath = import.meta.env.BASE_URL.replace(/\/$/, '')
    const currentPath = window.location.pathname.replace(/\/$/, '')
    const isHome = currentPath === basePath || currentPath === '' || currentPath === '/'
    if (!isHome) {
      navigate('/')
      setTimeout(() => {
        scrollToElementWithOffset(sectionId)
      }, 300)
    } else {
      scrollToElementWithOffset(sectionId)
    }
    setMobileOpen(false)
    setActiveDropdown(null)
  }

  // Navigate to About page section safely with BrowserRouter and location state
  const scrollToAboutSection = (sectionId) => {
    const basePath = import.meta.env.BASE_URL.replace(/\/$/, '')
    const currentPath = window.location.pathname.replace(/\/$/, '')
    const isAbout = currentPath === `${basePath}/about` || currentPath.endsWith('/about')
    if (isAbout) {
      if (sectionId) {
        scrollToElementWithOffset(sectionId)
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    } else {
      navigate('/about', { state: { scrollTo: sectionId } })
    }
    setMobileOpen(false)
    setActiveDropdown(null)
  }

  // Navigate to Products page category
  const scrollToProductsSection = (categoryId) => {
    const basePath = import.meta.env.BASE_URL.replace(/\/$/, '')
    const currentPath = window.location.pathname.replace(/\/$/, '')
    const isProducts = currentPath === `${basePath}/products` || currentPath.endsWith('/products')

    if (!categoryId) {
      // No specific category — just go to Products top
      if (isProducts) {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      } else {
        navigate('/products')
      }
    } else if (isProducts) {
      // Already on products page — fire custom event for instant handling
      window.dispatchEvent(new CustomEvent('ssv-switch-category', { detail: categoryId }))
    } else {
      // Coming from another page — use navigate with state
      navigate('/products', { state: { category: categoryId } })
    }
    setMobileOpen(false)
    setActiveDropdown(null)
  }

  const handleContactClick = () => {
    navigate('/contact')
    setMobileOpen(false)
    setActiveDropdown(null)
  }

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`} id="navbar">
      <div className="navbar__inner container">
        {/* Logo */}
        <Link to="/" className="navbar__logo" id="logo">
          <div className="navbar__logo-icon">
            <img src={`${import.meta.env.BASE_URL}logo-star.png`} alt="SSV Logo" style={{ width: '180px', height: '80px', objectFit: 'contain' }} />
          </div>
        </Link>

        {/* Desktop Nav */}
        <ul className="navbar__menu" id="nav-menu">
          <li className="navbar__item">
            <Link to="/" className={`navbar__link ${activePath === '/' ? 'navbar__link--active' : ''}`}>Home</Link>
          </li>
          <li className="navbar__item navbar__item--dropdown"
              onMouseEnter={() => setActiveDropdown('about')}
              onMouseLeave={() => setActiveDropdown(null)}>
            <Link to="/about" className={`navbar__link ${activePath === '/about' ? 'navbar__link--active' : ''}`}>
              About Us
              <svg width="10" height="6" viewBox="0 0 10 6" fill="none"><path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
            </Link>
            {activeDropdown === 'about' && (
              <ul className="navbar__dropdown">
                <li>
                  <Link to="/about" onClick={(e) => { e.preventDefault(); scrollToAboutSection('about-story'); }}>
                    Who We Are
                  </Link>
                </li>
                <li>
                  <Link to="/about" onClick={(e) => { e.preventDefault(); scrollToAboutSection('about-philosophy'); }}>
                    Vision & Values
                  </Link>
                </li>
                <li>
                  <Link to="/about" onClick={(e) => { e.preventDefault(); scrollToAboutSection('about-journey'); }}>
                    Milestones
                  </Link>
                </li>
                <li>
                  <Link to="/about" onClick={(e) => { e.preventDefault(); scrollToAboutSection('about-standards'); }}>
                    Quality
                  </Link>
                </li>
              </ul>
            )}
          </li>
          <li className="navbar__item navbar__item--dropdown"
              onMouseEnter={() => setActiveDropdown('products')}
              onMouseLeave={() => setActiveDropdown(null)}>
            <button className={`navbar__link navbar__link--btn ${activePath === '/products' ? 'navbar__link--active' : ''}`} onClick={() => scrollToProductsSection(null)}>
              Products
              <svg width="10" height="6" viewBox="0 0 10 6" fill="none"><path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
            </button>
            {activeDropdown === 'products' && (
              <ul className="navbar__dropdown">
                <li>
                  <Link to="/products" onClick={(e) => { e.preventDefault(); scrollToProductsSection('cough-cold'); }}>
                    Cough & Anti Cold Range
                  </Link>
                </li>
                <li>
                  <Link to="/products" onClick={(e) => { e.preventDefault(); scrollToProductsSection('pain-management'); }}>
                    Pain Management
                  </Link>
                </li>
                <li>
                  <Link to="/products" onClick={(e) => { e.preventDefault(); scrollToProductsSection('gynae'); }}>
                    Gynae
                  </Link>
                </li>
                <li>
                  <Link to="/products" onClick={(e) => { e.preventDefault(); scrollToProductsSection('gastro'); }}>
                    Gastro
                  </Link>
                </li>
                <li>
                  <Link to="/products" onClick={(e) => { e.preventDefault(); scrollToProductsSection('general'); }}>
                    General
                  </Link>
                </li>
                <li>
                  <Link to="/products" onClick={(e) => { e.preventDefault(); scrollToProductsSection('all-products'); }}>
                    All Products
                  </Link>
                </li>
              </ul>
            )}
          </li>
          <li className="navbar__item navbar__item--dropdown"
              onMouseEnter={() => setActiveDropdown('events')}
              onMouseLeave={() => setActiveDropdown(null)}>
            <button className={`navbar__link navbar__link--btn ${activePath.startsWith('/events') ? 'navbar__link--active' : ''}`} onClick={() => { navigate('/events/culture'); setActiveDropdown(null); }}>
              Events
              <svg width="10" height="6" viewBox="0 0 10 6" fill="none"><path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
            </button>
            {activeDropdown === 'events' && (
              <ul className="navbar__dropdown">
                <li>
                  <Link to="/events/culture" onClick={() => setActiveDropdown(null)}>Culture at SSV</Link>
                </li>
                <li>
                  <Link to="/events/gallery" onClick={() => setActiveDropdown(null)}>Gallery</Link>
                </li>
              </ul>
            )}
          </li>
          <li className="navbar__item">
            <Link to="/careers" className={`navbar__link ${activePath === '/careers' ? 'navbar__link--active' : ''}`}>Careers</Link>
          </li>
        </ul>

        {/* Right Side Actions */}
        <div className="navbar__actions">

          {/* Search Bar — always expanded */}
          <div className="navbar__search" ref={searchRef}>
            <div className="navbar__search-box">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="navbar__search-icon" aria-hidden="true">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              <input
                ref={inputRef}
                id="search-input"
                type="text"
                className="navbar__search-input"
                placeholder="Search sections, products..."
                value={searchQuery}
                onChange={e => handleSearch(e.target.value)}
                onKeyDown={handleKeyDown}
                onFocus={() => searchQuery && setDropdownVisible(true)}
                autoComplete="off"
              />
              {searchQuery && (
                <button className="navbar__search-clear" onClick={() => { setSearchQuery(''); setSearchResults([]); setDropdownVisible(false); inputRef.current?.focus() }} aria-label="Clear search">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                </button>
              )}

              {/* Dropdown Results */}
              {dropdownVisible && searchQuery && (
                <div className="navbar__search-dropdown" id="search-results">
                  {searchResults.length > 0 ? (
                    searchResults.map((item, i) => (
                      <button
                        key={i}
                        className={`navbar__search-result ${i === highlightIndex ? 'navbar__search-result--active' : ''}`}
                        onClick={() => handleSelect(item.section)}
                        onMouseEnter={() => setHighlightIndex(i)}
                      >
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                        </svg>
                        <div>
                          <span className="navbar__search-result-title">{item.title}</span>
                          <span className="navbar__search-result-desc">{item.description}</span>
                        </div>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="navbar__search-arrow">
                          <polyline points="9 18 15 12 9 6"/>
                        </svg>
                      </button>
                    ))
                  ) : (
                    <div className="navbar__search-empty">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                      <span>No results for "<strong>{searchQuery}</strong>"</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          <button className={`btn navbar__cta ${activePath === '/contact' ? 'navbar__cta--active' : ''}`} id="contact-btn" onClick={handleContactClick}>Contact Us</button>
          <div className="navbar__badge" title="SSV Pharmaceuticals Quality Seal">
            <img src={`${import.meta.env.BASE_URL}logo-pentagon.png`} alt="SSV Quality Seal" style={{ width: '95px', height: '95px', objectFit: 'contain' }} />
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
        <div className="navbar__mobile" id="mobile-menu" role="dialog" aria-modal="true" aria-label="Navigation menu">
          <button
            className="navbar__mobile-close"
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
          <button onClick={() => { scrollToSection('hero'); setMobileOpen(false); }}>Home</button>
          <button onClick={() => { scrollToAboutSection('about-story'); setMobileOpen(false); }}>About Us</button>
          <button onClick={() => { scrollToAboutSection('about-philosophy'); setMobileOpen(false); }}>Vision & Values</button>
          <button onClick={() => { scrollToAboutSection('about-journey'); setMobileOpen(false); }}>Milestones</button>
          <button onClick={() => { scrollToProductsSection(null); setMobileOpen(false); }}>Products</button>
          <button onClick={() => { scrollToAboutSection('about-standards'); setMobileOpen(false); }}>Quality & Certifications</button>
          <Link to="/events/culture" onClick={() => setMobileOpen(false)}>Culture at SSV</Link>
          <Link to="/events/gallery" onClick={() => setMobileOpen(false)}>Gallery</Link>
          <Link to="/careers" onClick={() => setMobileOpen(false)}>Careers</Link>
          <Link to="/contact" onClick={() => setMobileOpen(false)} className="btn btn-dark" style={{ marginTop: '10px' }}>Contact Us</Link>
        </div>
      )}
    </nav>
  )
}

export default Navbar
