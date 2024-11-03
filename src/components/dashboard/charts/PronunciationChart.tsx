import { Line } from 'react-chartjs-2'
import { CategoryScale, Chart, ChartData, ChartOptions, LinearScale, LineElement, PointElement } from 'chart.js'
import { useState, useEffect } from 'react'
import { getRandomColorDashboard } from '@/helpers'

Chart.register(CategoryScale, LinearScale, PointElement, LineElement)

const options: ChartOptions<'line'> = {
  responsive: true,
  plugins: {
    legend: {
      display: false
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

const PronunciationChart = ({ chartData }: { chartData: PronunciationChart[] }) => {
  const [groupedData, setGroupedData] = useState<GroupedData>({})
  const [selectedValues, setSelectedValues] = useState<string[]>([])
  const [title, setTitle] = useState<string>('')

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

  const datasets = Object.values(groupedData)
    .filter((item) => selectedValues.includes(item.label))
    .map((item) => ({
      label: item.label,
      data: item.data,
      fill: false,
      borderColor: getRandomColorDashboard(),
      tension: 0.1
    }))

  const allDates = Array.from(new Set(Object.values(groupedData).flatMap((item) => item.dates)))

  const data: ChartData<'line'> = {
    labels: allDates,
    datasets: datasets
  }

  const handleChange = (value: string) => {
    setSelectedValues((prev) => (prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]))
  }

  return (
    <div className="bg-slate-50 p-10 rounded-3xl bg-opacity-65">
      <div className="mb-4 flex flex-wrap items-center gap-6">
        <h1 className="text-2xl w-full text-center">{title}</h1>
        <h3 className="mb-2">Filtros:</h3>
        <div className="flex flex-wrap gap-2">
          {Object.keys(groupedData).map((value, index) => (
            <button
              key={index}
              onMouseDown={() => handleChange(value)}
              className={`px-3 py-1 rounded-full text-sm ${
                selectedValues.includes(value) ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
              }`}
            >
              {value}
            </button>
          ))}
        </div>
      </div>
      <Line data={data} options={options} className="flex-grow" />
    </div>
  )
}

export default PronunciationChart
