import { useDispatch } from 'react-redux'
import { useState } from 'react'
import { createBlog } from '../../reducers/blogReducer'
import { showNotification } from '../../reducers/notificationReducer'

const BlogForm = () => {
  const dispatch = useDispatch()
  const [formFields, setFormFields] = useState({
    title: '',
    author: '',
    url: '',
  })

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormFields((prevFields) => ({
      ...prevFields,
      [name]: value,
    }))
  }

  const addBlog = (event) => {
    event.preventDefault()

    if (Object.values(formFields).some((value) => !value.trim())) {
      dispatch(showNotification('All fields are required.', 'error', 10))
      return
    }

    dispatch(createBlog(formFields))
    setFormFields({ title: '', author: '', url: '' })
  }

  return (
    <div>
      <h3>Create new Blog</h3>
      <form onSubmit={addBlog}>
        {Object.keys(formFields).map((field) => (
          <div key={field}>
            <label htmlFor={field}>{field}</label>
            <input
              type={field === 'url' ? 'url' : 'text'}
              id={field}
              name={field}
              value={formFields[field]}
              onChange={handleChange}
            />
          </div>
        ))}
        <button type="submit">Create</button>
      </form>
    </div>
  )
}

export default BlogForm
