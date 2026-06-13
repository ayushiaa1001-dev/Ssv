import { useState, useEffect } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import './ProductsPage.css'

const categoriesData = [
  {
    id: 'cough-cold',
    name: 'Cough & Anti Cold Range',
    tagline: 'Fast-acting relief for cough, cold & congestion',
    themeColor: '#0077A8',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&auto=format&fit=crop&q=80',
    products: [
      { id: 'ssvflu', name: 'SSVFlu Syrup', formSize: 'Syrup · 100ml', desc: 'Effective relief from cold, cough, and nasal congestion.', img: 'https://images.unsplash.com/photo-1550572017-edd951b55104?w=400&auto=format&fit=crop' },
      { id: 'coldzap', name: 'ColdZap Tablets', formSize: 'Tablets · 10×10', desc: 'Fast-acting formula for fever, headache, and body aches.', img: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&auto=format&fit=crop' },
      { id: 'tussease', name: 'TussEase Drops', formSize: 'Drops · 30ml', desc: 'Pediatric drops for gentle cough relief and easy breathing.', img: 'https://images.unsplash.com/photo-1628771065518-0d82f1110531?w=400&auto=format&fit=crop' },
      { id: 'bronco-ssv', name: 'BroncoSSV Syrup', formSize: 'Syrup · 60ml', desc: 'Bronchodilator syrup for clearing chest congestion.', img: 'https://images.unsplash.com/photo-1512678015690-7d9a4e11dab1?w=400&auto=format&fit=crop' },
      { id: 'nasaclear', name: 'NasaClear Drops', formSize: 'Nasal · 10ml', desc: 'Fast relief from blocked nose and sinus pressure.', img: 'https://images.unsplash.com/photo-1628771065518-0d82f1110531?w=400&auto=format&fit=crop' },
      { id: 'vaporssv', name: 'VaporSSV Rub', formSize: 'Topical · 50g', desc: 'Soothing ointment to relieve chest and throat congestion.', img: 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=400&auto=format&fit=crop' }
    ]
  },
  {
    id: 'pain-management',
    name: 'Pain Management',
    tagline: 'Targeted relief for acute and chronic pain',
    themeColor: '#C75000',
    image: 'https://images.unsplash.com/photo-1585435557343-3b092031a831?w=600&auto=format&fit=crop&q=80',
    products: [
      { id: 'painaway-sr', name: 'PainAway SR', formSize: 'Tablets · 10×10', desc: 'Sustained-release tablets for long-lasting joint pain relief.', img: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&auto=format&fit=crop' },
      { id: 'flexmove', name: 'FlexMove Gel', formSize: 'Topical Gel · 30g', desc: 'Fast-absorbing topical gel for muscle and joint pain.', img: 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=400&auto=format&fit=crop' },
      { id: 'arthro-ssv', name: 'ArthroSSV', formSize: 'Capsules · 10×10', desc: 'Enriched formula for rebuilding joint cartilage and flexibility.', img: 'https://images.unsplash.com/photo-1550572017-edd951b55104?w=400&auto=format&fit=crop' },
      { id: 'spasmossv', name: 'SpasmoSSV', formSize: 'Tablets · 10×10', desc: 'Targeted relief from abdominal spasms and cramping pain.', img: 'https://images.unsplash.com/photo-1628771065518-0d82f1110531?w=400&auto=format&fit=crop' },
      { id: 'musclerel', name: 'MuscleRel SSV', formSize: 'Tablets · 10×10', desc: 'Muscle relaxant formula to ease stiffness and tension.', img: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&auto=format&fit=crop' }
    ]
  },
  {
    id: 'gynae',
    name: 'Gynae Care',
    tagline: "Trusted care for women's health & wellness",
    themeColor: '#9C1A5E',
    image: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=600&auto=format&fit=crop&q=80',
    products: [
      { id: 'femicare', name: 'FemiCare Tablets', formSize: 'Tablets · 3×10', desc: 'Comprehensive hormonal support and cycle regulation.', img: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&auto=format&fit=crop' },
      { id: 'ironfem', name: 'IronFem Syrup', formSize: 'Syrup · 200ml', desc: 'High-absorption iron supplement for optimal hemoglobin levels.', img: 'https://images.unsplash.com/photo-1550572017-edd951b55104?w=400&auto=format&fit=crop' },
      { id: 'cyclossv', name: 'CycloSSV', formSize: 'Capsules · 2×10', desc: 'Natural herbal capsules for managing menstrual discomfort.', img: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&auto=format&fit=crop' },
      { id: 'folicssv', name: 'FolicSSV', formSize: 'Tablets · 3×10', desc: 'Folic acid supplements essential for prenatal development.', img: 'https://images.unsplash.com/photo-1628771065518-0d82f1110531?w=400&auto=format&fit=crop' },
      { id: 'calcimom', name: 'CalciMom', formSize: 'Tablets · 3×10', desc: 'Calcium and mineral support tailored for mothers.', img: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&auto=format&fit=crop' }
    ]
  },
  {
    id: 'gastro',
    name: 'Gastro Care',
    tagline: 'Complete digestive & gastrointestinal care',
    themeColor: '#1D6A3A',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&auto=format&fit=crop&q=80',
    products: [
      { id: 'gastroease', name: 'GastroEase', formSize: 'Tablets · 10×10', desc: 'Antacid tablets for fast relief from bloating and acidity.', img: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&auto=format&fit=crop' },
      { id: 'acidssv', name: 'AcidSSV', formSize: 'Suspension · 170ml', desc: 'Soothing mint-flavored liquid antacid for heartburn relief.', img: 'https://images.unsplash.com/photo-1550572017-edd951b55104?w=400&auto=format&fit=crop' },
      { id: 'digestpro', name: 'DigestPro', formSize: 'Capsules · 3×10', desc: 'Multi-enzyme capsules to assist digestion and nutrient intake.', img: 'https://images.unsplash.com/photo-1628771065518-0d82f1110531?w=400&auto=format&fit=crop' },
      { id: 'liverssv', name: 'LiverSSV Syrup', formSize: 'Syrup · 200ml', desc: 'Herbal liver tonic for detoxification and healthy function.', img: 'https://images.unsplash.com/photo-1550572017-edd951b55104?w=400&auto=format&fit=crop' }
    ]
  },
  {
    id: 'general',
    name: 'General Health',
    tagline: 'Vitamins, minerals & everyday immunity support',
    themeColor: '#5B3FA0',
    image: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=600&auto=format&fit=crop&q=80',
    products: [
      { id: 'vitassv', name: 'VitaSSV Multi', formSize: 'Tablets · 3×10', desc: 'Daily vitamins and minerals for energy and immune defense.', img: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=400&auto=format&fit=crop' },
      { id: 'immunoboost', name: 'ImmunoBoost', formSize: 'Syrup · 200ml', desc: 'Antioxidant and zinc rich syrup to strengthen natural immunity.', img: 'https://images.unsplash.com/photo-1550572017-edd951b55104?w=400&auto=format&fit=crop' },
      { id: 'calcissv', name: 'CalciSSV', formSize: 'Tablets · 3×10', desc: 'Calcium & Vitamin D3 formulation for healthy bone density.', img: 'https://images.unsplash.com/photo-1628771065518-0d82f1110531?w=400&auto=format&fit=crop' },
      { id: 'omegassv', name: 'OmegaSSV', formSize: 'Capsules · 3×10', desc: 'Omega-3 fatty acid capsules for heart and cognitive health.', img: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=400&auto=format&fit=crop' },
      { id: 'zincssv', name: 'ZincSSV', formSize: 'Tablets · 3×10', desc: 'Zinc supplements to support immunity and skin health.', img: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&auto=format&fit=crop' }
    ]
  }
]

const ProductsPage = () => {
  const location = useLocation()
  const [activeCategory, setActiveCategory] = useState(categoriesData[0].id)

  useEffect(() => {
    if (location.state?.category) {
      const selected = categoriesData.find((category) => category.id === location.state.category)
      if (selected) {
        setActiveCategory(selected.id)
      }
      window.history.replaceState({}, document.title)
    }
  }, [location.state])

  const currentCategory = categoriesData.find((category) => category.id === activeCategory) || categoriesData[0]

  return (
    <div className="products-page">
      <section className="pp-hero">
        <div className="pp-hero__bg">
          <img src="https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=1600&auto=format&fit=crop&q=80" alt="Medicines and capsules" />
          <div className="pp-hero__overlay" />
        </div>

        <div className="pp-hero__content container">
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
        </div>
      </section>

      <section className="pp-selection container">
        <div className="pp-selection__top">
          <div className="pp-categories__intro">
            <span className="section-label">Category selector</span>
            <h2 className="section-title">Select the range you want to explore</h2>
            <p className="section-copy">
              The dropdown lets you switch between therapeutic categories and reveals the matching products below.
            </p>
          </div>

          <div className="pp-category-select">
            <label htmlFor="categorySelect">Choose a category</label>
            <div className="pp-category-select__field">
              <select
                id="categorySelect"
                value={activeCategory}
                onChange={(event) => setActiveCategory(event.target.value)}
              >
                {categoriesData.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="pp-category-preview" style={{ '--accent-color': currentCategory.themeColor }}>
          <div className="pp-category-preview__content">
            <span className="pp-category-preview__eyebrow">Category overview</span>
            <h2>{currentCategory.name}</h2>
            <p>{currentCategory.tagline}</p>
          </div>
          <div className="pp-category-preview__media">
            <img src={currentCategory.image} alt={currentCategory.name} />
          </div>
        </div>

        <main className="pp-products-panel">
          <div className="pp-products-panel__header" style={{ '--accent-color': currentCategory.themeColor }}>
            <span className="pp-products-panel__eyebrow">Product range</span>
            <h2 className="pp-products-panel__headline">{currentCategory.name} products</h2>
            <p className="pp-products-panel__description">{currentCategory.tagline}</p>
            <div className="pp-products-panel__status">
              <span>{currentCategory.products.length} products</span>
              <span className="pp-products-panel__divider" />
              <span>Square product cards with image, name and form</span>
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentCategory.id}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -18 }}
              transition={{ duration: 0.35 }}
              className="pp-product-grid"
            >
              {currentCategory.products.map((product) => (
                <motion.article
                  key={product.id}
                  className="pp-product-card"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="pp-product-card__media">
                    <img src={product.img} alt={product.name} />
                  </div>
                  <div className="pp-product-card__content">
                    <span className="pp-product-card__form">{product.formSize}</span>
                    <h3>{product.name}</h3>
                    <p>{product.desc}</p>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </AnimatePresence>

          <section className="pp-cta-strip">
            <div className="pp-cta-strip__inner">
              <div>
                <p className="pp-cta-strip__label">Custom orders welcome</p>
                <h3>Speak with our team for bulk supply and branded formulations.</h3>
              </div>
              <Link to="/about" className="btn btn-primary">Contact Us</Link>
            </div>
          </section>
        </main>
      </section>
    </div>
  )
}

export default ProductsPage
