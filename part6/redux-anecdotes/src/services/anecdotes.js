import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

export const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

export const create = async (content) => {
    const newAnecdote = { content, votes: 0 }
    const response = await axios.post(baseUrl, newAnecdote)
    return response.data
}

export const vote = async (anecdote) => {
    const response = await axios.put(`${baseUrl}/${anecdote.id}`, anecdote)
    return response.data
}

export default { getAll, create, vote }