import { useIntersectionObserver } from '../../hooks/useIntersectionObserver'
import aboutImage from '../../assets/images/about-us-home.jpg'
import './About.css'

const About = () => {
  const [ref, visible] = useIntersectionObserver({ threshold: 0.2 })

  return (
    <section className="about" id="about" ref={ref}>
      <div className={`about__inner container ${visible ? 'about--visible' : ''}`}>
        <div className="about__content">
          <span className="section-label">OUR STORY</span>
          <h2 className="section-title">
            About <span>Us</span>
          </h2>
          <p className="about__text">
            Ssv Pharmaceuticals was founded with a vision to make quality healthcare accessible to all .We have grown from a small beginning into a trusted name in the pharmaceutical industry. With over two decades of experience, we serve a wide range of pharmaceutical formulations that meet international standards.
          </p>
          <p className="about__text">
            Our commitment to <strong>Synergy, System and Values</strong>, along with stringent quality controls and a patient-centric approach, has earned us the trust of healthcare professionals and patients across India.
          </p>
        </div>

        <div className="about__image">
          <div className="about__image-wrapper">
            <img src={aboutImage} alt="Ssv Pharmaceuticals team" loading="lazy" />
            <div className="about__pill">
              <span className="about__pill-number">15+</span>
              <span className="about__pill-label">Years of Excellence</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
