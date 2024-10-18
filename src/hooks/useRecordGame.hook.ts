import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { shuffleArray } from "../helpers/arrays";
import { convertBlobToAudioFile } from "../helpers/blobs";
import { useGetGameLevels } from "./queries.ts";
import { useSelectedGame } from "./selectors.ts";
import { useAudioRecording } from "./useAudioRecording.ts";
import { postUserRecording } from "../http/queries";
import { LevelOption } from "../interfaces/interfaces";

const useRecordGame = (selectedThemeId: number) => {
    const navigate = useNavigate(); 
    const { levels, isLoading, error } = useGetGameLevels(selectedThemeId);
    const { isRecording, audio, startRecording, stopRecording } = useAudioRecording();
    const selecteGame = useSelectedGame();
    const [currentLevel, setCurrentLevel] = useState<number>(0);
    const [levelOptions, setLevelOptions] = useState<LevelOption[]>([]);

    console.log({audio})

    useEffect(() => {
        if (levels && !isLoading && !error) {
            const levelOptions = [...levels[currentLevel].options]
            shuffleArray(levelOptions);
            setLevelOptions(levelOptions);
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
            const audioFile = convertBlobToAudioFile(audio, "user_audio.wav");
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
    };
};

export default useRecordGame;