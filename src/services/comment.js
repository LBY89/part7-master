import axios from 'axios'
const baseUrl = '/api/blogs/'

const create = async (id, comment) => {
  console.log('here from commentService')
  const commentObj = { content: comment }
  console.log('commentObj', commentObj)
  const response = await axios.post(`${baseUrl}${id}/comments`, commentObj)
  return response.data
}


export default { create }