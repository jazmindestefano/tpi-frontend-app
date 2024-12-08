import { FC, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getCardBgColor } from '@helpers'
import { Game } from '@interfaces'
import { selectGame, setBackground, setModalFeedback, setShowProductTour } from '@redux/slices'
import { Loader, FeedbackModal, HearableButton, HomeCard } from '@components'
import { useCurrentUser, useGetGames, useGetPatientBackgroundById, useShowModalFeedback } from '@hooks'

const Home: FC = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { games, isLoading: gamesLoading, error } = useGetGames()
  const showModalFeedBack = useShowModalFeedback()
  const [showModal, setShowModal] = useState(showModalFeedBack)
  const user = useCurrentUser()
  const { data: background, error: backgroundError } = useGetPatientBackgroundById(user.id)

  useEffect(() => {
    dispatch(setShowProductTour(false))
  }, [dispatch])

  useEffect(() => {
    if (background && !backgroundError) {
      dispatch(setBackground(background ?? '/fondo_clara.png'))
    }
  }, [background, backgroundError, dispatch])

  const handleOnClick = (game: Game) => {
    navigate('/tematicas')
    dispatch(selectGame(game))
  }

  if (error) {
    return <h1>¡Ups! Parece que estamos teniendo un problema.</h1>
  }

  if (gamesLoading) {
    return <Loader />
  }

  return games && games.length !== 0 && !error ? (
    <>
      <FeedbackModal
        show={showModal}
        onClose={() => {
          setShowModal(false)
          dispatch(setModalFeedback(false))
        }}
      />
      <div className="flex flex-col justify-center items-center w-full gap-6 pt-20">
        <div className="flex justify-center items-center w-full gap-4">
          <h1 className="text-h1">Juegos</h1>
          <HearableButton variant={'secondary'} text={'Elegí un juego'} className="volume-icon" />
        </div>
        <div className="w-full grid grid-cols-1 md:grid-cols-3 xl:px-20 gap-10 pb-10">
          {games.map((game) => (
            <div
              key={game.id}
              className="flex justify-center items-center w-full"
              onClick={() => dispatch(selectGame(game))}
            >
              <HomeCard
                buttonVariant="secondary"
                onClick={() => handleOnClick(game)}
                game={game}
                backgroundColor={getCardBgColor(game.id)}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  ) : (
    <h1 className="text-h1">No hay juegos disponibles</h1>
  )
}

export default Home
