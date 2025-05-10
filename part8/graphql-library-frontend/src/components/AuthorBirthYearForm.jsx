import PropTypes from 'prop-types'
import { useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { EDIT_AUTHOR_BIRTH_YEAR, ALL_AUTHORS } from '../queries'
import { useEffect } from 'react'

const AuthorBirthYearForm = (props) => {
    const authors = useQuery(ALL_AUTHORS)
    const [name, setName] = useState('')
    const [born, setBorn] = useState('')
    const [changeBornYear, result] = useMutation(EDIT_AUTHOR_BIRTH_YEAR, {
        refetchQueries: [{ query: ALL_AUTHORS }],
        onError: (error) => {
            console.error(error.graphQLErrors.map(e => e.message).join('\n'))
        }
    })

    const submit = (event) => {
        event.preventDefault()
        changeBornYear({ variables: { name, setBornTo: Number(born) } })
        setName('')
        setBorn('')
    }

    useEffect(() => {
        if (result.data && result.data.editAuthor === null) console.error('author not found')
    }, [result.data])

    if (!props.show) return null
    if (authors.loading) return <div>loading...</div>

    return (
        <div>
            <h2>set author birth year</h2>
            <form onSubmit={submit}>
                <div>
                    name
                    <select value={name} onChange={({ target }) => setName(target.value)}>
                        {authors.data.allAuthors.map(author => (
                            <option key={author.name} value={author.name}>
                                {author.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    born
                    <input
                        type="number"
                        value={born}
                        onChange={({ target }) => setBorn(target.value)}
                    />
                </div>
                <button type="submit">update author</button>
            </form>
        </div>
    )
}

AuthorBirthYearForm.propTypes = {
    show: PropTypes.bool.isRequired,
}

export default AuthorBirthYearForm