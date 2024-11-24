import { GroupedData, PronunciationChartProps, SelectOption } from '@interfaces'
import { getRandomColorDashboard } from '@helpers'
import { ChartData } from 'chart.js'
import { isWithinInterval, parse } from 'date-fns'
import { useState, useEffect } from 'react'

const usePronunciationChart = ({ chartData }: { chartData: PronunciationChartProps[] }) => {
  const [groupedData, setGroupedData] = useState<GroupedData>({})
  const [selectedValues, setSelectedValues] = useState<string[]>([])
  const [title, setTitle] = useState<string>('')

  const [startDate, setStartDate] = useState<Date | null>(null)
  const [endDate, setEndDate] = useState<Date | null>(null)
  const [selectedOptions, setSelectedOptions] = useState<SelectOption[]>([])

  useEffect(() => {
    const newGroupedData: GroupedData = chartData.reduce((data, item) => {
      const { value, date, score } = item.data

      if (!data[value]) {
        data[value] = { label: value, data: [], dates: [] }
      }

      data[value].data.push(score)
      data[value].dates.push(date.substring(0, 10))

      setTitle(item.type === 'syllable' ? 'Gráfico de Pronunciación de Sílabas' : 'Gráfico de Pronunciación de Fonemas')

      return data
    }, {} as GroupedData)

    setGroupedData(newGroupedData)
    setSelectedValues(Object.keys(newGroupedData))
  }, [chartData])

  const filteredData = Object.entries(groupedData).reduce((acc, [key, value]) => {
    const filteredDates = value.dates.filter((date) => {
      const currentDate = parse(date, 'yyyy-MM-dd', new Date())
      return !startDate || !endDate || isWithinInterval(currentDate, { start: startDate, end: endDate })
    })

    if (filteredDates.length > 0) {
      acc[key] = {
        ...value,
        data: value.data.filter((_, index) => filteredDates.includes(value.dates[index])),
        dates: filteredDates
      }
    }
    return acc
  }, {} as GroupedData)

  const datasets = Object.values(filteredData)
    .filter((item) => selectedValues.includes(item.label))
    .map((item) => ({
      label: item.label,
      data: item.data,
      fill: false,
      borderColor: getRandomColorDashboard(),
      tension: 0.1
    }))

  const allDates = Array.from(new Set(Object.values(filteredData).flatMap((item) => item.dates)))

  const data: ChartData<'line'> = {
    labels: allDates,
    datasets: datasets
  }

  return {
    data,
    title,
    setEndDate,
    setStartDate,
    selectedOptions,
    setSelectedOptions,
    setSelectedValues,
    groupedData,
    startDate,
    endDate
  }
}

export default usePronunciationChart
