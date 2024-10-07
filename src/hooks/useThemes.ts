export interface Theme {
  id: number;
  name: string;
}


export const useThemes = (activityId: string): Theme[] => {
  return [
    {
      id: 1,
      name: activityId
    },
    {
      id: 2,
      name: 'tema 2'
    },
    {
      id: 3,
      name: 'tema 3'
    },
    {
      id: 4,
      name: 'tema 4'
    },
    {
      id: 5,
      name: 'tema 4'
    },
    {
      id: 6,
      name: 'tema 4'
    },
    {
      id: 7,
      name: 'tema 4'
    },
  ];
};