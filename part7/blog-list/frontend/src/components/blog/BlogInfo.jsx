import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { updateLikeBlog, deleteBlog } from '../../reducers/blogReducer'

const BlogInfo = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.auth)
  const { id } = useParams()
  const blogs = useSelector((state) => state.blogs)
  const blog = blogs.find((b) => b.id === id)

  if (!blog) {
    return <p>Blog not found</p>
  }

  const like = async (blog) => {
    dispatch(updateLikeBlog(blog))
  }

  const removeBlog = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`))
      dispatch(deleteBlog(blog))
  }

  return (
    <div>
      <h3>
        {blog.title} - {blog.author}
      </h3>
      <a href={blog.url}>{blog.url}</a>
      <p>
        {blog.likes}
        <button onClick={() => like(blog)}>Like</button>
      </p>
      <p>added by {blog.user.name}</p>
      {user && user.username === blog.user.username && (
        <button onClick={() => removeBlog(blog)}>Delete</button>
      )}
    </div>
  )
}

export default BlogInfo
