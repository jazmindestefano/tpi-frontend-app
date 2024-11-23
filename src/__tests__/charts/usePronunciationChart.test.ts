import { describe, it, expect, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { usePronunciationChart } from '@hooks'
import { PronunciationChartProps } from '@components'

describe('usePronunciationChart', () => {
  let chartData: PronunciationChartProps[]

  beforeEach(() => {
    chartData = [
      {
        type: 'syllable',
        data: {
          value: 'a',
          date: '2023-01-01',
          score: 10,
          type: 'syllable'
        }
      },
      {
        type: 'syllable',
        data: {
          value: 'b',
          date: '2023-01-02',
          score: 20,
          type: 'syllable'
        }
      },
      {
        type: 'syllable',
        data: {
          value: 'c',
          date: '2023-01-03',
          score: 30,
          type: 'syllable'
        }
      }
    ]
  })

  it('should initialize with correct title and grouped data', () => {
    const { result } = renderHook(() => usePronunciationChart({ chartData }))

    expect(result.current.title).toBe('Gráfico de Pronunciación de Sílabas')
    expect(result.current.groupedData).toEqual({
      a: { label: 'a', data: [10], dates: ['2023-01-01'] },
      b: { label: 'b', data: [20], dates: ['2023-01-02'] },
      c: { label: 'c', data: [30], dates: ['2023-01-03'] }
    })
  })

  it('should update selected values', () => {
    const { result } = renderHook(() => usePronunciationChart({ chartData }))

    act(() => {
      result.current.setSelectedValues(['a'])
    })

    expect(result.current.data.datasets).toHaveLength(1)
    expect(result.current.data.datasets[0].label).toBe('a')
  })

  it('should update selected options', () => {
    const { result } = renderHook(() => usePronunciationChart({ chartData }))

    act(() => {
      result.current.setSelectedOptions([{ label: 'Option 1', value: '1' }])
    })

    expect(result.current.selectedOptions).toEqual([{ label: 'Option 1', value: '1' }])
  })
})
