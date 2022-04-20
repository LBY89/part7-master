// import { useState } from 'react'
import { increaseLike, deleteBlog } from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'
import { setAddedNotification } from '../reducers/notificationReducer'
import { useState } from 'react'
import { createComment } from '../reducers/commentReducer'
import { Button } from 'react-bootstrap'

const Blog = ({ blog, userName, comments } ) => {
  //looks like when refresh page, App is rendered first, there
  // fit for initialization, get all comments, then pass and
  // get comments to Blog component, filter whats needed.
  const dispatch = useDispatch()
  const [comment, setComment] = useState('')

  console.log('blog in Blog', blog)


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
  } else {

    const filteredComments = comments.filter((comment) => comment.blogId === blog.id)

    return(
      <div>
        <h2>{blog.title}</h2>
        <p>{blog.url}</p>
        <p>{blog.likes} likes <Button onClick={() =>
        {dispatch(increaseLike(blog))
          dispatch(setAddedNotification(`you liked '${blog.title}'`, 5))}}>like</Button></p>
        <p>added by {blog.author}</p>
        { (blog.user && userName===blog.user.username) && (
          <Button id='remove-button' onClick={() => dispatch(deleteBlog(blog.id))}>remove</Button>
        )}
        <h3>Comments</h3>
        <form onSubmit={handleCommentSubmit}>
          <input value={comment} onChange={handleCommentChange}/>
          <button type="submit">add comment</button>
        </form>
        {filteredComments.map((comment, index) => <li key={index}>{comment.content}</li>)}
      </div>
    )
  }

}

export default Blog