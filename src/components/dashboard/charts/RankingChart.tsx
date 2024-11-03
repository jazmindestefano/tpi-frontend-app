import { Bar } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ChartOptions, ChartData } from 'chart.js'
import { useEffect, useState } from 'react'

ChartJS.register(CategoryScale, LinearScale, BarElement)

const options: ChartOptions<'bar'> = {
  responsive: true,
  scales: {
    y: {
      beginAtZero: true,
      max: 100,
      grid: {
        color: 'rgba(0, 0, 0, 0.1)'
      },
      ticks: {
        stepSize: 10
      }
    },
    x: {
      grid: {
        display: false
      }
    }
  },
  plugins: {
    legend: {
      display: false
    },
    title: {
      display: true
    }
  }
}

interface RankingChartProps {
  name: string
  average: number
}

interface RankingProps {
  type: string
  chartData: RankingChartProps
}

function getRandomColor() {
  const letters = '0123456789ABCDEF'
  let color = '#'
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}

export default function RankingChart({ chartData }: { chartData: RankingProps[] }) {
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
      setTitle(item.type === 'syllable' ? 'Ranking Sílabas mas Difíciles' : 'Ranking Fonemas mas Difíciles')
    })

    setGroupedData(newGroupedData)
    setSelectedValues(Object.keys(newGroupedData))
  }, [chartData])

  const data: ChartData<'bar'> = {
    labels: selectedValues,
    datasets: selectedValues.map((label) => ({
      label,
      data: selectedValues.map((currentLabel) => (currentLabel === label ? groupedData[label][0]?.average || 0 : 0)),
      backgroundColor: getRandomColor()
    }))
  }

  return (
    <div className="bg-slate-50 p-6 rounded-3xl bg-opacity-65">
      <div className="mb-4 flex flex-wrap items-center gap-6">
        <h1 className="text-2xl w-full text-center">{title}</h1>
        <div className="flex flex-wrap items-center gap-3">
          <h3 className="text-sm font-medium text-gray-700">Filtros:</h3>
          <div className="flex flex-wrap gap-2">
            {Object.keys(groupedData).map((name) => (
              <button
                key={name}
                onMouseDown={() => {
                  setSelectedValues((prev) => (prev.includes(name) ? prev.filter((v) => v !== name) : [...prev, name]))
                }}
                className={`px-4 py-1.5 rounded-full text-sm transition-colors
                                    ${
                                      selectedValues.includes(name)
                                        ? 'bg-blue-500 text-white hover:bg-blue-600'
                                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                    }`}
              >
                {name}
              </button>
            ))}
          </div>
        </div>
      </div>
      <Bar data={data} options={options} className="flex-grow" />
    </div>
  )
}
