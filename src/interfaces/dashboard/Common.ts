export interface SelectOption {
  value: string
  label: string
}

export interface LetterActityResponseDashboard {
  activityId: number
  activityName: string
  totalAttempts: number
  correctAttempts: number
  accuracyRate: number
}

interface Feedback {
  gameId: number
  ranking: string
  gameName: string
}

export interface SurveyFeedbackDashboard {
  mostLikedActivity: Feedback
  leastLikedActivity: Feedback
}

export interface SyllableDashboard {
  date: string
  type: string
  value: string
  score: number
}

export interface PhonemeDashboard {
  date: string
  type: string
  value: string
  score: number
}

export interface WhatHappenedTodayDashboard {
  date: string
  gameDescription: string
  playedTimes: number
}

export interface SyllableRankingDashboard {
  syllableId: number
  syllableName: string
  average: number
}
