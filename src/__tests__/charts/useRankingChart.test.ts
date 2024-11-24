import { RankingProps } from '@interfaces'
import { useRankingChart } from '@hooks'
import { renderHook } from '@testing-library/react'
import { expect, vi } from 'vitest'

vi.mock('@helpers', () => ({
  getRandomColorDashboard: vi.fn().mockReturnValue('#FF5733')
}))

const phonemeChartData: RankingProps[] = [
  { type: 'phoneme', chartData: { name: 'A', average: 80 } },
  { type: 'phoneme', chartData: { name: 'B', average: 60 } },
  { type: 'phoneme', chartData: { name: 'X', average: 75 } },
  { type: 'phoneme', chartData: { name: 'Y', average: 90 } }
]

const syllableChartData: RankingProps[] = [
  { type: 'syllable', chartData: { name: 'A', average: 80 } },
  { type: 'syllable', chartData: { name: 'B', average: 60 } },
  { type: 'syllable', chartData: { name: 'X', average: 75 } },
  { type: 'syllable', chartData: { name: 'Y', average: 90 } }
]

describe('useRankingChart', () => {
  it('Get phoneme ranking chart data', () => {
    const { result } = renderHook(() => useRankingChart({ chartData: phonemeChartData }))

    expect(result.current.title).toBe('Ranking Fonemas más Difíciles')
    expect(result.current.selectedValues).toEqual(['A', 'B', 'X', 'Y'])
    expect(result.current.data.datasets).toHaveLength(4)
    expect(result.current.data.labels).toEqual(['A', 'B', 'X', 'Y'])
  })

  it('Get syllable ranking chart data', () => {
    const { result } = renderHook(() => useRankingChart({ chartData: syllableChartData }))

    expect(result.current.title).toBe('Ranking Sílabas más Difíciles')
    expect(result.current.selectedValues).toEqual(['A', 'B', 'X', 'Y'])
    expect(result.current.data.datasets).toHaveLength(4)
    expect(result.current.data.labels).toEqual(['A', 'B', 'X', 'Y'])
  })
})
