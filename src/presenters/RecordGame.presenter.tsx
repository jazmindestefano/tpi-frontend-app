import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { shuffleArray } from "../helpers/arrays";
import { convertBlobToFile } from "../helpers/blobs";
import { speakText } from "../helpers/speakText";
import { useGetGameLevels } from "../hooks/queries";
import { useSelectedGame } from "../hooks/selectors";
import { useAudioRecording } from "../hooks/useAudioRecording";
import { postUserRecording } from "../http/queries";
import { LevelOption } from "../interfaces/interfaces";

const RecordGamePresenter = (selectedThemeId: number) => {
    const navigate = useNavigate();
    const { levels, isLoading, error } = useGetGameLevels(selectedThemeId);
    const { isRecording, audio, startRecording, stopRecording } = useAudioRecording();
    const selecteGame = useSelectedGame();
    const [currentLevel, setCurrentLevel] = useState<number>(0);
    const [levelOptions, setLevelOptions] = useState<LevelOption[]>([]);

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

    useEffect(() => {
        if (audio) {
            const audioFile = convertBlobToFile(audio, "user_audio.wav");
            postUserRecording({
                userId: 1, // hardcoded, fix when users exists
                gameId: selecteGame!.id,
                gameName: "RecordGame",
                text: levels![currentLevel].description!,
                userAudio: audioFile,
            });
        }
    }, [audio, currentLevel, levels, selecteGame]);

    return {
        levels,
        isLoading,
        error,
        isRecording,
        audio,
        startRecording,
        stopRecording,
        currentLevel,
        levelOptions,
        isCorrectOption,
        speakText,
    };
};

export default RecordGamePresenter;