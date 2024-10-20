import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface Response {
  id: string
  name: string
  audio: string
}

interface RecordGameState {
  response: Response[]
}

const initialState: RecordGameState = {
  response: []
}

const recordGameSlice = createSlice({
  name: 'recordGame',
  initialState,
  reducers: {
    addResponse: (state, action: PayloadAction<Response>) => {
      state.response.push(action.payload)
    },
    clearResponse: (state) => {
      state.response = []
    }
  }
})

export const { addResponse, clearResponse } = recordGameSlice.actions
export default recordGameSlice.reducer
