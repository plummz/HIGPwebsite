import { useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { services } from '../data/services'
import './ServiceWheel.css'

const N = services.length          // 7
const SLICE = 360 / N              // ≈ 51.43° per slice

// SVG coordinate system: 0° = 3 o'clock (right), increases clockwise
const CX = 160, CY = 160          // SVG center (320×320 viewBox)
const R_OUT = 120                  // inactive outer radius
const R_ACT = 134                  // active outer radius (pops out)
const R_IN  = 46                   // inner hole radius
const R_LBL = 81                   // emoji label radius (midpoint between R_IN and R_OUT)

const toRad = (deg) => (deg * Math.PI) / 180
const fmtPt = (n) => n.toFixed(3)

/** Convert polar coords → SVG cartesian. 0° = right, clockwise. */
function pt(r, deg) {
  const a = toRad(deg)
  return { x: CX + r * Math.cos(a), y: CY + r * Math.sin(a) }
}

/**
 * Build an SVG donut-sector path for slice i.
 * Each slice spans SLICE degrees, centered at i * SLICE.
 * When active = true, outer radius is larger (R_ACT) to "pop out."
 */
function buildPath(i, active) {
  const center = i * SLICE
  const start  = center - SLICE / 2
  const end    = center + SLICE / 2
  const ro     = active ? R_ACT : R_OUT

  const os = pt(ro, start), oe = pt(ro, end)
  const is = pt(R_IN, start), ie = pt(R_IN, end)

  // large-arc flag = 0 because SLICE (≈51°) < 180°
  return [
    `M${fmtPt(os.x)},${fmtPt(os.y)}`,
    `A${ro},${ro},0,0,1,${fmtPt(oe.x)},${fmtPt(oe.y)}`,
    `L${fmtPt(ie.x)},${fmtPt(ie.y)}`,
    `A${R_IN},${R_IN},0,0,0,${fmtPt(is.x)},${fmtPt(is.y)}`,
    'Z',
  ].join(' ')
}

export default function ServiceWheel({ activeIndex, setActiveIndex }) {
  // Navigate by offset: +1 = next, -1 = prev (wraps around)
  const nav = useCallback(
    (dir) => setActiveIndex((p) => (p + dir + N) % N),
    [setActiveIndex]
  )

  // Keyboard: left/right arrow keys
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight') nav(1)
      else if (e.key === 'ArrowLeft') nav(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [nav])

  // Wheel rotation: rotate so activeIndex slice lands at 3 o'clock (0°)
  const wheelRot = -activeIndex * SLICE
  const active = services[activeIndex]

  return (
    <div className="sw-root">
      <div className="sw-canvas-wrap">
        <svg
          viewBox="0 0 320 320"
          className="sw-svg"
          aria-label="Service selection wheel"
          role="radiogroup"
        >
          {/* SVG glow filters – one per service color */}
          <defs>
            {services.map((svc, i) => (
              <filter key={i} id={`gf-${i}`} x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            ))}
          </defs>

          {/* ── Rotating wheel group ───────────────────────────────── */}
          {/* wheelRot moves the active slice to the 0° (3 o'clock) position */}
          <motion.g
            style={{ transformOrigin: `${CX}px ${CY}px` }}
            animate={{ rotate: wheelRot }}
            transition={{ type: 'spring', stiffness: 72, damping: 17 }}
          >
            {services.map((svc, i) => {
              const isActive = i === activeIndex
              // Polar position of this slice's center (before wheel rotation)
              const centerDeg = i * SLICE
              const lx = CX + R_LBL * Math.cos(toRad(centerDeg))
              const ly = CY + R_LBL * Math.sin(toRad(centerDeg))

              return (
                <g
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  onKeyDown={(e) => e.key === 'Enter' && setActiveIndex(i)}
                  tabIndex={0}
                  role="radio"
                  aria-label={svc.name}
                  aria-checked={isActive}
                  className="sw-slice-group"
                >
                  {/* Slice path – CSS transitions for fill/opacity */}
                  <path
                    d={buildPath(i, isActive)}
                    fill={isActive ? svc.theme.primary : '#0d0d28'}
                    stroke={svc.theme.primary}
                    strokeWidth={isActive ? 2.5 : 0.8}
                    filter={isActive ? `url(#gf-${i})` : undefined}
                    style={{
                      transition: 'fill 0.35s ease, opacity 0.35s ease, stroke-width 0.35s ease',
                      opacity: isActive ? 1 : 0.55,
                    }}
                  />

                  {/* Emoji icon at label position */}
                  <text
                    x={lx}
                    y={ly}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize={isActive ? 22 : 16}
                    style={{
                      userSelect: 'none',
                      pointerEvents: 'none',
                      transition: 'font-size 0.3s ease',
                    }}
                  >
                    {svc.icon}
                  </text>
                </g>
              )
            })}
          </motion.g>

          {/* ── Center hub (static – not part of rotating group) ──── */}
          <circle
            cx={CX}
            cy={CY}
            r={R_IN - 2}
            fill="#050510"
            stroke={active.theme.primary}
            strokeWidth={2}
            style={{ transition: 'stroke 0.35s ease' }}
          />
          {/* Center shows active emoji */}
          <text
            x={CX}
            y={CY}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize={26}
          >
            {active.icon}
          </text>

          {/* ── 3 o'clock pointer (fixed – marks the active slot) ─── */}
          {/* Tip at (CX+R_ACT+6, CY), pointing left into the wheel */}
          <polygon
            points={`
              ${CX + R_ACT + 5},${CY}
              ${CX + R_ACT + 16},${CY - 8}
              ${CX + R_ACT + 16},${CY + 8}
            `}
            fill={active.theme.primary}
            style={{ transition: 'fill 0.35s ease' }}
            aria-hidden="true"
          />
        </svg>
      </div>

      {/* Active service name label */}
      <AnimatePresence mode="wait">
        <motion.p
          key={activeIndex}
          className="sw-active-name"
          style={{ color: active.theme.primary, textShadow: `0 0 14px ${active.theme.primary}` }}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
        >
          {active.name}
        </motion.p>
      </AnimatePresence>

      {/* Dot navigation */}
      <div className="sw-dots" role="tablist" aria-label="Service navigation dots">
        {services.map((svc, i) => (
          <button
            key={i}
            className={`sw-dot${i === activeIndex ? ' sw-dot--active' : ''}`}
            style={{
              borderColor: i === activeIndex
                ? svc.theme.primary
                : svc.theme.primary + '55',
              ...(i === activeIndex && {
                backgroundColor: svc.theme.primary,
                boxShadow: `0 0 10px ${svc.theme.primary}`,
              }),
            }}
            onClick={() => setActiveIndex(i)}
            aria-label={`Select ${svc.name}`}
            aria-selected={i === activeIndex}
            role="tab"
          />
        ))}
      </div>

      {/* Keyboard hint */}
      <p className="sw-hint" aria-hidden="true">
        ← → arrow keys to navigate
      </p>
    </div>
  )
}
