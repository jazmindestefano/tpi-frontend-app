import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {Game, Theme} from "../../interfaces/interfaces.ts";

interface GameState {
    selectedGame: Game;
    selectedTheme: Theme;
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
    }
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
            state.selectedGame = initialState.selectedGame;
            state.selectedTheme = initialState.selectedTheme;
        }
    },
});

export const { selectGame, selectTheme, resetGame } = gameSlice.actions;
export default gameSlice.reducer;