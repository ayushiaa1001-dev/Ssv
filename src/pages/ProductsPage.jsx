import { useState, useEffect, useRef, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import CountUp from "../components/CountUp";
import ComingSoonCard from "../components/ComingSoon/ComingSoon";
import productsHeroBg from "../assets/images/products-hero-bg.jpg";
import "./ProductsPage.css";

const BASE = import.meta.env.BASE_URL;

const categoriesData = [
  {
    id: "cough-cold",
    name: "Cough & Anti Cold Range",
    tagline: "Fast-acting relief for cough, cold & congestion",
    themeColor: "#0077A8",
    image:
      "https://images.unsplash.com/photo-1635166304271-04931640a450?w=1000&h=800&fit=crop&auto=format",
    products: [
      {
        id: "Alnil",
        name: "Alnil",
        type: "Tablets",
        quantity: "10 x 10 Tablets",
        desc: "Effective relief from joint pain, muscle aches, and fever.",
        img: `${BASE}products/Alnil.png`,
      },
      {
        id: "Alnil-M",
        name: "Alnil-M",
        type: "Tablets",
        quantity: "10 x 10 Tablets",
        desc: "Fast-acting relief from severe pain, swelling, and inflammation.",
        img: `${BASE}products/Alnil-M.png`,
      },
      {
        id: "Felocold",
        name: "Felocold",
        type: "Tablets",
        quantity: "10 x 10 Tablets",
        desc: "Comprehensive relief from cold, flu, fever, and nasal congestion.",
        img: `${BASE}products/Felocold.png`,
      },
      {
        id: "Felocold Susp.",
        name: "Felocold Susp.",
        type: "Suspension",
        quantity: "60 ml",
        desc: "Gentle and effective relief for children's cold, cough, and fever symptoms.",
        img: `${BASE}products/Felocold%20Susp.jpeg`,
      },
      {
        id: "Felokof-Dx",
        name: "Felokof-Dx",
        type: "Syrup",
        quantity: "100 ml",
        desc: "Provides soothing relief from dry, irritating cough and nasal congestion.",
        img: `${BASE}products/Felokof-DX.png`,
      },
    ],
  },
  {
    id: "pain-management",
    name: "Pain Management",
    tagline: "Targeted relief for acute and chronic pain",
    themeColor: "#C75000",
    image:
      "https://images.unsplash.com/photo-1719319384377-5f5a45b2f0d1?w=1000&h=800&fit=crop&auto=format",
    products: [
      {
        id: "Felo",
        name: "Felo",
        type: "Tablets",
        quantity: "10 x 10 Tablets",
        desc: "Dual-action formula for quick relief from acute pain and high fever.",
        img: `${BASE}products/Felo.png`,
      },
      {
        id: "Felo-MR",
        name: "Felo-MR",
        type: "Tablets",
        quantity: "10 x 10 Tablets",
        desc: "Advanced relief from muscle spasms, stiffness, and joint inflammation.",
        img: `${BASE}products/Felo-MR.png`,
      },
      {
        id: "Felodol",
        name: "Felodol",
        type: "Tablets",
        quantity: "10 x 10 Tablets",
        desc: "Trusted painkiller for relieving backache, toothache, and mild joint pain.",
        img: `${BASE}products/Felodol.png`,
      },
      {
        id: "Felodol-SP",
        name: "Felodol-SP",
        type: "Tablets",
        quantity: "10 x 10 Tablets",
        desc: "Triple-action therapy for severe pain and rapid reduction of tissue swelling.",
        img: `${BASE}products/Felodol-SP.png`,
      },
    ],
  },
  {
    id: "gynae",
    name: "Gynae Care",
    tagline: "Trusted care for women's health & wellness",
    themeColor: "#9C1A5E",
    image:
      "https://images.unsplash.com/photo-1559087316-6b27308e53f6?w=1000&h=800&fit=crop&auto=format",
    products: [
      {
        id: "Ss Cal",
        name: "Ss Cal",
        type: "Tablets",
        quantity: "10 x 15 Tablets",
        desc: "Essential daily supplement for stronger bones, joints, and overall immunity.",
        img: `${BASE}products/SS%20Cal.png`,
      },
      {
        id: "Hemopeak",
        name: "Hemopeak",
        type: "Tablets",
        quantity: "10 x 15 Tablets",
        desc: "Boosts iron levels and energy, effectively combating anemia and fatigue.",
        img: `${BASE}products/Hemopeak.png`,
      },
    ],
  },
  {
    id: "gastro",
    name: "Gastro Care",
    tagline: "Complete digestive & gastrointestinal care",
    themeColor: "#1D6A3A",
    image:
      "https://plus.unsplash.com/premium_photo-1668487826871-2f2cac23ad56?q=80&w=1412&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    products: [
      {
        id: "Rabpad-DSR",
        name: "Rabpad-DSR",
        type: "Capsules",
        quantity: "10 x 10 Capsules",
        desc: "Fast, sustained relief from severe acidity, heartburn, and gastric discomfort.",
        img: `${BASE}products/Rabpad-DSR.png`,
      },
      {
        id: "Rabpad-20",
        name: "Rabpad-20",
        type: "Tablets",
        quantity: "10 x 10 Tablets",
        desc: "Effectively reduces stomach acid to treat ulcers and chronic heartburn.",
        img: `${BASE}products/Rabpad-20.png`,
      },
    ],
  },
  {
    id: "general",
    name: "General Health",
    tagline: "Vitamins, minerals & everyday immunity support",
    themeColor: "#5B3FA0",
    image:
      "https://images.unsplash.com/photo-1584174594005-60a49c828bbc?q=80&w=1436&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    products: [
      {
        id: "OMGOD",
        name: "OMGOD",
        type: "Capsules",
        quantity: "1 x 10 Soft Gelatin Capsules",
        desc: "Premium blend of multivitamins and antioxidants to support heart, brain, and daily vitality.",
        img: `${BASE}products/OMGOD.png`,
      },
      {
        id: "Ver-D",
        name: "Ver-D",
        type: "Tablets",
        quantity: "10 x 10 Tablets",
        desc: "Provides rapid relief from vertigo, motion sickness, and associated nausea.",
        img: `${BASE}products/Ver-D.png`,
      },
      {
        id: "Flupact",
        name: "Flupact",
        type: "Tablets",
        quantity: "10 x 10 Tablets",
        desc: "Effective preventative treatment for recurrent migraines and severe headaches.",
        img: `${BASE}products/Flupact.png`,
      },
      {
        id: "Versadine",
        name: "Versadine",
        type: "Ointment",
        quantity: "20 g",
        desc: "Broad-spectrum antiseptic ointment for preventing infections in cuts, burns, and wounds.",
        img: `${BASE}products/Versadine.png`,
      },
    ],
  },
  {
    id: "all-products",
    name: "All Products",
    tagline: "Browse our complete pharmaceutical portfolio",
    themeColor: "#1b4f72",
    image:
      "https://images.unsplash.com/photo-1655913198024-1a30f1c911e5?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    products: [],
  },
];

