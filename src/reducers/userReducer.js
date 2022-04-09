import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import blogService from '../services/blogs'

const userSlice = createSlice ({
  name: 'users',
  initialState: [],
  reducers: {
    appendUser:(state, action) => {
      console.log('appendUser actionpayload', action.payload)
      state.push(action.payload)
      //console.log('after appendUser statepush')
    },
    logOut: (state, action) => {
      return action.payload
    },
    setUserArr: (state, action) => {
      return action.payload
    },
  }
})


export const saveUser = ({ username, password }) => {
  return async dispatch => {

    const user = await loginService.login({ username, password })
    console.log('here from saveUser', user)

    window.localStorage.setItem(
      'loggedBlogappUser', JSON.stringify(user)
    )
    //console.log('JSONstringify user', user)
    dispatch(appendUser(user))
    blogService.setToken(user.token)

  }
}


export const { appendUser, logOut, setUserArr } = userSlice.actions

export default userSlice.reducer