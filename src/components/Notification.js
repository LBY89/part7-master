import { useSelector } from 'react-redux'
import { Alert } from 'react-bootstrap'

const Notification = () => {

  const mystyle = {
    color: 'red'
  }


  const message  = useSelector(state => state.notification).content

  if (message === null) {
    return null
  }

  return (
    <div className="container" style={mystyle} >
      <Alert variant="success">
        {message}
      </Alert>
    </div>
  )
}

export default Notification