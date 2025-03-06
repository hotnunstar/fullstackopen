import { useRef } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createAnecdote } from '../requests'
import { useNotificationDispatch } from '../NotificationContext'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const dispatch = useNotificationDispatch()
  const timeoutRef = useRef(null)

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))

      dispatch({ type: 'SET_NOTIFICATION', payload: `New anecdote '"${newAnecdote.content}"' created` })
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      timeoutRef.current = setTimeout(() => { dispatch({ type: 'CLEAR_NOTIFICATION' }); }, 5000)
    },
    onError: (error) => {
      dispatch({ type: 'SET_NOTIFICATION', payload: "Too short anecdote, must have length 5 or more" })
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      timeoutRef.current = setTimeout(() => { dispatch({ type: 'CLEAR_NOTIFICATION' }); }, 5000)
    }
  })

  const onCreate = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value.trim()

    if (content.length < 5) {
      newAnecdoteMutation.mutateAsync({ content, votes: 0}).catch(() => {})
      return
    }

    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content, votes: 0 })
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm