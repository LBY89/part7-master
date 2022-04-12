import { useState, useImperativeHandle, forwardRef } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'react-bootstrap'


const Togglable = forwardRef((props, ref) => {
  console.log('togglable')

  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }
  //const dispatch = useDispatch()
  const toggleVisibility = () => {

    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }

  })

  console.log('togglable almost render')
  //console.log('props.children', props.children)

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button onClick={toggleVisibility} variant="primary" type="submit">
          {props.buttonLabel}
        </Button>
        {/* <button onClick={toggleVisibility}>{props.buttonLabel}</button> */}
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <Button onClick={toggleVisibility}>cancel</Button>
      </div>
    </div>
  )
})

Togglable.displayName = 'Togglable'

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

export default Togglable