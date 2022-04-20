import { useState } from 'react'
// self customized hook to simplify form submission for CreateNew component to use.

export const useField = (type) => {
    const [value, setValue] = useState('')
  
    const onChange = (event) => {
      setValue(event.target.value)
    }
    const onReset = () => {
        setValue('')
    }
    return {
      type,
      value,
      onChange,
      onReset
    }
  }

