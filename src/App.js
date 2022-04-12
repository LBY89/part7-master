import { useEffect } from 'react'
import blogService from './services/blogs'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { logOut, appendUser } from './reducers/userReducer'
import Home from './pages/Home'
import Users from './pages/Users'
import User from './pages/User'
import { appendUserName } from './reducers/userNameReducer'
import Blog from './components/Blog'
import { Button, Navbar, Nav } from 'react-bootstrap'
import Main from './pages/Main'
import { initializeComments } from './reducers/commentReducer'
import {
  Routes,
  Route,
  Link,
  useMatch
} from 'react-router-dom'

const App = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      console.log('whos in useEffect?', user)
      dispatch(appendUserName(user.username))
      blogService.setToken(user.token)
      dispatch(appendUser(user))
    } else {
      dispatch(logOut(null))
    }
  }, [dispatch])

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeComments())
  }, [dispatch])


  const newBlogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)
  const userName = useSelector(state => state.userName)
  const comments = useSelector(state => state.comment)
  //console.log('comments from fresh off store', comments)
  // const users = useSelector(state => state.users)
  // console.log('usersfromstore', users)


  // to solve refresh automatic loggin issue, add above logic
  // if localStorage has user info, then keep user non null, when localStorage has no user
  // info, must be handleLogout was executed, which include dispatch(logOut(null))
  // meaning user = null, further means LoginForm is rendered.
  // setTimeout(() => {
  //   console.log('sometimelater')
  // }, 1000)

  const handleLogout = (event) => {
    event.preventDefault()
    dispatch(logOut(null))
    console.log('logout')
    window.localStorage.clear()
  }

  const match = useMatch('/blogs/:id')
  console.log('all blogs',newBlogs)
  const blog = match
    ? newBlogs.find(user => user.id === match.params.id)
    : null

  if (!user) {
    return (
      <div>
        <h2>Login to See My Secrets 🤫</h2>
        <Togglable buttonLabel='login'>
          <LoginForm
          />
        </Togglable>
      </div>
    )
  }

  const padding = {
    padding: 5,
    textDecoration: 'none'
  }


  return (
    <div className="container">
      <Notification  />
      <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#" as="span">
              <Link style={padding} to="/Main">Main</Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              <Link style={padding} to="/">Blogs</Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              <Link style={padding} to="/users">Users</Link>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <Nav>Hello {userName}! <Button id='logout-button' onClick = {handleLogout}>logout</Button></Nav>
      </Navbar>
      {/* <Link style={padding} to="/Main">Main</Link>
      <Link style={padding} to="/">Blogs</Link>
      <Link style={padding} to="/users">Users</Link> */}
      {/* {userName} logged in <Button id='logout-button' onClick = {handleLogout}>logout</Button> */}
      <Routes>
        <Route path="/main" element={<Main />} />
        <Route path="/users/:id/" element={<User />} />
        <Route path="/users" element={<Users  />} />
        <Route path="/*" element={<Home newBlogs={newBlogs} />}/>
        <Route path="/blogs/:id" element={<Blog blog={blog} userName={userName} comments={comments}/>}/>
      </Routes>
    </div>
  )
}


export default App