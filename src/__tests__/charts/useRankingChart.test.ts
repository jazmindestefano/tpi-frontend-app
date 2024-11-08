import { RankingProps } from '@components'
import { useRankingChart } from '@hooks'
import { renderHook } from '@testing-library/react'
import { expect, vi } from 'vitest'

vi.mock('@helpers', () => ({
  getRandomColorDashboard: vi.fn().mockReturnValue('#FF5733')
}))

describe('useRankingChart', () => {
  it('should correctly group data and set title based on chartData', () => {
    const chartData: RankingProps[] = [
      { type: 'phoneme', chartData: { name: 'A', average: 80 } },
      { type: 'phoneme', chartData: { name: 'B', average: 60 } },
      { type: 'phoneme', chartData: { name: 'X', average: 75 } },
      { type: 'phoneme', chartData: { name: 'Y', average: 90 } }
    ]

    const { result } = renderHook(() => useRankingChart({ chartData }))

    expect(result.current.title).toBe('Ranking Fonemas más Difíciles')

    expect(result.current.groupedData).toEqual({
      A: [{ name: 'A', average: 80 }],
      B: [{ name: 'B', average: 60 }],
      X: [{ name: 'X', average: 75 }],
      Y: [{ name: 'Y', average: 90 }]
    })

    expect(result.current.selectedValues).toEqual(['A', 'B', 'X', 'Y'])

    expect(result.current.data.datasets).toHaveLength(4)
    expect(result.current.data.labels).toEqual(['A', 'B', 'X', 'Y'])
  })
})
