export const RoleEnum = {
  PATIENT: 'PATIENT',
  PROFESSIONAL: 'PROFESSIONAL',
  ADMIN: 'ADMIN',
  NO_ROLE: 'NO_ROLE'
}

export type Role = 'PATIENT' | 'PROFESSIONAL' | 'ADMIN' | 'NO_ROLE'

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
  username: string
  role: Role
  hasOneTimePassword: boolean
  hasAcceptTerms: boolean
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
  text?: string
}

export interface PostFeedbackData {
  ranking: number
  gameId: number
  patientId: number
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

export interface Achievement {
  id: number
  image: string
}

export interface TimelineData {
  date: string
  gameDescription: string
  playedTimes: number
}

export interface ProfileData {
  email: string
  name: string
  surname: string
  image: string
}

export interface ProfesionalPatient {
  id: number
  name: string
  image: string
  birthDate: string
  email: string
}

export interface Answer {
  id: number
  answerType: string
  answerDate: string
  optionValue: string
  userAnswer: string
}

export interface PatientActivityAnswers {
  gameName: string
  gameId: number
  answersDto: Answer[]
}
export interface ProfessionalInAdmin {
  id: number
  email: string
  name: string
  surname: string
  image: string
  imageCertificate: string | null
  oneTimePassword: boolean
  stateId: number
}

export interface UpdateProfessionalStateIdProps {
  professionalId: number
  stateId: number
  comment: string | null
}

export interface LoginProps {
  username: string
  password: string
}

export interface RegisterFormData {
  name: string
  surname: string
  email: string
  professionalCredential: File | null
}
