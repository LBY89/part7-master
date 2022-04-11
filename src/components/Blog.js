// import { useState } from 'react'
import { increaseLike, deleteBlog } from '../reducers/blogReducer'
import { useDispatch, useSelector } from 'react-redux'
import { setAddedNotification } from '../reducers/notificationReducer'
import { useState } from 'react'
import { createComment } from '../reducers/commentReducer'

const Blog = ({ blog, userName } ) => {
  const dispatch = useDispatch()
  const [comment, setComment] = useState('')
  const comments = useSelector(state => state.comment)
  const handleCommentChange = () => {
    setComment(event.target.value)
  }

  const handleCommentSubmit = () => {
    event.preventDefault()
    if (comment !== '') {
      dispatch(createComment(blog.id, comment))
      setComment('')
    }
  }


  if(!blog) {
    return null
  }

  return(
    <div>
      <h2>{blog.title}</h2>
      <p>{blog.url}</p>
      <p>{blog.likes} likes <button onClick={() =>
      {dispatch(increaseLike(blog))
        dispatch(setAddedNotification(`you liked '${blog.title}'`, 5))}}>like</button></p>
      <p>added by {blog.author}</p>
      { (blog.user && userName===blog.user.username) && (
        <button id='remove-button' onClick={() => dispatch(deleteBlog(blog.id))}>remove</button>
      )}
      <h3>Comments</h3>
      <form onSubmit={handleCommentSubmit}>
        <input value={comment} onChange={handleCommentChange}/>
        <button type="submit">add comment</button>
      </form>
      {comments.map((comment, index) => <li key={index}>{comment}</li>)}
    </div>
  )

}

export default Blog