// Populate "All Products" with every product from all other categories
const allIdx = categoriesData.length - 1;
categoriesData[allIdx].products = categoriesData
  .slice(0, allIdx)
  .flatMap((cat) => cat.products.map((p) => ({ ...p, category: cat.name })));

const CategoryCard = ({ category, isExpanded, isInactive, onToggle }) => {
  return (
    <motion.div
      id={category.id}
      className={`pp-cat-card ${isExpanded ? "is-expanded" : ""} ${isInactive ? "is-inactive" : ""}`}
      style={{ borderRadius: 16 }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div
        className="pp-cat-card__banner"
        onClick={() => onToggle(category.id)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onToggle(category.id);
          }
        }}
      >
        <img
          src={category.image}
          alt={category.name}
          className="pp-cat-card__bg"
          loading="lazy"
        />
        <div className="pp-cat-card__overlay" />

        <span className="pp-cat-card__badge">
          {category.products.length} products
        </span>

        <div className="pp-cat-card__text">
          <h3 className="pp-cat-card__name">{category.name}</h3>
          <p className="pp-cat-card__tagline">{category.tagline}</p>
        </div>

        <div className="pp-cat-card__toggle">
          <span className="pp-cat-card__toggle-label">
            {isExpanded ? "CLOSE" : "VIEW PRODUCTS"}
          </span>
          <motion.span
            className="pp-cat-card__toggle-icon"
            animate={{ rotate: isExpanded ? 90 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {isExpanded ? "×" : "+"}
          </motion.span>
        </div>

        {/* Teal accent bar */}
        <motion.div
          className="pp-cat-card__accent"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isExpanded ? 1 : 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformOrigin: "left" }}
        />
      </div>
    </motion.div>
  );
};

