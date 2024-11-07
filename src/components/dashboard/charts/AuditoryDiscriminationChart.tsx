import Filter from '@components/common/filter/Filter'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'
import { Bar } from 'react-chartjs-2'
import { AuditoryDiscriminationChartProps } from '../interfaces/AuditoryChartInterfaces'
import { barOptions } from '../chartOptions'
import { SelectOption } from '../interfaces/Common'
import useAuditoryDiscriminationChart from '@hooks/charts/useAuditoryDiscriminationChart'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const AuditoryDiscriminationChart = ({ chartData }: { chartData: AuditoryDiscriminationChartProps[] }) => {
  const { data, setSelectedValues, selectedValues } = useAuditoryDiscriminationChart({ chartData })

  const handleSelectChange = (newValue: string[]) => {
    setSelectedValues(newValue)
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
          <Filter options={selectOptions} selectedValues={selectedValues} onChange={handleSelectChange} />
        </div>
      </div>
      <Bar data={data} options={barOptions} className="flex-grow" />
    </div>
  )
}

export default AuditoryDiscriminationChart
