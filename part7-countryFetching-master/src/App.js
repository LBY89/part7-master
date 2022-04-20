import { useState, useEffect } from 'react'
import axios from 'axios'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const useCountry = (name) => {
  console.log('whats in name', name);
  
  const [country, setCountry] = useState(null)
  console.log('not sure which render');
  console.log('countrybefore axios', country);
  
  
  useEffect(() => {
    console.log('inside useEffect');
    if (name === '') {
      return null
    }
    
    axios
    .get(`https://restcountries.com/v3.1/name/${name}?fullText=true`)
    .then(response => {
      setCountry(response.data)
      console.log('response.data', response.data)
      })
    .catch(error => {
      setCountry(null)//is GET status in console allowed when fail? 
    })
    
  }, [name])
  console.log('countryafter useEffect', country)
  return country
  
  
}

const Country = ({ country }) => {
  if (!country) {
    return <div>not found...</div>
  }
  console.log('country to be rendered', country);
  

  return (
    <div>
      <h3>{country[0].name.common}</h3>
      <div>population {country[0].population}</div> 
      <div>capital {country[0].capital}</div>
      <img src={country[0].flags.png} height='100' alt={`flag of ${country[0].name.common}`}/> 
    </div>
  )  
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button >find</button>
      </form>

      <Country country={country} />
    </div>
  )
}

export default App
