import { motion } from 'framer-motion'
import { services } from '../data/services'
import './Gallery.css'

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: 'easeOut' },
  }),
}

export default function Gallery() {
  return (
    <section id="gallery" className="gallery-section">
      <div className="section">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Print Samples
        </motion.h2>
        <motion.p
          className="section-sub"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          A glimpse of what we can produce for you.
        </motion.p>

        <div className="gallery-grid">
          {services.map((svc, i) => (
            <motion.div
              key={svc.id}
              className="gallery-card glass"
              style={{ '--accent': svc.theme.primary, '--glow': svc.theme.glow }}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{ y: -6, boxShadow: `0 12px 40px ${svc.theme.glow}` }}
              transition={{ duration: 0.25 }}
            >
              {/* Visual area */}
              <div className="gallery-visual" style={{ background: `radial-gradient(circle at 60% 40%, ${svc.theme.glow}, transparent 70%)` }}>
                <span className="gallery-emoji" aria-hidden="true">{svc.icon}</span>
                <div className="gallery-badge" style={{ borderColor: svc.theme.primary, color: svc.theme.primary }}>
                  SAMPLE
                </div>
              </div>

              {/* Info */}
              <div className="gallery-info">
                <h3 className="gallery-name" style={{ color: svc.theme.primary }}>
                  {svc.name}
                </h3>
                <p className="gallery-desc">{svc.description}</p>

                {/* First price teaser */}
                {svc.pricing[0] && (
                  <p className="gallery-price">
                    From{' '}
                    <strong style={{ color: svc.theme.primary }}>
                      {svc.pricing[0].price}
                    </strong>
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
