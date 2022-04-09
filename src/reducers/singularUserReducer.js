import { createSlice } from '@reduxjs/toolkit'
import usersService from '../services/usersService'
//import blogService from '../services/blogs'

const singularSlice = createSlice({
  name: 'user',
  initialState: {},
  reducers: {
    setUser:(state, action) => {
      console.log('setUser actionload', action.payload)
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(action.payload)
      )
      return action.payload
    }
  }
})

export const initializeUser = () => {
  return async dispatch => {
    const users = await usersService.getAll()
    dispatch(setUser(users))
  }
}
export const { setUser } = singularSlice.actions
export default singularSlice.reducer

