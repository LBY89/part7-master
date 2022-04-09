import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
    appendBlog:(state, action) => {
      state.push(action.payload)
    },
    updateBlog:(state, action) => {
      const updatedBlog = action.payload
      return state.map(blog => blog.id !== updatedBlog.id ? blog: updatedBlog).sort(function (a, b) {
        return (b.likes - a.likes)
      })
    },
    removeBlog:(state, action) => {
      const id = action.payload
      return state.filter(blog => blog.id !== id)
    }
  }
})


export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    const sortedBlogs = blogs.sort(function (a, b) {
      return (b.likes - a.likes)})
    //has to be sorted before dispatch to store.
    dispatch(setBlogs(sortedBlogs))
  }
}

export const createBlog = ({ title, author, url }) => {
  return async dispatch => {
    const newblog = await blogService.create({ title, author, url })
    console.log('newblog', newblog)
    dispatch(appendBlog(newblog))
  }
}

export const increaseLike = (blog) => {
  const newBlog = { ...blog, likes: blog.likes + 1 }
  return async dispatch => {
    const updatedblog = await blogService.update(blog.id, newBlog)
    console.log('updatedblogfrom increaselike', updatedblog)
    dispatch(updateBlog(updatedblog))
  }
}

export const deleteBlog = (id) => {
  if (window.confirm('Delete ?')) {
    return async dispatch => {
      await blogService.deleteBlogPost(id)
      dispatch(removeBlog(id))
    }
  }
}
// how does delete work ? delete deleteBlog obtain that blog.id, pass to removeBlog, with removeBlog function does filtering off that specific blog,
//however, this process comes after, blogService.deleteBlogPost(id), which returns nothing, following asynchroneous deletion, removeBlog then executes filtering that deleted blog from state.blogs array.
//Yeah, genuis design isn't it ?
export const { setBlogs, appendBlog, updateBlog, removeBlog } =  blogSlice.actions

export default blogSlice.reducer

