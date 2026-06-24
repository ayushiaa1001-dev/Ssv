/* cspell:ignore Lax Flumood Eufix Prot */
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useIntersectionObserver } from "../../hooks/useIntersectionObserver";

/* ── Upcoming / Coming Soon Products ── */
const upcomingProducts = [
  {
    id: "lax-mps",
    name: "Lax MPS",
    category: "Gastro Care",
    formSize: "Suspension",
    desc: "A next-generation digestive health solution for constipation — designed to support natural bowel movement and overall gut comfort.",
  },
  {
    id: "flumood",
    name: "Flumood",
    category: "Mental Wellness",
    formSize: "Tablets",
    desc: "A comprehensive mental wellness range targeting depression, anxiety, and stress-related conditions — developed with advanced therapeutic approaches to support emotional balance and cognitive well-being.",
  },
  {
    id: "eufix",
    name: "Eufix",
    category: "Gastro Care",
    formSize: "Tablets",
    desc: "An advanced gastrointestinal solution addressing acute and chronic diarrhea management — developed with evidence-based formulations for effective symptom control and digestive recovery.",
  },
  {
    id: "ss-cal-plus",
    name: "SS Cal-Plus",
    category: "Bone & Vitality",
    formSize: "Tablets",
    desc: "An integrated bone and vitality solution addressing BMD improvement, neurological support, and immunity enhancement — formulated to promote long-term health and resilience.",
  },
  {
    id: "ss-prot",
    name: "SS Prot",
    category: "Protein Supplement",
    formSize: "Powder",
    desc: "A nutrition-focused protein solution delivering quality supplementation for strength, recovery, and active lifestyles — crafted to support optimal physical performance.",
  },
];

const ComingSoonCard = ({ isExpanded, onToggle }) => {
  const [ref, visible] = useIntersectionObserver({ threshold: 0.15 });
  const [internalOpen, setInternalOpen] = useState(false);

  const isOpen = isExpanded !== undefined ? isExpanded : internalOpen;
  const handleToggle = () => {
    if (onToggle) onToggle();
    else setInternalOpen((prev) => !prev);
  };

  return (
    <div
      ref={ref}
      className={`pp-coming-soon scroll-reveal ${visible ? "scroll-reveal--visible" : ""} ${isOpen ? "is-expanded" : ""}`}
    >
      <motion.div
        className="pp-coming-soon__banner"
        whileTap={{ scale: 0.985 }}
        onClick={handleToggle}
        role="button"
        tabIndex={0}
        aria-expanded={isOpen}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleToggle();
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
            Future Offerings — 2026-27
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
              {isOpen ? "CLOSE" : "PREVIEW"}
            </span>
            <motion.span
              className="pp-coming-soon__toggle-icon"
              animate={{
                rotate: isOpen ? 45 : 0,
                scale: isOpen ? 1.15 : 1,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              {isOpen ? "×" : "+"}
            </motion.span>
          </div>
        </div>

        {/* Accent bar */}
        <motion.div
          className="pp-coming-soon__accent"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isOpen ? 1 : 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformOrigin: "left" }}
        />
      </motion.div>

      {/* ─── Expanded Teaser Panel ─── */}
      <AnimatePresence>
        {isOpen && (
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
                        {product.expectedDate && (
                          <span className="pp-product-card__quantity">{product.expectedDate}</span>
                        )}
                      </div>
                      <p className="pp-product-card__desc">
                        {product.desc}
                      </p>
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
