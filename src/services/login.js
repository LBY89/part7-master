import axios from 'axios'
const baseUrl = '/api/login'

const login = async credentials => {
  console.log('here from loginservice')

  const response = await axios.post(baseUrl, credentials)
  //console.log('is db communication a success?')
  return response.data
}


export default { login }