import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import CountUp from '../components/CountUp'
import heroBg from '../assets/images/about-hero-bg.jpg'
import aboutWhoImage from '../assets/images/about-who.jpg'
import aboutMilestoneImage from '../assets/images/about-milestone.png'
// import aboutQualityImage from '../assets/images/about-quality.jpg'
import aboutStoryNewImage from '../assets/images/about-story-new.jpg'
import './AboutPage.css'

const AboutPage = () => {
  const location = useLocation()
  const navigate = useNavigate()
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
      navigate(location.pathname, { replace: true, state: {} })
      
      // Delay slightly to ensure elements are rendered
      setTimeout(() => {
        const el = document.getElementById(targetId)
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY - 120
          window.scrollTo({ top, behavior: 'smooth' })
        }
      }, 100)
    }
  }, [location, navigate])

  return (
    <div className="about-page">
      {/* ── Hero Banner ── */}
      <section className="ap-hero">
        <div className="ap-hero__bg">
          <img src={heroBg} alt="Ssv laboratory" loading="lazy" />
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

            <h1 className="ap-hero__title">About Us</h1>
            <p className="ap-hero__sub">
              Serving healthcare through scientific approach, ISO certified processes, and an uncompromising commitment to quality.
            </p>
            <div className="ap-hero__buttons">
              <Link to="/products" className="btn btn-primary">
                Explore Our Products
              </Link>
              <Link to="/events/culture" className="btn btn-outline">
                Life at Ssv
              </Link>
            </div>
          </div>
        </div>

        <div className={`ap-hero__stats ${heroVisible ? 'ap-hero__stats--visible' : ''}`}>
          <div className="ap-hero__stats-inner container">
            <div className="ap-hero__stat" style={{ animationDelay: '0.6s' }}>
              <span className="ap-hero__stat-number">
                <CountUp end="15" suffix="+" duration={2500} />
              </span>
              <span className="ap-hero__stat-label">Years of Excellence</span>
            </div>
            <div className="ap-hero__stat" style={{ animationDelay: '0.75s' }}>
              <span className="ap-hero__stat-number">
                <CountUp end="25" suffix="+" duration={2500} />
              </span>
              <span className="ap-hero__stat-label">Product Portfolio</span>
            </div>
            <div className="ap-hero__stat" style={{ animationDelay: '0.9s' }}>
              <span className="ap-hero__stat-number">
                <CountUp end="60" suffix="+" duration={2500} />
              </span>
              <span className="ap-hero__stat-label">Dedicated Professionals</span>
            </div>
            <div className="ap-hero__stat" style={{ animationDelay: '1.05s' }}>
              <span className="ap-hero__stat-number">
                ISO <CountUp end="9001" duration={2500} />
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
              Ssv Pharmaceuticals is a trusted healthcare company dedicated to excellence and transparency, offering high-quality pharmaceutical products that improve patient outcomes across India.
            </p>
            <p className="ap-text">
              Founded with a vision to make effective healthcare accessible to all, we combine scientific rigour with compassionate values — ensuring every medicine we deliver meets the highest safety and efficacy standards. 
            </p>
            <p className="ap-text">
              Our ISO-certified processes, and a dedicated team of over 40 professionals reflect our unwavering commitment to health and wellbeing. 
            </p>
            
            {/* Stats Counter */}
            <div className="ap-who__stats">
              <div className="ap-who__stat-item">
                <span className="ap-who__stat-number">
                  <CountUp end="15" suffix="+" duration={2500} />
                </span>
                <span className="ap-who__stat-label">Years of Excellence</span>
              </div>
              <div className="ap-who__stat-item">
                <span className="ap-who__stat-number">
                  <CountUp end="25" suffix="+" duration={2500} />
                </span>
                <span className="ap-who__stat-label">Products Portfolio</span>
              </div>
              <div className="ap-who__stat-item">
                <span className="ap-who__stat-number">
                  <CountUp end="60" suffix="+" duration={2500} />
                </span>
                <span className="ap-who__stat-label">Team Members</span>
              </div>
            </div>
          </div>

          <div className="ap-who__image-wrapper">
            <div className="ap-who__image-container">
              <img 
                src={aboutStoryNewImage} 
                alt="Ssv medical professionals" 
                className="ap-who__img"
                loading="lazy"
              />
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
                <li>To be a globally trusted pharmaceutical company that leads through knowledge and values.</li>
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
                <li><strong>Respect and Care</strong> — Valuing people and prioritizing their well-being in everything we do. </li>
                <li><strong>Patient-First</strong> — Putting patient wellbeing first to bring hope, care, and smiles to every life we touch. </li>
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
                  src={aboutMilestoneImage} 
                  alt="Laboratory work" 
                  className="ap-journey__img"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Right Column: Timeline List */}
            <div className="ap-journey__timeline">
              <div className="ap-timeline-track"></div>
              
              <div className="ap-timeline-item">
                <div className="ap-timeline-marker">2010</div>
                <div className="ap-timeline-content">
                  <h4 className="ap-timeline-title">Foundation</h4>
                  <p>Founded in Nagpur with a vision to make quality medicines accessible to all.</p>
                </div>
              </div>

              <div className="ap-timeline-item">
                <div className="ap-timeline-marker">2020</div>
                <div className="ap-timeline-content">
                  <h4 className="ap-timeline-title">People First Initiative</h4>
                  <p>Introduced EPF and ESI benefits for team members, strengthening our commitment to employee security, care, and well-being.</p>
                </div>
              </div>

              <div className="ap-timeline-item">
                <div className="ap-timeline-marker">2022</div>
                <div className="ap-timeline-content">
                  <h4 className="ap-timeline-title">Quality Excellence</h4>
                  <p>Received ISO 9001 certification, reinforcing our dedication to maintaining the highest standards of quality and operational excellence.</p>
                </div>
              </div>

              <div className="ap-timeline-item">
                <div className="ap-timeline-marker">2023</div>
                <div className="ap-timeline-content">
                  <h4 className="ap-timeline-title">MSME Recognition</h4>
                  <p>Recognized among the Top 5000 MSMEs, reflecting our growth, excellence, and contribution to the pharmaceutical industry.</p>
                </div>
              </div>

              <div className="ap-timeline-item">
                <div className="ap-timeline-marker">2025</div>
                <div className="ap-timeline-content">
                  <h4 className="ap-timeline-title">Business Excellence</h4>
                  <p>Maintained our recognition among the Top 5000 MSMEs for three consecutive years, reflecting consistent growth, excellence, and industry contribution.</p>
                </div>
              </div>

              <div className="ap-timeline-item">
                <div className="ap-timeline-marker">2026</div>
                <div className="ap-timeline-content">
                  <h4 className="ap-timeline-title">Strategic Expansion</h4>
                  <p> Launched 5 new brands in a row, strengthening our portfolio and expanding our presence in the pharmaceutical market.</p>
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
            <span className="section-label">Our Values</span>
            <h2 className="section-title">Quality</h2>
            <p className="ap-text">
              Quality is not an afterthought at Ssv — it is embedded in every stage of our process.
            </p>
            <p className="ap-text">
              Our facilities are regularly audited by regulatory bodies, ensuring that every medicine meets global standards of safety, purity, and efficacy. 
            </p>
            <p className="ap-text">
              Holding ISO 9001:2015 certification, we maintain strict quality control with complete traceability from ingredients to shelf. 

            </p>

            {/* Compliance Badges Grid */}
            <div className="ap-standards__badges">
              <div className="ap-standard-tag">Excellence</div>
              <div className="ap-standard-tag">Reliability</div>
              <div className="ap-standard-tag">Purity</div>
              <div className="ap-standard-tag">Trust</div>
            </div>
          </div>

          {/* Right Column: Lab Quality Image & Badge */}
          <div className="ap-standards__image">
            <div className="ap-standards__image-container">
              <img 
                src={aboutWhoImage} 
                alt="Quality control laboratory" 
                className="ap-standards__img"
                loading="lazy"
              />
              <div className="ap-standards__badge">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="ap-badge-icon">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
                <span>ISO 9001 Certified</span>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}

export default AboutPage
