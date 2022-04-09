import { createSlice } from '@reduxjs/toolkit'

const userNameSlice = createSlice({
  name: 'userName',
  initialState: null,
  reducers: {
    appendUserName: (state, action) => {
      return action.payload
    }
  }
})

export const { appendUserName } = userNameSlice.actions
export default userNameSlice.reducer