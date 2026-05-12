import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle } from 'lucide-react'
import './ServiceDetail.css'

export default function ServiceDetail({ service }) {
  const handleMessage = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="sd-root">
      <AnimatePresence mode="wait">
        <motion.div
          key={service.id}
          className="sd-card glass"
          style={{ '--accent': service.theme.primary, '--glow': service.theme.glow }}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
        >
          {/* Header */}
          <div className="sd-header">
            <span className="sd-icon" aria-hidden="true">{service.icon}</span>
            <div>
              <h3 className="sd-title" style={{ color: service.theme.primary }}>
                {service.name}
              </h3>
              <p className="sd-desc">{service.description}</p>
            </div>
          </div>

          {/* Divider */}
          <div className="sd-divider" style={{ backgroundColor: service.theme.primary }} />

          {/* Pricing list */}
          <ul className="sd-pricing" aria-label="Pricing">
            {service.pricing.map((item, i) => (
              <li key={i} className="sd-price-row">
                <span className="sd-price-label">{item.label}</span>
                <span className="sd-price-value" style={{ color: service.theme.primary }}>
                  {item.price}
                </span>
              </li>
            ))}
          </ul>

          {/* Note */}
          {service.note && (
            <p className="sd-note">{service.note}</p>
          )}

          {/* CTA */}
          <button
            className="btn sd-btn"
            style={{ backgroundColor: service.theme.primary, color: '#000' }}
            onClick={handleMessage}
            aria-label={`Message us about ${service.name}`}
          >
            <MessageCircle size={16} aria-hidden="true" />
            Message Us
          </button>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
