import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, Mock, beforeEach } from 'vitest'
import HomeCard from '../../../components/common/cards/HomeCard'
import { Game } from '../../../interfaces/interfaces'

const gameMock: Game = {
  id: 1,
  name: 'Test Game',
  image: 'test-image.jpg'
}

vi.mock('../../../../hooks/useSpeakText', () => ({
  useSpeakText: vi.fn()
}))

describe('Componente HomeCard', () => {
  let onClickMock: Mock
  let speakTextMock: Mock

  beforeEach(() => {
    onClickMock = vi.fn()
    speakTextMock = vi.fn()

    vi.mock('../../../../hooks/useSpeakText.ts', () => ({
      useSpeakText: () => speakTextMock
    }))
  })

  it('renderiza el nombre del juego y la imagen correctamente', () => {
    render(<HomeCard buttonVariant="primary" backgroundColor="bg-blue-500" onClick={onClickMock} game={gameMock} />)

    expect(screen.getByText('TEST GAME')).toBeInTheDocument()

    const img = screen.getByAltText('Test Game')
    expect(img).toBeInTheDocument()
    expect(img).toHaveAttribute('src', 'test-image.jpg')
  })

  it('llama a onClick cuando se hace clic en la imagen', () => {
    render(<HomeCard buttonVariant="primary" backgroundColor="bg-blue-500" onClick={onClickMock} game={gameMock} />)

    fireEvent.click(screen.getByAltText('Test Game'))
    expect(onClickMock).toHaveBeenCalled()
  })
})
