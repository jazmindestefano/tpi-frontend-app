import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGetGames } from '../hooks/queries.ts'
import HomeCard from '../components/common/cards/HomeCard.tsx'
import SpinnerLoader from '../components/common/SpinnerLoader.tsx'
import { useDispatch } from 'react-redux'
import { selectGame, setModalFeedback } from '../redux/store/gameSlice.ts'
import { FeedbackModal } from '../components/common/modals/FeedbackModal.tsx'
import { useShowModalFeedback } from '../hooks/selectors.ts'
import { HearableButton } from '../components/common/buttons/HearableButton.tsx'
import { getCardBgColor } from '../helpers/colors.ts'

export default function Home() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { games, isLoading: gamesLoading, error } = useGetGames()
  const showModalFeedBack = useShowModalFeedback()
  const [showModal, setShowModal] = useState(showModalFeedBack)

  if (error) {
    return <h1>¡Ups! Parece que estamos teniendo un problema.</h1>
  }

  if (gamesLoading) {
    return <SpinnerLoader />
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
      <div className="flex-col-center gap-6 layout">
        <div className="flex-center gap-4">
          <h1 className="text-h1">Juegos</h1>
          <HearableButton variant={'secondary'} text={'Juegos'} className="volume-icon" />
        </div>
        <div className="w-full grid grid-cols-1 md:grid-cols-3 xl:px-20 gap-10 pb-10">
          {games.map((game) => (
            <div key={game.id} className="flex-center" onClick={() => dispatch(selectGame(game))}>
              <HomeCard
                buttonVariant="secondary"
                onClick={() => navigate(`/tematicas`)}
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
