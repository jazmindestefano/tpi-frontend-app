import { BackButton, Button, Loader, DateFilter, Filter } from '@components'
import { useGetPatientActivityAnswers } from '@hooks'
import { PatientActivityAnswers } from '@interfaces'
import { PlayCircle } from 'lucide-react'
import { FC, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { parse, isWithinInterval, isSameDay } from 'date-fns'

interface SelectOption {
  value: string
  label: string
}

function playAudio(userAnswer: string) {
  const audio = new Audio(userAnswer)
  audio.play()
}

const ActivityResponsesPage: FC = () => {
  const { patientId, activityId, date } = useParams()
  const [readyToFetch, setReadyToFetch] = useState(false)
  const { data, error, isLoading } = useGetPatientActivityAnswers(readyToFetch ? Number(patientId) : 0)
  const [filteredData, setFilteredData] = useState<PatientActivityAnswers[]>([])
  const [startDate, setStartDate] = useState<Date | null>(date ? parse(date, 'yyyy-MM-dd', new Date()) : null)
  const [endDate, setEndDate] = useState<Date | null>(date ? parse(date, 'yyyy-MM-dd', new Date()) : null)
  const [selectedOptionValues, setSelectedOptionValues] = useState<string[]>([])

  useEffect(() => {
    if (patientId) {
      setReadyToFetch(true)
    }
  }, [patientId])

  useEffect(() => {
    if (data) {
      const filteredByActivity = data.filter((item) => item.gameId === parseInt(activityId!))
      const finalFilteredData = filteredByActivity.filter((item) =>
        item.answersDto.some((answer) => {
          const answerDate = parse(answer.answerDate.substring(0, 10), 'yyyy-MM-dd', new Date())
          const isDateInRange = date
            ? isSameDay(answerDate, parse(date, 'yyyy-MM-dd', new Date()))
            : !startDate || !endDate || isWithinInterval(answerDate, { start: startDate, end: endDate })

          const isOptionSelected =
            selectedOptionValues.length === 0 || selectedOptionValues.includes(answer.optionValue)

          return isDateInRange && isOptionSelected
        })
      )
      setFilteredData(finalFilteredData)
    }
  }, [data, error, isLoading, activityId, date, startDate, endDate, selectedOptionValues])

  const optionValueOptions: SelectOption[] = Array.from(
    new Set(data?.flatMap((item) => item.answersDto.map((answer) => answer.optionValue)) || [])
  ).map((value) => ({ value, label: value }))

  return (
    <div className="flex flex-col items-start justify-start gap-5 pt-10 px-10 w-full">
      <div className="w-full flex justify-between items-center">
        <BackButton text="Volver atrás" route={`/profesional/paciente/${patientId}/actividades`} />
      </div>

      <div className="w-full flex justify-end items-center space-x-4">
        <div className="mb-4 self-end">
          <label htmlFor="dateFilter" className="mr-4 font-bold">
            Filtrar por rango de fechas:
          </label>
          <DateFilter startDate={startDate} endDate={endDate} setStartDate={setStartDate} setEndDate={setEndDate} />
        </div>
        <div className="mb-4">
          <label htmlFor="optionFilter" className="mr-4 font-bold">
            Filtrar por respuesta:
          </label>
          <Filter
            options={optionValueOptions}
            selectedValues={selectedOptionValues}
            onChange={setSelectedOptionValues}
          />
        </div>
      </div>

      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full">
          {filteredData &&
            filteredData.map((activity) => (
              <div key={activity.gameId} className="w-full">
                <div className="w-full">
                  <h1 className="text-2xl font-bold">Respuestas {activity.gameName}</h1>
                </div>
                <div className="flex w-full gap-10 lg:px-10 lg:py-6">
                  <ul className="space-y-4 w-full">
                    {activity.answersDto.length > 0 ? (
                      activity.answersDto
                        .filter((response) => {
                          const answerDate = parse(response.answerDate.substring(0, 10), 'yyyy-MM-dd', new Date())
                          const isDateInRange = date
                            ? isSameDay(answerDate, parse(date, 'yyyy-MM-dd', new Date()))
                            : !startDate || !endDate || isWithinInterval(answerDate, { start: startDate, end: endDate })

                          const isOptionSelected =
                            selectedOptionValues.length === 0 || selectedOptionValues.includes(response.optionValue)

                          return isDateInRange && isOptionSelected
                        })
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
      )}
    </div>
  )
}

export default ActivityResponsesPage
