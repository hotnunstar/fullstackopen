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

const update = async (existentObject) => {
  const url = `${baseUrl}/${existentObject.id}`
  const config = {
    headers: { Authorization: token },
  }

  try {
    const response = await axios.put(url, existentObject, config)
    return response.data
  } catch (error) {
    throw new Error('Failed to update blog')
  }
}

const remove = async (id) => {
  const url = `${baseUrl}/${id}`
  const config = {
    headers: { Authorization: token },
  }

  try {
    const response = await axios.delete(url, config)
    return response.data
  } catch (error) {
    throw new Error('Failed to delete blog')
  }
}

const createComment = async (id, comment) => {
  const url = `${baseUrl}/${id}/comments`
  const config = {
    headers: { Authorization: token },
  }

  try {
    const response = await axios.post(url, { comment: comment }, config)
    return response.data
  } catch (error) {
    throw new Error('Failed to create comment')
  }
}

export default { setToken, getAll, create, update, remove, createComment }
