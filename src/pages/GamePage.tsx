import React, {useEffect, useState} from "react";
import {useSelectedTheme} from "../hooks/selectors.ts";
import {useGetGameLevels} from "../hooks/queries.ts";
import {useNavigate} from "react-router-dom";
import {LevelOption} from "../interfaces/interfaces.ts";
import {ArrowBigRight, Mic, Volume2} from "lucide-react";
import Button from "../components/common/buttons/Button.tsx";
import {shuffleArray} from "../helpers/arrays.ts";
import {speakText} from "../helpers/speakText.ts";

export interface GameProps {
  selectedThemeId: number;
}

export const Game: React.FC<GameProps> = ({ selectedThemeId }) => {
  const { levels, isLoading, error } = useGetGameLevels(selectedThemeId);
  const [currentLevel, setCurrentLevel] = useState<number>(0);
  const [levelOptions, setLevelOptions] = useState<LevelOption[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (levels && !isLoading && !error) {
      const shuffledOptions = shuffleArray([...levels[currentLevel].options]);
      setLevelOptions(shuffledOptions);
    }
  }, [levels, isLoading, error, currentLevel]);

  const isCorrectOption = (option: LevelOption) => {
    if (levels && option.correct) {
      if (currentLevel < levels.length - 1) {
        setCurrentLevel((prevState) => prevState + 1);
      } else {
        navigate("/felicitaciones");
      }
    } else {
      console.log("Respuesta incorrecta");
    }
  };

  return !isLoading ? (
    <div className="w-full h-full">
      <div className="w-full flex flex-col justify-center items-center gap-4">
        <p className="font-bold font-comfortaa text-2xl">
       { selectedThemeId == 2 ? "Como decis la palabra" : "Selecciona las imágenes que contengan la letra"}
        </p>
        <div className="flex flex-row justify-center items-center gap-4">
          <p className="font-bold font-comfortaa text-8xl">
            {levels && levels[currentLevel].description}
          </p>
          <Button
            size={"circle"}
            shape={"circle"}
            variant={"secondary"}
            onClick={() =>
              levels &&
              speakText(
                `${selectedThemeId == 2 ?  "Como decis la palabra" : "Selecciona las imágenes que contengan la letra"} ${levels[currentLevel].description}`
              )
            }
          >
            <Volume2 />
          </Button>
        </div>
      </div>
      <div className={`${levelOptions.length === 1 ? 'flex justify-center' : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'} gap-10 my-16 w-full px-20`}>
        {levelOptions.map((option) => (
          <div
            key={option.id}
            className={`flex flex-col items-center justify-center cursor-pointer rounded-3xl shadow-lg p-4 h-auto gap-6 bg-[#F7F7F7] ${levelOptions.length === 1 ? 'w-96' : 'w-full'}`}
          >
            <div className="p-4 w-full rounded-3xl h-80 flex flex-col items-center justify-center" onClick={() => {
              isCorrectOption(option);
            }}>
              <img
          src={`/gameOptions/${option.name}.png`}
          alt={option.name}
          className="w-auto h-80"
              />
            </div>
            <Button
              size={"circle"}
              shape={"circle"}
              variant={"fourth"}
              onClick={() => speakText(option.name)}
            >
              <Mic />
            </Button>
          </div>
        ))}
        {selectedThemeId === 2 && (
          <div className="self-center">
            <Button
            size={"circle"}
            shape={"circle"}
            variant={"primary"}
            onClick={() => navigate('/next')}
          >
            <ArrowBigRight />
          </Button>
          </div>
        )}
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