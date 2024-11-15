import { useDashboard, useGetPatientNameById } from '@hooks'
import {
  SpinnerLoader,
  BackButton,
  AuditoryDiscriminationChart,
  Feedback,
  PronunciationChart,
  RankingChart,
  Today
} from '@components'
import { FC, useState } from 'react'
import { useParams } from 'react-router-dom'

const Dashboard: FC = () => {
  const {
    phonemePronunciationChart,
    syllablePronunciationChart,
    auditoryDiscriminationChart,
    phonemeRankingChart,
    syllableRankingChart,
    auditoryLoading,
    phonemeLoading,
    phonemeRankingLoading,
    syllableLoading,
    syllableRankingLoading
  } = useDashboard()
  const { patientId } = useParams()
  const { data, isLoading, error } = useGetPatientNameById(Number(patientId))
  const [activeTab, setActiveTab] = useState<string>('today')

  if (auditoryLoading || phonemeLoading || phonemeRankingLoading || syllableLoading || syllableRankingLoading) {
    return <SpinnerLoader />
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'today':
        return (
          <div className="flex items-center justify-around w-full gap-10">
            <Today />
            <Feedback />
          </div>
        )
      case 'auditory':
        return (
          <div className="flex items-center justify-around w-full gap-10">
            <AuditoryDiscriminationChart chartData={auditoryDiscriminationChart} />
          </div>
        )
      case 'pronunciation':
        return (
          <div className="flex items-center justify-around w-full gap-10">
            <PronunciationChart chartData={syllablePronunciationChart} />
            <PronunciationChart chartData={phonemePronunciationChart} />
          </div>
        )
      case 'ranking':
        return (
          <div className="flex items-center justify-around w-full gap-10">
            <RankingChart chartData={syllableRankingChart} />
            <RankingChart chartData={phonemeRankingChart} />
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="w-full pt-10 px-10">
      <div>
        <BackButton route="/profesional" text={'Volver al Inicio'} />
        <h1 className="text-2xl">Progreso del Paciente {!isLoading && !error ? data : ''}</h1>
      </div>
      <div className="mb-4 flex space-x-4">
        <button
          className={`px-4 py-2 rounded-lg ${activeTab === 'today' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('today')}
        >
          ¿Que pasó hoy? + Feedback
        </button>
        <button
          className={`px-4 py-2 rounded-lg ${activeTab === 'pronunciation' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('pronunciation')}
        >
          Pronunciación de Sílabas y Fonemas
        </button>
        <button
          className={`px-4 py-2 rounded-lg ${activeTab === 'ranking' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('ranking')}
        >
          Rankings más Difíciles
        </button>
        <button
          className={`px-4 py-2 rounded-lg ${activeTab === 'auditory' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('auditory')}
        >
          Discriminación Auditiva de Letras
        </button>
      </div>

      <div className="flex w-full pt-10">{renderTabContent()}</div>
    </div>
  )
}

export default Dashboard
