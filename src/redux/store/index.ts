import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice.ts';
import gameReducer from './gameSlice.ts';
import recordGameReducer from './recordGameSlice.ts';

const store = configureStore({
  reducer: {
    user: userReducer,
    game: gameReducer,
    recordGame: recordGameReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
