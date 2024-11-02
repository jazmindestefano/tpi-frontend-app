import {
  ChartData,
  ChartOptions,
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { useEffect, useState } from 'react'
import { Bar } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const options: ChartOptions<'bar'> = {
  responsive: true,
  plugins: {
    legend: {
      display: false
    }
  }
}

interface AuditoryDiscriminationChartProps {
  activityId: number
  activityName: string
  totalAttempts: number
  correctAttempts: number
  accuracyRate: number
}

const getRandomColor = () => {
  const letters = '0123456789ABCDEF'
  let color = '#'
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}

const AuditoryDiscriminationChart = ({ chartData }: { chartData: AuditoryDiscriminationChartProps[] }) => {
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
      backgroundColor: Array.from({ length: filteredData.length }, () => getRandomColor())
    }

    setData({
      labels,
      datasets: [dataset]
    })
  }, [chartData, selectedValues])

  const handleChange = (value: string) => {
    setSelectedValues((prev) => (prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]))
  }

  return (
    <div className="bg-slate-50 p-10 rounded-3xl bg-opacity-65">
      <div className="mb-4 flex flex-wrap items-center gap-6">
        <h1 className="text-2xl w-full text-center">Discriminación Auditiva de Letras</h1>
        <h3 className="mb-2">Filtros:</h3>
        <div className="flex flex-wrap gap-2">
          {chartData.map(({ activityId, activityName }) => (
            <button
              key={activityId}
              onMouseDown={() => handleChange(activityName)}
              className={`px-3 py-1 rounded-full text-sm ${
                selectedValues.includes(activityName) ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
              }`}
            >
              {activityName}
            </button>
          ))}
        </div>
      </div>
      <Bar data={data} options={options} className="flex-grow" />
    </div>
  )
}

export default AuditoryDiscriminationChart
