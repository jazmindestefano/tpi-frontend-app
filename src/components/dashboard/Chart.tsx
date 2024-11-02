import React, { useState, useEffect } from 'react'
import { ChartData } from '@/interfaces/interfaces'
import { Line, Bar } from 'react-chartjs-2'

interface ChartProps {
  chartData: ChartData
  chartType: 'line' | 'bar'
  onChartTypeChange: (type: 'line' | 'bar') => void
}

const chartOptions = (title: string) => ({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false
    },
    title: {
      display: true,
      text: title,
      font: {
        size: 28,
        weight: 'normal' as const,
        family: 'Poppins',
        lineHeight: 1.5
      },
      padding: {
        top: 20,
        bottom: 30
      }
    }
  }
})

const isValidDate = (dateString: string): boolean => {
  const date = new Date(dateString)
  return !isNaN(date.getTime())
}

const Chart: React.FC<ChartProps> = ({ chartData, chartType, onChartTypeChange }) => {
  const [filteredData, setFilteredData] = useState(chartData.data)
  const [activeFilters, setActiveFilters] = useState<string[]>(chartData.data.datasets.map((ds) => ds.label))
  const [rangeFilter, setRangeFilter] = useState<{ from: string; to: string }>({
    from: chartData.data.labels[0],
    to: chartData.data.labels[chartData.data.labels.length - 1]
  })

  const isDateChart = chartData.data.labels.every(isValidDate)

  useEffect(() => {
    let newFilteredData = { ...chartData.data }

    if (isDateChart) {
      const fromDate = new Date(rangeFilter.from)
      const toDate = new Date(rangeFilter.to)

      newFilteredData = {
        ...newFilteredData,
        labels: newFilteredData.labels.filter((label) => {
          const date = new Date(label)
          return date >= fromDate && date <= toDate
        }),
        datasets: newFilteredData.datasets
          .filter((ds) => activeFilters.includes(ds.label))
          .map((ds) => ({
            ...ds,
            data: ds.data.filter((_, index) => {
              const date = new Date(chartData.data.labels[index])
              return date >= fromDate && date <= toDate
            })
          }))
      }
    } else {
      newFilteredData = {
        ...newFilteredData,
        datasets: newFilteredData.datasets.filter((ds) => activeFilters.includes(ds.label))
      }
    }

    setFilteredData(newFilteredData)
  }, [chartData, activeFilters, rangeFilter, isDateChart])

  const handleFilterChange = (label: string) => {
    setActiveFilters((prev) => (prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label]))
  }

  const handleRangeChange = (event: React.MouseEvent<HTMLInputElement, MouseEvent>, type: 'from' | 'to') => {
    const value = event.currentTarget.value
    setRangeFilter((prev) => ({
      ...prev,
      [type]: value
    }))
  }

  const ChartComponent = chartType === 'line' ? Line : Bar

  return (
    <div className="h-full py-5">
      <div className="mb-4 flex items-center">
        <label htmlFor="chart-type" className="mr-2">
          Tipo de gráfico:
        </label>
        <select
          id="chart-type"
          value={chartType}
          onChange={(e) => onChartTypeChange(e.target.value as 'line' | 'bar')}
          className="p-1 border rounded"
        >
          <option value="line">Línea</option>
          <option value="bar">Barra</option>
        </select>
      </div>
      <div className="mb-4 flex flex-wrap items-center w-full gap-6">
        <h3 className="mb-2">Filtros:</h3>
        <div className="flex flex-wrap gap-2">
          {chartData.data.datasets.map((dataset) => (
            <button
              key={dataset.label}
              onMouseDown={() => handleFilterChange(dataset.label)}
              className={`px-3 py-1 rounded-full text-sm ${
                activeFilters.includes(dataset.label) ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
              }`}
            >
              {dataset.label}
            </button>
          ))}
        </div>
      </div>
      {isDateChart && (
        <div className="mb-4 flex items-center gap-4">
          <label htmlFor="range-from" className="whitespace-nowrap">
            Rango desde:
          </label>
          <input
            type="date"
            id="range-from"
            value={rangeFilter.from}
            onMouseOver={(e) => handleRangeChange(e, 'from')}
            className="p-1 border rounded"
          />
          <label htmlFor="range-to" className="whitespace-nowrap">
            hasta:
          </label>
          <input
            type="date"
            id="range-to"
            value={rangeFilter.to}
            onMouseOver={(e) => handleRangeChange(e, 'to')}
            className="p-1 border rounded"
          />
        </div>
      )}
      <div className="h-[400px]">
        <ChartComponent options={chartOptions(chartData.title)} data={filteredData} />
      </div>
    </div>
  )
}

export default Chart
