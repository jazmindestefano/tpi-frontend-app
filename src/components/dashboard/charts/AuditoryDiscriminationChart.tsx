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
import Select, { MultiValue } from 'react-select'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const options: ChartOptions<'bar'> = {
  responsive: true,
  plugins: {
    legend: {
      display: false
    }
  },
  elements: {
    bar: {
      borderRadius: 10
    }
  },
  scales: {
    x: {
      beginAtZero: true
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

interface SelectOption {
  value: string
  label: string
}

const getRandomColor = (): string => {
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

  const handleSelectChange = (newValue: MultiValue<SelectOption>) => {
    const values = newValue ? newValue.map((option) => option.value) : []
    setSelectedValues(values)
  }

  const selectOptions: SelectOption[] = chartData.map(({ activityName }) => ({
    value: activityName,
    label: activityName
  }))

  return (
    <div className="bg-slate-50 py-5 px-10 rounded-3xl bg-opacity-65">
      <div className="mb-4 flex flex-wrap items-center gap-6">
        <h1 className="text-2xl w-full text-center">Discriminación Auditiva de Letras</h1>
        <h3 className="mb-2">Filtros:</h3>
        <div className="w-full">
          <Select
            isMulti
            options={selectOptions}
            value={selectOptions.filter((option) => selectedValues.includes(option.value))}
            onChange={handleSelectChange}
            placeholder="Seleccionar actividades"
          />
        </div>
      </div>
      <Bar data={data} options={options} className="flex-grow" />
    </div>
  )
}

export default AuditoryDiscriminationChart
