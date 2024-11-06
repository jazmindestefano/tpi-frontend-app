import { useDashboard } from '@/hooks'
import { AuditoryDiscriminationChart, Feedback, PronunciationChart, RankingChart, Today } from './charts'

const Dashboard = () => {
  const { pronunciationChart, auditoryChart, rankingChart } = useDashboard()

  return (
    <div className="w-full p-4 h-[calc(100vh-100px)] overflow-y-auto">
      <div>
        <h1>Progreso del Paciente</h1>
      </div>
      <div className="flex flex-wrap">
        <div className="w-full md:w-[50%] p-4">
          <Today />
        </div>
        <div className="w-full md:w-[50%] p-4">
          <Feedback />
        </div>

        <div className="w-[50%] p-4">
          <AuditoryDiscriminationChart chartData={auditoryChart} />
        </div>

        {pronunciationChart.map((data, index) => (
          <div key={`pronunciationChart-${index}`} className="w-full md:w-[50%] p-4">
            <PronunciationChart chartData={data} />
          </div>
        ))}

        {rankingChart.map((data, index) => (
          <div key={`rankingChart-${index}`} className="w-full md:w-[50%] p-4">
            <RankingChart chartData={data} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Dashboard
