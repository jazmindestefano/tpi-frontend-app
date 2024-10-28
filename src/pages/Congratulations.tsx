import { useNavigate } from 'react-router-dom'
import Button from '../components/common/buttons/Button.tsx'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { resetGame, setModalFeedback } from '../redux/store/gameSlice.ts'
import { VolumeButton } from '../components/common/buttons/VolumeButton.tsx'
import { useSpeakText } from '../hooks/useSpeakText.ts'
import { achievementsData } from '../testData/achievementsData.ts'
import ConfettiAnimation from '../components/common/CelebrationAnimation.tsx'

const Congratulations = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const speakText = useSpeakText()
  const [randomPin, setRandomPin] = useState(achievementsData[0])

  useEffect(() => {
    dispatch(resetGame())
    dispatch(setModalFeedback(true))

    const randomIndex = Math.floor(Math.random() * achievementsData.length)
    setRandomPin(achievementsData[randomIndex])
  }, [dispatch])

  return (
    <>
      <ConfettiAnimation isActive={true} />
      <style>
        {`
          /* Animación de caída y rebote del pin */
          @keyframes drop-in {
            0% {
              transform: translateY(-100%);
              opacity: 0;
            }
            50% {
              transform: translateY(0);
              opacity: 1;
            }
            100% {
              transform: translateY(0);
            }
          }

          @keyframes bounce {
            0%, 20%, 50%, 80%, 100% {
              transform: translateY(0);
            }
            40% {
              transform: translateY(-50px);
            }
            60% {
              transform: translateY(-25px);
            }
          }

          /* Fondo estático con gradiente radial */
          .container-animation {
            background: radial-gradient(circle, rgba(255, 255, 255, 0) 0%, rgba(242, 193, 96, 0.5) 30%, rgba(255, 187, 109, 0.6) 100%);
            width: 100vw;
            height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
          }

          /* Aplicamos la animación al pin */
          .pin-animation {
            width: 300px; /* Ajusta el tamaño del pin según prefieras */
            animation: drop-in 1s ease-in-out, bounce 2s infinite ease-in-out;
          }
        `}
      </style>

      <div className="flex flex-col w-full items-center justify-center h-full relative container-animation">
        <div className="h-96 pin-container">
          <img src={randomPin.image} className="pin-animation" alt="Pin aleatorio" />
        </div>

        <div className="flex-center gap-4">
          <p className="text-4xl text-black font-black mb-8 text-center my-5">¡Has completado el desafío!</p>
          <VolumeButton onClick={() => speakText('¡Has completado el desafío!')} />
        </div>

        <Button
          onMouseEnter={() => speakText('Volver al Inicio')}
          onClick={() => navigate('/')}
          variant={'primary'}
          className="px-6 py-3 text-white font-bold rounded-full shadow-lg hover:bg-gray-100 hover:text-black transition duration-300"
        >
          <p className="text-2xl font-extrabold text-center">Volver al Inicio</p>
        </Button>
      </div>
    </>
  )
}

export default Congratulations
