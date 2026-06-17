import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useIntersectionObserver } from "../../hooks/useIntersectionObserver";

/* ── Upcoming / Coming Soon Products ── */
const upcomingProducts = [
  {
    id: "neurozen",
    name: "NeuroZen SR",
    category: "Neuro Care",
    formSize: "Tablets · 10×10",
    desc: "Sustained-release formula for neuropathic pain management and nerve health support.",
    img: "https://images.unsplash.com/photo-1559757175-7cb057fba93c?w=400&auto=format&fit=crop&q=80",
    expectedDate: "Q3 2025",
  },
  {
    id: "dermassv",
    name: "DermaSSV Cream",
    category: "Derma Care",
    formSize: "Topical · 30g",
    desc: "Advanced topical cream for eczema, psoriasis, and inflammatory skin conditions.",
    img: "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=400&auto=format&fit=crop&q=80",
    expectedDate: "Q3 2025",
  },
  {
    id: "cardioguard",
    name: "CardioGuard",
    category: "Cardio Care",
    formSize: "Capsules · 3×10",
    desc: "Heart-health capsules with CoQ10 and Omega-3 for cardiovascular protection.",
    img: "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=400&auto=format&fit=crop&q=80",
    expectedDate: "Q4 2025",
  },
];

const ComingSoonCard = () => {
  const [ref, visible] = useIntersectionObserver({ threshold: 0.15 });
  const [csOpen, setCsOpen] = useState(false);

  return (
    <div
      ref={ref}
      className={`pp-coming-soon scroll-reveal ${visible ? "scroll-reveal--visible" : ""}`}
    >
      <motion.div
        className="pp-coming-soon__banner"
        whileTap={{ scale: 0.985 }}
        onClick={() => setCsOpen((prev) => !prev)}
        role="button"
        tabIndex={0}
        aria-expanded={csOpen}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setCsOpen((prev) => !prev);
          }
        }}
      >
        {/* Pulsing "Coming Soon" badge */}
        <span className="pp-coming-soon__badge">
          <span className="pp-coming-soon__badge-dot" />
          Coming Soon
        </span>

        {/* Title & subtitle */}
        <div className="pp-coming-soon__text">
          <h3 className="pp-coming-soon__title">
            New Ranges — Launching 2025
          </h3>
          <p className="pp-coming-soon__sub">
            Exciting new therapeutic categories are on the way. Preview below.
          </p>
        </div>

        {/* Product count + toggle */}
        <div className="pp-coming-soon__actions">
          <span className="pp-coming-soon__count">
            {upcomingProducts.length} products
          </span>
          <div className="pp-coming-soon__toggle">
            <span className="pp-coming-soon__toggle-label">
              {csOpen ? "CLOSE" : "PREVIEW"}
            </span>
            <motion.span
              className="pp-coming-soon__toggle-icon"
              animate={{
                rotate: csOpen ? 45 : 0,
                scale: csOpen ? 1.15 : 1,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              {csOpen ? "×" : "+"}
            </motion.span>
          </div>
        </div>

        {/* Accent bar */}
        <motion.div
          className="pp-coming-soon__accent"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: csOpen ? 1 : 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformOrigin: "left" }}
        />
      </motion.div>

      {/* ─── Expanded Teaser Panel ─── */}
      <AnimatePresence>
        {csOpen && (
          <motion.div
            className="pp-coming-soon__panel"
            key="cs-panel"
            initial={{ height: 0, opacity: 0, scaleY: 0.96 }}
            animate={{ height: "auto", opacity: 1, scaleY: 1 }}
            exit={{ height: 0, opacity: 0, scaleY: 0.96 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: "hidden", transformOrigin: "top" }}
          >
            <motion.div
              className="pp-coming-soon__panel-inner"
              initial={{ y: -8 }}
              animate={{ y: 0 }}
              exit={{ y: -8 }}
              transition={{ duration: 0.35 }}
            >
              <div className="pp-product-grid">
                {upcomingProducts.map((product, idx) => (
                  <motion.article
                    key={product.id}
                    className="pp-product-card pp-product-card--upcoming"
                    initial={{ opacity: 0, scale: 0.92, y: 18 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    whileHover={{
                      y: -6,
                      boxShadow: "0 12px 32px rgba(0,0,0,0.12)",
                    }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ duration: 0.3, delay: idx * 0.1 }}
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
                      <span className="pp-product-card__upcoming-tag">
                        {product.category}
                      </span>
                      <h4 className="pp-product-card__title">{product.name}</h4>
                      <span className="pp-product-card__form-size">
                        {product.formSize}
                      </span>
                      <p className="pp-product-card__desc">{product.desc}</p>
                      <span className="pp-product-card__expected">
                        Expected {product.expectedDate}
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

export default ComingSoonCard;
