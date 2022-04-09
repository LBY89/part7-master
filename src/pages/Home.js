import Togglable from '../components/Togglable'
import BlogForm from '../components/BlogForm'
import { useRef } from 'react'
import Blog from '../components/Blog'

const Home = ({ newBlogs, userName }) => {


  const blogFormRef = useRef()

  return(
    <div>
      <Togglable buttonLabel='create blog' ref={blogFormRef}>
        <BlogForm />
      </Togglable>
      {newBlogs.map(blog =>
        <Blog id='each-blog' key={blog.id} blog={blog}  userName={userName} />
      )}
    </div>
  )
}

export default Home