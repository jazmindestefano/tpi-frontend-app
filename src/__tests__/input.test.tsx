import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Input } from '../components/common/inputs/Input'

describe('Input component', () => {
  const handleChange = vi.fn()

  it('renders correctly with a label', () => {
    render(<Input name="testInput" label="Test Label" placeholder="Enter text" onChange={handleChange} />)

    const labelElement = screen.getByText(/test label/i)
    const inputElement = screen.getByPlaceholderText(/enter text/i)

    expect(labelElement).toBeInTheDocument()
    expect(inputElement).toBeInTheDocument()
  })

  it('renders correctly without a label', () => {
    render(<Input name="testInput" placeholder="Enter text" onChange={handleChange} />)

    const inputElement = screen.getByPlaceholderText(/enter text/i)

    expect(inputElement).toBeInTheDocument()
    expect(screen.queryByLabelText(/test label/i)).not.toBeInTheDocument()
  })

  it('calls onChange handler when input value changes', () => {
    render(<Input name="testInput" placeholder="Enter text" onChange={handleChange} />)

    const inputElement = screen.getByPlaceholderText(/enter text/i)

    fireEvent.change(inputElement, { target: { value: 'New value' } })
    expect(handleChange).toHaveBeenCalled()
  })
})
