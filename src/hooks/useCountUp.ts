'use client'

import { useRef, useEffect } from 'react'
import { useSpring, useMotionValue } from 'framer-motion'

interface UseCountUpProps {
  end: number
  start?: number
  duration?: number
  delay?: number
  enabled?: boolean
}

export function useCountUp({ 
  end, 
  start = 0, 
  duration = 2000, 
  delay = 0,
  enabled = true 
}: UseCountUpProps) {
  const count = useMotionValue(start)
  const springCount = useSpring(count, {
    stiffness: 50,
    damping: 20,
    duration: duration / 1000,
  })
  
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (!enabled || hasAnimated.current) return

    const timer = setTimeout(() => {
      count.set(end)
      hasAnimated.current = true
    }, delay)

    return () => clearTimeout(timer)
  }, [end, count, delay, enabled])

  return springCount
} 