import { Theme } from '@interfaces'
import { gameReducer, selectTheme } from '@redux/slices'

describe('gameSlice', () => {
  const initialState = {
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
  }

  it('should handle initial state', () => {
    expect(gameReducer(undefined, { type: 'unknown' })).toEqual(initialState)
  })

  it('should handle selectTheme', () => {
    const theme: Theme = {
      id: 1,
      name: 'example',
      image: ''
    }
    const actual = gameReducer(initialState, selectTheme(theme))
    expect(actual.selectedTheme).toEqual(theme)
  })
})
