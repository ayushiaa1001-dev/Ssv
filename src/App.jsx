import { useLayoutEffect } from 'react'
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom'
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
      </Routes>
      <Footer />
    </HashRouter>
  )
}

export default App

