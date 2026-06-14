import { useEffect, useRef, useState } from 'react'

export function useIntersectionObserver(options = {}) {
  const [isIntersecting, setIsIntersecting] = useState(false)
  const ref = useRef(null)

  const { threshold = 0.15, root = null, rootMargin = '0px' } = options

  useEffect(() => {
    const el = ref.current
    if (!el) return

    let observer = null

    // Delay observer creation slightly to ensure scroll resetting (ScrollToTop hook)
    // executes before setting up the observer. This prevents false positive
    // intersections on initial mount when routing from a page that was scrolled to bottom.
    const timer = setTimeout(() => {
      observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true)
          // Disconnect after it triggers once to avoid repeat transitions
          observer.unobserve(el)
        }
      }, { threshold, root, rootMargin })

      observer.observe(el)
    }, 100)

    return () => {
      clearTimeout(timer)
      if (observer && el) observer.unobserve(el)
    }
  }, [threshold, root, rootMargin])

  return [ref, isIntersecting]
}

