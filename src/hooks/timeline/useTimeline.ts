import { useState, useEffect } from 'react'
import { useGetPatientActivityAnswers, useTimelineData } from '@hooks'
import { PatientActivityAnswers, TimelineGame } from '@interfaces'
import { formatDate } from '@helpers'
import { useNavigate } from 'react-router-dom'

const createActivitiesDto = (data: PatientActivityAnswers[]) => {
  return data.map((activity) => ({
    gameId: activity.gameId,
    gameName: activity.gameName
  }))
}

const findByGameName = (name: string, activities: TimelineGame[]) => {
  return activities.find((activity) => activity.gameName === name)
}

const useTimeline = ({ patientId }: { patientId?: string }) => {
  const [readyToFetch, setReadyToFetch] = useState(false)
  const navigate = useNavigate()
  const { data, isLoading, error } = useTimelineData(readyToFetch ? Number(patientId) : 0)
  const {
    data: acts,
    error: actsErr,
    isLoading: actsLoading
  } = useGetPatientActivityAnswers(readyToFetch ? Number(patientId) : 0)
  const [activities, setActivities] = useState<TimelineGame[]>([])
  const [selectedGameName, setSelectedGameName] = useState<string>('')
  const [selectedDate, setSelectedDate] = useState<string>('')

  useEffect(() => {
    if (patientId) {
      setReadyToFetch(true)
      if (acts && !actsErr && !actsLoading) {
        setActivities(createActivitiesDto(acts || []))
      }
    }
  }, [patientId, acts, actsErr, actsLoading])

  useEffect(() => {
    if (activities && selectedGameName && selectedDate) {
      const game = findByGameName(selectedGameName, activities)
      if (game) {
        const formattedDate = formatDate(selectedDate)
        navigate(`/profesional/paciente/${patientId}/actividades/${game.gameId}/${formattedDate}`)
      }
    }
  }, [activities, selectedGameName, selectedDate, setSelectedDate, setSelectedGameName, navigate, patientId])

  return {
    data,
    isLoading,
    error,
    readyToFetch,
    setSelectedGameName,
    setSelectedDate
  }
}

export default useTimeline
