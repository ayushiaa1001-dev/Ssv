import { useState, useEffect, useRef } from 'react'
import './Navbar.css'

// All searchable content across the site
const SEARCH_INDEX = [
  { title: 'Home', description: 'Welcome to SSV Pharmaceuticals', section: '#hero', keywords: ['home', 'hero', 'welcome', 'ssv'] },
  { title: 'About Us', description: 'Who we are — 38+ years of pharmaceutical excellence', section: '#about', keywords: ['about', 'who we are', 'history', 'founded', 'experience', 'story'] },
  { title: 'Vision & Values', description: 'Our vision, mission and core values', section: '#vision', keywords: ['vision', 'mission', 'values', 'goals'] },
  { title: 'Milestones', description: 'Key milestones in our journey', section: '#milestones', keywords: ['milestones', 'achievements', 'journey', 'history', 'timeline'] },
  { title: 'Quality & Certifications', description: 'Our quality standards and certifications', section: '#quality', keywords: ['quality', 'certifications', 'gmp', 'iso', 'standards'] },
  { title: 'Products', description: 'Our pharmaceutical product portfolio', section: '#products', keywords: ['products', 'portfolio', 'medicines', 'drugs', 'formulations'] },
  { title: 'Cough & Anti Cold Range', description: 'Cough syrups, cold relief medicines', section: '#products', keywords: ['cough', 'cold', 'anti cold', 'syrup', 'fever'] },
  { title: 'Pain Management', description: 'Pain relief and analgesic products', section: '#products', keywords: ['pain', 'analgesic', 'relief', 'tablet'] },
  { title: 'Gynae', description: 'Gynaecology product range', section: '#products', keywords: ['gynae', 'gynaecology', 'women', 'health'] },
  { title: 'Gastro', description: 'Gastroenterology products', section: '#products', keywords: ['gastro', 'digestive', 'stomach', 'gastroenterology'] },
  { title: 'General Products', description: 'General medicine formulations', section: '#products', keywords: ['general', 'medicine', 'tablets', 'capsules'] },
  { title: 'Careers', description: 'Join our team at SSV Pharmaceuticals', section: '#careers', keywords: ['careers', 'jobs', 'hiring', 'work', 'employment', 'join'] },
  { title: 'Contact Us', description: 'Get in touch with SSV Pharmaceuticals', section: '#contact', keywords: ['contact', 'reach', 'email', 'phone', 'address', 'touch'] },
  { title: 'Export Countries', description: 'We export to 12+ countries globally', section: '#about', keywords: ['export', 'countries', 'global', 'international'] },
  { title: 'Professionals', description: '500+ skilled professionals in our team', section: '#about', keywords: ['professionals', 'team', 'staff', 'employees'] },
]

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)

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
    const el = document.querySelector(section)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
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

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`} id="navbar">
      <div className="navbar__inner container">
        {/* Logo */}
        <a href="#" className="navbar__logo" id="logo">
          <div className="navbar__logo-icon">
            <img src={`${import.meta.env.BASE_URL}logo-star.png`} alt="SSV Logo" style={{ width: '120px', height: '55px', objectFit: 'contain' }} />
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

          {/* Search Bar — always expanded */}
          <div className="navbar__search" ref={searchRef}>
            <div className="navbar__search-box">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="navbar__search-icon">
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

          <a href="#contact" className="btn navbar__cta" id="contact-btn">Contact Us</a>
          <div className="navbar__badge" title="SSV Pharmaceuticals Quality Seal">
            <img src={`${import.meta.env.BASE_URL}logo-pentagon.png`} alt="SSV Quality Seal" style={{ width: '55px', height: '55px', objectFit: 'contain' }} />
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
