import { describe, it, expect, beforeEach } from 'vitest'
import { renderHook } from '@testing-library/react'
import useRankingChart from '../../hooks/charts/useRankingChart'

describe('useRankingChart', () => {
  let chartData: { type: string; chartData: { name: string; average: number } }[]

  beforeEach(() => {
    chartData = [
      { type: 'syllable', chartData: { name: 'A', average: 10 } },
      { type: 'phoneme', chartData: { name: 'B', average: 20 } },
      { type: 'syllable', chartData: { name: 'A', average: 30 } }
    ]
  })

  it('should initialize data as an empty array', () => {
    const { result } = renderHook(() => useRankingChart({ chartData: [] }))

    expect(result.current.data).toEqual({ labels: [], datasets: [] })
    expect(result.current.title).toBe('')
    expect(result.current.selectedValues).toEqual([])
    expect(result.current.groupedData).toEqual({})
  })

  it('should group data correctly and set title based on type', () => {
    const { result } = renderHook(() => useRankingChart({ chartData }))

    expect(result.current.groupedData).toEqual({
      A: [
        { name: 'A', average: 10 },
        { name: 'A', average: 30 }
      ],
      B: [{ name: 'B', average: 20 }]
    })
    expect(result.current.selectedValues).toEqual(['A', 'B'])
    expect(result.current.title).toBe('Ranking Fonemas más Difíciles')
  })

  it('should update data correctly when chartData changes', () => {
    const { result, rerender } = renderHook(({ chartData }) => useRankingChart({ chartData }), {
      initialProps: { chartData }
    })

    expect(result.current.data.labels).toEqual(['A', 'B'])
    expect(result.current.data.datasets.length).toBe(2)

    const newChartData = [{ type: 'syllable', chartData: { name: 'C', average: 40 } }]

    rerender({ chartData: newChartData })

    expect(result.current.groupedData).toEqual({
      C: [{ name: 'C', average: 40 }]
    })
    expect(result.current.selectedValues).toEqual(['C'])
    expect(result.current.title).toBe('Ranking Sílabas más Difíciles')
  })
})
