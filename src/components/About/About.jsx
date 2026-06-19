import { useIntersectionObserver } from '../../hooks/useIntersectionObserver'
import aboutImage from '../../assets/images/about-us-home.jpg'
import './About.css'

const About = () => {
  const [ref, visible] = useIntersectionObserver({ threshold: 0.2 })

  return (
    <section className="about" id="about" ref={ref}>
      <div className={`about__inner container ${visible ? 'about--visible' : ''}`}>
        <div className="about__content">
          <span className="section-label">WHO WE ARE</span>
          <h2 className="section-title">
            About <span>Us</span>
          </h2>
          <p className="about__text">
            Founded with a vision to make quality healthcare accessible to all,
            Ssv Pharmaceuticals has grown from a modest beginning into a
            trusted name in the pharmaceutical industry. With over three decades
            of experience, we manufacture and distribute a wide range of
            pharmaceutical formulations that meet international standards.
          </p>
          <p className="about__text">
            Our commitment to research-driven innovation, stringent quality
            controls, and patient-centric approach has earned us the trust of
            healthcare professionals and patients across 12+ countries.
          </p>
        </div>

        <div className="about__image">
          <div className="about__image-wrapper">
            <img src={aboutImage} alt="Ssv Pharmaceuticals team" loading="lazy" />
            <div className="about__pill">
              <span className="about__pill-number">38+</span>
              <span className="about__pill-label">Years of Excellence</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
