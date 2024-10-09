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
  image: string,
  correct: boolean
}