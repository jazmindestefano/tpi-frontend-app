import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {Theme} from "../../interfaces/interfaces.ts";

interface ThemeState {
  selectedTheme: Theme | null;
}

const initialState: ThemeState = {
  selectedTheme: null,
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    selectTheme(state, action: PayloadAction<Theme>) {
      state.selectedTheme = action.payload;
    },
  },
});


export const { selectTheme } = themeSlice.actions;
export default themeSlice.reducer;