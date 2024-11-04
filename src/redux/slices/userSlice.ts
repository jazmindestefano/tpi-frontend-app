import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User } from '@/interfaces'
import { NOT_YET_ASSIGNED_NUM, NOT_YET_ASSIGNED_STR } from '@/config/constants.ts'

interface UserState {
  user: User
}

const initialState: UserState = {
  user: {
    id: NOT_YET_ASSIGNED_NUM,
    name: NOT_YET_ASSIGNED_STR
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

const { setUser } = userSlice.actions
const userReducer = userSlice.reducer

export { setUser, userReducer }
