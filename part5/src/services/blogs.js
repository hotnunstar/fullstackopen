import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  try {
    const response = await axios.get(baseUrl)
    return response.data
  } catch (error) {
    throw new Error('Failed to fetch blogs')
  }
}

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  }

  try {
    const response = await axios.post(baseUrl, newObject, config)
    return response.data
  } catch (error) {
    throw new Error('Failed to create blog')
  }
}

export default { getAll, create, setToken }
