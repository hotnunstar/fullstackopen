import { useDispatch, useSelector } from 'react-redux'
import { updateVoteAnecdote } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state.anecdotes)
  const filter = useSelector(state => state.filter)

  const vote = async (anecdote) => { 
    dispatch(updateVoteAnecdote(anecdote))
    dispatch(showNotification(`You voted: "${anecdote.content}"`, 10))
  }

  const filteredAnecdotes = anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div>
      {[...filteredAnecdotes].sort((a, b) => b.votes - a.votes).map(anecdote => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote)}>Vote</button>
            </div>
          </div>
        ))}
    </div>
  )
}

export default AnecdoteList