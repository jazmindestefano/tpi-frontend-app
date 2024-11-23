export interface TimelineData {
  date: string
  gameDescription: string
  playedTimes: number
}

export interface Game {
  gameId: number
  gameName: string
}

export interface DailyActivity {
  date: string
  activities: {
    name: string
    count: number
  }[]
}
