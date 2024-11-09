import { useRef, useState, useEffect, useCallback } from 'react'

const useScroll = () => {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [showScrollButtons, setShowScrollButtons] = useState(false)

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const amount = direction === 'left' ? -600 : 600
      scrollRef.current.scrollBy({ left: amount, behavior: 'smooth' })
    }
  }

  const checkScrollButtons = useCallback(() => {
    if (scrollRef.current) {
      const { scrollWidth, clientWidth } = scrollRef.current
      setShowScrollButtons(scrollWidth > clientWidth)
    }
  }, [])

  const handleResize = useCallback(() => {
    checkScrollButtons()
  }, [checkScrollButtons])

  useEffect(() => {
    const currentScrollRef = scrollRef.current

    window.addEventListener('resize', handleResize)
    if (currentScrollRef) {
      currentScrollRef.addEventListener('scroll', checkScrollButtons)
    }

    return () => {
      window.removeEventListener('resize', handleResize)
      if (currentScrollRef) {
        currentScrollRef.removeEventListener('scroll', checkScrollButtons)
      }
    }
  }, [checkScrollButtons, handleResize])

  return { scrollRef, showScrollButtons, scroll, checkScrollButtons }
}

export default useScroll
