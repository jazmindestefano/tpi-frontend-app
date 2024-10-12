import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface GameState {
    selectedGameId: string | null;
}

const initialState: GameState = {
    selectedGameId: null,
};

const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        selectGame(state, action: PayloadAction<string>) {
            state.selectedGameId = action.payload;
        },
    },
});

export const { selectGame } = gameSlice.actions;
export default gameSlice.reducer;