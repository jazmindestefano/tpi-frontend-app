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

export interface ContentActivity {
  id: number;
  description: string;
  options: ActivityOptions[];
}

interface ActivityOptions {
  id: number,
  name: string,
  image: string,
  correct: boolean
}