import Button from '@/components/common/buttons/Button'
import { CalendarIcon, PlayCircle } from 'lucide-react'

interface WordResponse {
  word: string
  date: string
}

// todo: connect with be
const wordResponses: WordResponse[] = [
  { word: 'MESA', date: '21/09/2024' },
  { word: 'OLLA', date: '21/09/2024' },
  { word: 'PASTO', date: '21/09/2024' },
  { word: 'ARBOL', date: '21/09/2024' }
]

const ActivityResponsesPage = () => {
  return (
    <div className="flex flex-col gap-5 lg:pt-0 pt-20">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Respuestas Palabras</h1>
      </div>

      <div className="flex items-end justify-end">
        <Button variant="tertiary" className="p-4">
          <CalendarIcon className="mr-2 h-4 w-4" />
          <p className="font-bold">March 2024</p>
        </Button>
      </div>

      <ul className="space-y-4">
        {wordResponses.map((response, index) => (
          <li key={index} className="bg-blue-200 rounded-3xl px-6 py-4 flex justify-between items-center">
            <span className="font-extrabold text-lg">{response.word}</span>
            <div className="flex items-center space-x-6">
              <span className="text-gray-600 font-extrabold text-lg">{response.date}</span>
              <Button variant="secondary" size="circle" shape="circle" className="text-blue-500 hover:text-blue-600">
                <PlayCircle className="h-6 w-6" color="white" />
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ActivityResponsesPage
