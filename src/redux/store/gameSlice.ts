import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Game, Theme } from '../../interfaces/interfaces.ts'
import { NOT_YET_ASSIGNED_NUM, NOT_YET_ASSIGNED_STR } from '../../config/constants.ts'

interface GameState {
  selectedGame: Game
  selectedTheme: Theme
  showModalFeedback: boolean
}

const initialState: GameState = {
  selectedGame: {
    id: NOT_YET_ASSIGNED_NUM,
    name: NOT_YET_ASSIGNED_STR,
    image: NOT_YET_ASSIGNED_STR
  },
  selectedTheme: {
    id: NOT_YET_ASSIGNED_NUM,
    name: NOT_YET_ASSIGNED_STR,
    image: NOT_YET_ASSIGNED_STR
  },
  showModalFeedback: false
}

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    selectGame(state, action: PayloadAction<Game>) {
      state.selectedGame = action.payload
    },
    selectTheme(state, action: PayloadAction<Theme>) {
      state.selectedTheme = action.payload
    },
    setModalFeedback(state, action: PayloadAction<boolean>) {
      state.showModalFeedback = action.payload
    },
    resetGame(state) {
      state.selectedGame = initialState.selectedGame
      state.selectedTheme = initialState.selectedTheme
    }
  }
})

export const { selectGame, selectTheme, resetGame, setModalFeedback } = gameSlice.actions
export default gameSlice.reducer
