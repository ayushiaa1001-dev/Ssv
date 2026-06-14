import { useIntersectionObserver } from '../../hooks/useIntersectionObserver'
import './Milestones.css'

const milestones = [
  { year: '1986', title: 'Foundation', desc: 'SSV Pharmaceuticals was established with a small manufacturing unit and a big vision.' },
  { year: '1995', title: 'WHO-GMP Certification', desc: 'Achieved WHO-GMP certification, marking our commitment to international quality standards.' },
  { year: '2005', title: 'Export Operations', desc: 'Expanded to international markets, beginning exports to Asia and Africa.' },
  { year: '2015', title: 'R&D Centre Launch', desc: 'Opened a state-of-the-art R&D centre for new drug development and formulation research.' },
  { year: '2024', title: 'Global Presence', desc: 'Reached 12+ countries with 200+ products across multiple therapeutic categories.' },
]

const Milestones = () => {
  const [ref, visible] = useIntersectionObserver({ threshold: 0.15 })

  return (
    <section className="milestones" id="milestones" ref={ref}>
      <div className={`milestones__inner container ${visible ? 'milestones--visible' : ''}`}>
        <div className="milestones__header">
          <span className="section-label">Our Journey</span>
          <h2 className="section-title">Key <span>Milestones</span></h2>
          <p className="milestones__subtitle">
            From a humble beginning to a global pharmaceutical presence — here are the moments that defined us.
          </p>
        </div>

        <div className="milestones__timeline">
          <div className="milestones__line"></div>
          {milestones.map((m, i) => (
            <div
              className={`milestones__item ${i % 2 === 0 ? 'milestones__item--left' : 'milestones__item--right'}`}
              key={i}
              style={{ animationDelay: `${0.3 + i * 0.2}s` }}
            >
              <div className="milestones__dot">
                <span>{m.year}</span>
              </div>
              <div className="milestones__card">
                <h3 className="milestones__card-title">{m.title}</h3>
                <p className="milestones__card-desc">{m.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Milestones
