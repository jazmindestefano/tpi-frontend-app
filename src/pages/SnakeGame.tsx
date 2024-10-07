"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
} from "lucide-react";

const vowels = ["A", "E", "I", "O", "U"];

const gridWidth = 15;
const gridHeight = 10;
const cellSize = 50;

export default function VowelSnakeGame() {
  const [snake, setSnake] = useState([{ x: 7, y: 5 }]);
  const [direction, setDirection] = useState({ x: 1, y: 0 });
  const [vowel, setVowel] = useState({ char: "A", x: 10, y: 4 });
  const [eatenVowels, setEatenVowels] = useState<string[]>([]);
  const [showBigVowel, setShowBigVowel] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const togglePause = useCallback(() => {
    setIsPaused((prev) => !prev);
  }, []);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        e.preventDefault();
        togglePause();
        return;
      }

      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
        e.preventDefault();
      }

      if (isPaused) return;

      switch (e.key) {
        case "ArrowUp":
          setDirection({ x: 0, y: -1 });
          break;
        case "ArrowDown":
          setDirection({ x: 0, y: 1 });
          break;
        case "ArrowLeft":
          setDirection({ x: -1, y: 0 });
          break;
        case "ArrowRight":
          setDirection({ x: 1, y: 0 });
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [isPaused, togglePause]);

  useEffect(() => {
    if (isPaused) return;

    const gameLoop = setInterval(() => {
      setSnake((prevSnake) => {
        const newHead = {
          x: (prevSnake[0].x + direction.x + gridWidth) % gridWidth,
          y: (prevSnake[0].y + direction.y + gridHeight) % gridHeight,
        };

        let newSnake = [newHead, ...prevSnake];

        if (snake[0].x === vowel.x && snake[0].y === vowel.y) {
          setEatenVowels((prev) => [...prev, vowel?.char]);
          setShowBigVowel(true);
          setTimeout(() => setShowBigVowel(false), 1000);
          setVowel({
            char: vowels[Math.floor(Math.random() * vowels.length)],
            x: Math.floor(Math.random() * gridWidth),
            y: Math.floor(Math.random() * gridHeight),
          });
        } else {
          newSnake = newSnake.slice(0, -1);
        }

        return newSnake;
      });
    }, 500);

    return () => clearInterval(gameLoop);
  }, [snake, direction, vowel, isPaused]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-300 via-purple-200 to-pink-200">
      <h1 className="text-4xl font-bold mb-4 text-purple-800">
        Vowel Snake Game
      </h1>
      <div
        className="relative rounded-lg shadow-lg overflow-hidden"
        style={{
          width: `${gridWidth * cellSize}px`,
          height: `${gridHeight * cellSize}px`,
          background: "linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)",
        }}
      >
        {snake.map((segment, index) => (
          <motion.div
            key={index}
            className="absolute rounded-sm"
            style={{
              width: `${cellSize - 2}px`,
              height: `${cellSize - 2}px`,
              left: `${segment.x * cellSize + 1}px`,
              top: `${segment.y * cellSize + 1}px`,
              background:
                "linear-gradient(45deg, #ff9a9e 0%, #fad0c4 99%, #fad0c4 100%)",
              boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
            }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          />
        ))}
        <motion.div
          className="absolute rounded-full flex items-center justify-center text-white font-bold"
          style={{
            width: `${cellSize}px`,
            height: `${cellSize}px`,
            left: `${vowel.x * cellSize}px`,
            top: `${vowel.y * cellSize}px`,
            background: "linear-gradient(45deg, #4facfe 0%, #00f2fe 100%)",
            boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
          }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          {vowel.char}
        </motion.div>
        {isPaused && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="text-white text-4xl font-bold">PAUSED</div>
          </div>
        )}
      </div>
      <div className="mt-4 flex space-x-2">
        {["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].map((key) => (
          <button
            key={key}
            className="p-2 bg-purple-500 text-white rounded-full hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-400 shadow-lg"
            onClick={() => {
              if (!isPaused) {
                const event = new KeyboardEvent("keydown", { key });
                window.dispatchEvent(event);
              }
            }}
            aria-label={`Move ${key.replace("Arrow", "").toLowerCase()}`}
          >
            {key === "ArrowUp" && <ChevronUp />}
            {key === "ArrowDown" && <ChevronDown />}
            {key === "ArrowLeft" && <ChevronLeft />}
            {key === "ArrowRight" && <ChevronRight />}
          </button>
        ))}
        <button
          className="p-2 bg-purple-500 text-white rounded-full hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-400 shadow-lg"
          onClick={togglePause}
          aria-label={isPaused ? "Resume game" : "Pause game"}
        >
          {isPaused ? <Play /> : <Pause />}
        </button>
      </div>
      <div className="mt-4 text-2xl font-bold text-purple-800">
        Eaten Vowels: {eatenVowels.join(", ")}
      </div>
      <div className="mt-2 text-sm text-purple-600">
        Press Space to pause/resume
      </div>
      <AnimatePresence>
        {showBigVowel && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="text-9xl font-bold text-white"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
            >
              {eatenVowels[eatenVowels.length - 1]}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
