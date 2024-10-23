import { useRef, useState, useEffect } from 'react'

export const useScroll = () => {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [showScrollButtons, setShowScrollButtons] = useState(false)

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const amount = direction === 'left' ? -600 : 600
      scrollRef.current.scrollBy({ left: amount, behavior: 'smooth' })
    }
  }

  const checkScrollButtons = () => {
    if (scrollRef.current) {
      const { scrollWidth, clientWidth } = scrollRef.current
      setShowScrollButtons(scrollWidth > clientWidth)
    }
  }

  useEffect(() => {
    const handleResize = () => {
      checkScrollButtons()
    }

    window.addEventListener('resize', handleResize)

    const currentScrollRef = scrollRef.current
    if (currentScrollRef) {
      currentScrollRef.addEventListener('scroll', checkScrollButtons)
    }

    return () => {
      window.removeEventListener('resize', handleResize)
      if (currentScrollRef) {
        currentScrollRef.removeEventListener('scroll', checkScrollButtons)
      }
    }
  }, [])

  return { scrollRef, showScrollButtons, scroll, checkScrollButtons }
}
