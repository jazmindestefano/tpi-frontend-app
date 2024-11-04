import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Game, Theme } from '@/interfaces'
import { NOT_YET_ASSIGNED_NUM, NOT_YET_ASSIGNED_STR } from '@/config/constants.ts'

interface GameState {
  selectedGame: Game
  selectedTheme: Theme
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
  }
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
    resetGame(state) {
      state.selectedGame = initialState.selectedGame
      state.selectedTheme = initialState.selectedTheme
    }
  }
})

const { selectGame, selectTheme, resetGame } = gameSlice.actions
const gameReducer = gameSlice.reducer

export { selectGame, selectTheme, resetGame, gameReducer }
