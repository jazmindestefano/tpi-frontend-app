import Button from '@/components/common/buttons/Button'
import { useGetPatientActivityAnswers } from '@/hooks/queries'
import { PatientActivityAnswers } from '@/interfaces'
import { PlayCircle } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

function playAudio(userAnswer: string) {
  const audio = new Audio(userAnswer)
  audio.play()
}

const ActivityResponsesPage = () => {
  const { patientId, activityId } = useParams()
  const { data, error, isLoading } = useGetPatientActivityAnswers(parseInt(patientId!))
  const [filteredData, setFilteredData] = useState<PatientActivityAnswers[]>([])
  const [selectedDate, setSelectedDate] = useState<string>('')

  useEffect(() => {
    if (data && !error && !isLoading && activityId) {
      const filteredByActivity = data.filter((item) => item.activityId === parseInt(activityId!))

      const finalFilteredData = selectedDate
        ? filteredByActivity.filter((item) =>
            item.answersDto.some((answer) => answer.answerDate.startsWith(selectedDate))
          )
        : filteredByActivity

      setFilteredData(finalFilteredData)
    }
  }, [data, error, isLoading, activityId, selectedDate])

  return (
    <div className="flex flex-col items-start justify-start gap-5 lg:pt-0 pt-32">
      <div className="mb-4 self-end pt-10">
        <label htmlFor="dateFilter" className="mr-4 font-bold">
          Filtrar por fecha:
        </label>
        <input
          type="date"
          id="dateFilter"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="p-2 border rounded-lg"
        />
      </div>

      {!error && !isLoading && filteredData.length > 0 ? (
        <div className="w-full">
          {filteredData.map((activity) => (
            <div key={activity.activityId} className="w-full">
              <div className="w-full">
                <h1 className="text-2xl font-bold">Respuestas {activity.gameName}</h1>
              </div>
              <div className="flex w-full gap-10 lg:px-10 lg:py-6">
                <ul className="space-y-4 w-full">
                  {activity.answersDto.length > 0 ? (
                    activity.answersDto
                      .filter((response) => (selectedDate ? response.answerDate.startsWith(selectedDate) : true))
                      .map((response) => (
                        <li
                          key={response.id}
                          className="bg-blue-200 rounded-3xl px-6 py-4 flex justify-between items-center w-full"
                        >
                          <div className="w-[40%]">
                            <span className="font-extrabold text-lg">{response.optionValue}</span>
                          </div>
                          <div className="flex items-center w-[60%] justify-between space-x-6">
                            <span className="text-gray-600 font-extrabold text-lg">
                              {response.answerDate.substring(0, 10)}
                            </span>
                            {response.answerType === 'Texto' ? (
                              <p>{response.userAnswer}</p>
                            ) : (
                              <Button
                                variant="secondary"
                                size="circle"
                                shape="circle"
                                className="text-blue-500 hover:text-blue-600"
                                onClick={() => playAudio(response.userAnswer)}
                              >
                                <PlayCircle className="h-6 w-6" color="white" />
                              </Button>
                            )}
                          </div>
                        </li>
                      ))
                  ) : (
                    <p>Ups! No hay respuestas aún</p>
                  )}
                </ul>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center w-full h-full">
          <p className="text-2xl font-bold">No hay actividades disponibles</p>
        </div>
      )}
    </div>
  )
}

export default ActivityResponsesPage
