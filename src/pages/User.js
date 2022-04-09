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
  if (!userOf) {
    return null
  }
  return(
    <div>
      <h2>somthing</h2>
      {userOf.name}
    </div>
  )
}

export default User