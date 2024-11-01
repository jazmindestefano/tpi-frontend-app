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
      position: 'top' as const
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

const Chart: React.FC<ChartProps> = ({ chartData, chartType, onChartTypeChange }) => {
  const ChartComponent = chartType === 'line' ? Line : Bar
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
