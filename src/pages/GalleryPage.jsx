import { useEffect, useState, useCallback, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import './GalleryPage.css'

import { GALLERY_ITEMS } from '../data/galleryData'

/* ── Gallery Data ── */
const CATEGORIES = ['All', 'Celebrations', 'Events', 'Office', 'Team']


const INITIAL_COUNT = 9

const GalleryPage = () => {
  const [heroVisible, setHeroVisible] = useState(false)
  useDocumentTitle('Gallery')
  const [activeFilter, setActiveFilter] = useState('All')
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT)
  const [lightbox, setLightbox] = useState(/** @type {any} */ (null))

  const [gridRef, gridVisible] = useIntersectionObserver()
  const [ctaRef, ctaVisible] = useIntersectionObserver()
  const lightboxCloseRef = useRef(/** @type {any} */ (null))

  useEffect(() => {
    const timer = setTimeout(() => setHeroVisible(true), 200)
    return () => clearTimeout(timer)
  }, [])

  /* Close lightbox on Escape */
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') setLightbox(null)
  }, [])

  useEffect(() => {
    if (lightbox) {
      document.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [lightbox, handleKeyDown])

  // Focus the close button when lightbox opens
  useEffect(() => {
    if (lightbox && lightboxCloseRef.current) {
      lightboxCloseRef.current.focus()
    }
  }, [lightbox])

  const filtered = activeFilter === 'All'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter(item => item.category === activeFilter)

  const visible = filtered.slice(0, visibleCount)
  const hasMore = visibleCount < filtered.length

  return (
    <div className="gallery-page">

      {/* ── Hero ── */}
      <section className="gal-hero">
        <div className="gal-hero__bg">
          <img
            src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Gallery — Ssv Pharmaceuticals"
            loading="lazy"
          />
          <div className="gal-hero__overlay"></div>
        </div>
        <div className="gal-hero__content">
          <div className={`gal-hero__text scroll-reveal ${heroVisible ? 'scroll-reveal--visible' : ''}`}>
            <Link to="/" className="gal-back-btn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
              Back to Home
            </Link>
            <span className="gal-hero__label">Gallery</span>
            <h1 className="gal-hero__title">Moments at Ssv</h1>
            <p className="gal-hero__sub">A visual journey through our workplace, team celebrations, and everyday life at Ssv.</p>
          </div>
        </div>
      </section>

      {/* ── Filter Tabs ── */}
      <section className="gal-filters">
        <div className="container">
          <div className="gal-filters__row">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                className={`gal-filter-pill ${activeFilter === cat ? 'gal-filter-pill--active' : ''}`}
                onClick={() => { setActiveFilter(cat); setVisibleCount(INITIAL_COUNT); }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Photo Grid ── */}
      <section className="gal-grid-section" ref={gridRef}>
        <div className="container">
          <div className={`gal-grid ${gridVisible ? 'gal-grid--visible' : ''}`}>
            {visible.map((item, i) => (
              <div
                className={`gal-card ${gridVisible ? 'gal-card--visible' : ''}`}
                key={`${item.src}-${i}`}
                style={{ transitionDelay: gridVisible ? `${0.05 + i * 0.06}s` : '0s' }}
                onClick={() => setLightbox(item)}
                role="button"
                tabIndex={0}
                onKeyDown={e => e.key === 'Enter' && setLightbox(item)}
                aria-label={`View photo from ${item.category}`}
              >
                <img src={`${import.meta.env.BASE_URL}${item.src.replace(/^\//, '')}`} alt={item.alt} loading="lazy" />
                <div className="gal-card__overlay">
                  <span className="gal-card__badge">{item.category}</span>
                </div>
              </div>
            ))}
          </div>

          {hasMore && (
            <div className="gal-load-more">
              <button className="gal-load-more__btn" onClick={() => setVisibleCount(prev => prev + 6)}>
                Load More
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ── CTA ── */}
      <section
        className={`gal-cta scroll-reveal ${ctaVisible ? 'scroll-reveal--visible' : ''}`}
        ref={ctaRef}
      >
        <div className="container">
          <div className="gal-cta__card">
            <h2 className="gal-cta__title">Want to join our team?</h2>
            <p className="gal-cta__sub">View our open positions and find your next role.</p>
            <Link to="/careers" className="btn btn-dark gal-cta__btn">View Careers</Link>
          </div>
        </div>
      </section>

      {/* ── Lightbox Modal ── */}
      {lightbox && (
        <div className="gal-lightbox" role="dialog" aria-modal="true" aria-label={`${lightbox.category} photo`}>
          <div className="gal-lightbox__backdrop" onClick={() => setLightbox(null)} aria-hidden="true" />
          <button ref={lightboxCloseRef} className="gal-lightbox__close" onClick={() => setLightbox(null)} aria-label="Close lightbox">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
          <div className="gal-lightbox__body" onClick={e => e.stopPropagation()}>
            <img src={`${import.meta.env.BASE_URL}${(lightbox.fullSrc || lightbox.src).replace(/^\//, '')}`} alt={lightbox.alt} />
            <div className="gal-lightbox__caption">
              <span className="gal-card__badge">{lightbox.category}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default GalleryPage
