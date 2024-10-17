export interface Theme {
  id: number;
  name: string;
  image: string;
}

export interface Game {
  id: number;
  name: string;
  image: string;
}

export interface User {
  id: number
}

export interface GameLevel {
  id: number;
  description: string;
  options: LevelOption[];
}

export interface LevelOption {
  id: number,
  name: string,
  description: string,
  image: string,
  correct: boolean
}

export interface PostUserRecordingData {
  userId: number
  gameId: number
  gameName: string
  text: string
  userAudio: Blob
}

export interface PostFeedbackData {
  ranking: number
  gameId: number
  patientId: number
}

export interface GameProps {
  selectedThemeId: number;
}

export interface LevelOptionRequest {
  id: number;
  name: string;
  image: string;
  correct: boolean;
}

export interface AuditoryDiscriminationActivitiesRequest {
  id: number;
  description: string;
  options: LevelOptionRequest[];
}

export interface PostAuditoryDiscriminationRequest {
  patientId: number;
  activities: AuditoryDiscriminationActivitiesRequest[];
}