import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  setBlogs,
  updateLikeBlog,
  deleteBlog,
} from '../../reducers/blogReducer'
import { showNotification } from '../../reducers/notificationReducer'
import blogService from '../../services/blogs'

const BlogList = ({ user }) => {
  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blogs)

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const blogs = await blogService.getAll()
        dispatch(setBlogs(blogs))
      } catch (error) {
        dispatch(
          showNotification(
            'An error occurred while loading blogs, please try again',
            'error',
            10
          )
        )
      }
    }

    fetchBlogs()
  }, [dispatch])

  const toggleVisibility = (id) => {
    setVisibleBlogs((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  const [visibleBlogs, setVisibleBlogs] = useState({})

  const like = async (blog) => {
    dispatch(updateLikeBlog(blog))
  }

  const removeBlog = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`))
      dispatch(deleteBlog(blog))
  }

  return (
    <div>
      <h3>Blogs</h3>
      {[...blogs]
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <div key={blog.id}>
            <h4>
              {blog.title}
              <button onClick={() => toggleVisibility(blog.id)}>
                {visibleBlogs[blog.id] ? 'Hide' : 'Show'} Info
              </button>
            </h4>

            {visibleBlogs[blog.id] && (
              <div>
                <p>Link: {blog.url}</p>
                <p>
                  Likes: {blog.likes}{' '}
                  <button onClick={() => like(blog)}>Like</button>
                </p>
                <p>Author: {blog.author}</p>
                {user && user.username === blog.user.username && (
                  <button onClick={() => removeBlog(blog)}>Delete</button>
                )}
              </div>
            )}
          </div>
        ))}
    </div>
  )
}

export default BlogList
