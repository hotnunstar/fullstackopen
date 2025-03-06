import { useRef } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, updateAnecdote } from '../requests'
import { useNotificationDispatch } from '../NotificationContext'

const AnecdoteList = () => {
    const queryClient = useQueryClient()
    const dispatch = useNotificationDispatch()
    const timeoutRef = useRef(null)

    const handleVoteMutation = useMutation({
        mutationFn: updateAnecdote,
        onSuccess: (updateAnecdote) => {
            const anecdotes = queryClient.getQueryData(['anecdotes'])
            queryClient.setQueryData(['anecdotes'], anecdotes.map(anecdote => anecdote.id == updateAnecdote.id ? updateAnecdote : anecdote))
        }
    })

    const handleVote = (anecdote) => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current)
        handleVoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })
        
        dispatch({ type: 'SET_NOTIFICATION', payload: `Anecdote '"${anecdote.content}"' voted` });
        timeoutRef.current = setTimeout(() => { dispatch({ type: 'CLEAR_NOTIFICATION' }); }, 5000);
    }

    const result = useQuery({
        queryKey: ['anecdotes'],
        queryFn: getAnecdotes,
        refetchOnWindowFocus: false
    })

    if (result.isLoading) return <div>loading data...</div>
    if (result.isError) return <div>anecdote service not available due to server problems.</div>

    const anecdotes = result.data

    return (
        <div>
            {anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>{anecdote.content}</div>
                    <div>has {anecdote.votes}<button onClick={() => handleVote(anecdote)}>vote</button></div>
                </div>
            )}
        </div>
    )

}

export default AnecdoteList;