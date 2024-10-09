import React, {useEffect, useState} from "react";
import {useSelectedTheme} from "../hooks/selectors.ts";
import { useGetGameLevels } from "../hooks/queries.ts";
import { useNavigate } from "react-router-dom";
import { LevelOption } from "../interfaces/interfaces.ts";
import { Volume2 } from "lucide-react";
import CustomButton from "../components/common/Button.tsx";

export interface GameProps {
  selectedThemeId: number;
}

export const Game: React.FC<GameProps> = ({ selectedThemeId }) => {
  const { levels, isLoading, error } = useGetGameLevels(selectedThemeId);
  const [currentLevel, setCurrentLevel] = useState<number>(0);
  const [levelOptions, setLevelOptions] = useState<LevelOption[]>([]);

  const navigate = useNavigate();

  const shuffleArray = (array: LevelOption[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  useEffect(() => {
    if (levels && !isLoading && !error) {
      const shuffledOptions = shuffleArray([...levels[currentLevel].options]);
      setLevelOptions(shuffledOptions);
    }
  }, [levels, isLoading, error, currentLevel]);

  useEffect(() => {
    if (levels && currentLevel === levels.length - 1) {
      navigate("/felicitaciones");
    }
  }, [currentLevel, levels, navigate]);

  const isCorrectOption = (option: LevelOption) => {
    if (levels && option.correct && currentLevel < levels.length - 1) {
      setCurrentLevel((prevState) => prevState + 1);
    }
  };

  const speakText = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  };

  return !isLoading ? (
    <div className="w-full h-full">
      <div className="w-full flex flex-col justify-center items-center gap-4">
        <p className="font-bold font-comfortaa text-2xl">
          Selecciona las imágenes que contengan la letra
        </p>
        <div className="flex flex-row justify-center items-center gap-4">
          <p className="font-bold font-comfortaa text-8xl">
            {levels && levels[currentLevel].description}
          </p>
          <CustomButton
            size={"circleSize"}
            shape={"circle"}
            variant={"fifth"}
            onClick={() =>
              levels &&
              speakText(
                `Selecciona las imágenes que contengan la letra ${levels[currentLevel].description}`
              )
            }
          >
            <Volume2 />
          </CustomButton>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 my-16 w-full px-20">
        {levelOptions.map((option) => (
          <div
            key={option.id}
            className="flex flex-col items-center justify-center cursor-pointer rounded-3xl shadow-lg p-4 w-full h-auto gap-6 bg-[#F7F7F7]"
          >
            <div className="p-4 w-full rounded-3xl h-80 flex flex-col items-center justify-between" onClick={() => {
              isCorrectOption(option);
            }}>
              <img
                src={`/gameOptions/${option.name}.png`}
                alt={option.name}
                className="w-auto h-80"
              />
            </div>
            <CustomButton
              size={"circleSize"}
              shape={"circle"}
              variant={"fifth"}
              onClick={() => speakText(option.name)}
            >
              <Volume2 />
            </CustomButton>
          </div>
        ))}
      </div>
    </div>
  ) : (
    <p>Cargando</p>
  );
};

export const GamePage: React.FC = () => {
  const navigate = useNavigate()
  const selectedTheme = useSelectedTheme()
  
  useEffect(() => {
    if (!selectedTheme) {
      navigate('/error');
      return;
    }
  })
  
  return (
    <Game selectedThemeId={selectedTheme!.id}/>
  );
};
