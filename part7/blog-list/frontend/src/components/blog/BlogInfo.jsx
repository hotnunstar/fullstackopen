import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  updateLikeBlog,
  deleteBlog,
  updateCommentBlog,
} from '../../reducers/blogReducer'

const BlogInfo = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = useSelector((state) => state.auth)
  const { id } = useParams()
  const blogs = useSelector((state) => state.blogs)
  const blog = blogs.find((b) => b.id === id)
  const [comment, setComment] = useState('')

  if (!blog) {
    return <p>Blog not found</p>
  }

  const like = async (blog) => {
    dispatch(updateLikeBlog(blog))
  }

  const removeBlog = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      dispatch(deleteBlog(blog))
      navigate('/blogs')
    }
  }

  const addComment = (e) => {
    e.preventDefault()
    if (comment) {
      dispatch(updateCommentBlog(blog.id, comment))
      setComment('')
    }
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

      <h4>Comments</h4>
      <form onSubmit={addComment}>
        <input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button type="submit">add comment</button>
      </form>

      {blog.comments.length === 0 ? (
        <p>No comments yet.</p>
      ) : (
        <ul>
          {blog.comments.map((comment) => (
            <li key={comment.id}>{comment.comment}</li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default BlogInfo
