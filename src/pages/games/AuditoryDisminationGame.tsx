import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/common/buttons/Button";
import SpinnerLoader from "../../components/common/SpinnerLoader";
import { shuffleArray } from "../../helpers/arrays";
import { speakText } from "../../helpers/speakText";
import { useGetGameLevels } from "../../hooks/queries";
import { GameProps, LevelOption } from "../../interfaces/interfaces";
import { MicIcon, VolumeIcon } from "../../components/common/icons/Icons";

const AuditoryDiscriminationGame: React.FC<GameProps> = ({
  selectedThemeId,
}) => {
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
        <p className="font-bold text-2xl">
          Selecciona las imágenes que contengan la letra
        </p>
        <div className="flex flex-row justify-center items-center gap-4">
          <p className="font-bold text-8xl">
            {levels && levels[currentLevel].description}
          </p>
          <Button
            size={"circle"}
            shape={"circle"}
            variant={"secondary"}
            onClick={() =>
              levels &&
              speakText(
                `Selecciona las imágenes que contengan la letra ${levels[currentLevel].description}`
              )
            }
          >
            <VolumeIcon />
          </Button>
        </div>
      </div>
      <div
        className={`${
          levelOptions.length === 1
            ? "flex justify-center"
            : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
        } gap-10 my-16 w-full px-20`}
      >
        {levelOptions.map((option) => (
          <div
            key={option.id}
            className={`flex flex-col items-center justify-center cursor-pointer rounded-3xl shadow-lg p-4 h-auto gap-6 bg-orange-100 ${
              levelOptions.length === 1 ? "w-96" : "w-full"
            }`}
          >
            <div
              className="p-4 w-full rounded-3xl h-80 flex flex-col items-center justify-center bg-white"
              onClick={() => {
                isCorrectOption(option);
              }}
            >
              <img
                src={`/gameOptions/${option.name}.png`}
                alt={option.name}
                className="w-auto h-80 rounded-3xl"
              />
            </div>
            <Button
              size={"circle"}
              shape={"circle"}
              variant={"fourth"}
              onClick={() => speakText(option.name)}
            >
              <MicIcon />
            </Button>
          </div>
        ))}
      </div>
    </div>
  ) : (
    <SpinnerLoader />
  );
};

export default AuditoryDiscriminationGame;
