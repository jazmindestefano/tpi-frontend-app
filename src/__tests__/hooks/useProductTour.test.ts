import { renderHook, act } from '@testing-library/react'
import useProductTour from '../../hooks/useProductTour'
import { Step } from 'react-joyride'
import { vi } from 'vitest'
import { useSpeakText } from '../../hooks/useSpeakText'

vi.mock('../../hooks/useSpeakText', () => ({
  useSpeakText: vi.fn(() => vi.fn())
}))

describe('useProductTour', () => {
  const steps: Step[] = [
    { target: '.step1', content: 'Step 1' },
    { target: '.step2', content: 'Step 2' }
  ]

  it('should initialize with runTour set to true', () => {
    const { result } = renderHook(() => useProductTour({ steps }))
    expect(result.current.runTour).toBe(true)
  })

  it('should set runTour to true after mounting', () => {
    const { result } = renderHook(() => useProductTour({ steps }))
    act(() => {
      result.current.runTour = true
    })
    expect(result.current.runTour).toBe(true)
  })

  it('should call speakText with the correct text when action is next and type is step:after', () => {
    const speakTextMock = vi.fn()
    vi.mocked(useSpeakText).mockReturnValue(speakTextMock)

    const { result } = renderHook(() => useProductTour({ steps }))

    act(() => {
      result.current.handleJoyrideCallback({ index: 0, type: 'step:after' })
    })

    expect(speakTextMock).toHaveBeenCalledWith('Step 1')
  })

  it('should not call speakText if textToSpeak is undefined', () => {
    const speakTextMock = vi.fn()
    vi.mocked(useSpeakText).mockReturnValue(speakTextMock)

    const { result } = renderHook(() => useProductTour({ steps: [{ target: '.step1', content: undefined }] }))

    act(() => {
      result.current.handleJoyrideCallback({ index: 0, type: 'step:after' })
    })

    expect(speakTextMock).not.toHaveBeenCalled()
  })
})
