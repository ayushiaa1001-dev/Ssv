import { useEffect, useState } from 'react'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'

const CountUp = ({ end, duration = 1500, suffix = '' }) => {
  const [count, setCount] = useState(0)
  const [ref, visible] = useIntersectionObserver({ threshold: 0.1 })

  useEffect(() => {
    if (!visible) return
    let startTimestamp = null
    const endNum = parseInt(end.replace(/\D/g, ''), 10) || 0
    
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp
      const progress = Math.min((timestamp - startTimestamp) / duration, 1)
      setCount(Math.floor(progress * endNum))
      if (progress < 1) {
        window.requestAnimationFrame(step)
      }
    }
    window.requestAnimationFrame(step)
  }, [visible, end, duration])

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  )
}

export default CountUp
