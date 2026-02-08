import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { formatNumber, formatShortNumber } from '../utils/helpers'

export default function AnimatedNumber({ value, prefix = '', suffix = '', format = 'long' }) {
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    const numValue = typeof value === 'string' ? parseFloat(value) : value
    if (isNaN(numValue)) return

    let current = 0
    const increment = numValue / 30
    const timer = setInterval(() => {
      current += increment
      if (current >= numValue) {
        setDisplayValue(numValue)
        clearInterval(timer)
      } else {
        setDisplayValue(current)
      }
    }, 30)

    return () => clearInterval(timer)
  }, [value])

  const formattedValue =
    format === 'short' ? formatShortNumber(displayValue) : formatNumber(displayValue, 2)

  return (
    <motion.span
      key={displayValue}
      initial={{ scale: 1, opacity: 1 }}
      animate={{ scale: 1, opacity: 1 }}
      className="inline-block"
    >
      {prefix}
      {formattedValue}
      {suffix}
    </motion.span>
  )
}
