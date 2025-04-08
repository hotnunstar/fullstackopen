import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { createBlog } from '../../reducers/blogReducer'
import { showNotification } from '../../reducers/notificationReducer'

const BlogForm = () => {
  const navigate = useNavigate()
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
    navigate('/blogs')
  }

  return (
    <div className="mx-auto min-w-96 bg-lime-100 border border-lime-900 w-fit p-4 rounded-lg">
      <h3 className="pb-4 border-b border-b-lime-300 text-xl font-bold text-center text-lime-700">
        Create new Blog
      </h3>
      <form onSubmit={addBlog} className="pt-4 flex flex-col gap-4">
        {Object.keys(formFields).map((field) => (
          <div key={field} className="flex flex-col">
            <label htmlFor={field} className="text-sm text-lime-700">
              {field}
            </label>
            <input
              type={field === 'url' ? 'url' : 'text'}
              id={field}
              name={field}
              value={formFields[field]}
              onChange={handleChange}
              className="border border-lime-900 rounded-lg bg-transparent px-2"
            />
          </div>
        ))}
        <button
          type="submit"
          className="mx-auto w-fit rounded-lg border border-lime-900 px-4 py-1 bg-lime-900 text-lime-100 hover:text-lime-900 hover:bg-lime-100 hover:cursor-pointer transition-all duration-300 ease-in-out"
        >
          Create
        </button>
      </form>
    </div>
  )
}

export default BlogForm
