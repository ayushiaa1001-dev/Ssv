import { HashRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import Hero from './components/Hero/Hero'
import About from './components/About/About'
import AboutPage from './pages/AboutPage'
import ProductsPage from './pages/ProductsPage'

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
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/products" element={<ProductsPage />} />
      </Routes>
      <Footer />
    </HashRouter>
  )
}

export default App
