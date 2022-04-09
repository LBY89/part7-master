import { useSelector } from 'react-redux'

const Notification = () => {

  const mystyle = {
    color: 'red'
  }


  const message  = useSelector(state => state.notification).content

  if (message === null) {
    return null
  }

  return (
    <div className="error" style={mystyle} >
      {message}
    </div>
  )
}

export default Notification