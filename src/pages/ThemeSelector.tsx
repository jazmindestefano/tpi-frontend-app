import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useGetThemesByGameId } from '../hooks/queries'
import { Theme } from '../interfaces/interfaces'
import { selectTheme } from '../redux/store/gameSlice'
import ThemeCardsList from '../components/themeSelect/ThemeCardsList'
import SpinnerLoader from '../components/common/SpinnerLoader.tsx'
import { useEffect } from 'react'
import { HearableButton } from '../components/common/buttons/HearableButton.tsx'
import { useSelectedGame } from '../hooks/selectors.ts'

const ThemeSelector = () => {
  const selectedGameId = useSelectedGame()
  const { themes, isLoading, error } = useGetThemesByGameId(selectedGameId!.id)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // todo: save in LS to not redirect
  useEffect(() => {
    if (error) {
      navigate('/error')
    }
  }, [navigate, error])

  const onCardClick = (theme: Theme) => {
    dispatch(selectTheme(theme))
    navigate(`/actividad/${selectedGameId}`)
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

export default ThemeSelector
