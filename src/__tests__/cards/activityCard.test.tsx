import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import { ActivityCard } from '../../components/common/cards/ActivityCard'

describe('ActivityCard component', () => {
  const actividad = {
    id: 1,
    name: 'Actividad 1',
    gameName: 'Game 1',
    activityId: 1,
    answersDto: []
  }
  it('renders "Ver respuestas" button', () => {
    render(
      <MemoryRouter>
        <ActivityCard activity={actividad} />
      </MemoryRouter>
    )

    const buttonElement = screen.getByLabelText('Ver respuestas')
    expect(buttonElement).toBeInTheDocument()
  })
})
