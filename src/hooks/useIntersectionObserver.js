import { useEffect, useRef, useState } from 'react'

/**
 * @param {any} [options]
 * @returns {[import('react').RefObject<any>, boolean]}
 */
export function useIntersectionObserver(options = {}) {
  const [isIntersecting, setIsIntersecting] = useState(false)
  const ref = useRef(null)

  const { threshold = 0.15, root = null, rootMargin = '0px' } = options

  useEffect(() => {
    const el = ref.current
    if (!el) return

    let observer = null
    let cancelled = false

    // Delay observer creation slightly to ensure scroll resetting (ScrollToTop hook)
    // executes before setting up the observer. This prevents false positive
    // intersections on initial mount when routing from a page that was scrolled to bottom.
    const timer = setTimeout(() => {
      if (cancelled) return

      observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true)
          observer.disconnect()
        }
      }, { threshold, root, rootMargin })

      observer.observe(el)
    }, 100)

    return () => {
      cancelled = true
      clearTimeout(timer)
      observer?.disconnect()
    }
  }, [threshold, root, rootMargin])

  return [ref, isIntersecting]
}
