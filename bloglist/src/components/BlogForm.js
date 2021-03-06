import { useState } from 'react'
//import blogService from '../services/blogs'
import { setAddedNotification } from '../reducers/notificationReducer'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { Form, Button } from 'react-bootstrap'

const BlogForm = () => {
  console.log('BlogFrom')
  const dispatch = useDispatch()

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  }

  const addBlog = (event) => {

    event.preventDefault()
    dispatch(createBlog({ title, author, url }))
    dispatch(setAddedNotification(`you added '${title}'`, 5))
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      {/* <form onSubmit={addBlog}>
        <div>
              title
          <input
            id='title'
            type="text"
            value={title}
            name="title"
            onChange={handleTitleChange}
          />
        </div>
        <div>
              author
          <input
            id='author'
            type="text"
            value={author}
            name="author"
            onChange={handleAuthorChange}
          />
        </div>
        <div>
              url
          <input
            id='url'
            type="text"
            value={url}
            name="url"
            onChange={handleUrlChange}
          />
        </div>
        <button id='create-button' type="submit">create</button>
      </form> */}
      <Form onSubmit={addBlog}>
        <Form.Group>
          <Form.Label>title:</Form.Label>
          <Form.Control
            id='title'
            type="text"
            value={title}
            name="title"
            onChange={handleTitleChange}
          />
          <Form.Label>author:</Form.Label>
          <Form.Control
            id='author'
            type="text"
            value={author}
            name="author"
            onChange={handleAuthorChange}
          />
          <Form.Label>url:</Form.Label>
          <Form.Control
            id='url'
            type="text"
            value={url}
            name="url"
            onChange={handleUrlChange}
          />
          <Button variant="primary" type="submit">
            create
          </Button>
        </Form.Group>
      </Form>
    </div>
  )
}

export default BlogForm