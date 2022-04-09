import { useState } from 'react'
import { increaseLike, deleteBlog } from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'
import { setAddedNotification } from '../reducers/notificationReducer'

const Blog = ({ blog, userName } ) => {
  const dispatch = useDispatch()
  //console.log('blog and user', blog, user)

  //const userName = useSelector(state => state.userName)
  console.log('whos in Blog?', userName)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const [detailVisible, setDetailVisible] = useState(false)


  const hideWhenVisible = { display: detailVisible ? 'none' : '' }
  const showWhenVisible = { display: detailVisible ? '' : 'none' }

  return (
    <div style={blogStyle} className='blog-container' id='rendered-blog'>
      <div style={hideWhenVisible}  className='blogFirstRender'>
        {blog.title} {blog.author} <button id='view-button' onClick={() => setDetailVisible(true)}>view</button>
      </div>
      <div style={showWhenVisible} className='blog2ndRender'>
        <p>{blog.title}<button onClick={() => setDetailVisible(false)}>hide</button></p>
        <p>{blog.author}</p> <p>{blog.url}</p>
        <p>likes: {blog.likes}
          <button id='like-button' onClick={() =>
          {dispatch(increaseLike(blog)); dispatch(setAddedNotification(`you liked '${blog.title}'`, 5))}}>
          like</button></p>
        { (blog.user && userName===blog.user.username) && (
          <button id='remove-button' onClick={() => dispatch(deleteBlog(blog.id))}>remove</button>
        )}
      </div>
    </div>
  )
}
//user[0].username === blog.user.username || typeof blog.user === 'string'
export default Blog