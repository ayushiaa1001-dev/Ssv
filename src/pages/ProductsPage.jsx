import { useState, useEffect, useRef } from 'react'
import { useLocation, Link } from 'react-router-dom'
import './ProductsPage.css'

const categoriesData = [
  {
    id: 'cough-cold',
    name: 'Cough & Anti Cold Range',
    tagline: 'Breathe Easy, Live Fully',
    colorClass: 'cough-cold',
    themeColor: '#2e86ab',
    image: 'https://images.unsplash.com/photo-1550572017-edd951b55104?w=600&auto=format&fit=crop&q=80',
    products: [
      { id: 'ssvflu', name: 'SSVFlu', type: 'Syrup', desc: 'Effective relief from cold, cough, and nasal congestion.', img: 'https://images.unsplash.com/photo-1550572017-edd951b55104?w=400&auto=format&fit=crop' },
      { id: 'coldzap', name: 'ColdZap', type: 'Tablets', desc: 'Fast-acting formula for fever, headache, and body aches.', img: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&auto=format&fit=crop' },
      { id: 'tussrelief', name: 'TussRelief', type: 'Drops', desc: 'Pediatric drops for gentle cough relief and easy breathing.', img: 'https://images.unsplash.com/photo-1512678015690-7d9a4e11dab1?w=400&auto=format&fit=crop' },
      { id: 'bronco-ssv', name: 'BroncoSSV', type: 'Syrup', desc: 'Bronchodilator syrup for clearing chest congestion.', img: 'https://images.unsplash.com/photo-1628771065518-0d82f1110531?w=400&auto=format&fit=crop' }
    ]
  },
  {
    id: 'pain-management',
    name: 'Pain Management',
    tagline: 'Restoring Mobility, Relieving Pain',
    colorClass: 'pain-management',
    themeColor: '#e06a3b',
    image: 'https://images.unsplash.com/photo-1585435557343-3b092031a831?w=600&auto=format&fit=crop&q=80',
    products: [
      { id: 'painaway-sr', name: 'PainAway SR', type: 'Tablets', desc: 'Sustained-release tablets for long-lasting joint pain relief.', img: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&auto=format&fit=crop' },
      { id: 'flexmove', name: 'FlexMove', type: 'Gel', desc: 'Fast-absorbing topical gel for muscle and joint pain.', img: 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=400&auto=format&fit=crop' },
      { id: 'arthro-ssv', name: 'ArthroSSV', type: 'Capsules', desc: 'Enriched formula for rebuilding joint cartilage and flexibility.', img: 'https://images.unsplash.com/photo-1550572017-edd951b55104?w=400&auto=format&fit=crop' },
      { id: 'spasmossv', name: 'SpasmoSSV', type: 'Tablets', desc: 'Targeted relief from abdominal spasms and cramping pain.', img: 'https://images.unsplash.com/photo-1628771065518-0d82f1110531?w=400&auto=format&fit=crop' }
    ]
  },
  {
    id: 'gynae',
    name: 'Gynae Care',
    tagline: "Nurturing Women's Health at Every Stage",
    colorClass: 'gynae',
    themeColor: '#d44a70',
    image: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=600&auto=format&fit=crop&q=80',
    products: [
      { id: 'femicare', name: 'FemiCare', type: 'Tablets', desc: 'Comprehensive hormonal support and cycle regulation.', img: 'https://images.unsplash.com/photo-1512678015690-7d9a4e11dab1?w=400&auto=format&fit=crop' },
      { id: 'ironfem', name: 'IronFem', type: 'Syrup', desc: 'High-absorption iron supplement for optimal hemoglobin levels.', img: 'https://images.unsplash.com/photo-1550572017-edd951b55104?w=400&auto=format&fit=crop' },
      { id: 'cyclossv', name: 'CycloSSV', type: 'Capsules', desc: 'Natural herbal capsules for managing menstrual discomfort.', img: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&auto=format&fit=crop' },
      { id: 'folicssv', name: 'FolicSSV', type: 'Tablets', desc: 'Folic acid supplements essential for prenatal development.', img: 'https://images.unsplash.com/photo-1628771065518-0d82f1110531?w=400&auto=format&fit=crop' }
    ]
  },
  {
    id: 'gastro',
    name: 'Gastro Care',
    tagline: 'Gentle Care for Your Digestive Wellbeing',
    colorClass: 'gastro',
    themeColor: '#2b6cb0',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&auto=format&fit=crop&q=80',
    products: [
      { id: 'gastroease', name: 'GastroEase', type: 'Tablets', desc: 'Antacid tablets for fast relief from bloating and acidity.', img: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&auto=format&fit=crop' },
      { id: 'acidssv', name: 'AcidSSV', type: 'Suspension', desc: 'Soothing mint-flavored liquid antacid for heartburn relief.', img: 'https://images.unsplash.com/photo-1550572017-edd951b55104?w=400&auto=format&fit=crop' },
      { id: 'digestpro', name: 'DigestPro', type: 'Capsules', desc: 'Multi-enzyme capsules to assist digestion and nutrient intake.', img: 'https://images.unsplash.com/photo-1628771065518-0d82f1110531?w=400&auto=format&fit=crop' }
    ]
  },
  {
    id: 'general',
    name: 'General Health',
    tagline: 'Daily Support for a Vibrant Life',
    colorClass: 'general',
    themeColor: '#2f855a',
    image: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=600&auto=format&fit=crop&q=80',
    products: [
      { id: 'vitassv', name: 'VitaSSV', type: 'Multivitamin', desc: 'Daily vitamins and minerals for energy and immune defense.', img: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=400&auto=format&fit=crop' },
      { id: 'immunoboost', name: 'ImmunoBoost', type: 'Syrup', desc: 'Antioxidant and zinc rich syrup to strengthen natural immunity.', img: 'https://images.unsplash.com/photo-1550572017-edd951b55104?w=400&auto=format&fit=crop' },
      { id: 'calcissv', name: 'CalciSSV', type: 'Tablets', desc: 'Calcium & Vitamin D3 formulation for healthy bone density.', img: 'https://images.unsplash.com/photo-1628771065518-0d82f1110531?w=400&auto=format&fit=crop' }
    ]
  }
]

const ProductsPage = () => {
  const [expandedCategory, setExpandedCategory] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const location = useLocation()
  const categoryRefs = useRef({})

  // Handle accordion expansion and scrolling on nav
  useEffect(() => {
    if (location.state?.category) {
      const categoryId = location.state.category
      setExpandedCategory(categoryId)
      
      // Delay slightly for render cycles
      setTimeout(() => {
        const element = categoryRefs.current[categoryId]
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }, 200)
      
      // Clear navigation state
      window.history.replaceState({}, document.title)
    } else {
      window.scrollTo(0, 0)
    }
  }, [location])

  const toggleCategory = (id) => {
    if (expandedCategory === id) {
      setExpandedCategory(null)
    } else {
      setExpandedCategory(id)
      setTimeout(() => {
        const element = categoryRefs.current[id]
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }, 300)
    }
  }

  // Filter products based on search query
  const getFilteredCategories = () => {
    if (!searchQuery.trim()) return categoriesData

    const query = searchQuery.toLowerCase()
    return categoriesData.map(category => {
      const matchingProducts = category.products.filter(product => 
        product.name.toLowerCase().includes(query) ||
        product.type.toLowerCase().includes(query) ||
        product.desc.toLowerCase().includes(query)
      )
      return {
        ...category,
        products: matchingProducts
      }
    }).filter(category => category.products.length > 0)
  }

  const filteredCategories = getFilteredCategories()

  // Auto-expand accordions that have matches when searching
  useEffect(() => {
    if (searchQuery.trim() && filteredCategories.length > 0) {
      // If we have filtered categories, auto-expand the first one with results if none are expanded,
      // or expand all of them to show results instantly. Let's expand all with results for clarity.
      if (filteredCategories.length === 1) {
        setExpandedCategory(filteredCategories[0].id)
      }
    }
  }, [searchQuery])

  return (
    <div className="products-page">
      {/* ── Hero Banner ── */}
      <section className="pp-hero">
        <div className="pp-hero__bg">
          <img src="https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=1600&auto=format&fit=crop&q=80" alt="SSV pharmaceutical products background" />
          <div className="pp-hero__overlay" />
        </div>
        
        <div className="pp-hero__content container">
          <Link to="/" className="pp-back-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            Back to Home
          </Link>
          <span className="pp-hero__label">Our Formulations</span>
          <h1 className="pp-hero__title">Product Portfolio</h1>
          <p className="pp-hero__sub">
            Discover our comprehensive range of high-quality formulations, manufactured to meet international standards across five key therapeutic areas.
          </p>

          {/* Search Box */}
          <div className="pp-search">
            <div className="pp-search__box">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="pp-search__icon">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              <input
                type="text"
                className="pp-search__input"
                placeholder="Search products, dosage forms or descriptions..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button className="pp-search__clear" onClick={() => setSearchQuery('')} aria-label="Clear search">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── Accordion List ── */}
      <section className="pp-portfolio container">
        {filteredCategories.length > 0 ? (
          filteredCategories.map((category) => {
            const isOpen = expandedCategory === category.id
            return (
              <div 
                key={category.id} 
                className={`pp-category pp-category--${category.colorClass} ${isOpen ? 'pp-category--open' : ''}`}
                ref={el => categoryRefs.current[category.id] = el}
                id={category.id}
              >
                {/* Banner Accordion Header */}
                <button 
                  className="pp-category__banner"
                  onClick={() => toggleCategory(category.id)}
                  aria-expanded={isOpen}
                  style={{ '--theme-color': category.themeColor }}
                >
                  <div className="pp-category__info">
                    <h2 className="pp-category__name">{category.name}</h2>
                    <p className="pp-category__tagline">{category.tagline}</p>
                  </div>
                  
                  <div className="pp-category__visual">
                    <div className="pp-category__img-wrapper">
                      <img src={category.image} alt={category.name} className="pp-category__img" />
                    </div>
                    <div className="pp-category__chevron">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="9 18 15 12 9 6" />
                      </svg>
                    </div>
                  </div>
                </button>

                {/* Expanded Grid Content */}
                <div className="pp-category__collapse" style={{ maxHeight: isOpen ? '2000px' : '0' }}>
                  <div className="pp-category__grid-wrapper">
                    <div className="pp-category__grid">
                      {category.products.map((product, index) => (
                        <div 
                          key={product.id} 
                          className="pp-product-card animate-fade-up"
                          style={{ 
                            animationDelay: `${index * 80}ms`,
                            '--accent-color': category.themeColor 
                          }}
                        >
                          <div className="pp-product-card__img-container">
                            <img src={product.img} alt={product.name} className="pp-product-card__img" />
                            <span className="pp-product-card__badge" style={{ backgroundColor: category.themeColor }}>
                              {category.name.split(' ')[0]}
                            </span>
                          </div>
                          <div className="pp-product-card__content">
                            <div className="pp-product-card__header">
                              <h3 className="pp-product-card__title">{product.name}</h3>
                              <span className="pp-product-card__type">{product.type}</span>
                            </div>
                            <p className="pp-product-card__desc">{product.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )
          })
        ) : (
          <div className="pp-empty-state">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <h3>No Products Found</h3>
            <p>We couldn't find any products matching "<strong>{searchQuery}</strong>". Try searching for a different drug name or formulation.</p>
            <button className="btn btn-dark" style={{ marginTop: '16px' }} onClick={() => setSearchQuery('')}>Clear Search</button>
          </div>
        )}
      </section>
    </div>
  )
}

export default ProductsPage
