import { AuditoryDiscriminationChartProps } from '@interfaces'
import { getRandomColorDashboard } from '@helpers'
import { ChartData } from 'chart.js'
import { useEffect, useState } from 'react'

const useAuditoryDiscriminationChart = ({ chartData }: { chartData: AuditoryDiscriminationChartProps[] }) => {
  const [data, setData] = useState<ChartData<'bar'>>({ datasets: [], labels: [] })
  const [selectedValues, setSelectedValues] = useState<string[]>([])

  useEffect(() => {
    if (chartData.length > 0) {
      setSelectedValues(chartData.map((item) => item.activityName))
    }
  }, [chartData])

  useEffect(() => {
    const filteredData = chartData.filter((item) => selectedValues.includes(item.activityName))
    const labels = filteredData.map((item) => item.activityName)
    const dataset = {
      data: filteredData.map((item) => item.accuracyRate),
      backgroundColor: Array.from({ length: filteredData.length }, () => getRandomColorDashboard())
    }

    setData({
      labels,
      datasets: [dataset]
    })
  }, [chartData, selectedValues])

  return {
    data,
    setSelectedValues,
    selectedValues
  }
}

export default useAuditoryDiscriminationChart
