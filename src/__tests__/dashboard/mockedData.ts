import {
  LetterActityResponseDashboard,
  PhonemeDashboard,
  SyllableDashboard,
  SyllableRankingDashboard
} from '@interfaces'

export const syllableMockedData: SyllableDashboard[] = [
  {
    date: '2024-10-01 12:00:00',
    value: 'ra',
    score: 5,
    type: 'syllable'
  },
  {
    date: '2024-10-02 12:00:00',
    value: 'ba',
    score: 7,
    type: 'syllable'
  }
]

export const phonemeMockedData: PhonemeDashboard[] = [
  {
    date: '2024-10-01 12:00:00',
    value: 'a',
    score: 5,
    type: 'phoneme'
  },
  {
    date: '2024-10-02 12:00:00',
    value: 'a',
    score: 7,
    type: 'phoneme'
  }
]

export const letterActivityMockedData: LetterActityResponseDashboard[] = [
  {
    accuracyRate: 0.5,
    activityId: 1,
    activityName: 'activity1',
    correctAttempts: 5,
    totalAttempts: 10
  },
  {
    accuracyRate: 0.7,
    activityId: 2,
    activityName: 'activity2',
    correctAttempts: 7,
    totalAttempts: 10
  }
]

export const syllableRankingMockedData: SyllableRankingDashboard[] = [
  {
    syllableName: 'syllable1',
    average: 5,
    syllableId: 1
  },
  {
    syllableName: 'syllable2',
    average: 5,
    syllableId: 2
  }
]
