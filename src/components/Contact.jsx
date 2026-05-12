import { motion } from 'framer-motion'
import { Phone, Mail, Facebook, MessageCircle } from 'lucide-react'
import './Contact.css'

const contacts = [
  { icon: Phone, label: 'PLDT Landline', value: '323 5199', href: 'tel:3235199', color: '#00ffff' },
  { icon: Phone, label: 'TNT', value: '0908 544 0736', href: 'tel:+639085440736', color: '#ffff00' },
  { icon: Phone, label: 'Globe', value: '0927 177 2310', href: 'tel:+639271772310', color: '#00ffff' },
  { icon: Mail, label: 'Email', value: 'higp.printingservices@gmail.com', href: 'mailto:higp.printingservices@gmail.com', color: '#ff80c0' },
  { icon: Facebook, label: 'Facebook Page', value: 'HIGP Printing Services', href: '#', color: '#5599ff', note: '(Update with actual Facebook URL)' },
  { icon: MessageCircle, label: 'Messenger', value: 'Harry Prevendido', href: '#', color: '#00ffff', note: '(Update with Messenger link)' },
]

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: i * 0.07, ease: 'easeOut' },
  }),
}

export default function Contact() {
  return (
    <section id="contact" className="contact-section">
      <div className="section">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Contact Us
        </motion.h2>
        <motion.p
          className="section-sub"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          Reach out anytime — we respond fast.
        </motion.p>

        {/* Contact cards grid */}
        <div className="contact-grid">
          {contacts.map((c, i) => {
            const Icon = c.icon
            return (
              <motion.a
                key={i}
                href={c.href}
                className="contact-card glass"
                style={{ '--color': c.color }}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                whileHover={{ y: -5, boxShadow: `0 8px 32px ${c.color}33` }}
                aria-label={`${c.label}: ${c.value}`}
                target={c.href.startsWith('http') ? '_blank' : undefined}
                rel={c.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              >
                <div className="contact-icon-wrap" style={{ background: `${c.color}18`, borderColor: `${c.color}44` }}>
                  <Icon size={22} color={c.color} aria-hidden="true" />
                </div>
                <div className="contact-info">
                  <span className="contact-label">{c.label}</span>
                  <span className="contact-value" style={{ color: c.color }}>{c.value}</span>
                </div>
              </motion.a>
            )
          })}
        </div>

        {/* CTA row */}
        <motion.div
          className="contact-cta"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <a
            href="mailto:higp.printingservices@gmail.com"
            className="btn btn-primary"
            aria-label="Email HIGP Printing Services"
          >
            <Mail size={16} aria-hidden="true" />
            Email Us
          </a>
          <a
            href="tel:+639085440736"
            className="btn btn-outline"
            aria-label="Call HIGP Printing Services"
          >
            <Phone size={16} aria-hidden="true" />
            Call Now
          </a>
        </motion.div>

        {/* Business hours hint */}
        <motion.p
          className="contact-hours"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          We accept orders and inquiries anytime. Message us on Facebook for fastest response.
        </motion.p>
      </div>
    </section>
  )
}
