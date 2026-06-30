/* cspell:ignore Hazari Pahad whogmp Nutraceuticals */
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'


const resources = {
  en: {
    translation: {
      navbar: {
        home: 'Home',
        aboutUs: 'About Us',
        whoWeAre: 'Our Story',
        visionValues: 'Vision & Values',
        milestones: 'Milestones',
        quality: 'Quality',
        products: 'Products',
        upcomingProducts: 'Upcoming Products',
        coughColdRange: 'Anti Cold / Anti Asthmatics',
        painManagement: 'Ortho and Pain Management',
        gynae: "Women's Health",
        gastro: 'Gastro',
        general: 'Nutraceuticals',
        allProducts: 'All Products',
        events: 'Events',
        cultureAtSsv: 'Culture at Ssv',
        gallery: 'Gallery',
        careers: 'Careers',
        searchPlaceholder: 'Search...',
        noResults: 'No results for',
        contactUs: 'Contact Us',
        qualityCertifications: 'Quality & Certifications'
      },
      footer: {
        brandDesc: 'Committed to <strong>Synergy, System & Values</strong>, along with stringent quality controls and a patient-centric approach.',
        missionTitle: 'Our Mission',
        missionDesc: 'To deliver safe, effective, and affordable pharmaceutical solutions through continuous research, ethical practices, and unwavering commitment to quality.',
        quickLinksTitle: 'Quick Links',
        links: {
          home: 'Home',
          about: 'About Us',
          products: 'Products',
          events: 'Events',
          careers: 'Careers'
        },
        contactTitle: 'Contact Us',
        address: '<strong>Ssv Pharmaceuticals</strong>\nPlot No. 2, 1st Floor,\nMalabar Colony, Hazari Pahad Road,\nSeminary Hills, Nagpur, 440006',
        phone1: '+91 89206 06892',
        phone2: '+91 98189 77444',
        emailInfo: 'info@ssvpharma.com',
        emailHr: 'hrssvpharma@gmail.com',
        qualitySealTitle: 'Quality Seal',
        copyright: '© 2026 Ssv Pharmaceuticals. All rights reserved. Committed to Health. Driven by Science.',
        privacyPolicy: 'Privacy Policy',
        termsOfService: 'Terms of Service',
        cookiePolicy: 'Cookie Policy'
      },
      contact: {
        backToHome: 'Back to Home',
        heroLabel: 'Get in Touch',
        heroTitle: 'Contact Us',
        heroSub: 'Have a question, partnership inquiry, or need information about our products? We\'d love to hear from you. Our team is ready to assist.',
        formTitle: 'Send Us a Message',
        formSub: 'Fill out the form below and we\'ll get back to you within 24 hours.',
        fieldName: 'Full Name *',
        fieldEmail: 'Email Address *',
        fieldPhone: 'Phone Number *',
        fieldSubject: 'Subject *',
        selectSubject: 'Select a subject',
        subjGeneral: 'General Inquiry',
        subjProducts: 'Product Information',
        subjPartnership: 'Partnership / Distribution',
        subjExports: 'Export Inquiry',
        subjCareers: 'Careers',
        subjOther: 'Other',
        fieldMessage: 'Message *',
        placeholderName: 'John Doe',
        placeholderEmail: 'john@example.com',
        placeholderPhone: '9876543210',
        placeholderMessage: 'Tell us how we can help you...',
        fieldCountry: 'Country',
        placeholderCountry: 'e.g. India',
        selectCountry: 'Select Country',
        fieldState: 'State',
        placeholderState: 'e.g. Maharashtra',
        selectState: 'Select State',
        fieldCity: 'City',
        placeholderCity: 'e.g. Nagpur',
        selectCity: 'Select City',
        fieldPincode: 'Pincode',
        placeholderPincode: 'e.g. 440006',
        sendButton: 'Send Message',
        successTitle: 'Message Sent!',
        successMessage: 'Thank you for reaching out. Our team will review your message and respond within 24 hours.',
        sendAnother: 'Send Another Message',
        addressTitle: 'Our Address',
        phoneTitle: 'Phone',
        emailTitle: 'Email',
        hoursTitle: 'Business Hours',
        hoursWeekdays: 'Mon – Sat: 10:00 AM – 6:00 PM',
        hoursSunday: 'Sunday: Closed'
      },
      culture: {
        backToHome: 'Back to Home',
        heroLabel: 'LIFE AT Ssv',
        heroTitle: 'Culture at Ssv',
        heroSub: 'At Ssv, culture isn\'t a policy document — it\'s lived every day. From how we celebrate wins to how we support each other through challenges, our culture defines who we are.',
        btnPillars: 'Our Pillars',
        standFor: 'What We Stand For',
        pillarsTitle: 'Our Cultural Pillars',
        ctaTitle: 'Want to be part of this culture?',
        ctaSub: 'We\'re always looking for passionate people who want to make a difference in healthcare.',
        viewRoles: 'View Open Roles'
      },
      productsPage: {
        backToHome: 'Back to Home',
        heroLabel: 'OUR PORTFOLIO',
        heroTitle: 'Medicines Crafted with Science & Care',
        heroSub: 'A trusted range across five therapeutic categories — formulated to the highest safety standards.',
        joinTeam: 'Join Our Team',
        lifeAtSsv: 'Life at Ssv',
        statTherapeutic: 'Therapeutic Range',
        statFormulations: 'Formulations',
        statCertified: 'Certified',
        statEfficacy: 'Tested Efficacy',
        explore: 'Explore',
        browseCategory: 'Product Portfolio',
        viewProducts: 'VIEW PRODUCTS',
        close: 'CLOSE',
        whogmp: 'WHO-GMP',
        zoomInHint: 'Double-click or scroll to zoom',
        zoomOutHint: 'Double-click to reset · Drag to pan'
      }
    }
  }
}

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  })

export default i18n
