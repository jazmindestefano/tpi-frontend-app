export const prepareData = ({
  patiendId,
  activityId,
  selectedOption
}: {
  patiendId: number
  selectedOption: number
  activityId: number
}) => ({
  patientId: patiendId,
  activities: [{ activityId, selectedOption }]
})

export const validateTheme = (themeId: number, navigate: (path: string) => void) => {
  if (themeId === -1) {
    navigate('/error')
  }
}

export const navigateToCongratulations = (
  currentLevel: number,
  totalLevels: number,
  navigate: (path: string) => void
) => {
  if (currentLevel >= totalLevels - 1) navigate('/felicitaciones')
}

export const validateThemeAndNavigate = (themeId: number, navigate: (path: string) => void) => {
  if (themeId === -1) navigate('/error')
}

export const goToNextLevel = (
  currentLevel: number,
  levelsLength: number,
  setCurrentLevel: (level: number) => void,
  navigate: (path: string) => void
) => {
  if (currentLevel < levelsLength - 1) {
    setCurrentLevel(currentLevel + 1)
  } else {
    navigate('/felicitaciones')
  }
}

export const getContainerClass = (isDesktop: boolean) => (isDesktop ? 'w-9/10 flex-center' : 'flex-col-center gap-10')
