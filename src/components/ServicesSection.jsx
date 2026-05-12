import { useState } from 'react'
import { motion } from 'framer-motion'
import ServiceWheel from './ServiceWheel'
import ServiceDetail from './ServiceDetail'
import { services } from '../data/services'
import './ServicesSection.css'

export default function ServicesSection() {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <section id="services" className="ss-section">
      <div className="section">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Our Services
        </motion.h2>
        <motion.p
          className="section-sub"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          Click a slice — or use arrow keys — to explore what we offer.
        </motion.p>

        <div className="ss-layout">
          {/* Interactive service wheel */}
          <motion.div
            className="ss-wheel-col"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <ServiceWheel activeIndex={activeIndex} setActiveIndex={setActiveIndex} />
          </motion.div>

          {/* Detail card */}
          <motion.div
            className="ss-detail-col"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <ServiceDetail service={services[activeIndex]} />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
