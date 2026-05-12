import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Download, X } from 'lucide-react'
import './InstallButton.css'

export default function InstallButton() {
  const [prompt, setPrompt] = useState(null)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    // Only fires when the browser decides the app is installable
    const onPrompt = (e) => {
      e.preventDefault()
      setPrompt(e)
    }
    const onInstalled = () => {
      setPrompt(null)
    }

    window.addEventListener('beforeinstallprompt', onPrompt)
    window.addEventListener('appinstalled', onInstalled)
    return () => {
      window.removeEventListener('beforeinstallprompt', onPrompt)
      window.removeEventListener('appinstalled', onInstalled)
    }
  }, [])

  const handleInstall = async () => {
    if (!prompt) return
    prompt.prompt()
    const { outcome } = await prompt.userChoice
    if (outcome === 'accepted') setPrompt(null)
  }

  // Only render when browser has surfaced the install prompt and user hasn't dismissed
  const visible = !!prompt && !dismissed

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="install-pill"
          role="complementary"
          aria-label="Install app banner"
          initial={{ opacity: 0, y: -16, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -12, scale: 0.92 }}
          transition={{ type: 'spring', stiffness: 260, damping: 22 }}
        >
          <button
            className="install-btn"
            onClick={handleInstall}
            aria-label="Install HIGP Printing Services app"
          >
            <Download size={13} aria-hidden="true" />
            Install App
          </button>

          <button
            className="install-dismiss"
            onClick={() => setDismissed(true)}
            aria-label="Dismiss install prompt"
          >
            <X size={13} aria-hidden="true" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
