import { useSurveyFeedbackForDashboard } from '@/hooks/queries'
import SpinnerLoader from '@components/common/SpinnerLoader'
import { ThumbsUp, Star, ThumbsDown } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const Feedback = () => {
  const { patientId } = useParams()
  const [readyToFetch, setReadyToFetch] = useState(false)

  const { data, error, isLoading } = useSurveyFeedbackForDashboard(readyToFetch ? Number(patientId) : 0)

  useEffect(() => {
    if (patientId) {
      setReadyToFetch(true)
    }
  }, [patientId])

  if (isLoading) {
    return <SpinnerLoader />
  }

  return (
    <div key="feedback" className="bg-slate-50 p-10 rounded-3xl bg-opacity-65 h-80">
      {!error && !isLoading && data && (
        <>
          <div className="p-4 border-b border-gray-200 w-full">
            <h2 className="text-xl">Feedback del Juego</h2>
          </div>
          <div className="h-[calc(100%-3rem)] flex flex-col justify-center">
            <div className="flex justify-around items-center">
              <div className="text-center" key={data.mostLikedActivity.gameId}>
                <h3 className="text-2xl font-semibold mb-1">Actividad Más Gustada</h3>
                <p className="text-xl">{data.mostLikedActivity.gameName}</p>
                <div className="flex items-center justify-center mt-1">
                  <ThumbsUp className="text-green-500 mr-1" size={24} />
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={`mostLiked-${data.mostLikedActivity.gameId}-${i}`}
                      className={i < Number(data.mostLikedActivity.ranking) ? 'text-yellow-500' : 'text-gray-300'}
                      size={20}
                    />
                  ))}
                </div>
              </div>
              <div className="text-center" key={data.leastLikedActivity.gameId}>
                <h3 className="text-2xl font-semibold mb-1">Actividad Menos Gustada</h3>
                <p className="text-xl">{data.leastLikedActivity.gameName}</p>
                <div className="flex items-center justify-center mt-1">
                  <ThumbsDown className="text-red-500 mr-1" size={24} />
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={`leastLiked-${data.leastLikedActivity.gameId}-${i}`}
                      className={i < Number(data.leastLikedActivity.ranking) ? 'text-yellow-500' : 'text-gray-300'}
                      size={20}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default Feedback
