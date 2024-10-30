import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User } from '../../interfaces/interfaces.ts'
import localStorageManager from '../../localStorage/localStorageManager.js'

interface UserState {
  user: User
}

const userLoaded = (localStorageManager.getItem('user') as User) || { id: -1 }

const initialState: UserState = {
  user: userLoaded
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload
      localStorageManager.setItem('user', action.payload)
    }
  }
})

export const { setUser } = userSlice.actions
export default userSlice.reducer
