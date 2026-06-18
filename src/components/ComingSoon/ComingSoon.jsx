import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useIntersectionObserver } from "../../hooks/useIntersectionObserver";

/* ── Upcoming / Coming Soon Products ── */
const upcomingProducts = [
  {
    id: "dermacare",
    name: "DermaCare Range",
    category: "Derma Care",
    formSize: "Topical",
    desc: "A comprehensive dermatology line targeting eczema, psoriasis, and chronic skin conditions — formulated with next-generation corticosteroid-free actives.",
    img: "/ssv/images/dermacare_premium.png",
    expectedDate: "Launching Q2 2025",
  },
  {
    id: "neuroplex",
    name: "NeuroPlex Series",
    category: "Neuro Care",
    formSize: "Capsules & Syrup",
    desc: "Neuroprotective and cognitive health supplements backed by clinical research, targeting memory, focus, and nerve regeneration.",
    img: "/ssv/images/neuroplex_premium.png",
    expectedDate: "Launching Q3 2025",
  },
  {
    id: "cardioshield",
    name: "CardioShield Pro",
    category: "Cardio Care",
    formSize: "Tablets",
    desc: "A cardioprotective range combining statins, antihypertensives, and omega-3 combinations for comprehensive cardiovascular disease management.",
    img: "/ssv/images/cardioshield_premium.png",
    expectedDate: "Launching Q4 2025",
  },
];

const ComingSoonCard = () => {
  const [ref, visible] = useIntersectionObserver({ threshold: 0.15 });
  const [csOpen, setCsOpen] = useState(false);

  return (
    <div
      ref={ref}
      className={`pp-coming-soon scroll-reveal ${visible ? "scroll-reveal--visible" : ""} ${csOpen ? "is-expanded" : ""}`}
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
              
              <div className="pp-coming-soon__header">
                SNEAK PREVIEW — CONCEPT IMAGES
              </div>

              <div className="pp-product-grid pp-coming-soon__grid">
                {upcomingProducts.map((product, idx) => (
                  <motion.article
                    key={product.id}
                    className="pp-product-card pp-product-card--upcoming-solid"
                    initial={{ opacity: 0, scale: 0.92, y: 18 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    whileHover={{
                      y: -8,
                      boxShadow: "0 20px 40px rgba(27, 79, 114, 0.2)",
                    }}
                    transition={{ duration: 0.3, delay: idx * 0.1 }}
                  >
                    <div className="pp-product-card__content pp-product-card__content--upcoming-solid">
                      <h4 className="pp-product-card__name">{product.name}</h4>
                      <div className="pp-product-card__meta">
                        <span className="pp-product-card__type">{product.formSize}</span>
                        <span className="pp-product-card__quantity">{product.expectedDate}</span>
                      </div>
                      <p className="pp-product-card__desc">
                        {product.desc}
                      </p>
                    </div>
                  </motion.article>
                ))}
              </div>

              <div className="pp-coming-soon__notify">
                <span>Want to be notified when these launch?</span>
                <button className="btn">Notify Me</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ComingSoonCard;
