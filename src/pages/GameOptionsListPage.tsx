import { HearableButton } from '@/components/common/buttons/HearableButton'
import { getJustifyClass } from '@/helpers'
import { LevelOption } from '@/interfaces'

interface GameOptionsListProps {
  options: LevelOption[]
  onOptionSelection: (option: LevelOption) => void
}

const GameOptionsListPage = ({ options, onOptionSelection }: GameOptionsListProps) => {
  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 my-16 w-full`}>
      {options.map((option, index) => (
        <div
          key={option.id}
          className={`flex flex-col justify-center items-center w-full cursor-pointer rounded-3xl shadow-lg p-4 h-auto gap-6 bg-orange-100 ${getJustifyClass(index)}`}
        >
          <div
            className="p-4 w-full rounded-3xl h-80 flex flex-col justify-center items-center bg-white"
            onClick={() => onOptionSelection(option)}
          >
            <img
              src={`/gameOptions/${option.name.toLowerCase()}.png`}
              alt={option.name.toUpperCase()}
              className="w-auto h-80 rounded-3xl"
            />
          </div>
          <HearableButton variant={'fourth'} text={option.name} />
        </div>
      ))}
    </div>
  )
}

export default GameOptionsListPage
