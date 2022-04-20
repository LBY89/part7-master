import { createSlice } from '@reduxjs/toolkit'
import commentService from '../services/comment'

const commentSlice = createSlice({
  name: 'comment',
  initialState: [],
  reducers: {
    appendComment:(state, action) => {
      state.push(action.payload)
    },
    setComments:(state, action) => {
      return action.payload
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

export const initializeComments = () => {
  return async dispatch => {
    const comments = await commentService.getAll()
    //const filteredComments = comments.filter((comment) => comment.blogId === id)
    dispatch(setComments(comments))
  }
}

export const { appendComment, setComments } = commentSlice.actions
export default commentSlice.reducer