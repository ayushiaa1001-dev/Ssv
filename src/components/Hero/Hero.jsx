import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import './Hero.css'
import heroBg from '../../assets/images/hero-bg.png'

const stats = [
  { number: '38+', label: 'Years of Excellence' },
  { number: '200+', label: 'Product Portfolio' },
  { number: '12', label: 'Export Countries' },
  { number: '500+', label: 'Professionals' },
]

const Hero = () => {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 200)
    return () => clearTimeout(timer)
  }, [])

  const handleScrollToContact = (e) => {
    e.preventDefault()
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="hero" id="hero">
      <div className="hero__bg">
        <img src={heroBg} alt="Pharmaceutical laboratory" />
        <div className="hero__overlay"></div>
      </div>

      <div className="hero__content" style={{ paddingLeft: '6%' }}>
        <div className={`hero__text ${visible ? 'hero__text--visible' : ''}`}>
          <span className="hero__eyebrow">ADVANCING HEALTHCARE SINCE 1985</span>
          <h1 className="hero__title">
            Committed to Health,<br />
            Driven by Science.
          </h1>
          <p className="hero__description">
            SSV Pharmaceuticals delivers trusted, high-quality medicines across therapeutic categories — improving lives across India and beyond.
          </p>
          <div className="hero__buttons">
            <Link to="/about" className="btn btn-primary" id="hero-cta-story">
              Discover Our Story
            </Link>
            <a href="#contact" onClick={handleScrollToContact} className="btn btn-outline" id="hero-cta-touch">
              Get in Touch
            </a>
          </div>
        </div>
      </div>

      <div className={`hero__stats ${visible ? 'hero__stats--visible' : ''}`}>
        <div className="hero__stats-inner container">
          {stats.map((stat, i) => (
            <div className="hero__stat" key={i} style={{ animationDelay: `${0.6 + i * 0.15}s` }}>
              <span className="hero__stat-number">{stat.number}</span>
              <span className="hero__stat-label">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Hero
