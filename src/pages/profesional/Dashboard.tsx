import React from 'react'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js'
import Button from '../../components/common/buttons/Button'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
)

const lineChartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: false,
    },
  },
}

const lineChartData = {
  labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
  datasets: [
    {
      label: 'Vocales',
      data: [12, 19, 3, 5, 2, 3, 10, 15, 16, 20],
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Sílabas',
      data: [1, 8, 12, 5, 15, 3, 7, 10, 18, 22],
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
}

const doughnutChartOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
  },
  cutout: '70%',
}

const doughnutChartData = {
  labels: ['Completado', 'Pendiente'],
  datasets: [
    {
      data: [75, 25],
      backgroundColor: ['#4CAF50', '#FFC107', '#2196F3'],
      hoverBackgroundColor: ['#45a049', '#e6ac00', '#1e88e5'],
    },
  ],
}

interface IndicatorProps {
  color: string
  label: string
  value: number
}

const Indicator: React.FC<IndicatorProps> = ({ color, label, value }) => (
  <div className="flex items-center space-x-2">
    <div className={`w-3 h-3 rounded-full ${color}`}></div>
    <span className="text-sm text-gray-600">{label}</span>
    <span className="text-sm font-semibold">{value}</span>
  </div>
)

export default function Dashboard() {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div className="text-sm breadcrumbs">
          <ul>
            <li><a href="/">Home</a></li>
            <li>Juan Perez</li>
          </ul>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="col-span-2 md:col-span-1 bg-gray-50 p-4 rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Estadísticas</h2>
            <Button variant="tertiary">Export</Button>
          </div>
          <Line options={lineChartOptions} data={lineChartData} />
        </div>

        <div className="col-span-2 md:col-span-1 bg-gray-50 p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-4">Vocales</h2>
          <div className="flex justify-center">
            <div className="w-48 h-48 relative">
              <Line options={doughnutChartOptions} data={doughnutChartData} />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-3xl font-bold">12</span>
              </div>
            </div>
          </div>
          <div className="mt-4 space-y-2">
            <Indicator color="bg-green-500" label="Completadas" value={8} />
            <Indicator color="bg-yellow-500" label="En progreso" value={3} />
            <Indicator color="bg-blue-500" label="Pendientes" value={1} />
          </div>
        </div>

        <div className="col-span-2 md:col-span-1 bg-gray-50 p-4 rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Estadísticas</h2>
            <Button variant="tertiary">Export</Button>
          </div>
          <Line options={lineChartOptions} data={lineChartData} />
        </div>

        <div className="col-span-2 md:col-span-1 bg-gray-50 p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-4">Sílabas</h2>
          <div className="flex justify-center">
            <div className="w-48 h-48 relative">
              <Line options={doughnutChartOptions} data={doughnutChartData} />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-3xl font-bold">12</span>
              </div>
            </div>
          </div>
          <div className="mt-4 space-y-2">
            <Indicator color="bg-green-500" label="Completadas" value={8} />
            <Indicator color="bg-yellow-500" label="En progreso" value={3} />
            <Indicator color="bg-blue-500" label="Pendientes" value={1} />
          </div>
        </div>
      </div>
    </div>
  )
}