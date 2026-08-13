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

function App() {
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
