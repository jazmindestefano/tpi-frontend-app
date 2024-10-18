import {useNavigate} from 'react-router-dom';
import Button from '../components/common/buttons/Button.tsx';
import {useEffect, useState} from "react";
import { useDispatch } from 'react-redux';
import { resetGame } from '../redux/store/gameSlice.ts';
import { FeedbackModal } from '../components/common/modals/FeedbackModal.tsx';
import { VolumeButton } from '../components/common/buttons/VolumeButton.tsx';
import { useSpeakText } from '../hooks/useSpeakText.ts';

const Congratulations = () => {
  const [showModal, setShowModal] = useState(false)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const speakText = useSpeakText();

  useEffect(() => {
    dispatch(resetGame());
  }, [dispatch]);

  return (
    <>
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

          /* Animación de fondo con gradiente que va creciendo desde el centro */
          @keyframes expand-gradient {
            0% {
              background: radial-gradient(circle, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.9) 20%);
            }
            15% {
              background: radial-gradient(circle, rgba(255, 255, 255, 0.85) 0%, rgba(255, 255, 255, 0.7) 30%, rgba(251, 236, 202, 0.3) 50%);
            }
            30% {
              background: radial-gradient(circle, rgba(255, 255, 255, 0.7) 0%, rgba(255, 255, 255, 0.5) 30%, rgba(251, 236, 202, 0.4) 50%, rgba(246, 216, 145, 0.3) 70%);
            }
            50% {
              background: radial-gradient(circle, rgba(255, 255, 255, 0.5) 0%, rgba(251, 236, 202, 0.5) 25%, rgba(246, 216, 145, 0.5) 50%, rgba(238, 166, 49, 0.4) 70%);
            }
            85% {
              background: radial-gradient(circle, rgba(255, 255, 255, 0) 0%, rgba(242, 193, 96, 0.4) 30%, rgba(238, 166, 49, 0.5) 50%, rgba(255, 187, 109, 0.4) 70%);
            }
            100% {
              background: radial-gradient(circle, rgba(255, 255, 255, 0) 0%, rgba(242, 193, 96, 0.5) 30%, rgba(255, 187, 109, 0.6) 100%);
            }
          }

          /* Contenedor con la animación del gradiente */
          .container-animation {
            animation: expand-gradient 3s ease-in-out forwards; /* Animación del fondo */
            width: 100vw;
            height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
          }

          /* Aplicamos la animación al pin */
          .pin-animation {
            width: 400px; /* Ajusta el tamaño del pin según prefieras */
            animation: drop-in 1s ease-in-out, bounce 2s infinite ease-in-out;
          }

        `}
      </style>

      <FeedbackModal show={showModal} onClose={() => setShowModal(false)} />
      <div className="flex flex-col w-full items-center justify-center h-full relative container-animation">
        
        {/* Contenedor del pin con la animación */}
        <div className="h-96 pin-container">
          <img 
            src='pines/pin-1.png' 
            className="pin-animation"
          />
        </div>
        
        <div className='flex-center gap-4'>
          <p className="text-4xl text-black font-black mb-8 text-center my-5">
            ¡Has completado el desafío!
          </p>
          <VolumeButton onClick={() => speakText("¡Has completado el desafío!")} />
        </div>

        <Button
          onMouseEnter={() => speakText("Volver al Inicio")}
          onClick={() => navigate('/')}
          variant={"primary"}
          className="px-6 py-3 text-white font-bold rounded-full shadow-lg hover:bg-gray-100 hover:text-black transition duration-300"
        >
          <p className='text-2xl font-extrabold text-center'>
           Volver al Inicio
          </p>
        </Button>
      </div>
    </>
  );
};

export default Congratulations;
