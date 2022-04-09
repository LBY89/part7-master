import { createSlice } from '@reduxjs/toolkit'
//import modificationReducer from './anecdoteReducer'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: {
    content: null
  },
  reducers: {

    clearNotification: (state) => {
      state.content = null
    },
    showNewBlog: (state, action) => {
      state.content = action.payload

    }
  }
})

let timeoutId

export const setAddedNotification = (message, time_value) => {

  return  dispatch => {


    dispatch(showNewBlog(message))

    if (timeoutId) {

      clearTimeout(timeoutId)
    }

    timeoutId = setTimeout(() => {
      dispatch(clearNotification())
    }, time_value*1000)//dam some number games here.
  }
}


export const { clearNotification, showNewBlog } = notificationSlice.actions

export default notificationSlice.reducer

