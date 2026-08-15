import { useEffect, useState } from 'react'
import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { SelectedWork } from './components/SelectedWork'
import { CaseStudy } from './components/CaseStudy'
import { WhatIDo } from './components/WhatIDo'
import { TechnicalSkills } from './components/TechnicalSkills'
import { Experience, AdditionalExperience } from './components/Experience'
import { Education } from './components/Education'
import { About } from './components/About'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'
import { StructuredData } from './components/StructuredData'
import { ProductLandingPage } from './components/ProductLandingPage'

function App() {
  const [isProductPage, setIsProductPage] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.location.pathname === '/ai-marketing-os'
  })

  useEffect(() => {
    const updateRoute = () => {
      const nextValue = typeof window !== 'undefined' && window.location.pathname === '/ai-marketing-os'
      setIsProductPage(Boolean(nextValue))
    }

    updateRoute()
    window.addEventListener('popstate', updateRoute)
    return () => window.removeEventListener('popstate', updateRoute)
  }, [])

  if (isProductPage) {
    return <ProductLandingPage />
  }

  return (
    <>
      <StructuredData />
      <Navbar />
      <main>
        <Hero />
        <SelectedWork />
        <CaseStudy />
        <WhatIDo />
        <TechnicalSkills />
        <Experience />
        <AdditionalExperience />
        <Education />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

export default App
