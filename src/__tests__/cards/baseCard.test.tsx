import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { BaseCard } from '../../components/common/cards/BaseCard'

describe('BaseCard component', () => {
  it('renders children correctly', () => {
    render(
      <BaseCard>
        <p>Test Content</p>
      </BaseCard>
    )

    const childElement = screen.getByText(/test content/i)
    expect(childElement).toBeInTheDocument()
  })

  it('applies the default class name', () => {
    render(
      <BaseCard>
        <p>Test Content</p>
      </BaseCard>
    )

    const containerElement = screen.getByText(/test content/i).parentElement
    expect(containerElement).toHaveClass('max-w-96 rounded-3xl shadow-lg cursor-pointer')
  })

  it('applies additional className when provided', () => {
    render(
      <BaseCard className="bg-blue-500">
        <p>Test Content</p>
      </BaseCard>
    )

    const containerElement = screen.getByText(/test content/i).parentElement
    expect(containerElement).toHaveClass('bg-blue-500')
    expect(containerElement).toHaveClass('max-w-96 rounded-3xl shadow-lg cursor-pointer')
  })
})
