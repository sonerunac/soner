import React from 'react'
import { motion } from 'framer-motion'

type FloatingBadgeProps = {
  label: string
  className?: string
  duration?: number
  delay?: number
  pathX?: number[]
  pathY?: number[]
  onClick?: () => void
}

const FloatingBadge: React.FC<FloatingBadgeProps> = ({
  label,
  className = '',
  duration = 8,
  delay = 0,
  pathX = [0, 8, -6, 0],
  pathY = [0, -6, 6, 0],
  onClick,
}) => {
  const [pulseKey, setPulseKey] = React.useState(0)

  const handleClick = () => {
    setPulseKey((k) => k + 1)
    onClick?.()
  }

  return (
    <motion.button
      type="button"
      onClick={handleClick}
      whileHover={{ scale: 1.06, y: -2 }}
      whileTap={{ scale: 0.94 }}
      aria-label={label}
      className={
        `relative select-none inline-flex items-center rounded-full px-2 py-1 text-[10px] font-semibold ` +
        `shadow-md border ` +
        `bg-white/85 dark:bg-dark-800/85 border-dark-100 dark:border-dark-700 ` +
        `text-dark-700 dark:text-dark-100 backdrop-blur ` +
        className
      }
      animate={{ x: pathX, y: pathY }}
      transition={{ duration, repeat: Infinity, ease: 'easeInOut', delay }}
      style={{ WebkitTapHighlightColor: 'transparent' }}
    >
      {/* subtle gradient ring */}
      <span className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-r from-primary-500/0 via-primary-500/10 to-primary-500/0 opacity-0 group-hover:opacity-100 transition-opacity" />
      {/* pulse ripple on click */}
      <motion.span
        key={pulseKey}
        className="pointer-events-none absolute inset-0 rounded-full"
        initial={{ scale: 0.85, opacity: 0.35 }}
        animate={{ scale: 1.6, opacity: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      />
      {label}
    </motion.button>
  )
}

export default FloatingBadge


