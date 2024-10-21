import { useNavigate } from 'react-router-dom'
import { useGetGames } from '../hooks/queries.ts'
import HomeCard from '../components/common/cards/HomeCard.tsx'
import SpinnerLoader from '../components/common/SpinnerLoader.tsx'
import { useDispatch } from 'react-redux'
import { selectGame, setModalFeedback } from '../redux/store/gameSlice.ts'
import { VolumeButton } from '../components/common/buttons/VolumeButton.tsx'
import { useSpeakText } from '../hooks/useSpeakText.ts'
import { FeedbackModal } from '../components/common/modals/FeedbackModal.tsx'
import { useShowModalFeedback } from '../hooks/selectors.ts'

const getCardBgColor = (index: number) => {
  const colors = ['bg-blue-300', 'bg-orange-300', 'bg-orange-150']
  return colors[index % colors.length]
}

const Home: React.FC = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { games, isLoading, error } = useGetGames()
  const speakText = useSpeakText()
  const showModalFeedBack = useShowModalFeedback()

  if (error) {
    return <h1>¡Ups! Parece que estamos teniendo un problema.</h1>
  }

  if (isLoading) {
    return <SpinnerLoader />
  }

  if (showModalFeedBack) {
    return <FeedbackModal show={showModalFeedBack} onClose={() => dispatch(setModalFeedback(false))} />
  }

  return games && games.length !== 0 && !error ? (
    <div className="flex-col-center gap-6 layout">
      <div className="flex-center gap-4">
        <h1 className="text-h1">Juegos</h1>
        <VolumeButton variant={'secondary'} onClick={() => speakText('Juegos')} />
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
  ) : (
    <h1 className="text-h1">No hay juegos disponibles</h1>
  )
}

export default Home
