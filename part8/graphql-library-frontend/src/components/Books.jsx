import PropTypes from 'prop-types'
import { useState } from 'react'

const Books = ({ show, books }) => {
  const [filter, setFilter] = useState('all genres')

  const genreDuplicateArray = books.map(b => b.genres).flat()
  const genres = [...new Set(genreDuplicateArray)]
  genres.push("all genres")

  if (!show) return null
  const filteredBook = books.filter(book => filter === 'all genres' ? book : book.genres.includes(filter))

  return (
    <div>
      <h2>books</h2>
      <p>in genre <strong>{filter}</strong></p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {filteredBook.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {genres.map((g, index) => (
          <button key={index} onClick={() => setFilter(g)}>{g}</button>
        ))}
      </div>
    </div>
  )
}

Books.propTypes = {
  show: PropTypes.bool.isRequired,
  books: PropTypes.array.isRequired
}

export default Books