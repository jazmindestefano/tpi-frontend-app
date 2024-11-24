import { MockedFunction, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { Timeline } from '@components'
import { useTimeline } from '@hooks'
import { TimelineData } from '@interfaces'

vi.mock('@hooks', () => ({
  useTimeline: vi.fn()
}))

describe('Timeline Component', () => {
  const patientId = '123'
  let useTimelineMock: MockedFunction<typeof useTimeline>

  beforeEach(() => {
    vi.clearAllMocks()
    useTimelineMock = vi.mocked(useTimeline)
  })

  it('should render error message if there is an error', async () => {
    WhenUseTimelineReturnsError(useTimelineMock)

    AndTimelineRenders(patientId)

    ExpectErrorMessage()
  })

  it('should render timeline and activities correctly', async () => {
    WhenUseTimelineReturnsData(useTimelineMock)

    AndTimelineRenders(patientId)

    ExpectFetchedDataToRender()
  })
})

function ExpectFetchedDataToRender() {
  expect(screen.getByTestId('timeline-container')).toBeInTheDocument()
  expect(screen.getByTestId('timeline-title')).toHaveTextContent('Línea de Tiempo de Actividades')
  expect(screen.getByTestId('activity-2024-01-01T00:00:00Z-Game 1')).toBeInTheDocument()
  expect(screen.getByTestId('activity-item-2024-01-01T00:00:00Z')).toHaveTextContent('Game 1')
  expect(screen.getByTestId('timeline-detail-button')).toBeInTheDocument()
}

function WhenUseTimelineReturnsData(
  useTimelineMock: MockedFunction<
    ({ patientId }: { patientId?: string }) => {
      gameId: number
      data: TimelineData[] | undefined
      isLoading: boolean
      error: Error | null
      readyToFetch: boolean
    }
  >
) {
  useTimelineMock.mockReturnValue({
    gameId: 1,
    data: [
      {
        date: '2024-01-01T00:00:00Z',
        gameDescription: 'Game 1',
        playedTimes: 3
      }
    ],
    error: null,
    isLoading: false,
    readyToFetch: true
  })
}

function AndTimelineRenders(patientId: string) {
  render(
    <MemoryRouter initialEntries={[`/profesional/paciente/${patientId}/timeline`]}>
      <Routes>
        <Route path="/profesional/paciente/:patientId/timeline" element={<Timeline />} />
      </Routes>
    </MemoryRouter>
  )
}

function ExpectErrorMessage() {
  expect(screen.getByTestId('error-message')).toHaveTextContent('Something went wrong')
}

function WhenUseTimelineReturnsError(
  useTimelineMock: MockedFunction<
    ({ patientId }: { patientId?: string }) => {
      gameId: number
      data: TimelineData[] | undefined
      isLoading: boolean
      error: Error | null
      readyToFetch: boolean
    }
  >
) {
  useTimelineMock.mockReturnValue({
    gameId: 1,
    data: undefined,
    error: { name: 'Error', message: 'Something went wrong' },
    isLoading: false,
    readyToFetch: true
  })
}
