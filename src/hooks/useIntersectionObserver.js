import { useEffect, useRef, useState } from 'react'

export function useIntersectionObserver(options = {}) {
  const [isIntersecting, setIsIntersecting] = useState(false)
  const ref = useRef(null)

  const { threshold = 0.15, root = null, rootMargin = '0px' } = options

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsIntersecting(true)
        // Disconnect after it triggers once to avoid repeat transitions
        observer.unobserve(el)
      }
    }, { threshold, root, rootMargin })

    observer.observe(el)
    return () => {
      if (el) observer.unobserve(el)
    }
  }, [threshold, root, rootMargin])

  return [ref, isIntersecting]
}

