import React, {useEffect, useState} from "react";
import {useSelectedTheme} from "../hooks/selectors.ts";
import {useGetGameLevels} from "../hooks/queries.ts";
import { useNavigate } from "react-router-dom";
import {LevelOption} from "../interfaces/interfaces.ts";

export interface GameProps {
  selectedThemeId: number
}

export const Game: React.FC<GameProps> = ({selectedThemeId}) => {
  const { levels, isLoading, error } = useGetGameLevels(selectedThemeId);
  
  const [currentLevel, setCurrentLevel] = useState<number>(0);
  const [levelOptions, setLevelOptions] = useState<LevelOption[]>([]);
  const navigate = useNavigate()
  useEffect(() => {
    if (levels && !isLoading && !error) {
      setLevelOptions(levels[currentLevel].options)
    }
  }, [levels, isLoading, error, currentLevel])

  useEffect(() => {
    if (levels && currentLevel == levels!.length - 1) {
      navigate("/felicitaciones")
    }
  }, [currentLevel, levels, navigate]);

  
  const isCorrectOption = (option: LevelOption) => {
    if (levels && option.correct &&  currentLevel < levels.length - 1) {
      setCurrentLevel((prevState) => prevState + 1)
    }
  }
  
  return ( !isLoading ?
    <div>
      <p>Current level: {currentLevel}</p>
      <p>Options: </p>
      {levelOptions.map(option => (
        <div key={option.id} className="flex">
          <div className="bg-amber-300 p-4">
            <p>Id {option.id}</p>
            <p>Name {option.name}</p>
            <p>Is correct? {String(option.correct)}</p>
            <p>Image {option.image}</p>
          </div>
          <button type="button" onClick={() => {isCorrectOption(option); console.log("asd")}}>hace click</button>
        </div>
      ))}
    </div> : null
  )
}


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