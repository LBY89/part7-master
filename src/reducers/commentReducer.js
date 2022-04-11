import { createSlice } from '@reduxjs/toolkit'
import commentService from '../services/comment'

const commentSlice = createSlice({
  name: 'comment',
  initialState: [],
  reducers: {
    appendComment:(state, action) => {
      state.push(action.payload)
    }
  }
})

export const createComment = (id, comment) => {
  return async dispatch => {
    console.log('before backend')
    const commentReturned = await commentService.create(id, comment)
    console.log('after backend')
    dispatch(appendComment(commentReturned))
  }
}

export const { appendComment } = commentSlice.actions
export default commentSlice.reducer