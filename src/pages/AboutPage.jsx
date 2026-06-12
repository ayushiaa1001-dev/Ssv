import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import './AboutPage.css'

const AboutPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="about-page">
      {/* ── Hero Banner ── */}
      <section className="ap-hero">
        <div className="ap-hero__bg">
          <img src="https://images.unsplash.com/photo-1576086213369-97a306d36557?w=1600&auto=format&fit=crop&q=80" alt="SSV laboratory" />
          <div className="ap-hero__overlay" />
        </div>
        <div className="ap-hero__content container">
          <Link to="/" className="ap-back-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            Back to Home
          </Link>
          <span className="ap-hero__label">Who We Are</span>
          <h1 className="ap-hero__title">About Us</h1>
          <p className="ap-hero__sub">
            Advancing global healthcare through scientific research, state-of-the-art manufacturing, and an uncompromising commitment to quality.
          </p>
        </div>
        {/* Scroll indicator */}
        <div className="ap-hero__scroll">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </section>

      {/* ── Our Story / About Us Section ── */}
      <section className="ap-section ap-who">
        <div className="container ap-who__inner">
          <div className="ap-who__content">
            <span className="section-label">Our Story</span>
            <h2 className="section-title">About Us</h2>
            <p className="ap-text">
              SSV Pharmaceuticals is a leading healthcare company dedicated to developing and manufacturing high-quality pharmaceutical products that improve patient outcomes across India and beyond.
            </p>
            <p className="ap-text">
              Founded with a vision to make effective healthcare accessible to all, we combine scientific rigour with compassionate values — ensuring every medicine we produce meets the highest safety and efficacy standards.
            </p>
            <p className="ap-text">
              Our state-of-the-art facilities, ISO-certified processes, and a dedicated team of over 500 professionals reflect our unwavering commitment to health and wellbeing.
            </p>
            
            {/* Stats Counter */}
            <div className="ap-who__stats">
              <div className="ap-who__stat-item">
                <span className="ap-who__stat-number">38+</span>
                <span className="ap-who__stat-label">Years of Excellence</span>
              </div>
              <div className="ap-who__stat-item">
                <span className="ap-who__stat-number">200+</span>
                <span className="ap-who__stat-label">Products Portfolio</span>
              </div>
              <div className="ap-who__stat-item">
                <span className="ap-who__stat-number">500+</span>
                <span className="ap-who__stat-label">Team Members</span>
              </div>
            </div>
          </div>

          <div className="ap-who__image-wrapper">
            <div className="ap-who__image-container">
              <img 
                src="https://images.unsplash.com/photo-1504813184591-01572f98c85f?w=800&h=600&fit=crop&auto=format" 
                alt="SSV medical professionals" 
                className="ap-who__img"
              />
              <div className="ap-who__badge">
                <span className="ap-who__badge-text">ISO 9001 Certified</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Our Philosophy / Vision & Values Section ── */}
      <section className="ap-section ap-philosophy">
        <div className="container">
          <div className="ap-section-header">
            <span className="section-label">Our Philosophy</span>
            <h2 className="section-title">Vision & Values</h2>
            <p className="ap-section-subtitle">Driven by Innovation, Guided by Integrity.</p>
          </div>
          
          <div className="ap-philosophy__content">
            {/* Left Column: Vision Points */}
            <div className="ap-philosophy__vision">
              <ul className="ap-vision__list">
                <li className="ap-vision__item">
                  <div className="ap-vision__marker"></div>
                  <p>To be a globally trusted pharmaceutical company that leads through innovation.</p>
                </li>
                <li className="ap-vision__item">
                  <div className="ap-vision__marker"></div>
                  <p>To reach every patient in need and set the benchmark for quality and affordability.</p>
                </li>
                <li className="ap-vision__item">
                  <div className="ap-vision__marker"></div>
                  <p>To make life-saving medicines accessible to all, regardless of geography or circumstance.</p>
                </li>
                <li className="ap-vision__item">
                  <div className="ap-vision__marker"></div>
                  <p>To be synonymous with trust, healing, and scientific excellence worldwide.</p>
                </li>
              </ul>
            </div>

            {/* Right Column: Values Cards Grid */}
            <div className="ap-philosophy__values">
              <div className="ap-value__card">
                <div className="ap-value__icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                </div>
                <h3 className="ap-value__title">Integrity</h3>
                <p className="ap-value__desc">Unwavering honesty and transparency in everything we do.</p>
              </div>

              <div className="ap-value__card">
                <div className="ap-value__icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="2" y1="12" x2="22" y2="12" />
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                  </svg>
                </div>
                <h3 className="ap-value__title">Innovation</h3>
                <p className="ap-value__desc">Continuously advancing science and pharmaceutical solutions.</p>
              </div>

              <div className="ap-value__card">
                <div className="ap-value__icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                </div>
                <h3 className="ap-value__title">Patient-First</h3>
                <p className="ap-value__desc">Every decision begins and ends with patient wellbeing.</p>
              </div>

              <div className="ap-value__card">
                <div className="ap-value__icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                </div>
                <h3 className="ap-value__title">Excellence</h3>
                <p className="ap-value__desc">Committed to the highest standards of quality and safety.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Our Journey / Milestones & Recognition Section ── */}
      <section className="ap-section ap-journey">
        <div className="container">
          <div className="ap-section-header">
            <span className="section-label">Our Journey</span>
            <h2 className="section-title">Milestones & Recognition</h2>
          </div>

          <div className="ap-journey__inner">
            {/* Left Column: Timeline List */}
            <div className="ap-journey__timeline">
              <div className="ap-timeline-track"></div>
              
              <div className="ap-timeline-item">
                <div className="ap-timeline-marker">1985</div>
                <div className="ap-timeline-content">
                  <h4 className="ap-timeline-title">Foundation</h4>
                  <p>Founded in Mumbai with a vision to make quality medicines accessible to all.</p>
                </div>
              </div>

              <div className="ap-timeline-item">
                <div className="ap-timeline-marker">1998</div>
                <div className="ap-timeline-content">
                  <h4 className="ap-timeline-title">WHO-GMP Certification</h4>
                  <p>Achieved WHO-GMP certification across all manufacturing units.</p>
                </div>
              </div>

              <div className="ap-timeline-item">
                <div className="ap-timeline-marker">2008</div>
                <div className="ap-timeline-content">
                  <h4 className="ap-timeline-title">Global Reach</h4>
                  <p>Launched export operations to 12 countries across Asia and Africa.</p>
                </div>
              </div>

              <div className="ap-timeline-item">
                <div className="ap-timeline-marker">2019</div>
                <div className="ap-timeline-content">
                  <h4 className="ap-timeline-title">National Recognition</h4>
                  <p>Received the National Pharma Excellence Award for Innovation.</p>
                </div>
              </div>

              <div className="ap-timeline-item">
                <div className="ap-timeline-marker">2024</div>
                <div className="ap-timeline-content">
                  <h4 className="ap-timeline-title">Expansion & Beyond</h4>
                  <p>Crossed 200-product portfolio with entry into biosimilars.</p>
                </div>
              </div>
            </div>

            {/* Right Column: Lab Image & Badge */}
            <div className="ap-journey__image">
              <div className="ap-journey__image-container">
                <img 
                  src="https://images.unsplash.com/photo-1581093577421-f561a654a353?w=800&h=600&fit=crop&auto=format" 
                  alt="Laboratory work" 
                  className="ap-journey__img"
                />
                <div className="ap-journey__badge">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="ap-badge-icon">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                  <span>25+ Industry Awards</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Our Standards / Quality Section ── */}
      <section className="ap-section ap-standards">
        <div className="container ap-standards__inner">
          {/* Left Column: Copy & Certifications */}
          <div className="ap-standards__content">
            <span className="section-label">Our Standards</span>
            <h2 className="section-title">Quality</h2>
            <p className="ap-text">
              Quality is not an afterthought at SSV — it is embedded in every stage of our manufacturing process. From raw material sourcing to final packaging, each product undergoes rigorous testing and validation.
            </p>
            <p className="ap-text">
              Our facilities are regularly audited by international regulatory bodies, ensuring that every medicine that leaves our plant meets global standards of safety, purity, and efficacy.
            </p>
            <p className="ap-text">
              Holding WHO-GMP and ISO 9001:2015 certifications, we maintain strict quality control across more than 200 tests per batch — with complete traceability from ingredient to shelf.
            </p>

            {/* Compliance Badges Grid */}
            <div className="ap-standards__badges">
              <div className="ap-standard-tag">WHO-GMP</div>
              <div className="ap-standard-tag">ISO 9001:2015</div>
              <div className="ap-standard-tag">GLP Compliant</div>
              <div className="ap-standard-tag">100% Traceable</div>
            </div>
          </div>

          {/* Right Column: Lab Quality Image & Badge */}
          <div className="ap-standards__image">
            <div className="ap-standards__image-container">
              <img 
                src="https://images.unsplash.com/photo-1579165466991-467135ad3110?w=800&h=600&fit=crop&auto=format" 
                alt="Quality control laboratory" 
                className="ap-standards__img"
              />
              <div className="ap-standards__badge">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
                <span>GMP Certified</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Call To Action (CTA) Section ── */}
      <section className="ap-cta">
        <div className="container ap-cta__inner">
          <h2>Ready to Partner with Us?</h2>
          <p>Get in touch with our team to explore opportunities in pharmaceutical manufacturing and distribution.</p>
          <Link to="/" className="btn ap-cta__btn">
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  )
}

export default AboutPage
