import { Line, Bar } from 'react-chartjs-2'
import { ChartData } from '../interfaces/interfaces'

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
      position: 'top' as const
    },
    title: {
      display: true,
      text: title
    }
  }
})

const Chart: React.FC<ChartProps> = ({ chartData, chartType, onChartTypeChange }) => {
  const ChartComponent = chartType === 'bar' ? Bar : Line
  return (
    <div className="h-full">
      <select
        value={chartType}
        onChange={(e) => onChartTypeChange(e.target.value as 'line' | 'bar')}
        className="mb-2 p-1 border rounded"
      >
        <option value="line">Línea</option>
        <option value="bar">Barra</option>
      </select>
      <ChartComponent options={chartOptions(chartData.title)} data={chartData.data} className="mb-14" />
    </div>
  )
}

export default Chart