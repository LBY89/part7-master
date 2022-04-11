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
import {
  Routes,
  Route,
  Link,
  useMatch


} from 'react-router-dom'
import Blog from './components/Blog'


const App = () => {

  const dispatch = useDispatch()


  const newBlogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)
  const userName = useSelector(state => state.userName)
  // const users = useSelector(state => state.users)
  // console.log('usersfromstore', users)

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
  }, [dispatch])

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
  console.log('match to be rendered from HOME', match)
  const blog = match
    ? newBlogs.find(user => user.id === match.params.id)
    : null
  console.log('blog to be rendered from HOME', blog)

  //useMatch is a godam hook, put before if statement, man

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
    padding: 5
  }


  return (
    <div>
      <Notification  />
      <h2>blogs</h2>
      <Link style={padding} to="/">blogs</Link>
      <Link style={padding} to="/users">users</Link>
      {userName} logged in <button id='logout-button' onClick = {handleLogout}>logout</button>
      <Routes>
        <Route path="/users/:id/" element={<User />} />
        <Route path="/users" element={<Users  />} />
        <Route path="/*" element={<Home newBlogs={newBlogs} />}/>
        <Route path="/blogs/:id" element={<Blog blog={blog} userName={userName} />}/>
      </Routes>
    </div>
  )
}


export default App