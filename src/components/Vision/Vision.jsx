import { useIntersectionObserver } from '../../hooks/useIntersectionObserver'
import './Vision.css'

const values = [
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
      </svg>
    ),
    title: 'Our Vision',
    description: 'To become a globally recognized pharmaceutical company known for innovation, quality, and making healthcare accessible to communities worldwide.',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/>
        <path d="M12 6v6l4 2"/>
      </svg>
    ),
    title: 'Our Mission',
    description: 'To deliver safe, effective, and affordable pharmaceutical solutions through continuous research, ethical practices, and unwavering commitment to quality.',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
      </svg>
    ),
    title: 'Our Values',
    description: 'Integrity, innovation, patient safety, and social responsibility form the cornerstones of everything we do — from R&D to distribution.',
  },
]

const Vision = () => {
  const [ref, visible] = useIntersectionObserver({ threshold: 0.2 })

  return (
    <section className="vision" id="vision" ref={ref}>
      <div className={`vision__inner container ${visible ? 'vision--visible' : ''}`}>
        <div className="vision__header">
          <span className="section-label">Vision & Values</span>
          <h2 className="section-title">
            What <span>Drives Us</span> Forward
          </h2>
          <p className="vision__subtitle">
            Our guiding principles shape every decision, from the lab to the patient.
          </p>
        </div>

        <div className="vision__cards">
          {values.map((item, i) => (
            <div className="vision__card" key={i} style={{ animationDelay: `${0.2 + i * 0.15}s` }}>
              <div className="vision__card-icon">
                {item.icon}
              </div>
              <h3 className="vision__card-title">{item.title}</h3>
              <p className="vision__card-desc">{item.description}</p>
              <div className="vision__card-line"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Vision
