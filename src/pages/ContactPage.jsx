import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { countries, statesByCountry, citiesByState } from '../data/locationData'
import './ContactPage.css'

const ContactPage = () => {
  const { t } = useTranslation()
  const [heroVisible, setHeroVisible] = useState(false)
  useDocumentTitle('Contact Us')
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const [formName, setFormName] = useState('')
  const [formEmail, setFormEmail] = useState('')
  const [formPhone, setFormPhone] = useState('')
  const [formCountry, setFormCountry] = useState('')
  const [formState, setFormState] = useState('')
  const [formCity, setFormCity] = useState('')
  const [formPincode, setFormPincode] = useState('')
  const [formSubject, setFormSubject] = useState('')
  const [formMessage, setFormMessage] = useState('')

  // State dropdown control helpers
  const [countryCode, setCountryCode] = useState('')
  const [selectedStateName, setSelectedStateName] = useState('')
  const [isCustomCountry, setIsCustomCountry] = useState(false)
  const [isCustomState, setIsCustomState] = useState(false)
  const [isCustomCity, setIsCustomCity] = useState(false)

  const [formRef, formVisible] = useIntersectionObserver()
  const [infoRef, infoVisible] = useIntersectionObserver()

  useEffect(() => {
    const timer = setTimeout(() => setHeroVisible(true), 200)
    return () => clearTimeout(timer)
  }, [])

  const handleCountryChange = (e) => {
    const val = e.target.value
    setCountryCode(val)
    
    if (val === '') {
      setFormCountry('')
      setFormState('')
      setFormCity('')
      setSelectedStateName('')
      setIsCustomCountry(false)
      setIsCustomState(false)
      setIsCustomCity(false)
    } else if (val === 'OTHER') {
      setFormCountry('')
      setFormState('')
      setFormCity('')
      setSelectedStateName('')
      setIsCustomCountry(true)
      setIsCustomState(true)
      setIsCustomCity(true)
    } else {
      const selectedCountryObj = countries.find(c => c.code === val)
      const countryName = selectedCountryObj ? selectedCountryObj.name : ''
      setFormCountry(countryName)
      setFormState('')
      setFormCity('')
      setSelectedStateName('')
      setIsCustomCountry(false)
      
      const hasStates = !!statesByCountry[val]
      setIsCustomState(!hasStates)
      setIsCustomCity(true)
    }
  }

  const handleStateChange = (e) => {
    const stateName = e.target.value
    if (stateName === 'OTHER_STATE') {
      setIsCustomState(true)
      setFormState('')
      setSelectedStateName('')
      setFormCity('')
      setIsCustomCity(true)
    } else {
      setFormState(stateName)
      setSelectedStateName(stateName)
      setFormCity('')
      
      if (stateName === '') {
        setIsCustomCity(false)
      } else {
        const hasCities = !!citiesByState[stateName]
        setIsCustomCity(!hasCities)
      }
    }
  }

  const handleCityChange = (e) => {
    const cityName = e.target.value
    if (cityName === 'OTHER_CITY') {
      setIsCustomCity(true)
      setFormCity('')
    } else {
      setFormCity(cityName)
    }
  }

  const handlePhoneChange = (e) => {
    const val = e.target.value
    const onlyDigits = val.replace(/\D/g, '')
    setFormPhone(onlyDigits)
  }

  const handlePincodeChange = (e) => {
    const val = e.target.value
    const onlyDigits = val.replace(/\D/g, '')
    setFormPincode(onlyDigits)
  }

  const resetFormStateHelper = () => {
    setFormName('')
    setFormEmail('')
    setFormPhone('')
    setFormCountry('')
    setFormState('')
    setFormCity('')
    setFormPincode('')
    setFormSubject('')
    setFormMessage('')
    setCountryCode('')
    setSelectedStateName('')
    setIsCustomCountry(false)
    setIsCustomState(false)
    setIsCustomCity(false)
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    if (formPhone.length !== 10) {
      setErrorMessage('Phone number must be exactly 10 digits.')
      return
    }
    if (formPincode && formPincode.length !== 6) {
      setErrorMessage('Pincode must be exactly 6 digits.')
      return
    }
    setSubmitting(true)
    setErrorMessage('')

    const submitUrl = import.meta.env.VITE_FORM_SUBMIT_URL
    const isMock = !submitUrl || submitUrl === 'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE'

    const payload = {
      type: 'contact',
      name: formName,
      email: formEmail,
      phone: `+91 ${formPhone}`,
      country: formCountry || undefined,
      state: formState || undefined,
      city: formCity || undefined,
      pincode: formPincode || undefined,
      subject: formSubject,
      message: formMessage,
    }

    if (isMock) {
      console.warn('[Ssv Contact] Message submitted (mock mode - no backend URL configured):', payload)
      setTimeout(() => {
        setSubmitting(false)
        setSubmitted(true)
        resetFormStateHelper()
      }, 800)
      return
    }

    try {
      await fetch(submitUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'text/plain',
        },
        body: JSON.stringify(payload),
      })

      setSubmitting(false)
      setSubmitted(true)
      resetFormStateHelper()
    } catch (err) {
      console.error('[Ssv Contact] Submission error:', err)
      setErrorMessage('Failed to send message. Please try again or contact us directly.')
      setSubmitting(false)
    }
  }

  const resetForm = () => {
    setSubmitted(false)
    setErrorMessage('')
    resetFormStateHelper()
  }

  return (
    <div className="contact-page">
      {/* ── Hero Banner ── */}
      <section className="ct-hero">
        <div className="ct-hero__bg">
          <img
            src="https://images.unsplash.com/photo-1596524430615-b46475ddff6e?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Contact Ssv Pharmaceuticals"
            loading="lazy"
          />
          <div className="ct-hero__overlay"></div>
        </div>
        <div className="ct-hero__content">
          <div className={`ct-hero__text scroll-reveal ${heroVisible ? 'scroll-reveal--visible' : ''}`}>
            <Link to="/" className="ct-back-btn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
              {t('contact.backToHome')}
            </Link>
            <span className="ct-hero__label">{t('contact.heroLabel')}</span>
            <h1 className="ct-hero__title">{t('contact.heroTitle')}</h1>
            <p className="ct-hero__sub">
              {t('contact.heroSub')}
            </p>
          </div>
        </div>
      </section>

      {/* ── Contact Form + Info Section ── */}
      <section className="ct-section">
        <div className="container">
          <div className="ct-layout">

            {/* Left — Form */}
            <div
              ref={formRef}
              className={`ct-form-card scroll-reveal ${formVisible ? 'scroll-reveal--visible' : ''}`}
            >
              {!submitted ? (
                <form className="ct-form" onSubmit={handleFormSubmit}>
                  <h2 className="ct-form__title">{t('contact.formTitle')}</h2>
                  <p className="ct-form__sub">{t('contact.formSub')}</p>

                  <div className="ct-form__row">
                    <div className="ct-form__group">
                      <label htmlFor="ct-name">{t('contact.fieldName')}</label>
                      <input
                        id="ct-name"
                        type="text"
                        required
                        maxLength={100}
                        placeholder={t('contact.placeholderName')}
                        value={formName}
                        onChange={e => setFormName(e.target.value)}
                      />
                    </div>
                    <div className="ct-form__group">
                      <label htmlFor="ct-email">{t('contact.fieldEmail')}</label>
                      <input
                        id="ct-email"
                        type="email"
                        required
                        maxLength={100}
                        placeholder={t('contact.placeholderEmail')}
                        value={formEmail}
                        onChange={e => setFormEmail(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="ct-form__row">
                    <div className="ct-form__group">
                      <label htmlFor="ct-phone">{t('contact.fieldPhone')}</label>
                      <div className="ct-phone-input-wrapper">
                        <span className="ct-phone-prefix">+91</span>
                        <input
                          id="ct-phone"
                          type="tel"
                          required
                          pattern="[0-9]{10}"
                          maxLength={10}
                          title="Please enter exactly 10 digits"
                          placeholder={t('contact.placeholderPhone')}
                          value={formPhone}
                          onChange={handlePhoneChange}
                          className="ct-phone-input"
                        />
                      </div>
                    </div>
                    <div className="ct-form__group">
                      <label htmlFor="ct-subject">{t('contact.fieldSubject')}</label>
                      <select
                        id="ct-subject"
                        required
                        value={formSubject}
                        onChange={e => setFormSubject(e.target.value)}
                      >
                        <option value="">{t('contact.selectSubject')}</option>
                        <option value="general">{t('contact.subjGeneral')}</option>
                        <option value="products">{t('contact.subjProducts')}</option>
                        <option value="partnership">{t('contact.subjPartnership')}</option>
                        <option value="exports">{t('contact.subjExports')}</option>
                        <option value="careers">{t('contact.subjCareers')}</option>
                        <option value="other">{t('contact.subjOther')}</option>
                      </select>
                    </div>
                  </div>

                  <div className="ct-form__row">
                    <div className="ct-form__group">
                      <label htmlFor="ct-country">{t('contact.fieldCountry')}</label>
                      {isCustomCountry ? (
                        <div className="ct-location-input-wrapper">
                          <input
                            id="ct-country"
                            type="text"
                            placeholder={t('contact.placeholderCountry')}
                            value={formCountry}
                            onChange={e => setFormCountry(e.target.value)}
                          />
                          <button
                            type="button"
                            onClick={() => {
                              setIsCustomCountry(false)
                              setCountryCode('')
                              setFormCountry('')
                              setFormState('')
                              setFormCity('')
                              setSelectedStateName('')
                              setIsCustomState(false)
                              setIsCustomCity(false)
                            }}
                            className="ct-location-toggle-btn"
                          >
                            Reset
                          </button>
                        </div>
                      ) : (
                        <select
                          id="ct-country"
                          value={countryCode}
                          onChange={handleCountryChange}
                        >
                          <option value="">{t('contact.selectCountry')}</option>
                          {countries.map(c => (
                            <option key={c.code} value={c.code}>{c.name}</option>
                          ))}
                        </select>
                      )}
                    </div>
                    <div className="ct-form__group">
                      <label htmlFor="ct-state">{t('contact.fieldState')}</label>
                      {isCustomState ? (
                        <div className="ct-location-input-wrapper">
                          <input
                            id="ct-state"
                            type="text"
                            required={formCountry !== ''}
                            placeholder={t('contact.placeholderState')}
                            value={formState}
                            onChange={e => setFormState(e.target.value)}
                          />
                          {!isCustomCountry && statesByCountry[countryCode] && (
                            <button
                              type="button"
                              onClick={() => {
                                setIsCustomState(false)
                                setFormState('')
                                setSelectedStateName('')
                                setFormCity('')
                                setIsCustomCity(false)
                              }}
                              className="ct-location-toggle-btn"
                            >
                              List
                            </button>
                          )}
                        </div>
                      ) : (
                        <select
                          id="ct-state"
                          value={formState}
                          onChange={handleStateChange}
                          disabled={!countryCode}
                        >
                          <option value="">{t('contact.selectState')}</option>
                          {(statesByCountry[countryCode] || []).map(st => (
                            <option key={st} value={st}>{st}</option>
                          ))}
                          <option value="OTHER_STATE">Other (Type manually)</option>
                        </select>
                      )}
                    </div>
                  </div>

                  <div className="ct-form__row">
                    <div className="ct-form__group">
                      <label htmlFor="ct-city">{t('contact.fieldCity')}</label>
                      {isCustomCity ? (
                        <div className="ct-location-input-wrapper">
                          <input
                            id="ct-city"
                            type="text"
                            required={formState !== ''}
                            placeholder={t('contact.placeholderCity')}
                            value={formCity}
                            onChange={e => setFormCity(e.target.value)}
                          />
                          {!isCustomState && citiesByState[selectedStateName] && (
                            <button
                              type="button"
                              onClick={() => {
                                setIsCustomCity(false)
                                setFormCity('')
                              }}
                              className="ct-location-toggle-btn"
                            >
                              List
                            </button>
                          )}
                        </div>
                      ) : (
                        <select
                          id="ct-city"
                          value={formCity}
                          onChange={handleCityChange}
                          disabled={!formState}
                        >
                          <option value="">{t('contact.selectCity')}</option>
                          {(citiesByState[selectedStateName] || []).map(ct => (
                            <option key={ct} value={ct}>{ct}</option>
                          ))}
                          <option value="OTHER_CITY">Other (Type manually)</option>
                        </select>
                      )}
                    </div>
                    <div className="ct-form__group">
                      <label htmlFor="ct-pincode">{t('contact.fieldPincode')}</label>
                      <input
                        id="ct-pincode"
                        type="text"
                        pattern="[0-9]{6}"
                        maxLength={6}
                        title="Please enter exactly 6 digits"
                        placeholder={t('contact.placeholderPincode')}
                        value={formPincode}
                        onChange={handlePincodeChange}
                      />
                    </div>
                  </div>

                  <div className="ct-form__group">
                    <label htmlFor="ct-message">{t('contact.fieldMessage')}</label>
                    <textarea
                      id="ct-message"
                      required
                      rows="5"
                      placeholder={t('contact.placeholderMessage')}
                      value={formMessage}
                      onChange={e => setFormMessage(e.target.value)}
                    ></textarea>
                  </div>

                  {errorMessage && (
                    <div className="ct-form__error" style={{ color: 'var(--destructive)', fontSize: '0.85rem', marginBottom: '16px' }}>
                      {errorMessage}
                    </div>
                  )}

                  <button type="submit" className="btn btn-dark ct-form__submit" disabled={submitting}>
                    {submitting ? 'Sending...' : t('contact.sendButton')}
                    {!submitting && (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
                    )}
                  </button>
                </form>
              ) : (
                <div className="ct-success">
                  <div className="ct-success__icon">
                    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  </div>
                  <h3>{t('contact.successTitle')}</h3>
                  <p>{t('contact.successMessage')}</p>
                  <button className="btn btn-dark" onClick={resetForm} style={{ marginTop: '24px' }}>
                    {t('contact.sendAnother')}
                  </button>
                </div>
              )}
            </div>

            {/* Right — Contact Info */}
            <div
              ref={infoRef}
              className={`ct-info scroll-reveal ${infoVisible ? 'scroll-reveal--visible' : ''}`}
            >
              <div className="ct-info__card">
                <div className="ct-info__icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                </div>
                <div>
                  <h4>{t('contact.addressTitle')}</h4>
                  <p style={{ whiteSpace: 'pre-line' }} dangerouslySetInnerHTML={{ __html: t('footer.address') }} />
                </div>
              </div>

              <div className="ct-info__card">
                <div className="ct-info__icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg>
                </div>
                <h4>{t('contact.phoneTitle')}</h4>
                <div className="ct-phone-pills">
                  <a href="tel:+918920606892" className="ct-phone-pill">
                    {t('footer.phone1')}
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7"/><path d="M7 7h10v10"/></svg>
                  </a>
                  <a href="tel:+919818977444" className="ct-phone-pill">
                    {t('footer.phone2')}
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7"/><path d="M7 7h10v10"/></svg>
                  </a>
                </div>
              </div>

              <div className="ct-info__card">
                <div className="ct-info__icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                </div>
                <h4>{t('contact.emailTitle')}</h4>
                <div className="ct-phone-pills">
                  <a href="mailto:info@ssvpharma.com" className="ct-phone-pill">
                    {t('footer.emailInfo')}
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7"/><path d="M7 7h10v10"/></svg>
                  </a>
                  <a href="mailto:hrssvpharma@gmail.com" className="ct-phone-pill">
                    {t('footer.emailHr')}
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7"/><path d="M7 7h10v10"/></svg>
                  </a>
                </div>
              </div>

              <div className="ct-info__card">
                <div className="ct-info__icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                </div>
                <h4>{t('contact.hoursTitle')}</h4>
                <p>
                  {t('contact.hoursWeekdays')}<br/>
                  {t('contact.hoursSunday')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ContactPage
