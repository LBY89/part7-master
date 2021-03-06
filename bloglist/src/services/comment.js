import axios from 'axios'
const baseUrl = '/api/blogs/'

const create = async (id, comment) => {
  console.log('here from commentService')
  const commentObj = { content: comment, blogId: id }
  console.log('commentObj', commentObj)
  const response = await axios.post(`${baseUrl}${id}/comments/`, commentObj)
  return response.data
}

// const getAll = (id) => {

//   const request = axios.get(`${baseUrl}${id}/comments`)
//   return request.then(response => response.data)
// }

const getAll = (id) => {
  const request = axios.get(`${baseUrl}/${id}/comments/`)
  return request.then(response => response.data)
}

export default { create, getAll }