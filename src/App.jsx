import Hero from './components/Hero'
import ServicesSection from './components/ServicesSection'
import Gallery from './components/Gallery'
import Contact from './components/Contact'
import InstallButton from './components/InstallButton'

export default function App() {
  return (
    <div className="app">
      {/* Fixed install pill — top-right, only shows when browser supports PWA install */}
      <InstallButton />
      <Hero />
      <ServicesSection />
      <Gallery />
      <Contact />
      <footer className="footer">
        <p>© 2024 HIGP Printing Services. All rights reserved.</p>
        <p className="footer-sub">Affordable prints. Quality service.</p>
      </footer>
    </div>
  )
}
