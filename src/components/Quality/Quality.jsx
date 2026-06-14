import { useIntersectionObserver } from '../../hooks/useIntersectionObserver'
import './Quality.css'
import qualityImg from '../../assets/images/quality.png'

const certifications = [
  { name: 'WHO-GMP', desc: 'World Health Organization' },
  { name: 'ISO 9001', desc: 'Quality Management' },
  { name: 'ISO 14001', desc: 'Environmental' },
  { name: 'FSSAI', desc: 'Food Safety' },
]

const Quality = () => {
  const [ref, visible] = useIntersectionObserver({ threshold: 0.2 })

  return (
    <section className="quality" id="quality" ref={ref}>
      <div className={`quality__inner container ${visible ? 'quality--visible' : ''}`}>
        <div className="quality__content">
          <span className="section-label">Quality & Certifications</span>
          <h2 className="section-title">
            Uncompromising <span>Quality</span> Standards
          </h2>
          <p className="quality__text">
            Every product that leaves our facility undergoes rigorous testing
            and quality assurance processes. Our manufacturing plants are
            certified by international regulatory bodies, ensuring that our
            products meet the highest global standards.
          </p>

          <div className="quality__certs">
            {certifications.map((cert, i) => (
              <div className="quality__cert" key={i}>
                <div className="quality__cert-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </div>
                <div>
                  <span className="quality__cert-name">{cert.name}</span>
                  <span className="quality__cert-desc">{cert.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="quality__image">
          <div className="quality__image-wrapper">
            <img src={qualityImg} alt="GMP-certified manufacturing facility" />
            <div className="quality__gmp-badge">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 12l2 2 4-4"/>
                <circle cx="12" cy="12" r="10"/>
              </svg>
              <span>GMP Certified</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Quality
