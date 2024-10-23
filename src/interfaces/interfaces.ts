export interface Theme {
  id: number
  name: string
  image: string
}

export interface Game {
  id: number
  name: string
  image: string
}

export interface User {
  id: number
}

export interface GameLevel {
  id: number
  description: string
  options: LevelOption[]
}

export interface LevelOption {
  id: number
  name: string
  description: string
  image: string
  correct: boolean
}

export interface PostUserRecordingData {
  userId: number
  gameId: number
  activityId: number
  userAudio: Blob
}

export interface PostFeedbackData {
  ranking: number
  gameId: number
  patientId: number
}

export interface GameProps {
  selectedThemeId: number
}

export interface LevelOptionRequest {
  activityId: number
  selectedOption: number
}

export interface PostAuditoryDiscriminationRequest {
  patientId: number
  activities: LevelOptionRequest[]
}

export interface Word {
  fullWord: string
  syllables: string[]
}
