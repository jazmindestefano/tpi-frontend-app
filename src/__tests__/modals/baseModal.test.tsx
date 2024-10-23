import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { BaseModal } from '../../components/common/modals/BaseModal'

vi.mock('../../../hooks/useSpeakText', () => ({
  useSpeakText: () => vi.fn()
}))

describe('BaseModal component', () => {
  const mockOnClose = vi.fn()

  it('renders title and children correctly', () => {
    render(
      <BaseModal title="Test Modal" onClose={mockOnClose}>
        <p>Modal content</p>
      </BaseModal>
    )

    const titleElement = screen.getByText('Test Modal')
    const contentElement = screen.getByText('Modal content')

    expect(titleElement).toBeInTheDocument()
    expect(contentElement).toBeInTheDocument()
  })

  it('calls onClose when the close button is clicked', () => {
    render(
      <BaseModal title="Test Modal" onClose={mockOnClose}>
        <p>Modal content</p>
      </BaseModal>
    )

    const closeButton = screen.getByLabelText('close')
    fireEvent.click(closeButton)

    expect(mockOnClose).toHaveBeenCalled()
  })

  it('renders the content correctly', () => {
    render(
      <BaseModal title="Test Modal" onClose={mockOnClose}>
        <p>Modal content</p>
      </BaseModal>
    )

    const contentElement = screen.getByText('Modal content')
    expect(contentElement).toBeInTheDocument()
  })
})
