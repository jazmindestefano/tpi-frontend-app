import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/common/buttons/Button";
import { ContinueIcon } from "../../components/common/icons/Icons";
import { VolumeButton } from "../../components/common/buttons/VolumeButton";
import { RecordButton } from "../../components/common/buttons/RecordButton";
import { useAudioRecording } from "../../hooks/useAudioRecording";
import { useSpeakText } from "../../hooks/useSpeakText";

const items = ["A", "E", "I", "O", "U"];
const cellSize = 50;

const SnakeGame: React.FC = () => {
  const [snake, setSnake] = useState([{ x: 7, y: 5 }]);
  const [direction, setDirection] = useState({ x: 1, y: 0 });
  const [item, setItem] = useState({ char: items[0], x: 10, y: 4 });
  const [eatenItems, setEatenItems] = useState<string[]>([]);
  const [recordedAudios, setRecordedAudios] = useState<number[]>([]);
  const [showBigItem, setShowBigItem] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [gridSize, setGridSize] = useState({ width: 30, height: 9 });
  const [isGameFinished, setIsGameFinished] = useState<boolean>(false);
  const navigate = useNavigate();
  const { isRecording, audio, startRecording, stopRecording } = useAudioRecording();
  const speakText = useSpeakText();

  console.log({audio})

  const togglePause = useCallback(() => {
    if (!showBigItem) {
      setIsPaused((prev) => !prev);
    }
  }, [showBigItem]);

  const resumeGame = () => {
    setShowBigItem(false);
    setIsPaused(false);
    recordAudio(); // todo: take out when functionality is implemented
  };

  const recordAudio = () => {
    // Simular la grabación de audio
    setRecordedAudios((prev) => [...prev, (prev[prev.length - 1] || 0) + 1]);
    
    // Verificar si el juego ha terminado
    if (recordedAudios.length - 1 === items.length) {
      setIsGameFinished(true);
    }
  };

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
          x: (prevSnake[0].x + direction.x + gridSize.width) % gridSize.width,
          y: (prevSnake[0].y + direction.y + gridSize.height) % gridSize.height,
        };
      
        let newSnake = [newHead, ...prevSnake];
      
        if (newHead.x === item.x && newHead.y === item.y) {
          const updatedEatenItems = [...eatenItems, item.char];
          setEatenItems(updatedEatenItems);
      
          setShowBigItem(true);
          setIsPaused(true);
      
          const remainingItems = items.filter(
            (v) => !updatedEatenItems.includes(v)
          );
      
          if (remainingItems.length > 0) {
            setItem({
              char: remainingItems[Math.floor(Math.random() * remainingItems.length)],
              x: Math.floor(Math.random() * gridSize.width),
              y: Math.floor(Math.random() * gridSize.height),
            });
          }
        } else {
          newSnake = newSnake.slice(0, -1);
        }
        return newSnake;
      });      
    }, 500);

    return () => clearInterval(gameLoop);
  }, [snake, direction, item, isPaused, gridSize, eatenItems]);

  useEffect(() => {
    if (isGameFinished) {
      setTimeout(() => navigate("/felicitaciones"), 1000);
    }
  }, [isGameFinished, navigate]);

  useEffect(() => {
    const updateGridSize = () => {
      const width = window.innerWidth;

      if (width > 1024) {
        setGridSize({ width: 30, height: 9 });
      } else if (width > 768) {
        setGridSize({ width: 20, height: 7 });
      } else {
        setGridSize({ width: 10, height: 5 });
      }
    };

    window.addEventListener("resize", updateGridSize);
    updateGridSize();

    return () => window.removeEventListener("resize", updateGridSize);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-full mt-6">
      <div
        className="relative rounded-lg shadow-lg overflow-hidden"
        style={{
          width: `${gridSize.width * cellSize}px`,
          height: `${gridSize.height * cellSize}px`,
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
          >
            {index === 0 && (
              <div className="w-full h-full flex items-center justify-center">
                <div className="w-2 h-2 bg-black rounded-full mr-1" />
                <div className="w-2 h-2 bg-black rounded-full" />
              </div>
            )}
          </motion.div>
        ))}
        <motion.div
          className="absolute rounded-full flex items-center justify-center text-white font-bold"
          style={{
            width: `${cellSize}px`,
            height: `${cellSize}px`,
            left: `${item.x * cellSize}px`,
            top: `${item.y * cellSize}px`,
            background: "linear-gradient(45deg, #4facfe 0%, #00f2fe 100%)",
            boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
          }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          {item.char}
        </motion.div>
        {isPaused && !showBigItem && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="text-white text-4xl font-bold">PAUSED</div>
          </div>
        )}
      </div>
      <div className="mt-4 flex space-x-2">
        {["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].map((key) => (
          <Button
            key={key}
            variant="secondary"
            size="circle"
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
          </Button>
        ))}
        <Button
          variant="secondary"
          size="circle"
          onClick={togglePause}
          aria-label={isPaused ? "Resume game" : "Pause game"}
        >
          {isPaused ? <Play /> : <Pause />}
        </Button>
      </div>
      <div className="mt-4 text-2xl font-bold text-purple-800">
        Vocales comidas: {eatenItems.join(", ")}
      </div>
      <div className="mt-2 text-sm text-purple-600">
        Presiona espacio para pausar/reanudar
      </div>
      <AnimatePresence>
        {showBigItem && (
          <motion.div
            className="fixed inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="text-9xl font-bold text-white mb-8"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
            >
              {eatenItems[eatenItems.length - 1]}
            </motion.div>
            <div className="flex space-x-4">
            <RecordButton
                      variant={"fourth"}
                      isRecording={isRecording}
                      stopRecording={stopRecording}
                      startRecording={startRecording}
                    />
              <VolumeButton onClick={() => speakText(eatenItems[eatenItems.length - 1])} />
              <Button variant="primary" size="circle" shape={'circle'} onClick={resumeGame}>
                <ContinueIcon />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default SnakeGame;