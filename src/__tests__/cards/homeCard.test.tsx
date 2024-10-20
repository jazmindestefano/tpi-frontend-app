import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import HomeCard from '../../components/common/cards/HomeCard'
import { Game } from '../../interfaces/interfaces'

const game: Game = {
  id: 1,
  name: 'Juego1',
  image: 'Juego1.png'
}

describe('HomeCard component', () => {
  it('renders game name correctly', () => {
    render(<HomeCard buttonVariant="primary" onClick={() => {}} backgroundColor="red" game={game} />)

    const cardElement = screen.getByTestId('home-card-name')
    expect(cardElement).toHaveTextContent(game.name.toUpperCase())
  })
})
