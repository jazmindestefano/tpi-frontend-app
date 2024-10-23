import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User } from '../../interfaces/interfaces.ts'

interface UserState {
  user: User
}

const initialState: UserState = {
  user: {
    id: 1
  }
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload
    }
  }
})

export const { setUser } = userSlice.actions
export default userSlice.reducer
