import { useState, useEffect } from 'react'
import { useGetPatientActivityAnswers, useTimelineData } from '@hooks'
import { PatientActivityAnswers } from '@interfaces'
import { Game } from '@components'

const createActivitiesDto = (data: PatientActivityAnswers[]) => {
  return data.map((activity) => ({
    gameId: activity.gameId,
    gameName: activity.gameName
  }))
}

const findByGameName = (name: string, activities: Game[]) => {
  return activities.find((activity) => activity.gameName === name)
}

const useTimeline = ({ patientId }: { patientId?: string }) => {
  const [readyToFetch, setReadyToFetch] = useState(false)
  const { data, isLoading, error } = useTimelineData(readyToFetch ? Number(patientId) : 0)
  const {
    data: acts,
    error: actsErr,
    isLoading: actsLoading
  } = useGetPatientActivityAnswers(readyToFetch ? Number(patientId) : 0)
  const [activities, setActivities] = useState<Game[]>([])
  const [gameId, setGameId] = useState<number>(0)

  useEffect(() => {
    if (patientId) {
      setReadyToFetch(true)
      if (acts && !actsErr && !actsLoading) {
        setActivities(createActivitiesDto(acts || []))
      }
    }
  }, [patientId, acts, actsErr, actsLoading])

  useEffect(() => {
    if (activities) {
      const game = findByGameName('La Viborita', activities)
      if (game) {
        setGameId(game.gameId)
      }
    }
  }, [activities])

  return {
    gameId,
    data,
    isLoading,
    error,
    readyToFetch
  }
}

export default useTimeline
