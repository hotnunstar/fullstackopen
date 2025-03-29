import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setBlogs } from '../../reducers/blogReducer'
import { Link } from 'react-router-dom'
import { showNotification } from '../../reducers/notificationReducer'
import blogService from '../../services/blogs'

const BlogList = () => {
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

  return (
    <div>
      <h3>Blogs</h3>
      <Link to="/blogs/new">Create blog</Link>
      {[...blogs]
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <div key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>
              <h4>{blog.title}</h4>
            </Link>
          </div>
        ))}
    </div>
  )
}

export default BlogList
