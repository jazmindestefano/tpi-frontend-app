import { beforeAll } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useAudioRecording } from '../../hooks/useAudioRecording.ts'
import { mockDeep, DeepMockProxy } from 'vitest-mock-extended'

describe('useAudioRecording hook tests', () => {
  let navigatorMock: DeepMockProxy<Navigator>
  let mediaStreamMock: DeepMockProxy<MediaStream>
  let mediaRecorderMock: DeepMockProxy<MediaRecorder>

  beforeAll(() => {
    mediaStreamMock = mockDeep<MediaStream>()
    mediaStreamMock.getTracks.mockImplementation(() => [])
    navigatorMock = mockDeep<Navigator>()
    navigatorMock.mediaDevices.getUserMedia.mockResolvedValue(mediaStreamMock)
    mediaRecorderMock = mockDeep<MediaRecorder>()
    mediaRecorderMock.start.mockResolvedValue()

    vi.stubGlobal('navigator', navigatorMock)
    vi.stubGlobal('MediaStream', mediaStreamMock)
    vi.stubGlobal(
      'MediaRecorder',
      vi.fn().mockImplementation(() => ({ ...mediaRecorderMock }))
    )

    // navigatorMock.mediaDevices.getUserMedia.mockResolvedValue(mediaStreamMock)
  })

  it('initial state', () => {
    // act
    const {
      result: {
        current: { isRecording, error, audio }
      }
    } = renderHook(() => useAudioRecording())

    // assert
    expect(isRecording).toBe(false)
    expect(error).toBe(null)
    expect(audio).toBe(null)
  })
})
