import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useGetThemesByGameId } from '../hooks/queries'
import { Theme } from '../interfaces/interfaces'
import { selectTheme } from '../redux/store/gameSlice'
import { ThemeCardsList } from '../components/themeSelect/ThemeCardsList'
import SpinnerLoader from '../components/common/SpinnerLoader.tsx'

import { VolumeButton } from '../components/common/buttons/VolumeButton.tsx'
import { useSpeakText } from '../hooks/useSpeakText.ts'
import { useSelectedGame } from '../hooks/selectors.ts'

const ThemeSelector = () => {
  const selectedGame = useSelectedGame()
  const { themes, isLoading, error } = useGetThemesByGameId(selectedGame.id)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const speakText = useSpeakText()

  // todo: save in LS to not redirect
  if (selectedGame.id === -1) {
    navigate('/error')
  }

  const onCardClick = (theme: Theme) => {
    dispatch(selectTheme(theme))
    navigate(`/actividad/${selectedGame.id}`)
  }

  if (isLoading) {
    return <SpinnerLoader />
  }

  return (
    <div className="flex-col-center xl:gap-10 pt-20 lg:pt-0">
      <div className="flex-center self-center gap-4">
        <h1 className="text-h1">Temáticas</h1>
        <VolumeButton variant={'secondary'} onClick={() => speakText('Temáticas')} />
      </div>
      {isLoading ? (
        <SpinnerLoader />
      ) : themes && themes.length !== 0 && !error ? (
        <ThemeCardsList themes={themes} onCardClick={onCardClick} />
      ) : (
        <h1 className="text-h1">No hay temáticas disponibles</h1>
      )}
    </div>
  )
}

export default ThemeSelector
