import {VolumeButton} from "../../components/common/buttons/VolumeButton.tsx";
import {GameLevel} from "../../interfaces/interfaces.ts";
import {useSpeakText} from "../../hooks/useSpeakText.ts";

interface GameHeaderProps {
  level: GameLevel
}

export const GameHeader: React.FC<GameHeaderProps> = ({level}) => {
  const speakText = useSpeakText()
  const headerTitle = "Selecciona la imágen que empiece con la letra"
  
  return (
    <div className="w-full flex flex-col justify-center items-center gap-4">
      <h2 className="text-h2 text-center">{headerTitle}</h2>
      <div className="flex-center gap-4">
        <p className="font-bold text-8xl">{level.description}</p>
        <VolumeButton variant={"secondary"} onClick={() => speakText(`${headerTitle} ${level.description}`)} />
      </div>
    </div>
  );
};