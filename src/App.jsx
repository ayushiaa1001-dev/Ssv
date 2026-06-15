import { useLayoutEffect } from 'react'
import { HashRouter, Routes, Route, useLocation, Link } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import Hero from './components/Hero/Hero'
import About from './components/About/About'
import AboutPage from './pages/AboutPage'
import ProductsPage from './pages/ProductsPage'
import CareersPage from './pages/CareersPage'

// Synchronously resets scroll position on navigation before child mount animations/intersection observers trigger.
function ScrollToTop() {
  const { pathname } = useLocation()

  useLayoutEffect(() => {
    // Disable default browser scroll restoration
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

function HomePage() {
  return (
    <main>
      <Hero />
      <About />
    </main>
  )
}

function NotFound() {
  return (
    <main style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '40px 24px' }}>
      <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(3rem, 8vw, 6rem)', fontWeight: 800, color: 'var(--color-primary)', lineHeight: 1 }}>404</h1>
      <p style={{ fontSize: '1.1rem', color: 'var(--color-text-body)', margin: '16px 0 32px', maxWidth: '420px' }}>
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link to="/" className="btn btn-dark">Back to Home</Link>
    </main>
  )
}

function App() {
  return (
    <HashRouter>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/careers" element={<CareersPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </HashRouter>
  )
}

export default App

