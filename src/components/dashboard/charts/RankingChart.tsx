import { Bar } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement } from 'chart.js'
import Filter from '@components/common/filter/Filter'
import { barOptions } from '../chartOptions'
import { RankingProps } from '../interfaces'
import useRankingChart from '@hooks/charts/useRankingChart'

ChartJS.register(CategoryScale, LinearScale, BarElement)

export default function RankingChart({ chartData }: { chartData: RankingProps[] }) {
  const { data, title, setSelectedValues, groupedData, selectedValues } = useRankingChart({ chartData })

  const handleSelectChange = (newValue: string[]) => {
    setSelectedValues(newValue)
  }

  const selectOptions = Object.keys(groupedData).map((name) => ({
    value: name,
    label: name
  }))

  return (
    <div className="bg-slate-50 p-6 rounded-3xl bg-opacity-65">
      <div className="mb-4 flex flex-wrap items-center gap-6">
        <h1 className="text-2xl w-full text-center">{title}</h1>
        <div className="relative flex flex-wrap items-center gap-3">
          <h3 className="text-sm font-medium text-gray-700">Filtros:</h3>

          <div className="w-full">
            <Filter options={selectOptions} selectedValues={selectedValues} onChange={handleSelectChange} />
          </div>
        </div>
      </div>
      <Bar data={data} options={barOptions} className="flex-grow" />
    </div>
  )
}
