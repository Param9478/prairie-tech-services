import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { Helmet } from 'react-helmet-async' // Import karo
import Navbar from './components/Navbar'
import Footer from './components/Footer'

import Home from './pages/Home'
import Services from './pages/Services'
import Projects from './pages/Projects'
import About from './pages/About'
import Contact from './pages/Contact'
import ScrollToTop from './pages/ScrollToTop'

export default function App() {
  const location = useLocation()

  return (
    <>
      {/* ─── SEO META TAGS ─── */}
      <Helmet>
        <title>Parminder Singh | Full Stack Developer in High Prairie</title>
        <meta name="description" content="Professional Software Developer and Computer Technician based in High Prairie, Alberta. Specializing in React, Node.js, and IT Solutions." />
        <meta name="keywords" content="React Developer High Prairie, Computer Technician Alberta, Prairie Tech Services, Parminder Singh Portfolio, Software Developer Alberta" />

        {/* Social Media (Open Graph) */}
        <meta property="og:title" content="Parminder Singh | Full Stack Portfolio" />
        <meta property="og:description" content="Software Developer & Computer Technician in High Prairie, AB." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yourdomain.com" />
        {/* Social Media Image - screenshot laya si jo ohda path */}
        <meta property="og:image" content="/og-preview.png" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      <ScrollToTop />
      <Navbar />

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </AnimatePresence>

      <Footer />
    </>
  )
}