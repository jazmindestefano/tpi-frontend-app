import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useGetThemesByGameId } from '../hooks/queries.ts'
import { Theme } from '@interfaces'
import ThemeCardsList from '../components/themeSelect/ThemeCardsList.tsx'
import SpinnerLoader from '../components/common/SpinnerLoader.tsx'
import { HearableButton } from '../components/common/buttons/HearableButton.tsx'
import { useSelectedGame } from '../hooks/selectors.ts'
import { selectTheme } from '@redux/slices'

const ThemeSelectorPage = () => {
  const selectedGame = useSelectedGame()
  const { themes, isLoading } = useGetThemesByGameId(selectedGame.id)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onCardClick = (theme: Theme) => {
    dispatch(selectTheme(theme))
    navigate(`/actividad/${selectedGame.name}`)
  }

  if (isLoading) {
    return <SpinnerLoader />
  }

  return (
    <div className="flex flex-col justify-center items-center w-full xl:gap-10 pt-20 lg:pt-0">
      <div className="flex justify-center items-center w-full self-center gap-4">
        <h1 className="text-h1">Temáticas</h1>
        <HearableButton variant={'secondary'} text={'Elegí una temática'} />
      </div>
      {themes && themes.length > 0 ? (
        <ThemeCardsList themes={themes} onCardClick={onCardClick} />
      ) : (
        <h1 className="text-h1">No hay temáticas disponibles</h1>
      )}
    </div>
  )
}

export default ThemeSelectorPage
