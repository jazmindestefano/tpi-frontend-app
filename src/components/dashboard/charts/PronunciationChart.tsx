import { Line } from 'react-chartjs-2'
import { CategoryScale, Chart, ChartData, ChartOptions, LinearScale, LineElement, PointElement } from 'chart.js'
import { useState, useEffect } from 'react'
import { getRandomColorDashboard } from '@/helpers'
import { format, parse, isWithinInterval } from 'date-fns'
import Select, { MultiValue } from 'react-select'

Chart.register(CategoryScale, LinearScale, PointElement, LineElement)

const options: ChartOptions<'line'> = {
  responsive: true,
  plugins: {
    legend: {
      display: false
    }
  },
  scales: {
    x: {
      beginAtZero: true
    }
  }
}

interface GroupedData {
  [key: string]: {
    label: string
    data: number[]
    dates: string[]
  }
}

interface PronunciationChartProps {
  date: string
  value: string
  score: number
  type: string
}

interface PronunciationChart {
  type: string
  data: PronunciationChartProps
}

interface SelectOption {
  value: string
  label: string
}

const PronunciationChart = ({ chartData }: { chartData: PronunciationChart[] }) => {
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

  const handleDateChange = (dateString: string, setDate: React.Dispatch<React.SetStateAction<Date | null>>) => {
    const date = dateString ? parse(dateString, 'yyyy-MM-dd', new Date()) : null
    setDate(date)
  }

  const handleSelectChange = (newValue: MultiValue<SelectOption>) => {
    const selectedValues = newValue.map((option) => option.value)
    setSelectedOptions(newValue as SelectOption[])
    setSelectedValues(selectedValues)
  }

  const optionsSelect = Object.keys(groupedData).map((value) => ({
    value,
    label: value
  }))

  return (
    <div className="bg-slate-50 p-10 rounded-xl bg-opacity-65">
      <div className="mb-4 flex flex-wrap items-center gap-6">
        <h1 className="text-2xl w-full text-center">{title}</h1>
        <h3 className="mb-2">Filtros:</h3>
        <div className="flex flex-wrap gap-2 items-center">
          <input
            type="date"
            value={startDate ? format(startDate, 'yyyy-MM-dd') : ''}
            onChange={(e) => handleDateChange(e.target.value, setStartDate)}
            className="px-3 py-2 border rounded"
          />
          <input
            type="date"
            value={endDate ? format(endDate, 'yyyy-MM-dd') : ''}
            onChange={(e) => handleDateChange(e.target.value, setEndDate)}
            className="px-3 py-2 border rounded"
          />
        </div>
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        <h3 className="mb-2">Seleccionar opciones:</h3>
        <Select
          isMulti
          options={optionsSelect}
          value={selectedOptions}
          onChange={(newValue) => handleSelectChange(newValue)}
          className="w-full"
        />
      </div>

      <Line data={data} options={options} className="flex-grow" />
    </div>
  )
}

export default PronunciationChart
