import usersService from '../services/usersService'
import { useDispatch } from 'react-redux'
import { setUser } from '../reducers/singularUserReducer'
import { useState, useEffect } from 'react'
import {
  Link,
  //useMatch,
  //useNavigate

} from 'react-router-dom'

const Users = () => {

  const [users, setUsers] = useState([])
  console.log('users', users)
  useEffect(() => {
    usersService.getAll().then(allUsers => setUsers(allUsers))
  }, [])


  const dispatch = useDispatch()

  return(
    <div>
      <h2>Users</h2>
      Blogs created
      <table>
        <tbody>
          {users.map(user => <tr key={user.id}><td><Link to={`/users/${user.id}`} onClick={() => dispatch(setUser(user))}>{user.name}</Link></td><td>{user.blogs.length}</td></tr>)}
        </tbody>
      </table>
    </div>
  )
}

export default Users