const ProductsPage = () => {
  const [heroVisible, setHeroVisible] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [cols, setCols] = useState(3);
  const location = useLocation();
  const imgContainerRef = useRef(null);
  const dragStart = useRef({ x: 0, y: 0, panX: 0, panY: 0 });
  const [headerRef, headerVisible] = useIntersectionObserver({ threshold: 0.15 });

  useEffect(() => {
    const updateCols = () => {
      if (window.innerWidth >= 1024) setCols(3);
      else if (window.innerWidth >= 768) setCols(2);
      else setCols(1);
    };
    updateCols();
    window.addEventListener("resize", updateCols);
    return () => window.removeEventListener("resize", updateCols);
  }, []);

  const rows = [];
  for (let i = 0; i < categoriesData.length; i += cols) {
    rows.push(categoriesData.slice(i, i + cols));
  }

  useDocumentTitle("Products - SSV Pharmaceuticals");

  const MIN_ZOOM = 1;
  const MAX_ZOOM = 4;

  const openProductModal = useCallback((product) => {
    setSelectedProduct(product);
    setZoom(1);
    setPan({ x: 0, y: 0 });
  }, []);

  const closeProductModal = useCallback(() => {
    setSelectedProduct(null);
    setZoom(1);
    setPan({ x: 0, y: 0 });
    setIsDragging(false);
  }, []);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (!selectedProduct) return;
    document.body.style.overflow = "hidden";
    const handleEsc = (e) => {
      if (e.key === "Escape") closeProductModal();
    };
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleEsc);
    };
  }, [selectedProduct, closeProductModal]);


  // Double-click to toggle zoom
  const handleImgDoubleClick = (e) => {
    e.preventDefault();
    if (zoom > 1) {
      setZoom(1);
      setPan({ x: 0, y: 0 });
    } else {
      setZoom(2.5);
    }
  };

  // Mouse wheel zoom
  const handleWheel = useCallback((e) => {
    e.preventDefault();
    const delta = e.deltaY;
    setZoom((prev) => {
      const next = prev - delta * 0.002;
      const clamped = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, next));
      if (clamped <= 1) {
        // Schedule pan reset after zoom state update
        queueMicrotask(() => setPan({ x: 0, y: 0 }));
      }
      return clamped;
    });
  }, []);

  // Attach wheel handler with { passive: false } so preventDefault works
  useEffect(() => {
    const el = imgContainerRef.current;
    if (!el || !selectedProduct) return;
    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => el.removeEventListener("wheel", handleWheel);
  }, [selectedProduct, handleWheel]);

  // Drag-to-pan handlers
  const handlePointerDown = (e) => {
    if (zoom <= 1) return;
    e.preventDefault();
    setIsDragging(true);
    dragStart.current = {
      x: e.clientX,
      y: e.clientY,
      panX: pan.x,
      panY: pan.y,
    };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e) => {
    if (!isDragging || zoom <= 1) return;
    const dx = e.clientX - dragStart.current.x;
    const dy = e.clientY - dragStart.current.y;
    setPan({ x: dragStart.current.panX + dx, y: dragStart.current.panY + dy });
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    const timer = setTimeout(() => setHeroVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  // Use a ref to track if user has manually scrolled during auto-scroll
  const autoScrollActive = useRef(false);

  const smoothScrollTo = useCallback((id) => {
    const el = document.getElementById(id);
    if (!el) return;
    
    // Use a slightly longer delay to let Framer Motion layout shift begin
    setTimeout(() => {
      autoScrollActive.current = true;
      const y = el.getBoundingClientRect().top + window.scrollY - 120;
      window.scrollTo({ top: y, behavior: "smooth" });
      
      // Secondary check to ensure we land perfectly after layout animation finishes
      setTimeout(() => {
        if (autoScrollActive.current) {
          const finalY = el.getBoundingClientRect().top + window.scrollY - 120;
          window.scrollTo({ top: finalY, behavior: "smooth" });
          autoScrollActive.current = false;
        }
      }, 650);
    }, 100);
  }, []);

  // Core function: sequenced navigation from dropdown
  const switchToCategory = useCallback(
    (categoryId) => {
      if (expandedCategory === categoryId) {
        smoothScrollTo(categoryId);
        return;
      }

      setExpandedCategory(categoryId);
      smoothScrollTo(categoryId);
    },
    [expandedCategory, smoothScrollTo]
  );

  // Listen for same-page category switches from Navbar (custom event)
  useEffect(() => {
    const handler = (e) => {
      switchToCategory(e.detail);
    };
    window.addEventListener("ssv-switch-category", handler);
    return () => {
      window.removeEventListener("ssv-switch-category", handler);
    };
  }, [switchToCategory]);

  // Handle navigation from another page (location.state)
  useEffect(() => {
    const categoryId = location.state?.category;
    if (categoryId) {
      window.history.replaceState({}, document.title);
      // Wait for page to render then open
      setTimeout(() => {
        switchToCategory(categoryId);
      }, 300);
    }
  }, [location, switchToCategory]);

  // Check URL hash on load
  useEffect(() => {
    const hash = location.hash.replace("#", "");
    if (hash && categoriesData.some((c) => c.id === hash)) {
      setTimeout(() => switchToCategory(hash), 0);
    }
  }, [location, switchToCategory]);

  const toggleCategory = useCallback((categoryId) => {
    if (expandedCategory === categoryId) {
      setExpandedCategory(null);
    } else {
      setExpandedCategory(categoryId);
      smoothScrollTo(categoryId);
    }
  }, [expandedCategory, smoothScrollTo]);

  return (
    <div className="products-page">
      <section className="pp-hero">
        <div className="pp-hero__bg">
          <img
            src={productsHeroBg}
            alt="Pharmaceutical Products"
            loading="lazy"
          />
          <div className="pp-hero__overlay" />
        </div>

        <div className="pp-hero__content">
          <div
            className={`pp-hero__text scroll-reveal ${heroVisible ? "scroll-reveal--visible" : ""}`}
          >
            <Link to="/" className="pp-back-btn">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              >
                <polyline points="15 18 9 12 15 6" />
              </svg>
              Back to Home
            </Link>
            <span className="pp-hero__label">OUR PORTFOLIO</span>
            <h1 className="pp-hero__title">
              Medicines Crafted with Science & Care
            </h1>
            <p className="pp-hero__sub">
              A trusted range across five therapeutic categories — formulated to
              the highest safety standards.
            </p>
            <div className="pp-hero__buttons">
              <Link to="/careers" className="btn btn-primary">
                Join Our Team
              </Link>
              <Link to="/events/culture" className="btn btn-outline">
                Life at SSV
              </Link>
            </div>
          </div>
        </div>

        <div
          className={`pp-hero__stats ${heroVisible ? "pp-hero__stats--visible" : ""}`}
        >
          <div className="pp-hero__stats-inner container">
            <div className="pp-hero__stat" style={{ animationDelay: "0.6s" }}>
              <span className="pp-hero__stat-number">
                <CountUp end="5" />
              </span>
              <span className="pp-hero__stat-label">Therapeutic Range</span>
            </div>
            <div className="pp-hero__stat" style={{ animationDelay: "0.75s" }}>
              <span className="pp-hero__stat-number">
                <CountUp end="200" suffix="+" />
              </span>
              <span className="pp-hero__stat-label">Formulations</span>
            </div>
            <div className="pp-hero__stat" style={{ animationDelay: "0.9s" }}>
              <span className="pp-hero__stat-number">WHO-GMP</span>
              <span className="pp-hero__stat-label">Certified</span>
            </div>
            <div className="pp-hero__stat" style={{ animationDelay: "1.05s" }}>
              <span className="pp-hero__stat-number">
                <CountUp end="100" suffix="%" />
              </span>
              <span className="pp-hero__stat-label">Tested Efficacy</span>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="pp-hero__scroll">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </section>

      {/* ── New Ranges — Coming Soon ── */}
      <section className="pp-coming-soon-section container" id="upcoming-products" style={{ marginTop: "40px", marginBottom: "10px" }}>
        <ComingSoonCard 
          isExpanded={expandedCategory === 'upcoming-products'} 
          onToggle={() => toggleCategory('upcoming-products')} 
        />
      </section>

      <section className="pp-selection container" id="products-categories">
        <div
          ref={headerRef}
          className={`pp-explore-header scroll-reveal ${headerVisible ? "scroll-reveal--visible" : ""}`}
        >
          <span className="section-label">Explore</span>
          <h2 className="section-title">Browse Products by Category</h2>
        </div>

        <div className="pp-categories-layout" style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          {rows.map((row, rowIndex) => {
            const activeCat = row.find((c) => c.id === expandedCategory);

            return (
              <div key={rowIndex} className="pp-categories-row-group">
                <div className="pp-categories-grid" style={{ marginBottom: activeCat ? "24px" : "0" }}>
                  {row.map((category) => (
                    <CategoryCard
                      key={category.id}
                      category={category}
                      isExpanded={expandedCategory === category.id}
                      isInactive={expandedCategory !== null && expandedCategory !== category.id}
                      onToggle={toggleCategory}
                    />
                  ))}
                </div>

                <AnimatePresence>
                  {activeCat && (
                    <motion.div
                      className="pp-expanded-panel-wrapper"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      style={{ overflow: "hidden" }}
                    >
                      <div className="pp-expanded-panel-inner">
                        <AnimatePresence mode="wait">
                          <motion.div 
                            key={activeCat.id}
                            className="pp-product-grid" 
                            style={{ paddingBottom: "16px" }}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                          >
                          {activeCat.products.map((product, idx) => (
                            <motion.article
                              key={product.id}
                              className="pp-product-card pp-product-card--elevated"
                              initial={{ opacity: 0, y: 15 }}
                              animate={{ opacity: 1, y: 0 }}
                              whileHover={{ y: -6, boxShadow: "0 16px 40px rgba(0,0,0,0.12)" }}
                              whileTap={{ scale: 0.98 }}
                              transition={{ duration: 0.3, delay: idx * 0.05 }}
                              onClick={() => openProductModal(product)}
                              role="button"
                              tabIndex={0}
                            >
                              <div className="pp-product-card__media">
                                <img src={product.img} alt={product.name} loading="lazy" />
                              </div>
                              <div className="pp-product-card__content">
                                <h4 className="pp-product-card__title">{product.name}</h4>
                                {product.type && (
                                  <span className="pp-product-card__type">
                                    {product.type}
                                  </span>
                                )}
                                {product.quantity && (
                                  <span className="pp-product-card__form-size">
                                    {product.quantity}
                                  </span>
                                )}
                                {product.desc && (
                                  <p className="pp-product-card__desc">{product.desc}</p>
                                )}
                              </div>
                            </motion.article>
                          ))}
                          </motion.div>
                        </AnimatePresence>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>


      {/* ── Product Detail Modal ── */}
      {selectedProduct && (
        <div
          className="pp-modal"
          role="dialog"
          aria-modal="true"
          aria-label={selectedProduct.name}
        >
          <div
            className="pp-modal__backdrop"
            onClick={closeProductModal}
            aria-hidden="true"
          />
          <div className="pp-modal__content">
            <button
              className="pp-modal__close"
              onClick={closeProductModal}
              aria-label="Close"
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
            <h3 className="pp-modal__title">{selectedProduct.name}</h3>
            {selectedProduct.type && (
              <span className="pp-modal__type">
                {selectedProduct.type} {selectedProduct.quantity ? `· ${selectedProduct.quantity}` : ""}
              </span>
            )}
            {selectedProduct.desc && (
              <p className="pp-modal__desc">{selectedProduct.desc}</p>
            )}
            <div
              className={`pp-modal__img-container ${zoom > 1 ? "pp-modal__img-container--zoomed" : ""}`}
              ref={imgContainerRef}
              onDoubleClick={handleImgDoubleClick}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
            >
              <img
                src={selectedProduct.img.replace(/w=\d+/, "w=1200")}
                alt={selectedProduct.name}
                className="pp-modal__img"
                style={{
                  transform: `scale(${zoom}) translate(${pan.x / zoom}px, ${pan.y / zoom}px)`,
                  transition: isDragging
                    ? "none"
                    : "transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                }}
                draggable={false}
              />
            </div>
            <div className="pp-modal__zoom-hint">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
                <line x1="11" y1="8" x2="11" y2="14" />
                <line x1="8" y1="11" x2="14" y2="11" />
              </svg>
              <span>
                {zoom > 1
                  ? "Double-click to reset · Drag to pan"
                  : "Double-click or scroll to zoom"}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
