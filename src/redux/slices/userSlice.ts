import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User } from '@interfaces'
import { NOT_YET_ASSIGNED_NUM, NOT_YET_ASSIGNED_STR } from '@config'

interface UserState {
  user: User
  token: string
}

const initialState: UserState = {
  user: {
    id: NOT_YET_ASSIGNED_NUM,
    username: NOT_YET_ASSIGNED_STR,
    role: 'NO_ROLE'
  },
  token: NOT_YET_ASSIGNED_STR
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload
    }
  }
})

const { setUser, setToken } = userSlice.actions
const userReducer = userSlice.reducer

export { setUser, setToken, userReducer }
