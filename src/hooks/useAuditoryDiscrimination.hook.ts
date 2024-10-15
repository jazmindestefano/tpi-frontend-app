import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { shuffleArray } from "../helpers/arrays";
import { speakText } from "../helpers/speakText";
import { useGetGameLevels } from "../hooks/queries";
import { LevelOption, LevelOptionRequest } from "../interfaces/interfaces";
import { postAuditoryDiscriminationRequest } from "../http/queries";

function PostRequest (optionSelected: LevelOption) {
    const optSelectedReq: LevelOptionRequest = {
        id: optionSelected!.id,
        name: optionSelected.name ?? "Default name",
        image: optionSelected.image ?? "Default image",
        correct: optionSelected!.correct,
    };

    const requestData = {
        patiendId: 1,
        activities: [
            {
                id: optionSelected.id,
                description: optionSelected.description ?? "Default Description",
                options: [optSelectedReq],
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

    const handleSelectedOption = (option: LevelOption) => {
        if (levels) {
            PostRequest(option);
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
        handleSelectedOption,
        speakLevelDescription,
    };
};