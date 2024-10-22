import { renderHook, waitFor } from '@testing-library/react'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import useChart from '../../hooks/useChart'

describe('useChart', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should process and return data with correct structure', async () => {
    const { result } = renderHook(() => useChart())

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
    })

    expect(result.current.syllablesData).not.toBe(null)
    expect(result.current.phonemesData).not.toBe(null)
    expect(result.current.activitiesLettersData).not.toBe(null)
    expect(result.current.lowestSyllablesData).not.toBe(null)
    expect(result.current.lowestPhonemesData).not.toBe(null)
    expect(result.current.surveyFeedback).not.toBe(null)
  })

  it('should return chart data with correct structure for line charts', async () => {
    const { result } = renderHook(() => useChart())

    await waitFor(() => {
      expect(result.current.syllablesData).not.toBe(null)
      expect(result.current.phonemesData).not.toBe(null)
    })

    expect(result.current.syllablesData).toEqual(
      expect.objectContaining({
        labels: expect.any(Array),
        datasets: expect.arrayContaining([
          expect.objectContaining({
            label: expect.any(String),
            data: expect.any(Array),
            borderColor: expect.any(String),
            backgroundColor: expect.any(String)
          })
        ])
      })
    )

    expect(result.current.phonemesData).toEqual(
      expect.objectContaining({
        labels: expect.any(Array),
        datasets: expect.arrayContaining([
          expect.objectContaining({
            label: expect.any(String),
            data: expect.any(Array),
            borderColor: expect.any(String),
            backgroundColor: expect.any(String)
          })
        ])
      })
    )
  })

  it('should return chart data with correct structure for bar charts', async () => {
    const { result } = renderHook(() => useChart())

    await waitFor(() => {
      expect(result.current.activitiesLettersData).not.toBe(null)
    })

    expect(result.current.activitiesLettersData).toEqual(
      expect.objectContaining({
        labels: expect.any(Array),
        datasets: expect.arrayContaining([
          expect.objectContaining({
            label: expect.any(String),
            data: expect.any(Array),
            backgroundColor: expect.any(String)
          })
        ])
      })
    )
  })

  it('should return lowest scores data with correct structure', async () => {
    const { result } = renderHook(() => useChart())

    await waitFor(() => {
      expect(result.current.lowestSyllablesData).not.toBe(null)
      expect(result.current.lowestPhonemesData).not.toBe(null)
    })

    expect(result.current.lowestSyllablesData).toEqual(
      expect.objectContaining({
        labels: expect.any(Array),
        datasets: expect.arrayContaining([
          expect.objectContaining({
            label: expect.any(String),
            data: expect.any(Array),
            backgroundColor: expect.any(String)
          })
        ])
      })
    )

    const syllablesScores = result.current.lowestSyllablesData!.datasets[0].data as number[]
    for (let i = 1; i < syllablesScores.length; i++) {
      expect(syllablesScores[i]).toBeGreaterThanOrEqual(syllablesScores[i - 1])
    }
  })

  it('should return survey feedback with correct structure', async () => {
    const { result } = renderHook(() => useChart())

    await waitFor(() => {
      expect(result.current.surveyFeedback).not.toBe(null)
    })

    expect(result.current.surveyFeedback).toEqual(
      expect.objectContaining({
        most_liked_activity: expect.objectContaining({
          activity_id: expect.any(Number),
          activity_name: expect.any(String),
          rating: expect.any(Number)
        }),
        least_liked_activity: expect.objectContaining({
          activity_id: expect.any(Number),
          activity_name: expect.any(String),
          rating: expect.any(Number)
        })
      })
    )
  })

  it('should finish loading after data processing', async () => {
    const { result } = renderHook(() => useChart())

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
    })

    expect(result.current.error).toBe(null)
  })
})
