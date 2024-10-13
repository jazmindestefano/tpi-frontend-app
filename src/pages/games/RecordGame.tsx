import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/common/buttons/Button";
import SpinnerLoader from "../../components/common/SpinnerLoader";
import { shuffleArray } from "../../helpers/arrays";
import { speakText } from "../../helpers/speakText";
import { useGetGameLevels } from "../../hooks/queries";
import { GameProps, LevelOption } from "../../interfaces/interfaces";
import { useAudioRecording } from "../../hooks/useAudioRecording";
import {
  ArrowRightIcon,
  AudioLinesIcon,
  MicIcon,
  VolumeIcon,
} from "../../components/common/icons/Icons";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { addResponse } from "../../redux/store/recordGameSlice";

const RecordGame: React.FC<GameProps> = ({ selectedThemeId }) => {
  const { levels, isLoading, error } = useGetGameLevels(selectedThemeId);
  const { isRecording, audio, startRecording, stopRecording } =
    useAudioRecording();
  const [currentLevel, setCurrentLevel] = useState<number>(0);
  const [levelOptions, setLevelOptions] = useState<LevelOption[]>([]);
  const responses = useSelector(
    (state: RootState) => state.recordGame.response
  );

  console.log({ audio });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (levels && !isLoading && !error) {
      const shuffledOptions = shuffleArray([...levels[currentLevel].options]);
      setLevelOptions(shuffledOptions);
    }
  }, [levels, isLoading, error, currentLevel]);

  function convertBlobToBase64(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }

  // Necistamos convertir el blob a base64 para poder guardarlo en el store de Redux.
  useEffect(() => {
    if (audio) {
      convertBlobToBase64(audio).then((audioBase64) => {
        dispatch(
          addResponse({
            id: String(levels?.[currentLevel].id),
            name: String(levels?.[currentLevel].description),
            audio: audioBase64,
          })
        );
      });
    }
  }, [audio, currentLevel, levels, dispatch]);

  useEffect(() => {
    console.log("Responses from Redux store:", responses);
  }, [responses]);

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
    <div className="w-full h-full relative flex justify-center items-center flex-col">
      <div className="w-full flex flex-col justify-center items-center gap-4">
        <p className="font-bold text-2xl">¿Cómo decís la palabra?</p>
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
                `¿Cómo decís la palabra ${levels[currentLevel].description}?`
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
        } gap-10 my-8 w-full px-20`}
      >
        {levelOptions.map((option) => (
          <div
            key={option.id}
            className={`flex flex-col items-center justify-center cursor-pointer rounded-3xl shadow-lg p-4 h-auto gap-6 bg-orange-50 ${
              levelOptions.length === 1 ? "w-96" : "w-full"
            }`}
          >
            <div
              className="p-4 w-full rounded-3xl h-80 flex flex-col items-center justify-center"
              onClick={() => {
                isCorrectOption(option);
              }}
            >
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
              onClick={() => (isRecording ? stopRecording() : startRecording())}
            >
              {isRecording ? <AudioLinesIcon /> : <MicIcon />}
            </Button>
          </div>
        ))}
        <div className="absolute right-0 left-0 flex justify-end self-center pr-10">
          <Button
            size={"circle"}
            shape={"circle"}
            variant={"primary"}
            onClick={() => navigate("/felicitaciones")}
          >
            <ArrowRightIcon />
          </Button>
        </div>
      </div>
    </div>
  ) : (
    <SpinnerLoader />
  );
};

export default RecordGame;
