import { useEffect, useState, useCallback } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'
import './GalleryPage.css'

/* ── Gallery Data ── */
const CATEGORIES = ['All', 'Events', 'Office', 'Team', 'Celebrations']

const GALLERY_ITEMS = [
  { src: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=700&q=80', alt: 'Team collaboration', category: 'Team', title: 'Team Collaboration' },
  { src: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=700&q=80', alt: 'Modern office desk', category: 'Office', title: 'Modern Workspace' },
  { src: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=700&q=80', alt: 'Workshop session', category: 'Office', title: 'Brainstorming Session' },
  { src: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=700&q=80', alt: 'Team celebration', category: 'Celebrations', title: 'Annual Day Celebrations' },
  { src: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=700&q=80', alt: 'Open office space', category: 'Office', title: 'SSV Campus — Block A' },
  { src: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?w=700&q=80', alt: 'Team lunch', category: 'Team', title: 'Friday Team Lunch' },
  { src: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=700&q=80', alt: 'SSV Summit', category: 'Events', title: 'SSV Summit — New Delhi' },
  { src: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=700&q=80', alt: 'Presentation', category: 'Events', title: 'Innovation Week Keynote' },
  { src: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=700&q=80', alt: 'Outdoor activity', category: 'Team', title: 'Annual Outdoor Retreat' },
  { src: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=700&q=80', alt: 'Gala night', category: 'Celebrations', title: 'Annual Gala Night 2025' },
  { src: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=700&q=80', alt: 'Wellness session', category: 'Events', title: 'Wellness Month — Yoga' },
  { src: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=700&q=80', alt: 'Award ceremony', category: 'Celebrations', title: 'Star Performer Awards' },
]

const INITIAL_COUNT = 9

const GalleryPage = () => {
  const location = useLocation()
  const [heroVisible, setHeroVisible] = useState(false)
  const [activeFilter, setActiveFilter] = useState('All')
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT)
  const [lightbox, setLightbox] = useState(null)

  const [gridRef, gridVisible] = useIntersectionObserver()
  const [ctaRef, ctaVisible] = useIntersectionObserver()

  useEffect(() => {
    const timer = setTimeout(() => setHeroVisible(true), 200)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location])

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

  const filtered = activeFilter === 'All'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter(item => item.category === activeFilter)

  const visible = filtered.slice(0, visibleCount)
  const hasMore = visibleCount < filtered.length

  return (
    <div className="gallery-page">

      {/* ── Hero ── */}
      <section className="gal-hero">
        <div className={`gal-hero__content container ${heroVisible ? 'animate-fade-up' : ''}`} style={{ opacity: heroVisible ? 1 : 0 }}>
          <span className="gal-hero__label">Gallery</span>
          <h1 className="gal-hero__title">Moments at SSV</h1>
          <p className="gal-hero__sub">A visual journey through our workplace, team celebrations, and everyday life at SSV.</p>
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
              >
                <img src={item.src} alt={item.alt} loading="lazy" />
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
        <div className="gal-lightbox" onClick={() => setLightbox(null)}>
          <button className="gal-lightbox__close" onClick={() => setLightbox(null)} aria-label="Close lightbox">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
          <div className="gal-lightbox__body" onClick={e => e.stopPropagation()}>
            <img src={lightbox.src} alt={lightbox.alt} />
            <div className="gal-lightbox__caption">
              <span className="gal-card__badge">{lightbox.category}</span>
              <span className="gal-lightbox__title">{lightbox.title}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default GalleryPage
