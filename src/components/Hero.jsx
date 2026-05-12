import { motion } from 'framer-motion'
import './Hero.css'

export default function Hero() {
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="hero">
      {/* Background grid */}
      <div className="hero-grid" aria-hidden="true" />

      {/* Glowing orbs */}
      <div className="hero-orb hero-orb--cyan" aria-hidden="true" />
      <div className="hero-orb hero-orb--gold" aria-hidden="true" />

      <div className="hero-content">
        {/* Logo mark — matches HIGP geometric diamond branding */}
        <motion.div
          className="hero-logo"
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          aria-label="HIGP Printing Services logo"
        >
          {/* Geometric diamond grid — inspired by actual HIGP logo */}
          <svg className="hero-logo-svg" viewBox="0 0 60 60" aria-hidden="true">
            <rect x="2"  y="2"  width="26" height="26" rx="3" fill="#ff3333" opacity="0.92"/>
            <rect x="32" y="2"  width="26" height="26" rx="3" fill="#ffd700" opacity="0.92"/>
            <rect x="2"  y="32" width="26" height="26" rx="3" fill="#00ccff" opacity="0.92"/>
            <rect x="32" y="32" width="26" height="26" rx="3" fill="#33cc33" opacity="0.92"/>
            <text x="30" y="34" textAnchor="middle" fontSize="13" fontWeight="900"
              fontFamily="Orbitron,sans-serif" fill="#fff" letterSpacing="0.5">HIGP</text>
            <text x="30" y="44" textAnchor="middle" fontSize="4.2" fontWeight="600"
              fontFamily="Inter,sans-serif" fill="rgba(255,255,255,0.85)" letterSpacing="0.8">PRINTING SERVICES</text>
          </svg>
        </motion.div>

        {/* Title */}
        <motion.h1
          className="hero-title"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          HIGP Printing Services
        </motion.h1>

        {/* Tagline */}
        <motion.p
          className="hero-tagline"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          Affordable prints. Quality service.
        </motion.p>

        {/* Description */}
        <motion.p
          className="hero-desc"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.42 }}
        >
          From mugs to tarpaulins, DTF transfers to ID photos — we bring your
          prints to life with vibrant color and fast turnaround.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="hero-cta"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
        >
          <button
            className="btn btn-primary"
            onClick={() => scrollTo('services')}
            aria-label="View our services"
          >
            View Services
          </button>
          <button
            className="btn btn-outline"
            onClick={() => scrollTo('contact')}
            aria-label="Message us"
          >
            Message Us
          </button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="hero-scroll"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          aria-hidden="true"
        >
          <div className="hero-scroll-line" />
        </motion.div>
      </div>
    </section>
  )
}
