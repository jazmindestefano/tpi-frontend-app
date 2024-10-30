import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Game, Theme } from '../../interfaces/interfaces.ts'
import localStorageManager from '../../localStorage/localStorageManager.js'

interface GameState {
  selectedGame: Game
  selectedTheme: Theme
  showModalFeedback: boolean
}

const initialState: GameState = {
  selectedGame: {
    id: -1,
    name: '',
    image: ''
  },
  selectedTheme: {
    id: -1,
    name: '',
    image: ''
  },
  showModalFeedback: false
}

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    selectGame(state, action: PayloadAction<Game>) {
      state.selectedGame = action.payload
      localStorageManager.setItem('selectedGameId', action.payload.id)
    },
    selectTheme(state, action: PayloadAction<Theme>) {
      state.selectedTheme = action.payload
      localStorageManager.setItem('selectedThemeId', action.payload.id)
    },
    setModalFeedback(state, action: PayloadAction<boolean>) {
      state.showModalFeedback = action.payload
    },
    resetGame(state) {
      state.selectedGame = initialState.selectedGame
      state.selectedTheme = initialState.selectedTheme
      localStorageManager.removeItem('selectedGameId')
      localStorageManager.removeItem('selectedThemeId')
    }
  }
})

export const { selectGame, selectTheme, resetGame, setModalFeedback } = gameSlice.actions
export default gameSlice.reducer
