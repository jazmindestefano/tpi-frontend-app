import { useState, useEffect, useLayoutEffect } from 'react'
import { ThemeCard } from '../common/cards/themeCard/ThemeCard'
import { Theme } from '../../interfaces/interfaces'
import Button from '../common/buttons/Button'
import { ArrowLeftIcon, ArrowRightIcon } from '../common/icons/Icons'
import { useScroll } from '../../hooks/useScroll'

const bgColors = [
  'bg-orange-300',
  'bg-blue-300',
  'bg-yellow-300',
  'bg-pink-300',
  'bg-green-300',
  'bg-red-300',
  'bg-purple-300'
]

interface ThemeCardsListProps {
  themes: Theme[]
  onCardClick: (theme: Theme) => void
}

export default function ThemeCardsList({ themes, onCardClick }: ThemeCardsListProps) {
  const { scrollRef, scroll, checkScrollButtons, showScrollButtons } = useScroll()
  const [assignedColors, setAssignedColors] = useState<string[]>([])
  const [loadedImages, setLoadedImages] = useState(0)

  useEffect(() => {
    const colorsToAssign = [...bgColors].sort(() => Math.random() - 0.5).slice(0, themes.length)
    setAssignedColors(colorsToAssign)
  }, [themes.length])

  useLayoutEffect(() => {
    if (loadedImages === themes.length) {
      checkScrollButtons()
    }
  }, [checkScrollButtons, loadedImages, themes.length])

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
  }, [scrollRef, checkScrollButtons])

  const handleImageLoad = () => {
    setLoadedImages((prev) => prev + 1)
  }

  return (
    <div className="relative pb-10 px-5 lg:px-32">
      <Button
        variant="primary"
        size="circle"
        shape={'circle'}
        onClick={() => scroll('left')}
        className={`absolute left-5 top-1/2 transform -translate-y-1/2 z-10 transition-opacity duration-300 ${
          showScrollButtons ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <ArrowLeftIcon />
      </Button>
      <div
        ref={scrollRef}
        className="flex overflow-x-auto gap-5 scroll-smooth hide-scrollbar"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {themes.map((theme, index) => (
          <div key={theme.id} className="flex-shrink-0">
            <ThemeCard
              theme={theme}
              onClick={() => onCardClick(theme)}
              bgColor={assignedColors[index]}
              onImageLoad={handleImageLoad}
            />
          </div>
        ))}
      </div>
      <Button
        variant="primary"
        size="circle"
        shape={'circle'}
        onClick={() => scroll('right')}
        className={`absolute right-5 top-1/2 transform -translate-y-1/2 z-10 transition-opacity duration-300 ${
          showScrollButtons ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <ArrowRightIcon />
      </Button>
    </div>
  )
}
