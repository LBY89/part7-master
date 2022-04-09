import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setUser } from '../reducers/singularUserReducer'
const User = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    const bloggerUserJSON = window.localStorage.getItem('loggedUser')
    if (bloggerUserJSON) {
      const userOf = JSON.parse(bloggerUserJSON)
      console.log('whos in localStorage', userOf)
      dispatch(setUser(userOf))
    } else {
      return null
    }
  }, [dispatch])

  const userOf= useSelector(state => state.users)
  console.log('userOf from User', userOf)
  if (userOf
  && Object.keys(userOf).length === 0
  && Object.getPrototypeOf(userOf) === Object.prototype) {
    return (
      <h2>a bug to be debugged...</h2>
    )
  }
  return(
    <div>
      <h2>{userOf.name}</h2>
      <p>added blogs</p>
      {userOf.blogs.map(blog => <li key={blog.id}>{blog.title}</li>)}
    </div>
  )
}

export default User