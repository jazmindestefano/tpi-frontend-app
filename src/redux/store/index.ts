import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './themeSlice';
import gameReducer from './gameSelector';

const store = configureStore({
  reducer: {
    theme: themeReducer,
    game: gameReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
