import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { ThemeCard } from '../../components/common/cards/themeCard/ThemeCard'
import { Theme } from '../../interfaces/interfaces'

vi.mock('../../../../hooks/useSpeakText', () => ({
  useSpeakText: vi.fn(() => vi.fn())
}))

describe('ThemeCard component', () => {
  const mockTheme: Theme = {
    id: 1,
    name: 'ThemeTest',
    image: ''
  }

  const mockOnClick = vi.fn()
  const mockSpeakText = vi.fn()
  const mockBgColor = 'bg-blue-500'

  it('renders theme name and image correctly', () => {
    render(<ThemeCard theme={mockTheme} onClick={mockOnClick} bgColor={mockBgColor} />)

    const themeName = screen.getByText(mockTheme.name)
    const themeImage = screen.getByAltText(mockTheme.name)

    expect(themeName).toBeInTheDocument()
    expect(themeImage).toBeInTheDocument()
    expect(themeImage).toHaveAttribute('src', `/themes/letras/${mockTheme.name}.png`)
  })

  it('applies the correct background color class', () => {
    render(<ThemeCard theme={mockTheme} onClick={mockOnClick} bgColor={mockBgColor} />)

    const cardElement = screen.getByRole('img').closest('div')
    expect(cardElement).toHaveClass(mockBgColor)
  })

  it('calls onClick function when image is clicked', () => {
    render(<ThemeCard theme={mockTheme} onClick={mockOnClick} bgColor={mockBgColor} />)

    const themeImage = screen.getByAltText(mockTheme.name)
    fireEvent.click(themeImage)

    expect(mockOnClick).toHaveBeenCalled()
  })

  it('calls speakText when VolumeButton is clicked', () => {
    render(<ThemeCard theme={mockTheme} onClick={mockOnClick} bgColor={mockBgColor} />)

    const volumeButton = screen.getByRole('button')
    fireEvent.click(volumeButton)

    expect(mockSpeakText).toHaveBeenCalledWith(mockTheme.name)
  })
})
