import themeReducer, {selectTheme} from '../redux/store/themeSlice'
import {Theme} from "../interfaces/interfaces";

describe('themeSlice', () => {
  const initialState = {
    selectedTheme: null,
  };

  it('should handle initial state', () => {
    expect(themeReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle selectTheme', () => {
    const theme: Theme = { id: 1, name: 'example' };
    const actual = themeReducer(initialState, selectTheme(theme));
    expect(actual.selectedTheme).toEqual(theme);
  });
});