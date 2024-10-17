import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { shuffleArray } from "../helpers/arrays";
import { speakText } from "../helpers/speakText";
import { useGetGameLevels } from "./queries.ts";
import { GameLevel, LevelOption, LevelOptionRequest } from "../interfaces/interfaces";
import { postAuditoryDiscriminationRequest } from "../http/queries";

function PostRequest (currentLevelData: GameLevel) {
    const correctOption = currentLevelData.options.find(levelOption => levelOption.correct);
    const optionFound: LevelOptionRequest = {
        id: correctOption!.id,
        name: correctOption!.name,
        image: correctOption!.image,
        correct: correctOption!.correct,
    };

    const requestData = {
        patientId: 1,
        activities: [
            {
                id: currentLevelData.id,
                description: currentLevelData.description,
                options: [optionFound],
            },
        ],
    };

    postAuditoryDiscriminationRequest(requestData);
};

export const useAuditoryDiscrimination = (selectedThemeId: number) => {
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
            const currentLevelData = levels[currentLevel];
            PostRequest(currentLevelData);
            
            if (currentLevel < levels.length - 1) {
                setCurrentLevel((prevState) => prevState + 1);
            } else {
                navigate("/felicitaciones");
            }
        } else {
            console.log("Respuesta incorrecta");
        }
    };

    const speakLevelDescription = () => {
        if (levels) {
            speakText(`Selecciona la imágen que empiece con la letra ${levels[currentLevel].description}`);
        }
    };

    return {
        levels,
        isLoading,
        error,
        currentLevel,
        levelOptions,
        isCorrectOption,
        speakLevelDescription,
    };
};