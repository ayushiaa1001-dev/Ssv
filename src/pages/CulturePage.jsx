import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'
import './CulturePage.css'

/* ── Data ── */
const PILLARS = [
  {
    icon: 'heart',
    color: '#e84670',
    bgColor: 'rgba(232, 70, 112, 0.08)',
    title: 'People First',
    desc: 'Every decision starts with what\'s best for our team. From flexible schedules to mental health support and an open-door policy — our people always come first.'
  },
  {
    icon: 'lightbulb',
    color: '#2e86ab',
    bgColor: 'rgba(46, 134, 171, 0.08)',
    title: 'Innovation Mindset',
    desc: 'We celebrate curiosity. Cross-functional hackathons, internal R&D grants, and an open innovation culture ensure that great ideas can come from anywhere.'
  },
  {
    icon: 'shield',
    color: '#22c55e',
    bgColor: 'rgba(34, 197, 94, 0.08)',
    title: 'Integrity Always',
    desc: 'Ethical conduct is non-negotiable. We are transparent with our people, our partners, and our patients — always.'
  },
  {
    icon: 'star',
    color: '#d4a853',
    bgColor: 'rgba(212, 168, 83, 0.08)',
    title: 'Recognise & Celebrate',
    desc: 'Monthly Star Performer awards, annual gala nights, and team milestones celebrated big — because great work deserves great recognition.'
  },
  {
    icon: 'clipboard',
    color: '#5a6a7a',
    bgColor: 'rgba(90, 106, 122, 0.08)',
    title: 'Work–Life Balance',
    desc: 'Flexible hours, work-from-home provisions, and on-campus recreation rooms — we invest in the whole person, not just the professional.'
  },
  {
    icon: 'globe',
    color: '#2e86ab',
    bgColor: 'rgba(46, 134, 171, 0.08)',
    title: 'Diversity & Inclusion',
    desc: '500+ professionals across 12+ states, representing diverse backgrounds, languages, and disciplines — united by one mission to advance healthcare.'
  }
]

const EVENTS = [
  {
    month: 'January',
    title: "Founders' Day",
    desc: "Honouring our founder's vision with speeches, awards, and a day of reflection on how far we've come — and how far we'll go.",
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80'
  },
  {
    month: 'March',
    title: 'Wellness Month',
    desc: 'Yoga sessions, health screenings, nutrition workshops, and mental health awareness — a month dedicated to well-being.',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&q=80'
  },
  {
    month: 'June',
    title: 'Innovation Week',
    desc: 'A full week of hackathons, guest speakers from the industry, and unveiling of internal R&D projects and breakthroughs.',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80'
  },
  {
    month: 'October',
    title: 'Annual Gala Night',
    desc: "A glamorous evening of awards, entertainment, and celebrating the year's achievements together as one SSV family.",
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=600&q=80'
  }
]

