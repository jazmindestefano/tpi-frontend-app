import SpinnerLoader from "../../components/common/SpinnerLoader";
import { speakText } from "../../helpers/speakText";
import { GameProps } from "../../interfaces/interfaces";
import { useAuditoryDiscrimination } from "../../hooks/useAuditoryDiscrimination.hook";
import { FourthVolumeButton, SecondaryVolumeButton } from "../../components/common/buttons/Buttons";
import { getJustifyClass } from "../../helpers/justifyClass";

const AuditoryDiscriminationGame: React.FC<GameProps> = ({
  selectedThemeId,
}) => {
  const { isLoading, handleSelectedOption, levels, currentLevel, levelOptions } = useAuditoryDiscrimination(selectedThemeId);

  return !isLoading ? (
    <div className="w-full layout">
      <div className="w-full flex flex-col justify-center items-center gap-4">
        <h2 className="text-h2 text-center">
          Selecciona la imágen que empiece con la letra
        </h2>
        <div className="flex-center gap-4">
          <p className="font-bold text-8xl">
            {levels && levels[currentLevel].description}
          </p>
          <SecondaryVolumeButton onClick={() =>
              levels &&
              speakText(
                `Selecciona la imágen que empiece con la letra ${levels[currentLevel].description}`
              )
            } 
          />
        </div>
      </div>
      <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 my-16 w-full`}>
        {levelOptions.map((option, index) => (
          <div
            key={option.id}
            className={`flex-col-center cursor-pointer rounded-3xl shadow-lg p-4 h-auto gap-6 bg-orange-100 ${getJustifyClass(index)}`}
          >
            <div
              className="p-4 w-full rounded-3xl h-80 flex-col-center bg-white"
              onClick={() => {
                handleSelectedOption(option, levels![currentLevel].id, levels![currentLevel].description);
              }}
            >
              <img
                src={`/gameOptions/${option.name}.png`}
                alt={option.name}
                className="w-auto h-80 rounded-3xl"
              />
            </div>
            <FourthVolumeButton onClick={() => speakText(option.name)} />
          </div>
        ))}
      </div>
    </div>
  ) : (
    <SpinnerLoader />
  );
};

export default AuditoryDiscriminationGame;
