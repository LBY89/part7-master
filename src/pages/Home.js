import Togglable from '../components/Togglable'
import BlogForm from '../components/BlogForm'
import { useRef } from 'react'
import { Link } from 'react-router-dom'

const Home = ({ newBlogs }) => {

  const blogFormRef = useRef()

  return(
    <div>
      <Togglable buttonLabel='create blog' ref={blogFormRef}>
        <BlogForm />
      </Togglable>
      {newBlogs.map(blog => <div key={blog.id}><Link to={`blogs/${blog.id}`}>{blog.title} --- {blog.author}</Link></div>)}
    </div>
  )
}

export default Home