import { useState } from "react"
import { useQuery, useApolloClient, useSubscription } from "@apollo/client"
import { ALL_AUTHORS, ALL_BOOKS, BOOK_ADDED, USER } from './queries'

import Authors from "./components/Authors"
import Books from "./components/Books"
import NewBook from "./components/NewBook"
import LoginForm from "./components/LoginForm"
import Recommend from "./components/Recommend"
import Notify from './components/Notify'

export const updateCache = (cache, query, addedBook) => {
  const uniqByTitle = (a) => {
    let seen = new Set()
    return a.filter((item) => {
      let k = item.title
      return seen.has(k) ? false : seen.add(k)
    })
  }

  cache.updateQuery(query, ({ allBooks }) => {
    return {
      allBooks: uniqByTitle(allBooks.concat(addedBook)),
    }
  })
}

const App = () => {
  const [page, setPage] = useState("authors")
  const authors = useQuery(ALL_AUTHORS)
  const books = useQuery(ALL_BOOKS)
  const user = useQuery(USER)
  const [errorMessage, setErrorMessage] = useState(null)
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  useSubscription(BOOK_ADDED, {
    onData: ({ data, client }) => {
      console.log(data)
      const addedBook = data.data.bookAdded
      try {
        window.alert(`${addedBook.title} added`)
        updateCache(client.cache, { query: ALL_BOOKS }, addedBook)
      }
      catch {
        console.log('error')
      }

      client.cache.updateQuery({ query: ALL_BOOKS }, ({
        allBooks }) => {
        return {
          allBooks: allBooks.concat(addedBook),
        }
      })
    }
  })

  if (authors.loading || books.loading) return <div>loading...</div>

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  return (
    <div>
      <Notify errorMessage={errorMessage} />
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        {token && (
          <>
            <button onClick={() => setPage("add")}>add book</button>
            <button onClick={() => setPage("recommend")}>recommend</button>
            <button onClick={logout}>logout</button>
          </>
        )}
        {!token && <button onClick={() => setPage("login")}>login</button>}
      </div>

      <Authors show={page === "authors"} authors={authors.data.allAuthors} setError={notify} />
      <Books show={page === "books"} books={books.data.allBooks} />
      <NewBook show={page === "add"} setError={notify} />
      <Recommend show={page === "recommend"} user={user.data.me} books={books.data.allBooks} />
      <LoginForm show={page === "login"} setToken={(token) => { setToken(token); setPage("authors") }} setError={notify} />
    </div>
  )
}

export default App
