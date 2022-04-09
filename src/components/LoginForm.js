
import { useDispatch } from 'react-redux'
import { useState } from 'react'
import { saveUser, setUserArr } from '../reducers/userReducer'
import { appendUserName } from '../reducers/userNameReducer'
//import blogService from './services/blogs'

const LoginForm = () => {
  const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  console.log('loginform')

  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log('handlesubmit')
    if ( username !== '' && password !== '') {
      dispatch(setUserArr([]))
      dispatch(appendUserName(username))
      dispatch(saveUser({ username, password }))


    } else {
      dispatch(setUserArr(null))
    }


  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          username
          <input
            id='username'
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          password
          <input
            id='password'
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button id='login-button' type="submit" >login</button>
      </form>
    </div>
  )
}


export default LoginForm