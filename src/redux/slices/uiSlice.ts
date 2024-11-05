import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface UIState {
  ui: {
    showModalFeedback: boolean
    showProductTour: boolean
  }
}

const initialState: UIState = {
  ui: {
    showModalFeedback: false,
    showProductTour: true
  }
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setModalFeedback(state, action: PayloadAction<boolean>) {
      state.ui.showModalFeedback = action.payload
    },
    setShowProductTour(state, action: PayloadAction<boolean>) {
      state.ui.showProductTour = action.payload
    }
  }
})

const { setModalFeedback, setShowProductTour } = uiSlice.actions
const uiReducer = uiSlice.reducer

export { setModalFeedback, setShowProductTour, uiReducer }
