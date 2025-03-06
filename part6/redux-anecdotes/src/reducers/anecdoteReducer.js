import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    setAnecdotes(state, action) { return action.payload },
    appendAnecdote(state, action) { state.push(action.payload) },
    voteAnecdote(state, action) { return state.map(anecdote => anecdote.id !== action.payload.id ? anecdote : action.payload)}
  }
})

export const { setAnecdotes, appendAnecdote, voteAnecdote } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (content) => async (dispatch) => {
  const newAnecdote = await anecdoteService.create(content)
  dispatch(appendAnecdote(newAnecdote))
}

export const updateVoteAnecdote = (content) => async (dispatch) => {
  const updatedAnecdote = { ...content, votes: content.votes + 1 }
  const savedAnecdote = await anecdoteService.vote(updatedAnecdote)
  dispatch(voteAnecdote(savedAnecdote))
}

export default anecdoteSlice.reducer