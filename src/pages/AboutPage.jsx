import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import CountUp from '../components/CountUp'
import './AboutPage.css'

const AboutPage = () => {
  const location = useLocation()
  const [heroVisible, setHeroVisible] = useState(false)
  useDocumentTitle('About Us')

  const [storyRef, storyVisible] = useIntersectionObserver()
  const [philosophyRef, philosophyVisible] = useIntersectionObserver()
  const [journeyRef, journeyVisible] = useIntersectionObserver()
  const [standardsRef, standardsVisible] = useIntersectionObserver()

  useEffect(() => {
    const timer = setTimeout(() => setHeroVisible(true), 200)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (location.state?.scrollTo) {
      const targetId = location.state.scrollTo
      // Clear state to prevent scrolling again on reload
      window.history.replaceState({}, document.title)
      
      // Delay slightly to ensure elements are rendered
      setTimeout(() => {
        document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    } else {
      window.scrollTo(0, 0)
    }
  }, [location])

  return (
    <div className="about-page">
      {/* ── Hero Banner ── */}
      <section className="ap-hero">
        <div className="ap-hero__bg">
          <img src="https://images.unsplash.com/photo-1576086213369-97a306d36557?w=1600&auto=format&fit=crop&q=80" alt="SSV laboratory" loading="lazy" />
          <div className="ap-hero__overlay" />
        </div>
        
        <div className="ap-hero__content">
          <div className={`ap-hero__text scroll-reveal ${heroVisible ? 'scroll-reveal--visible' : ''}`}>
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
            <div className="ap-hero__buttons">
              <Link to="/products" className="btn btn-primary">
                Explore Our Products
              </Link>
              <Link to="/events/culture" className="btn btn-outline">
                Life at SSV
              </Link>
            </div>
          </div>
        </div>

        <div className={`ap-hero__stats ${heroVisible ? 'ap-hero__stats--visible' : ''}`}>
          <div className="ap-hero__stats-inner container">
            <div className="ap-hero__stat" style={{ animationDelay: '0.6s' }}>
              <span className="ap-hero__stat-number">
                <CountUp end="38" suffix="+" />
              </span>
              <span className="ap-hero__stat-label">Years of Excellence</span>
            </div>
            <div className="ap-hero__stat" style={{ animationDelay: '0.75s' }}>
              <span className="ap-hero__stat-number">
                <CountUp end="200" suffix="+" />
              </span>
              <span className="ap-hero__stat-label">Product Portfolio</span>
            </div>
            <div className="ap-hero__stat" style={{ animationDelay: '0.9s' }}>
              <span className="ap-hero__stat-number">
                <CountUp end="500" suffix="+" />
              </span>
              <span className="ap-hero__stat-label">Professionals</span>
            </div>
            <div className="ap-hero__stat" style={{ animationDelay: '1.05s' }}>
              <span className="ap-hero__stat-number">
                ISO <CountUp end="9001" />
              </span>
              <span className="ap-hero__stat-label">Certified</span>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="ap-hero__scroll">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </section>

      {/* ── Our Story / About Us Section ── */}
      <section className={`ap-section ap-who scroll-reveal ${storyVisible ? 'scroll-reveal--visible' : ''}`} id="about-story" ref={storyRef}>
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
                <span className="ap-who__stat-number">
                  <CountUp end="38" suffix="+" />
                </span>
                <span className="ap-who__stat-label">Years of Excellence</span>
              </div>
              <div className="ap-who__stat-item">
                <span className="ap-who__stat-number">
                  <CountUp end="200" suffix="+" />
                </span>
                <span className="ap-who__stat-label">Products Portfolio</span>
              </div>
              <div className="ap-who__stat-item">
                <span className="ap-who__stat-number">
                  <CountUp end="500" suffix="+" />
                </span>
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
      <section className={`ap-section ap-philosophy scroll-reveal ${philosophyVisible ? 'scroll-reveal--visible' : ''}`} id="about-philosophy" ref={philosophyRef}>
        <div className="container">
          <div className="ap-section-header">
            <span className="section-label">Our Philosophy</span>
            <h2 className="section-title">Vision & Values</h2>
          </div>
          
          <div className="ap-philosophy__content">
            {/* Vision Card */}
            <div className="ap-philosophy__card">
              <div className="ap-philosophy__card-icon-container">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ap-philosophy__icon" style={{ color: 'var(--primary)' }}>
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </div>
              <h3 className="ap-philosophy__card-title">Vision</h3>
              <ul className="ap-philosophy__card-list">
                <li>To be a globally trusted pharmaceutical company that leads through innovation.</li>
                <li>To reach every patient in need and set the benchmark for quality and affordability.</li>
                <li>To make life-saving medicines accessible to all, regardless of geography or circumstance.</li>
                <li>To be synonymous with trust, healing, and scientific excellence worldwide.</li>
              </ul>
            </div>

            {/* Values Card */}
            <div className="ap-philosophy__card">
              <div className="ap-philosophy__card-icon-container">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ap-philosophy__icon" style={{ color: 'var(--primary)' }}>
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <h3 className="ap-philosophy__card-title">Values</h3>
              <ul className="ap-philosophy__card-list">
                <li><strong>Integrity</strong> — Unwavering honesty and transparency in everything we do.</li>
                <li><strong>Innovation</strong> — Continuously advancing science and pharmaceutical solutions.</li>
                <li><strong>Patient-First</strong> — Every decision begins and ends with patient wellbeing.</li>
                <li><strong>Excellence</strong> — Committed to the highest standards of quality and safety.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Our Journey / Milestones & Recognition Section ── */}
      <section className={`ap-section ap-journey scroll-reveal ${journeyVisible ? 'scroll-reveal--visible' : ''}`} id="about-journey" ref={journeyRef}>
        <div className="container">
          <div className="ap-section-header">
            <span className="section-label">Our Journey</span>
            <h2 className="section-title">Milestones & Recognition</h2>
          </div>

          <div className="ap-journey__inner">
            {/* Left Column: Lab Image & Badge */}
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

            {/* Right Column: Timeline List */}
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
          </div>
        </div>
      </section>

      {/* ── Our Standards / Quality Section ── */}
      <section className={`ap-section ap-standards scroll-reveal ${standardsVisible ? 'scroll-reveal--visible' : ''}`} id="about-standards" ref={standardsRef}>
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
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="ap-badge-icon">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
                <span>GMP Certified</span>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}

export default AboutPage
