import { useState, useEffect, useRef, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import CountUp from "../components/CountUp";
import ComingSoonCard from "../components/ComingSoon/ComingSoon";
import "./ProductsPage.css";

const UPCOMING_EVENTS = [
  {
    id: 1,
    date: 'JUL 18',
    title: 'SSV Leadership Summit 2026',
    venue: 'Taj Vivanta, New Delhi',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=700&auto=format&fit=crop&q=80'
  },
  {
    id: 2,
    date: 'AUG 05',
    title: 'Annual Health & Wellness Expo',
    venue: 'SSV Campus, Ahmedabad',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=700&auto=format&fit=crop&q=80'
  },
  {
    id: 3,
    date: 'SEP 12',
    title: 'Innovation & R&D Showcase',
    venue: 'World Trade Centre, Mumbai',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=700&auto=format&fit=crop&q=80'
  },
  {
    id: 4,
    date: 'OCT 22',
    title: 'Annual Gala Night 2026',
    venue: 'ITC Grand Bharat, Gurugram',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=700&auto=format&fit=crop&q=80'
  },
  {
    id: 5,
    date: 'NOV 08',
    title: 'Pan-India Sales Conference',
    venue: 'Leela Palace, Bengaluru',
    image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=700&auto=format&fit=crop&q=80'
  },
  {
    id: 6,
    date: 'DEC 15',
    title: 'Year-End Celebration & Awards',
    venue: 'SSV Headquarters, Ahmedabad',
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=700&auto=format&fit=crop&q=80'
  }
];

const categoriesData = [
  {
    id: "cough-cold",
    name: "Cough & Anti Cold Range",
    tagline: "Fast-acting relief for cough, cold & congestion",
    themeColor: "#0077A8",
    image:
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&auto=format&fit=crop&q=80",
    products: [
      {
        id: "Alnil",
        name: "Alnil",
        formSize: "Tablets · 10x10",
        desc: "Effective relief from cold, cough, and nasal congestion.",
        img: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&auto=format&fit=crop&q=80",
      },
      {
        id: "Alnil-M",
        name: "Alnil-M",
        formSize: "Tablets · 10×10",
        desc: "Fast-acting formula for fever, headache, and body aches.",
        img: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&auto=format&fit=crop&q=80",
      },
      {
        id: "Felo Cold",
        name: "Felo Cold",
        formSize: "Tablets · 10x10",
        desc: "Effective relief from cold, cough, and nasal congestion.",
        img: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&auto=format&fit=crop&q=80",
      },
      {
        id: "Felocold Susp.",
        name: "Felocold Susp.",
        formSize: "Syrup · 60ml",
        desc: "Bronchodilator syrup for clearing chest congestion.",
        img: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&auto=format&fit=crop&q=80",
      },
      {
        id: "Felokof-Dx",
        name: "Felokof-Dx",
        formSize: "Syrup · 100ml",
        desc: "Effective relief from wet cough and chest congestion.",
        img: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&auto=format&fit=crop&q=80",
      },
      {
        id: "vaporssv",
        name: "VaporSSV Rub",
        formSize: "Topical · 50g",
        desc: "Soothing ointment to relieve chest and throat congestion.",
        img: "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=400&auto=format&fit=crop&q=80",
      },
    ],
  },
  {
    id: "pain-management",
    name: "Pain Management",
    tagline: "Targeted relief for acute and chronic pain",
    themeColor: "#C75000",
    image:
      "https://images.unsplash.com/photo-1585435557343-3b092031a831?w=600&auto=format&fit=crop&q=80",
    products: [
      {
        id: "Felo",
        name: "Felo",
        formSize: "Tablets · 10×10",
        desc: "Sustained-release tablets for long-lasting joint pain relief.",
        img: "https://images.unsplash.com/photo-1631549916768-4119b255f926?w=400&auto=format&fit=crop&q=80",
      },
      {
        id: "Felo-MR",
        name: "Felo-MR",
        formSize: "Tablets · 10x10",
        desc: "Effective relief from muscle pain and inflammation.",
        img: "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=400&auto=format&fit=crop&q=80",
      },
      {
        id: "Felodol",
        name: "Felodol",
        formSize: "Tablets · 10x10",
        desc: "Enriched formula for rebuilding joint cartilage and flexibility.",
        img: "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=400&auto=format&fit=crop&q=80",
      },
      {
        id: "Felodol-SP",
        name: "Felodol-SP",
        formSize: "Tablets · 10×10",
        desc: "Effective pain relief with added anti-inflammatory benefits.",
        img: "https://images.unsplash.com/photo-1550572017-edd951b55104?w=400&auto=format&fit=crop&q=80",
      },
      {
        id: "musclerel",
        name: "MuscleRel SSV",
        formSize: "Tablets · 10×10",
        desc: "Muscle relaxant formula to ease stiffness and tension.",
        img: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&auto=format&fit=crop&q=80",
      },
    ],
  },
  {
    id: "gynae",
    name: "Gynae Care",
    tagline: "Trusted care for women's health & wellness",
    themeColor: "#9C1A5E",
    image:
      "https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=600&auto=format&fit=crop&q=80",
    products: [
      {
        id: "SSCAL",
        name: "SSCAL",
        formSize: "Tablets · 10×15",
        desc: "Essential calcium supplement for bone health and strength.",
        img: "https://images.unsplash.com/photo-1631549916768-4119b255f926?w=400&auto=format&fit=crop&q=80",
      },
      {
        id: "Hemopeak",
        name: "Hemopeak",
        formSize: "Tablets · 10×10",
        desc: "Blood-building iron supplement for energy and vitality.",
        img: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&auto=format&fit=crop&q=80",
      },
      {
        id: "cyclossv",
        name: "CycloSSV",
        formSize: "Capsules · 2×10",
        desc: "Natural herbal capsules for managing menstrual discomfort.",
        img: "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=400&auto=format&fit=crop&q=80",
      },
      {
        id: "folicssv",
        name: "FolicSSV",
        formSize: "Tablets · 3×10",
        desc: "Folic acid supplements essential for prenatal development.",
        img: "https://images.unsplash.com/photo-1550572017-edd951b55104?w=400&auto=format&fit=crop&q=80",
      },
      {
        id: "calcimom",
        name: "CalciMom",
        formSize: "Tablets · 3×10",
        desc: "Calcium and mineral support tailored for mothers.",
        img: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&auto=format&fit=crop&q=80",
      },
    ],
  },
  {
    id: "gastro",
    name: "Gastro Care",
    tagline: "Complete digestive & gastrointestinal care",
    themeColor: "#1D6A3A",
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&auto=format&fit=crop&q=80",
    products: [
      {
        id: "Rabpad-DSR",
        name: "Rabpad-DSR",
        formSize: "Tablets · 10×10",
        desc: "Antacid tablets for fast relief from bloating and acidity.",
        img: "https://images.unsplash.com/photo-1550572017-edd951b55104?w=400&auto=format&fit=crop&q=80",
      },
      {
        id: "Rabpad-20",
        name: "Rabpad-20",
        formSize: "Tablets · 10×10",
        desc: "Relieves acid reflux, heartburn, and GERD symptoms.",
        img: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&auto=format&fit=crop&q=80",
      },
      {
        id: "digestpro",
        name: "DigestPro",
        formSize: "Capsules · 3×10",
        desc: "Multi-enzyme capsules to assist digestion and nutrient intake.",
        img: "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=400&auto=format&fit=crop&q=80",
      },
      {
        id: "liverssv",
        name: "LiverSSV Syrup",
        formSize: "Syrup · 200ml",
        desc: "Herbal liver tonic for detoxification and healthy function.",
        img: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&auto=format&fit=crop&q=80",
      },
    ],
  },
  {
    id: "general",
    name: "General Health",
    tagline: "Vitamins, minerals & everyday immunity support",
    themeColor: "#5B3FA0",
    image:
      "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=600&auto=format&fit=crop&q=80",
    products: [
      {
        id: "OMGOD",
        name: "OMGOD",
        formSize: "Tablets · 10×10",
        desc: "Complete multivitamin with Omega-3, D3, and essential minerals.",
        img: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=400&auto=format&fit=crop&q=80",
      },
      {
        id: "Ver-D",
        name: "Ver-D",
        formSize: "Tablets · 10x10",
        desc: "Vitamin D3 supplement for bone health and immunity support.",
        img: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&auto=format&fit=crop&q=80",
      },
      {
        id: "Flupact",
        name: "Flupact",
        formSize: "Tablets · 10×10",
        desc: "Multi-ingredient antipyretic with analgesic and anti-inflammatory benefits.",
        img: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&auto=format&fit=crop&q=80",
      },
      {
        id: "Versadine",
        name: "Versadine",
        formSize: "Ointment · 20g",
        desc: "Effective antiseptic ointment for wounds, burns, and skin infections.",
        img: "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=400&auto=format&fit=crop&q=80",
      },
      {
        id: "zincssv",
        name: "ZincSSV",
        formSize: "Tablets · 3×10",
        desc: "Zinc supplements to support immunity and skin health.",
        img: "https://images.unsplash.com/photo-1550572017-edd951b55104?w=400&auto=format&fit=crop&q=80",
      },
    ],
  },
  {
    id: "all-products",
    name: "All Products",
    tagline: "Browse our complete pharmaceutical portfolio",
    themeColor: "#1b4f72",
    image:
      "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=600&auto=format&fit=crop&q=80",
    products: [],
  },
];

// Populate "All Products" with every product from all other categories
const allIdx = categoriesData.length - 1;
categoriesData[allIdx].products = categoriesData
  .slice(0, allIdx)
  .flatMap((cat) => cat.products.map((p) => ({ ...p, category: cat.name })));

const CategoryCard = ({
  category,
  expandedCategory,
  toggleCategory,
  onProductClick,
}) => {
  const [ref, visible] = useIntersectionObserver({ threshold: 0.15 });
  const isExpanded = expandedCategory === category.id;

  return (
    <div
      ref={ref}
      id={category.id}
      className={`pp-cat-card scroll-reveal ${visible ? "scroll-reveal--visible" : ""}`}
    >
      {/* ─── Card Banner ─── */}
      <motion.div
        className="pp-cat-card__banner"
        whileTap={{ scale: 0.985 }}
        onClick={() => toggleCategory(category.id)}
        role="button"
        tabIndex={0}
        aria-expanded={isExpanded}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            toggleCategory(category.id);
          }
        }}
      >
        <img
          src={category.image}
          className="pp-cat-card__bg"
          alt=""
          loading="lazy"
        />
        <div className="pp-cat-card__overlay" />

        {/* Product count badge */}
        <span className="pp-cat-card__badge">
          {category.products.length} products
        </span>

        {/* Text content */}
        <div className="pp-cat-card__text">
          <h3 className="pp-cat-card__name">{category.name}</h3>
          <p className="pp-cat-card__tagline">{category.tagline}</p>
        </div>

        {/* Toggle button */}
        <div className="pp-cat-card__toggle">
          <span className="pp-cat-card__toggle-label">
            {isExpanded ? "CLOSE" : "VIEW PRODUCTS"}
          </span>
          <motion.span
            className="pp-cat-card__toggle-icon"
            animate={{
              rotate: isExpanded ? 45 : 0,
              scale: isExpanded ? 1.15 : 1,
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
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
      </motion.div>

      {/* ─── Expanded Products Panel ─── */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            className="pp-cat-card__panel"
            initial={{ height: 0, opacity: 0, scaleY: 0.96 }}
            animate={{ height: "auto", opacity: 1, scaleY: 1 }}
            exit={{ height: 0, opacity: 0, scaleY: 0.96 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: "hidden", transformOrigin: "top" }}
          >
            <motion.div
              className="pp-cat-card__panel-inner"
              initial={{ y: -8 }}
              animate={{ y: 0 }}
              exit={{ y: -8 }}
              transition={{ duration: 0.35 }}
            >
              <div className="pp-product-grid">
                {category.products.map((product, idx) => (
                  <motion.article
                    key={product.id}
                    className="pp-product-card"
                    initial={{ opacity: 0, scale: 0.92, y: 18 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    whileHover={{
                      y: -6,
                      boxShadow: "0 12px 32px rgba(0,0,0,0.12)",
                    }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ duration: 0.3, delay: idx * 0.07 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      onProductClick(product);
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    <div className="pp-product-card__media">
                      <motion.img
                        src={product.img}
                        alt={product.name}
                        loading="lazy"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.4 }}
                      />
                    </div>
                    <div className="pp-product-card__content">
                      <h4 className="pp-product-card__title">{product.name}</h4>
                      <span className="pp-product-card__form-size">
                        {product.formSize}
                      </span>
                    </div>
                  </motion.article>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ProductsPage = () => {
  const location = useLocation();
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [heroVisible, setHeroVisible] = useState(false);
  const [headerRef, headerVisible] = useIntersectionObserver({
    threshold: 0.15,
  });
  const [upcomingRef, upcomingVisible] = useIntersectionObserver();
  useDocumentTitle("Products");

  // Product modal state
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Booking modal state
  const [bookingEvent, setBookingEvent] = useState(null);
  const [bookingForm, setBookingForm] = useState({ name: '', email: '', quantity: '1' });
  const [bookingToast, setBookingToast] = useState(null);
  const bookingToastTimer = useRef(null);
  const bookingModalCloseRef = useRef(null);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0, panX: 0, panY: 0 });
  const imgContainerRef = useRef(null);

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

  // Lock scroll & focus when booking modal is open
  useEffect(() => {
    if (bookingEvent) {
      document.body.style.overflow = "hidden";
      setTimeout(() => bookingModalCloseRef.current?.focus(), 50);
    } else if (!selectedProduct) {
      document.body.style.overflow = "";
    }
    return () => {
      if (!selectedProduct) document.body.style.overflow = "";
    };
  }, [bookingEvent, selectedProduct]);

  // Close booking modal on Escape
  useEffect(() => {
    if (!bookingEvent) return;
    const onKey = (e) => { if (e.key === "Escape") setBookingEvent(null); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [bookingEvent]);

  const openBooking = (event) => {
    setBookingForm({ name: '', email: '', quantity: '1' });
    setBookingEvent(event);
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    setBookingEvent(null);
    if (bookingToastTimer.current) clearTimeout(bookingToastTimer.current);
    setBookingToast({ message: 'Booking confirmed! Check your email for details.' });
    bookingToastTimer.current = setTimeout(() => setBookingToast(null), 4000);
  };

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

  // Timers ref so we can cancel any pending sequence
  const timersRef = useRef([]);

  const clearPendingTimers = useCallback(() => {
    timersRef.current.forEach((t) => clearTimeout(t));
    timersRef.current = [];
  }, []);

  // Core function: collapse current → scroll to target → expand target
  const switchToCategory = useCallback(
    (categoryId) => {
      // Cancel any in-flight sequence
      clearPendingTimers();

      // Step 1: Collapse whatever is currently open
      setExpandedCategory(null);

      // Step 2: After collapse animation finishes (400ms) + DOM settle,
      // scroll to the target category card
      const t1 = setTimeout(() => {
        const el = document.getElementById(categoryId);
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY - 120;
          window.scrollTo({ top, behavior: "smooth" });
        }

        // Step 3: After smooth scroll settles (~700ms), expand target
        const t2 = setTimeout(() => {
          setExpandedCategory(categoryId);
        }, 700);
        timersRef.current.push(t2);
      }, 550);
      timersRef.current.push(t1);
    },
    [clearPendingTimers],
  );

  // Listen for same-page category switches from Navbar (custom event)
  useEffect(() => {
    const handler = (e) => {
      switchToCategory(e.detail);
    };
    window.addEventListener("ssv-switch-category", handler);
    return () => {
      window.removeEventListener("ssv-switch-category", handler);
      clearPendingTimers();
    };
  }, [switchToCategory, clearPendingTimers]);

  // Handle navigation from another page (location.state)
  useEffect(() => {
    const categoryId = location.state?.category;
    if (categoryId) {
      window.history.replaceState({}, document.title);
      // Coming from another page — no category is open, just scroll + expand
      const t1 = setTimeout(() => {
        const el = document.getElementById(categoryId);
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY - 120;
          window.scrollTo({ top, behavior: "smooth" });
        }
        const t2 = setTimeout(() => {
          setExpandedCategory(categoryId);
        }, 700);
        timersRef.current.push(t2);
      }, 300);
      timersRef.current.push(t1);
    }
  }, [location]);

  const toggleCategory = useCallback((categoryId) => {
    setExpandedCategory((prev) => (prev === categoryId ? null : categoryId));
  }, []);

  return (
    <div className="products-page">
      <section className="pp-hero">
        <div className="pp-hero__bg">
          <img
            src="https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=1600&auto=format&fit=crop&q=80"
            alt="Medicines and capsules"
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

      <section className="pp-selection container" id="products-categories">
        <div
          ref={headerRef}
          className={`pp-explore-header scroll-reveal ${headerVisible ? "scroll-reveal--visible" : ""}`}
        >
          <span className="section-label">Explore</span>
          <h2 className="section-title">Browse Products by Category</h2>
        </div>

        <div className="pp-categories-grid">
          {categoriesData.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              expandedCategory={expandedCategory}
              toggleCategory={toggleCategory}
              onProductClick={openProductModal}
            />
          ))}
        </div>
      </section>

      {/* ── New Ranges — Coming Soon ── */}
      <section className="pp-coming-soon-section container">
        <ComingSoonCard />
      </section>

      {/* ── Upcoming Events ── */}
      <section
        className={`pp-upcoming scroll-reveal ${upcomingVisible ? 'scroll-reveal--visible' : ''}`}
        ref={upcomingRef}
        id="upcoming-events"
      >
        <div className="container">
          <div className="pp-upcoming__header">
            <span className="pp-upcoming__eyebrow">Mark Your Calendar</span>
            <h2 className="pp-upcoming__title">UPCOMING EVENTS</h2>
            <p className="pp-upcoming__sub">Don&apos;t miss our company events. Reserve your spot today.</p>
          </div>
          <div className="pp-upcoming__grid">
            {UPCOMING_EVENTS.map((event, i) => (
              <div
                className={`pp-uev-card ${upcomingVisible ? 'pp-uev-card--visible' : ''}`}
                key={event.id}
                style={{ transitionDelay: upcomingVisible ? `${0.1 + i * 0.08}s` : '0s' }}
              >
                <div className="pp-uev-card__img">
                  <img src={event.image} alt={event.title} loading="lazy" />
                  <span className="pp-uev-card__date">{event.date}</span>
                </div>
                <div className="pp-uev-card__body">
                  <h3 className="pp-uev-card__title">{event.title}</h3>
                  <p className="pp-uev-card__venue">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                      <circle cx="12" cy="10" r="3"/>
                    </svg>
                    {event.venue}
                  </p>
                  <button
                    className="pp-uev-card__btn"
                    onClick={() => openBooking(event)}
                    id={`buy-tickets-${event.id}`}
                    aria-label={`Buy tickets for ${event.title}`}
                  >
                    Buy Tickets
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Booking Modal ── */}
      {bookingEvent && (
        <div className="pp-book-modal" role="dialog" aria-modal="true" aria-labelledby="pp-book-modal-title">
          <div className="pp-book-modal__backdrop" onClick={() => setBookingEvent(null)} aria-hidden="true" />
          <div className="pp-book-modal__box" onClick={e => e.stopPropagation()}>
            <button
              ref={bookingModalCloseRef}
              className="pp-book-modal__close"
              onClick={() => setBookingEvent(null)}
              aria-label="Close booking modal"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
            <div className="pp-book-modal__header">
              <span className="pp-book-modal__eyebrow">Reserve Your Spot</span>
              <h3 className="pp-book-modal__title" id="pp-book-modal-title">Book Tickets for<br />{bookingEvent.title}</h3>
              <p className="pp-book-modal__meta">
                <span className="pp-book-modal__badge">{bookingEvent.date}</span>
                <span>{bookingEvent.venue}</span>
              </p>
            </div>
            <form className="pp-book-modal__form" onSubmit={handleBookingSubmit}>
              <div className="pp-book-modal__field">
                <label htmlFor="pp-booking-name">Full Name</label>
                <input
                  id="pp-booking-name"
                  type="text"
                  placeholder="Enter your full name"
                  value={bookingForm.name}
                  onChange={e => setBookingForm(p => ({ ...p, name: e.target.value }))}
                  required
                  autoComplete="name"
                />
              </div>
              <div className="pp-book-modal__field">
                <label htmlFor="pp-booking-email">Email Address</label>
                <input
                  id="pp-booking-email"
                  type="email"
                  placeholder="Enter your email"
                  value={bookingForm.email}
                  onChange={e => setBookingForm(p => ({ ...p, email: e.target.value }))}
                  required
                  autoComplete="email"
                />
              </div>
              <div className="pp-book-modal__field">
                <label htmlFor="pp-booking-qty">Number of Tickets</label>
                <select
                  id="pp-booking-qty"
                  value={bookingForm.quantity}
                  onChange={e => setBookingForm(p => ({ ...p, quantity: e.target.value }))}
                >
                  {[1,2,3,4,5].map(n => (
                    <option key={n} value={n}>{n} {n === 1 ? 'Ticket' : 'Tickets'}</option>
                  ))}
                </select>
              </div>
              <button type="submit" className="pp-book-modal__submit">Confirm Booking</button>
            </form>
          </div>
        </div>
      )}

      {/* ── Booking Toast ── */}
      {bookingToast && (
        <div className="pp-book-toast pp-book-toast--visible" role="alert" aria-live="polite">
          <span className="pp-book-toast__icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/>
              <polyline points="22 4 12 14.01 9 11.01"/>
            </svg>
          </span>
          <span className="pp-book-toast__msg">{bookingToast.message}</span>
          <button className="pp-book-toast__close" onClick={() => setBookingToast(null)} aria-label="Dismiss">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>
      )}

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