const GALLERY_PHOTOS = [
  { src: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&q=80', alt: 'Team collaboration' },
  { src: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&q=80', alt: 'Workshop session' },
  { src: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&q=80', alt: 'Team celebration' },
  { src: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?w=600&q=80', alt: 'Office culture' },
  { src: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=600&q=80', alt: 'Team meeting' },
  { src: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=600&q=80', alt: 'Team discussion' }
]

/* ── Icon Components ── */
const PillarIcon = ({ type, color }) => {
  const icons = {
    heart: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>,
    lightbulb: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18h6"/><path d="M10 22h4"/><path d="M12 2a7 7 0 00-4 12.7V17h8v-2.3A7 7 0 0012 2z"/></svg>,
    shield: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
    star: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
    clipboard: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="18" rx="2"/><path d="M8 7v0"/><path d="M16 7v0"/><path d="M8 12h8"/><path d="M8 17h6"/></svg>,
    globe: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>
  }
  return icons[type] || null
}

const CulturePage = () => {
  const location = useLocation()
  const [heroVisible, setHeroVisible] = useState(false)

  const [pillarsRef, pillarsVisible] = useIntersectionObserver()
  const [photosRef, photosVisible] = useIntersectionObserver()
  const [eventsRef, eventsVisible] = useIntersectionObserver()
  const [ctaRef, ctaVisible] = useIntersectionObserver()

  useEffect(() => {
    const timer = setTimeout(() => setHeroVisible(true), 200)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location])

  return (
    <div className="culture-page">

      {/* ── Hero Banner ── */}
      <section className="cul-hero">
        <div className="cul-hero__bg">
          <img
            src="https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1600&q=80"
            alt="Culture at SSV Pharmaceuticals"
          />
          <div className="cul-hero__overlay"></div>
        </div>
        <div className="cul-hero__content">
          <div className={`cul-hero__text scroll-reveal ${heroVisible ? 'scroll-reveal--visible' : ''}`}>
            <Link to="/" className="cul-back-btn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
              Back to Home
            </Link>
            <span className="cul-hero__label">Life at SSV</span>
            <h1 className="cul-hero__title">Culture at SSV</h1>
            <p className="cul-hero__sub">
              At SSV, culture isn&apos;t a policy document — it&apos;s lived every day. From how we celebrate wins to how we support each other through challenges, our culture defines who we are.
            </p>
            <div className="cul-hero__buttons">
              <a href="#culture-pillars" onClick={(e) => {
                e.preventDefault()
                document.getElementById('culture-pillars')?.scrollIntoView({ behavior: 'smooth' })
              }} className="btn btn-primary">
                Our Pillars
              </a>
              <a href="#culture-events" onClick={(e) => {
                e.preventDefault()
                document.getElementById('culture-events')?.scrollIntoView({ behavior: 'smooth' })
              }} className="btn btn-outline">
                Annual Events
              </a>
            </div>
          </div>
        </div>
        <div className="cul-hero__scroll">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </section>

      {/* ── Cultural Pillars ── */}
      <section
        className={`cul-section cul-pillars scroll-reveal ${pillarsVisible ? 'scroll-reveal--visible' : ''}`}
        ref={pillarsRef}
        id="culture-pillars"
      >
        <div className="container">
          <div className="cul-section__header">
            <span className="section-label">What We Stand For</span>
            <h2 className="section-title">Our Cultural Pillars</h2>
          </div>
          <div className="cul-pillars__grid">
            {PILLARS.map((pillar, i) => (
              <div
                className={`cul-pillar-card ${pillarsVisible ? 'cul-pillar-card--visible' : ''}`}
                key={i}
                style={{ transitionDelay: pillarsVisible ? `${0.1 + i * 0.1}s` : '0s' }}
              >
                <div className="cul-pillar-card__icon" style={{ background: pillar.bgColor }}>
                  <PillarIcon type={pillar.icon} color={pillar.color} />
                </div>
                <h3 className="cul-pillar-card__title">{pillar.title}</h3>
                <p className="cul-pillar-card__desc">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Life in Photos ── */}
      <section
        className={`cul-section cul-photos scroll-reveal ${photosVisible ? 'scroll-reveal--visible' : ''}`}
        ref={photosRef}
        id="culture-photos"
      >
        <div className="container">
          <div className="cul-section__header">
            <span className="section-label">Snapshots</span>
            <h2 className="section-title">Life in Photos</h2>
          </div>
          <div className="cul-photos__grid">
            {GALLERY_PHOTOS.map((photo, i) => (
              <div
                className={`cul-photos__item cul-photos__item--${i + 1} ${photosVisible ? 'cul-photos__item--visible' : ''}`}
                key={i}
                style={{ transitionDelay: photosVisible ? `${0.1 + i * 0.08}s` : '0s' }}
              >
                <img src={photo.src} alt={photo.alt} loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Annual Events ── */}
      <section
        className={`cul-section cul-events scroll-reveal ${eventsVisible ? 'scroll-reveal--visible' : ''}`}
        ref={eventsRef}
        id="culture-events"
      >
        <div className="container">
          <div className="cul-section__header">
            <span className="section-label">Annual Traditions</span>
            <h2 className="section-title">Events That Define Us</h2>
          </div>
          <div className="cul-events__grid">
            {EVENTS.map((event, i) => (
              <div
                className={`cul-event-card ${eventsVisible ? 'cul-event-card--visible' : ''}`}
                key={i}
                style={{ transitionDelay: eventsVisible ? `${0.15 + i * 0.12}s` : '0s' }}
              >
                <div className="cul-event-card__img">
                  <img src={event.image} alt={event.title} loading="lazy" />
                  <span className="cul-event-card__month">{event.month}</span>
                </div>
                <div className="cul-event-card__body">
                  <h3 className="cul-event-card__title">{event.title}</h3>
                  <p className="cul-event-card__desc">{event.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Join Us CTA ── */}
      <section
        className={`cul-cta scroll-reveal ${ctaVisible ? 'scroll-reveal--visible' : ''}`}
        ref={ctaRef}
      >
        <div className="cul-cta__inner container">
          <div className="cul-cta__text">
            <h2 className="cul-cta__title">Want to be part of this culture?</h2>
            <p className="cul-cta__sub">We&apos;re always looking for passionate people who want to make a difference in healthcare.</p>
          </div>
          <Link to="/careers" className="btn cul-cta__btn">View Open Roles</Link>
        </div>
      </section>
    </div>
  )
}

export default CulturePage
