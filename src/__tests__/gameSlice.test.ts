import gameReducer, {selectTheme} from '../redux/store/gameSlice'
import {Theme} from "../interfaces/interfaces";

describe('gameSlice', () => {
  const initialState = {
    selectedTheme: null,
    selectedGame: null
  };

  it('should handle initial state', () => {
    expect(gameReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle selectTheme', () => {
    const theme: Theme = {
      id: 1, name: 'example',
      image: ''
    };
    const actual = gameReducer(initialState, selectTheme(theme));
    expect(actual.selectedTheme).toEqual(theme);
  });
});