import { getJustifyClass } from '../../helpers/styles.ts'
import { VolumeButton } from '../../components/common/buttons/VolumeButton.tsx'
import { LevelOption } from '../../interfaces/interfaces.ts'
import { useSpeakText } from '../../hooks/useSpeakText.ts'

interface GameOptionsListProps {
  options: LevelOption[]
  onOptionSelection: (option: LevelOption) => void
}

export const GameOptionsList: React.FC<GameOptionsListProps> = ({ options, onOptionSelection }) => {
  const speakText = useSpeakText()
  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 my-16 w-full`}>
      {options.map((option, index) => (
        <div
          key={option.id}
          className={`flex-col-center cursor-pointer rounded-3xl shadow-lg p-4 h-auto gap-6 bg-orange-100 ${getJustifyClass(index)}`}
        >
          <div
            className="p-4 w-full rounded-3xl h-80 flex-col-center bg-white"
            onClick={() => onOptionSelection(option)}
          >
            <img src={`/gameOptions/${option.name.toLowerCase().replace(" ", "_").replace(" ", "_").replace(" ", "_").replace("ñ", "ni")}.png`} alt={option.name} className="w-auto h-80 rounded-3xl" />
          </div>
          <VolumeButton variant={'fourth'} onClick={() => speakText(option.name)} />
        </div>
      ))}
    </div>
  )
}
