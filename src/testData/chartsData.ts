import { ActivityLetterData, RawDataItem, SurveyFeedback } from '../hooks/useChart'

export const rawData: RawDataItem[] = [
  // Sílabas
  { date: '2024-10-01', type: 'syllable', value: 'ba', score: 12 },
  { date: '2024-10-02', type: 'syllable', value: 'ba', score: 14 },
  { date: '2024-10-03', type: 'syllable', value: 'ba', score: 15 },
  { date: '2024-10-04', type: 'syllable', value: 'ba', score: 18 },
  { date: '2024-10-05', type: 'syllable', value: 'ba', score: 20 },
  { date: '2024-10-01', type: 'syllable', value: 'be', score: 8 },
  { date: '2024-10-02', type: 'syllable', value: 'be', score: 10 },
  { date: '2024-10-03', type: 'syllable', value: 'be', score: 11 },
  { date: '2024-10-04', type: 'syllable', value: 'be', score: 13 },
  { date: '2024-10-05', type: 'syllable', value: 'be', score: 15 },
  { date: '2024-10-01', type: 'syllable', value: 'bi', score: 6 },
  { date: '2024-10-02', type: 'syllable', value: 'bi', score: 7 },
  { date: '2024-10-03', type: 'syllable', value: 'bi', score: 9 },
  { date: '2024-10-04', type: 'syllable', value: 'bi', score: 10 },
  { date: '2024-10-05', type: 'syllable', value: 'bi', score: 12 },
  // Fonemas
  { date: '2024-10-01', type: 'phoneme', value: 'p', score: 5 },
  { date: '2024-10-02', type: 'phoneme', value: 'p', score: 7 },
  { date: '2024-10-03', type: 'phoneme', value: 'p', score: 9 },
  { date: '2024-10-04', type: 'phoneme', value: 'p', score: 11 },
  { date: '2024-10-05', type: 'phoneme', value: 'p', score: 13 },
  { date: '2024-10-01', type: 'phoneme', value: 'b', score: 3 },
  { date: '2024-10-02', type: 'phoneme', value: 'b', score: 5 },
  { date: '2024-10-03', type: 'phoneme', value: 'b', score: 7 },
  { date: '2024-10-04', type: 'phoneme', value: 'b', score: 9 },
  { date: '2024-10-05', type: 'phoneme', value: 'b', score: 11 },
  { date: '2024-10-01', type: 'phoneme', value: 't', score: 4 },
  { date: '2024-10-02', type: 'phoneme', value: 't', score: 6 },
  { date: '2024-10-03', type: 'phoneme', value: 't', score: 8 },
  { date: '2024-10-04', type: 'phoneme', value: 't', score: 10 },
  { date: '2024-10-05', type: 'phoneme', value: 't', score: 12 }
]

export const activitiesLettersDataa: ActivityLetterData[] = [
  { activity_id: 1, activity_name: 'A', total_attempts: 5, correct_attempts: 3, accuracy_rate: 60 },
  { activity_id: 2, activity_name: 'B', total_attempts: 6, correct_attempts: 6, accuracy_rate: 100 },
  { activity_id: 3, activity_name: 'C', total_attempts: 4, correct_attempts: 2, accuracy_rate: 50 },
  { activity_id: 4, activity_name: 'D', total_attempts: 7, correct_attempts: 5, accuracy_rate: 71 },
  { activity_id: 5, activity_name: 'E', total_attempts: 3, correct_attempts: 3, accuracy_rate: 100 }
]

export const surveyFeedbackData: SurveyFeedback = {
  most_liked_activity: {
    activity_id: 1,
    activity_name: 'Reconocimiento de fonema',
    rating: 5
  },
  least_liked_activity: {
    activity_id: 3,
    activity_name: 'Modulación de palabras: MESA',
    rating: 2
  }
}
