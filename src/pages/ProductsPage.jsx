import { useState, useEffect, useRef, useCallback } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import CountUp from '../components/CountUp'
import './ProductsPage.css'

const categoriesData = [
  {
    id: 'cough-cold',
    name: 'Cough & Anti Cold Range',
    tagline: 'Fast-acting relief for cough, cold & congestion',
    themeColor: '#0077A8',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&auto=format&fit=crop&q=80',
    products: [
      { id: 'ssvflu', name: 'SSVFlu Syrup', formSize: 'Syrup · 100ml', desc: 'Effective relief from cold, cough, and nasal congestion.', img: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&auto=format&fit=crop&q=80' },
      { id: 'coldzap', name: 'ColdZap Tablets', formSize: 'Tablets · 10×10', desc: 'Fast-acting formula for fever, headache, and body aches.', img: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&auto=format&fit=crop&q=80' },
      { id: 'tussease', name: 'TussEase Drops', formSize: 'Drops · 30ml', desc: 'Pediatric drops for gentle cough relief and easy breathing.', img: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&auto=format&fit=crop&q=80' },
      { id: 'bronco-ssv', name: 'BroncoSSV Syrup', formSize: 'Syrup · 60ml', desc: 'Bronchodilator syrup for clearing chest congestion.', img: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&auto=format&fit=crop&q=80' },
      { id: 'nasaclear', name: 'NasaClear Drops', formSize: 'Nasal · 10ml', desc: 'Fast relief from blocked nose and sinus pressure.', img: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&auto=format&fit=crop&q=80' },
      { id: 'vaporssv', name: 'VaporSSV Rub', formSize: 'Topical · 50g', desc: 'Soothing ointment to relieve chest and throat congestion.', img: 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=400&auto=format&fit=crop&q=80' }
    ]
  },
  {
    id: 'pain-management',
    name: 'Pain Management',
    tagline: 'Targeted relief for acute and chronic pain',
    themeColor: '#C75000',
    image: 'https://images.unsplash.com/photo-1585435557343-3b092031a831?w=600&auto=format&fit=crop&q=80',
    products: [
      { id: 'painaway-sr', name: 'PainAway SR', formSize: 'Tablets · 10×10', desc: 'Sustained-release tablets for long-lasting joint pain relief.', img: 'https://images.unsplash.com/photo-1631549916768-4119b255f926?w=400&auto=format&fit=crop&q=80' },
      { id: 'flexmove', name: 'FlexMove Gel', formSize: 'Topical Gel · 30g', desc: 'Fast-absorbing topical gel for muscle and joint pain.', img: 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=400&auto=format&fit=crop&q=80' },
      { id: 'arthro-ssv', name: 'ArthroSSV', formSize: 'Capsules · 10×10', desc: 'Enriched formula for rebuilding joint cartilage and flexibility.', img: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=400&auto=format&fit=crop&q=80' },
      { id: 'spasmossv', name: 'SpasmoSSV', formSize: 'Tablets · 10×10', desc: 'Targeted relief from abdominal spasms and cramping pain.', img: 'https://images.unsplash.com/photo-1550572017-edd951b55104?w=400&auto=format&fit=crop&q=80' },
      { id: 'musclerel', name: 'MuscleRel SSV', formSize: 'Tablets · 10×10', desc: 'Muscle relaxant formula to ease stiffness and tension.', img: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&auto=format&fit=crop&q=80' }
    ]
  },
  {
    id: 'gynae',
    name: 'Gynae Care',
    tagline: "Trusted care for women's health & wellness",
    themeColor: '#9C1A5E',
    image: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=600&auto=format&fit=crop&q=80',
    products: [
      { id: 'femicare', name: 'FemiCare Tablets', formSize: 'Tablets · 3×10', desc: 'Comprehensive hormonal support and cycle regulation.', img: 'https://images.unsplash.com/photo-1631549916768-4119b255f926?w=400&auto=format&fit=crop&q=80' },
      { id: 'ironfem', name: 'IronFem Syrup', formSize: 'Syrup · 200ml', desc: 'High-absorption iron supplement for optimal hemoglobin levels.', img: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&auto=format&fit=crop&q=80' },
      { id: 'cyclossv', name: 'CycloSSV', formSize: 'Capsules · 2×10', desc: 'Natural herbal capsules for managing menstrual discomfort.', img: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=400&auto=format&fit=crop&q=80' },
      { id: 'folicssv', name: 'FolicSSV', formSize: 'Tablets · 3×10', desc: 'Folic acid supplements essential for prenatal development.', img: 'https://images.unsplash.com/photo-1550572017-edd951b55104?w=400&auto=format&fit=crop&q=80' },
      { id: 'calcimom', name: 'CalciMom', formSize: 'Tablets · 3×10', desc: 'Calcium and mineral support tailored for mothers.', img: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&auto=format&fit=crop&q=80' }
    ]
  },
  {
    id: 'gastro',
    name: 'Gastro Care',
    tagline: 'Complete digestive & gastrointestinal care',
    themeColor: '#1D6A3A',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&auto=format&fit=crop&q=80',
    products: [
      { id: 'gastroease', name: 'GastroEase', formSize: 'Tablets · 10×10', desc: 'Antacid tablets for fast relief from bloating and acidity.', img: 'https://images.unsplash.com/photo-1550572017-edd951b55104?w=400&auto=format&fit=crop&q=80' },
      { id: 'acidssv', name: 'AcidSSV', formSize: 'Suspension · 170ml', desc: 'Soothing mint-flavored liquid antacid for heartburn relief.', img: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&auto=format&fit=crop&q=80' },
      { id: 'digestpro', name: 'DigestPro', formSize: 'Capsules · 3×10', desc: 'Multi-enzyme capsules to assist digestion and nutrient intake.', img: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=400&auto=format&fit=crop&q=80' },
      { id: 'liverssv', name: 'LiverSSV Syrup', formSize: 'Syrup · 200ml', desc: 'Herbal liver tonic for detoxification and healthy function.', img: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&auto=format&fit=crop&q=80' }
    ]
  },
  {
    id: 'general',
    name: 'General Health',
    tagline: 'Vitamins, minerals & everyday immunity support',
    themeColor: '#5B3FA0',
    image: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=600&auto=format&fit=crop&q=80',
    products: [
      { id: 'vitassv', name: 'VitaSSV Multi', formSize: 'Tablets · 3×10', desc: 'Daily vitamins and minerals for energy and immune defense.', img: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=400&auto=format&fit=crop&q=80' },
      { id: 'immunoboost', name: 'ImmunoBoost', formSize: 'Syrup · 200ml', desc: 'Antioxidant and zinc rich syrup to strengthen natural immunity.', img: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&auto=format&fit=crop&q=80' },
      { id: 'calcissv', name: 'CalciSSV', formSize: 'Tablets · 3×10', desc: 'Calcium & Vitamin D3 formulation for healthy bone density.', img: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&auto=format&fit=crop&q=80' },
      { id: 'omegassv', name: 'OmegaSSV', formSize: 'Capsules · 3×10', desc: 'Omega-3 fatty acid capsules for heart and cognitive health.', img: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=400&auto=format&fit=crop&q=80' },
      { id: 'zincssv', name: 'ZincSSV', formSize: 'Tablets · 3×10', desc: 'Zinc supplements to support immunity and skin health.', img: 'https://images.unsplash.com/photo-1550572017-edd951b55104?w=400&auto=format&fit=crop&q=80' }
    ]
  }
]

const CategoryAccordionItem = ({ category, expandedCategory, toggleCategory, onProductClick }) => {
  const [ref, visible] = useIntersectionObserver({ threshold: 0.15 })
  const isExpanded = expandedCategory === category.id

  return (
    <div 
      ref={ref}
      id={category.id}
      className={`pp-category pp-category--${category.id} ${isExpanded ? 'pp-category--open' : ''} scroll-reveal ${visible ? 'scroll-reveal--visible' : ''}`}
      style={{ '--theme-color': category.themeColor }}
    >
      <div
        className="pp-category__banner"
        role="button"
        tabIndex={0}
        aria-expanded={isExpanded}
        onClick={() => toggleCategory(category.id)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            toggleCategory(category.id)
          }
        }}
      >
        <div className="pp-category__info">
          <h3 className="pp-category__name">{category.name}</h3>
          <p className="pp-category__tagline">{category.tagline}</p>
          <div className="pp-category__toggle-pill">
            <span>{isExpanded ? 'Close' : 'View Products'}</span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              className={`pp-category__chevron ${isExpanded ? 'open' : ''}`}
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </div>
        </div>
        <div className="pp-category__visual">
          <div className="pp-category__img-wrapper">
            <img src={category.image} className="pp-category__img" alt={category.name} />
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            style={{ overflow: 'hidden' }}
            className="pp-products-dropdown"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="pp-products-dropdown-inner"
            >
              <div className="pp-category__count-header">
                {category.products.length} PRODUCTS
              </div>
              <div className="pp-product-grid">
                {category.products.map((product, idx) => (
                  <motion.article
                    key={product.id}
                    className="pp-product-card"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ y: -6 }}
                    transition={{ duration: 0.25, delay: idx * 0.05 }}
                    onClick={() => onProductClick(product)}
                    style={{ cursor: 'pointer' }}
                  >
                    <div className="pp-product-card__media">
                      <img src={product.img} alt={product.name} />
                    </div>
                    <div className="pp-product-card__content">
                      <h4 className="pp-product-card__title">{product.name}</h4>
                      <span className="pp-product-card__form-size">{product.formSize.replace(' · ', ' - ')}</span>
                    </div>
                  </motion.article>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  )
}

const ProductsPage = () => {
  const location = useLocation()
  const [expandedCategory, setExpandedCategory] = useState(() => {
    return location.state?.category || null
  })
  const [heroVisible, setHeroVisible] = useState(false)
  const [headerRef, headerVisible] = useIntersectionObserver({ threshold: 0.15 })
  useDocumentTitle('Products')

  // Product modal state
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [zoom, setZoom] = useState(1)
  const [pan, setPan] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const dragStart = useRef({ x: 0, y: 0, panX: 0, panY: 0 })
  const imgContainerRef = useRef(null)

  const MIN_ZOOM = 1
  const MAX_ZOOM = 4

  const openProductModal = useCallback((product) => {
    setSelectedProduct(product)
    setZoom(1)
    setPan({ x: 0, y: 0 })
  }, [])

  const closeProductModal = useCallback(() => {
    setSelectedProduct(null)
    setZoom(1)
    setPan({ x: 0, y: 0 })
    setIsDragging(false)
  }, [])

  // Lock body scroll when modal is open
  useEffect(() => {
    if (!selectedProduct) return
    document.body.style.overflow = 'hidden'
    const handleEsc = (e) => { if (e.key === 'Escape') closeProductModal() }
    document.addEventListener('keydown', handleEsc)
    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', handleEsc)
    }
  }, [selectedProduct, closeProductModal])

  // Double-click to toggle zoom
  const handleImgDoubleClick = (e) => {
    e.preventDefault()
    if (zoom > 1) {
      setZoom(1)
      setPan({ x: 0, y: 0 })
    } else {
      setZoom(2.5)
    }
  }

  // Mouse wheel zoom
  const handleWheel = useCallback((e) => {
    e.preventDefault()
    const delta = e.deltaY
    setZoom(prev => {
      const next = prev - delta * 0.002
      const clamped = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, next))
      if (clamped <= 1) {
        // Schedule pan reset after zoom state update
        queueMicrotask(() => setPan({ x: 0, y: 0 }))
      }
      return clamped
    })
  }, [])

  // Attach wheel handler with { passive: false } so preventDefault works
  useEffect(() => {
    const el = imgContainerRef.current
    if (!el || !selectedProduct) return
    el.addEventListener('wheel', handleWheel, { passive: false })
    return () => el.removeEventListener('wheel', handleWheel)
  }, [selectedProduct, handleWheel])

  // Drag-to-pan handlers
  const handlePointerDown = (e) => {
    if (zoom <= 1) return
    e.preventDefault()
    setIsDragging(true)
    dragStart.current = { x: e.clientX, y: e.clientY, panX: pan.x, panY: pan.y }
    e.currentTarget.setPointerCapture(e.pointerId)
  }

  const handlePointerMove = (e) => {
    if (!isDragging || zoom <= 1) return
    const dx = e.clientX - dragStart.current.x
    const dy = e.clientY - dragStart.current.y
    setPan({ x: dragStart.current.panX + dx, y: dragStart.current.panY + dy })
  }

  const handlePointerUp = () => {
    setIsDragging(false)
  }

  useEffect(() => {
    const timer = setTimeout(() => setHeroVisible(true), 200)
    return () => clearTimeout(timer)
  }, [])

  const categoryFromState = location.state?.category

  useEffect(() => {
    let stateTimer
    let scrollTimer

    if (categoryFromState) {
      const categoryId = categoryFromState
      
      stateTimer = setTimeout(() => {
        setExpandedCategory(categoryId)
      }, 0)
      
      window.history.replaceState({}, document.title)

      scrollTimer = setTimeout(() => {
        const el = document.getElementById(categoryId)
        if (el) {
          const rect = el.getBoundingClientRect()
          const scrollTop = window.pageYOffset || document.documentElement.scrollTop
          const targetY = rect.top + scrollTop - 120
          window.scrollTo({ top: targetY, behavior: 'smooth' })
        }
      }, 400)
    } else {
      stateTimer = setTimeout(() => {
        setExpandedCategory(null)
      }, 0)
      window.scrollTo(0, 0)
    }

    return () => {
      if (stateTimer) clearTimeout(stateTimer)
      if (scrollTimer) clearTimeout(scrollTimer)
    }
  }, [location.key, categoryFromState])

  const toggleCategory = useCallback((categoryId) => {
    setExpandedCategory((prev) => (prev === categoryId ? null : categoryId))
  }, [])

  return (
    <div className="products-page">
      <section className="pp-hero">
        <div className="pp-hero__bg">
          <img src="https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=1600&auto=format&fit=crop&q=80" alt="Medicines and capsules" />
          <div className="pp-hero__overlay" />
        </div>

        <div className="pp-hero__content">
          <div className={`pp-hero__text scroll-reveal ${heroVisible ? 'scroll-reveal--visible' : ''}`}>
            <Link to="/" className="pp-back-btn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
              Back to Home
            </Link>
            <span className="pp-hero__label">OUR PORTFOLIO</span>
            <h1 className="pp-hero__title">Medicines Crafted with Science & Care</h1>
            <p className="pp-hero__sub">
              A trusted range across five therapeutic categories — formulated to the highest safety standards.
            </p>
            <div className="pp-hero__buttons">
              <a href="#products-categories" onClick={(e) => {
                e.preventDefault()
                document.getElementById('products-categories')?.scrollIntoView({ behavior: 'smooth' })
              }} className="btn btn-primary">
                Browse Categories
              </a>
              <Link to="/about" className="btn btn-outline">
                Quality Standards
              </Link>
            </div>
          </div>
        </div>

        <div className={`pp-hero__stats ${heroVisible ? 'pp-hero__stats--visible' : ''}`}>
          <div className="pp-hero__stats-inner container">
            <div className="pp-hero__stat" style={{ animationDelay: '0.6s' }}>
              <span className="pp-hero__stat-number">
                <CountUp end="5" />
              </span>
              <span className="pp-hero__stat-label">Therapeutic Range</span>
            </div>
            <div className="pp-hero__stat" style={{ animationDelay: '0.75s' }}>
              <span className="pp-hero__stat-number">
                <CountUp end="200" suffix="+" />
              </span>
              <span className="pp-hero__stat-label">Formulations</span>
            </div>
            <div className="pp-hero__stat" style={{ animationDelay: '0.9s' }}>
              <span className="pp-hero__stat-number">WHO-GMP</span>
              <span className="pp-hero__stat-label">Certified</span>
            </div>
            <div className="pp-hero__stat" style={{ animationDelay: '1.05s' }}>
              <span className="pp-hero__stat-number">
                <CountUp end="100" suffix="%" />
              </span>
              <span className="pp-hero__stat-label">Tested Efficacy</span>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="pp-hero__scroll">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </section>

      <section className="pp-selection container" id="products-categories">
        <div 
          ref={headerRef}
          className={`pp-explore-header scroll-reveal ${headerVisible ? 'scroll-reveal--visible' : ''}`}
        >
          <span className="section-label">Explore</span>
          <h2 className="section-title">Browse Products by Category</h2>
        </div>

        <div className="pp-categories-accordion">
          {categoriesData.map((category) => (
            <CategoryAccordionItem
              key={category.id}
              category={category}
              expandedCategory={expandedCategory}
              toggleCategory={toggleCategory}
              onProductClick={openProductModal}
            />
          ))}
        </div>
      </section>

      {/* ── Product Detail Modal ── */}
      {selectedProduct && (
        <div className="pp-modal" role="dialog" aria-modal="true" aria-label={selectedProduct.name}>
          <div className="pp-modal__backdrop" onClick={closeProductModal} aria-hidden="true" />
          <div className="pp-modal__content">
            <button className="pp-modal__close" onClick={closeProductModal} aria-label="Close">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
            <h3 className="pp-modal__title">{selectedProduct.name}</h3>
            <div
              className={`pp-modal__img-container ${zoom > 1 ? 'pp-modal__img-container--zoomed' : ''}`}
              ref={imgContainerRef}
              onDoubleClick={handleImgDoubleClick}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
            >
              <img
                src={selectedProduct.img}
                alt={selectedProduct.name}
                className="pp-modal__img"
                style={{
                  transform: `scale(${zoom}) translate(${pan.x / zoom}px, ${pan.y / zoom}px)`,
                  transition: isDragging ? 'none' : 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                }}
                draggable={false}
              />
            </div>
            <div className="pp-modal__zoom-hint">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /><line x1="11" y1="8" x2="11" y2="14" /><line x1="8" y1="11" x2="14" y2="11" />
              </svg>
              <span>{zoom > 1 ? 'Double-click to reset · Drag to pan' : 'Double-click or scroll to zoom'}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProductsPage
