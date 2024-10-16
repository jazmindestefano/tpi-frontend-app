import SpinnerLoader from "../../components/common/SpinnerLoader";
import { useNavigate } from "react-router-dom";
import useRecordGame from "../../hooks/useRecordGame.hook";
import {VolumeButton} from "../../components/common/buttons/VolumeButton.tsx";
import {RecordButton} from "../../components/common/buttons/RecordButton.tsx";
import Button from "../../components/common/buttons/Button.tsx";
import {ArrowRightIcon} from "../../components/common/icons/Icons.tsx";
import React from "react";
import {useSpeakText} from "../../hooks/useSpeakText.ts";
import {useSelectedTheme} from "../../hooks/selectors.ts";

const RecordGame: React.FC = () => {
  const selectedTheme = useSelectedTheme()
  const navigate = useNavigate();
  const { isLoading, levels, currentLevel, levelOptions, isCorrectOption, isRecording, stopRecording, startRecording } = useRecordGame(selectedTheme.id);
  const speakText = useSpeakText()
  
  if (selectedTheme.id === -1) {
    navigate('/error')
  }

  return !isLoading ? (
    <div className="w-full h-full relative flex justify-center items-center flex-col">
      <div className="w-full flex flex-col justify-center items-center gap-4">
        <p className="font-bold text-2xl text-center">¿Cómo decís la palabra?</p>
        <div className="flex flex-row justify-center items-center gap-4">
          <p className="font-bold text-8xl text-center">
            {levels && levels[currentLevel].description}
          </p>
          <VolumeButton variant={"secondary"} onClick={() =>
            levels &&
            speakText(
              `¿Cómo decís la palabra ${levels[currentLevel].description}?`
            )
          } />
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
            <RecordButton isRecording={isRecording} stopRecording={stopRecording} startRecording={startRecording} />
          </div>
        ))}
        <div className="absolute right-0 left-0 flex justify-end self-center pr-10">
          <Button
            size={"circle"}
            shape={"circle"}
            variant={"primary"}
            onClick={() => navigate('/nextPage')}
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
