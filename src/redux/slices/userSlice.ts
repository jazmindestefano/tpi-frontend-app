import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User } from '@interfaces'
import { NOT_YET_ASSIGNED_NUM, NOT_YET_ASSIGNED_STR } from '@config'

interface UserState {
  user: User
  token: string
  background: string
}

const initialState: UserState = {
  user: {
    id: NOT_YET_ASSIGNED_NUM,
    username: NOT_YET_ASSIGNED_STR,
    role: 'NO_ROLE',
    hasOneTimePassword: false,
    hasAcceptTerms: false,
    image: '/avatar/lion-avatar.png'
  },
  token: NOT_YET_ASSIGNED_STR,
  background: '/fondo_clara.png'
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
    },
    setAvatar: (state, action: PayloadAction<string>) => {
      state.user.image = action.payload
    },
    setBackground: (state, action: PayloadAction<string>) => {
      state.background = action.payload
    }
  }
})

const { setUser, setToken, setAvatar, setBackground } = userSlice.actions
const userReducer = userSlice.reducer

export { setUser, setToken, userReducer, setAvatar, setBackground }
