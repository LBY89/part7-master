import Togglable from '../components/Togglable'
import BlogForm from '../components/BlogForm'
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'
const Home = ({ newBlogs }) => {

  const blogFormRef = useRef()

  return(
    <div>
      <Togglable buttonLabel='create blog' ref={blogFormRef}>
        <BlogForm />
      </Togglable>
      <Table striped>
        <tbody>
          {newBlogs.map(blog =>
            <tr key={blog.id}>
              <td>
                <Link style={{ textDecoration: 'none' }} to={`blogs/${blog.id}`}>{blog.title}</Link>
              </td>
              <td>
                {blog.author}
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>

  )
}

export default Home