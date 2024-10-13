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
  text: string
  userAudio: string
}

export interface GameProps {
  selectedThemeId: number;
}