import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Theme } from '@interfaces'
import { selectTheme } from '@redux/slices'
import { useSelectedGame, useGetThemesByGameId } from '@hooks'
import { HearableButton, SpinnerLoader, ThemeCardsList } from '@components'
import { FC } from 'react'

const ThemeSelectorPage: FC = () => {
  const selectedGame = useSelectedGame()
  const { themes, isLoading } = useGetThemesByGameId(selectedGame.id)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onCardClick = (theme: Theme) => {
    dispatch(selectTheme(theme))
    // to-do: fix this shit
    if (selectedGame.name === 'La Viborita') {
      navigate('/actividad/la-viborita')
    } else {
      navigate(`/actividad/${selectedGame.name}`)
    }
  }

  if (isLoading) {
    return <SpinnerLoader />
  }

  return (
    <div className="flex flex-col justify-center items-center w-full xl:gap-10 pt-20">
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
