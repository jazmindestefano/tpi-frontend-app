import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {Game, Theme} from "../../interfaces/interfaces.ts";

interface GameState {
    selectedGame: Game | null;
    selectedTheme: Theme | null;
}

const initialState: GameState = {
    selectedGame: null,
    selectedTheme: null
};

const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        selectGame(state, action: PayloadAction<Game>) {
            state.selectedGame = action.payload;
        },
        selectTheme(state, action: PayloadAction<Theme>){
            state.selectedTheme = action.payload
        },
        resetGame(state) {
            state.selectedGame = null;
            state.selectedTheme = null;
        }
    },
});

export const { selectGame, selectTheme, resetGame } = gameSlice.actions;
export default gameSlice.reducer;