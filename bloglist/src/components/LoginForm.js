
import { useDispatch } from 'react-redux'
import { useState } from 'react'
import { saveUser, setUserArr } from '../reducers/userReducer'
import { appendUserName } from '../reducers/userNameReducer'
import { useNavigate } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'

const LoginForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
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
    navigate('/')

  }

  return (
    <div>
      {/* <form onSubmit={handleSubmit}>
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
      </form> */}
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>username:</Form.Label>
          <Form.Control
            id='username'
            value={username}
            onChange={handleUsernameChange}
          />
          <Form.Label>password:</Form.Label>
          <Form.Control
            id='password'
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
          <Button variant="primary" type="submit">
            login
          </Button>
        </Form.Group>
      </Form>
    </div>
  )
}


export default LoginForm