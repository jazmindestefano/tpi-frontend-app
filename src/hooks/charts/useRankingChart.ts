import { RankingChartProps, RankingProps } from '@components'
import { getRandomColorDashboard } from '@helpers'
import { ChartData } from 'chart.js'
import { useState, useEffect } from 'react'

const useRankingChart = ({ chartData }: { chartData: RankingProps[] }) => {
  const [groupedData, setGroupedData] = useState<{ [key: string]: RankingChartProps[] }>({})
  const [selectedValues, setSelectedValues] = useState<string[]>([])
  const [title, setTitle] = useState<string>('')

  useEffect(() => {
    const newGroupedData: { [key: string]: RankingChartProps[] } = {}

    chartData.forEach((item) => {
      const { name, average } = item.chartData
      if (!newGroupedData[name]) {
        newGroupedData[name] = []
      }
      newGroupedData[name].push({ name, average })
      setTitle(item.type === 'syllable' ? 'Ranking Sílabas más Difíciles' : 'Ranking Fonemas más Difíciles')
    })

    setGroupedData(newGroupedData)
    setSelectedValues(Object.keys(newGroupedData))
  }, [chartData])

  const data: ChartData<'bar'> = {
    labels: selectedValues,
    datasets: selectedValues.map((label) => ({
      label,
      data: selectedValues.map((currentLabel) =>
        currentLabel === label ? (groupedData[label] ? groupedData[label][0]?.average || 0 : 0) : 0
      ),
      backgroundColor: getRandomColorDashboard()
    }))
  }

  return {
    data,
    title,
    setSelectedValues,
    groupedData,
    selectedValues
  }
}

export default useRankingChart
