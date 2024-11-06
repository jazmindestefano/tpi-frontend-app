import { configureStore } from '@reduxjs/toolkit'
import { loadState, saveState } from '@/redux/local.ts'
import { gameReducer, professionalReducer, recordGameReducer, uiReducer, userReducer } from './slices'

const store = configureStore({
  preloadedState: loadState(),
  reducer: {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    user: userReducer,
    game: gameReducer,
    recordGame: recordGameReducer,
    professional: professionalReducer,
    ui: uiReducer
  }
})

store.subscribe(() => {
  saveState(store.getState())
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
