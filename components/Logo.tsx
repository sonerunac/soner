import React from 'react'
import { motion } from 'framer-motion'

type LogoProps = {
  size?: number
  className?: string
  title?: string
  animated?: boolean
}

/**
 * Premium SVG logo mark designed to feel like a polished Figma handoff.
 * - Glassy squircle, soft inner shadow, neon gradient stroke and glow
 * - Colors use Tailwind CSS variables to adapt to light/dark themes
 */
const Logo: React.FC<LogoProps> = ({ size = 40, className = '', title = 'Soner Unaç', animated = true }) => {
  const id = React.useId()
  const gradientId = `accent-${id}`
  const bgId = `bg-${id}`
  const glowId = `glow-${id}`
  const innerId = `inner-${id}`
  const maskId = `mask-${id}`
  const clipId = `clip-${id}`
  const shineId = `shine-${id}`

  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={title}
      className={className}
      initial={animated ? { opacity: 0, scale: 0.9 } : undefined}
      animate={animated ? { opacity: 1, scale: 1 } : undefined}
      transition={animated ? { duration: 0.6, ease: 'easeOut' } : undefined}
      whileHover={animated ? { rotate: -2, scale: 1.06 } : undefined}
      whileTap={animated ? { scale: 0.98 } : undefined}
    >
      <title>{title}</title>
      <defs>
        {/* Accent gradient uses Tailwind CSS color variables */}
        <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={`rgb(var(--primary-400))`} />
          <stop offset="50%" stopColor={`rgb(var(--primary-600))`} />
          <stop offset="100%" stopColor={`rgb(var(--primary-400))`} />
        </linearGradient>

        {/* Background subtle radial gradient */}
        <radialGradient id={bgId} cx="30%" cy="20%" r="75%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.9)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0.55)" />
        </radialGradient>
        <radialGradient id={innerId} cx="60%" cy="80%" r="85%">
          <stop offset="0%" stopColor="rgba(2,6,23,0.85)" />
          <stop offset="100%" stopColor="rgba(2,6,23,0.65)" />
        </radialGradient>

        {/* Glow for the stroke */}
        <filter id={glowId} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3.5" result="blur" />
          <feColorMatrix type="matrix" values="0 0 0 0 0   0 0 0 0 0.6   0 0 0 0 1   0 0 0 0.9 0" />
        </filter>

        {/* Inner shadow for glass depth */}
        <filter id={maskId} x="-50%" y="-50%" width="200%" height="200%">
          <feOffset dx="0" dy="1" />
          <feGaussianBlur stdDeviation="1.5" result="offset-blur" />
          <feComposite operator="out" in="SourceGraphic" in2="offset-blur" result="inverse" />
          <feFlood floodColor="rgba(0,0,0,0.18)" floodOpacity="1" result="color" />
          <feComposite operator="in" in="color" in2="inverse" result="shadow" />
          <feComposite operator="over" in="shadow" in2="SourceGraphic" />
        </filter>
        {/* ClipPath for inner rounded rect */}
        <clipPath id={clipId}>
          <rect x="8" y="8" width="48" height="48" rx="13" />
        </clipPath>

        {/* Shine gradient for sweeping highlight */}
        <linearGradient id={shineId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="50%" stopColor="#ffffff" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Outer squircle with gradient stroke */}
      <g filter={`url(#${maskId})`}>
        {/* Glassy base (light) */}
        <rect x="8" y="8" width="48" height="48" rx="13" fill="url(#${bgId})" className="dark:hidden" />
        {/* Glassy base (dark) */}
        <rect x="8" y="8" width="48" height="48" rx="13" fill={`url(#${innerId})`} className="hidden dark:block" />
        <rect x="8" y="8" width="48" height="48" rx="13" fill="none" stroke={`url(#${gradientId})`} strokeWidth="2.5" />
      </g>

      {/* Aura ring pulse */}
      {animated && (
        <motion.circle
          cx="32"
          cy="32"
          r="22.5"
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeWidth="1.5"
          style={{ filter: `url(#${glowId})` as unknown as string }}
          initial={{ scale: 0.98, opacity: 0.25 }}
          animate={{ scale: [0.98, 1.06, 0.98], opacity: [0.25, 0.5, 0.25] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
        />
      )}

      {/* Monogram "S" path with neon gradient stroke and draw animation */}
      <g filter={`url(#${glowId})`}>
        <motion.path
          d="M44 18c-5.5-5.5-23-5-23 5 0 10 22 6.5 22 18 0 10.5-20 12-27 4.5"
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeWidth="4.25"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={animated ? { pathLength: 0, pathOffset: 1 } : undefined}
          animate={animated ? { pathLength: 1, pathOffset: 0 } : undefined}
          transition={animated ? { duration: 1.6, ease: 'easeInOut' } : undefined}
        />
        {animated && (
          <motion.path
            d="M44 18c-5.5-5.5-23-5-23 5 0 10 22 6.5 22 18 0 10.5-20 12-27 4.5"
            fill="none"
            stroke="#ffffff"
            strokeOpacity="0.9"
            strokeWidth="2.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="36 300"
            animate={{ strokeDashoffset: [340, 0] }}
            transition={{ duration: 2.4, ease: 'linear', repeat: Infinity }}
          />
        )}
      </g>

      {/* Orbiting spark particles */}
      {animated && (
        <>
          <motion.g
            style={{ transformOrigin: '32px 32px' }}
            animate={{ rotate: 360 }}
            transition={{ duration: 8, ease: 'linear', repeat: Infinity }}
          >
            <circle cx="32" cy="11" r="2" fill={`rgb(var(--primary-600))`} opacity="0.9" />
          </motion.g>
          <motion.g
            style={{ transformOrigin: '32px 32px' }}
            animate={{ rotate: -360 }}
            transition={{ duration: 12, ease: 'linear', repeat: Infinity }}
          >
            <circle cx="32" cy="53" r="1.6" fill={`rgb(var(--primary-400))`} opacity="0.8" />
          </motion.g>
        </>
      )}

      {/* Sweeping shine across the badge */}
      {animated && (
        <g clipPath={`url(#${clipId})`}>
          <motion.rect
            x="8" width="48" height="48" rx="13"
            fill={`url(#${shineId})`}
            initial={{ y: -56 }}
            animate={{ y: [-56, 8, 64] }}
            transition={{ duration: 2.8, repeat: Infinity, repeatDelay: 1.2, ease: 'easeInOut' }}
          />
        </g>
      )}

      {/* Specular highlight */}
      <path d="M16 20c4-5 16-7 24-4" opacity="0.35" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M16 44c3 4 18 6 26-2" opacity="0.15" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" />
    </motion.svg>
  )
}

export default Logo


