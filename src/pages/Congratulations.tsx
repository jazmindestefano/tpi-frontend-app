import {useNavigate} from 'react-router-dom';
import Button from '../components/common/buttons/Button.tsx';
import {useEffect, useState} from "react";
import {FeedbackModal} from "../components/common/modals/FeedbackModal.tsx";
import { useDispatch } from 'react-redux';
import { resetGame } from '../redux/store/gameSlice.ts';

const Congratulations = () => {
  const [showModal, setShowModal] = useState(true)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(resetGame());
  }, [dispatch]);

  return (
    <>
      <FeedbackModal show={showModal} onClose={() => setShowModal(false)} />
      <div className="flex flex-col w-full items-center justify-center h-full">
        <h1 className="text-6xl font-extrabold text-black animate-bounce mb-8">
          ¡Felicitaciones!
        </h1>
        <img src='limon.png' className='h-96'/>
        <p className="text-2xl text-black mb-8 text-center">
          ¡Has completado el desafío!
        </p>
        <Button
          onClick={() => navigate('/')}
          variant={"primary"}
          className="px-6 py-3 text-white font-bold rounded-full shadow-lg hover:bg-gray-100 hover:text-black transition duration-300"
        >
          Volver al Inicio
        </Button>
      </div>
    </>
  );
};

export default Congratulations;
