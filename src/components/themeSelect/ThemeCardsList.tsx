import { ThemeCard } from '../common/cards/themeCard/ThemeCard.tsx'
import { Theme } from '../../interfaces/interfaces.ts'
import { useRef, useState, useEffect } from 'react'
import Button from '../common/buttons/Button.tsx'
import { ArrowLeftIcon, ArrowRightIcon } from '../common/icons/Icons.tsx'

// Lista de colores de fondo vivos
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

export const ThemeCardsList: React.FC<ThemeCardsListProps> = ({ themes, onCardClick }) => {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [showScrollButtons, setShowScrollButtons] = useState(true)
  const [assignedColors, setAssignedColors] = useState<string[]>([])

  console.log({ scrollRef});

  const scroll = (direction: string) => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -600 : 600
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
    }
  }

  const checkScrollButtons = () => {
    if (scrollRef.current) {
      const { scrollWidth, clientWidth } = scrollRef.current
      console.log({ scrollWidth, clientWidth })
      setShowScrollButtons(scrollWidth > clientWidth)
    }
  }

  useEffect(() => {
    const colors = [...bgColors]
    const colorsToAssign = colors.sort(() => Math.random() - 0.5).slice(0, themes.length)
    setAssignedColors(colorsToAssign)

    checkScrollButtons()
  }, [themes])

  // to-do: check if this is the best way to check if the scroll buttons should be shown
  useEffect(() => {
    checkScrollButtons()
  }, [assignedColors.length])

  return (
    <div className="relative pb-10 px-5 lg:px-32">
      {showScrollButtons && (
        <Button
          shape={'circle'}
          size={'circle'}
          onClick={() => scroll('left')}
          className="absolute left-5 top-1/2 transform -translate-y-1/2 z-10"
        >
          <ArrowLeftIcon />
        </Button>
      )}
      <div
        ref={scrollRef}
        className="flex overflow-x-auto gap-5 scroll-smooth"
        style={{ scrollbarWidth: 'none', overflow: 'hidden' }}
      >
        {themes.map((theme, index) => (
          <div key={theme.id} className="flex-shrink-0">
            <ThemeCard theme={theme} onClick={() => onCardClick(theme)} bgColor={assignedColors[index]} />
          </div>
        ))}
      </div>
      {showScrollButtons && (
        <Button
          shape={'circle'}
          size={'circle'}
          onClick={() => scroll('right')}
          className="absolute right-5 top-1/2 transform -translate-y-1/2 z-10"
        >
          <ArrowRightIcon />
        </Button>
      )}
    </div>
  )
}
