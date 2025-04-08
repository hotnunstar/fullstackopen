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
    <div className="mx-auto min-w-96 bg-lime-100 border border-lime-900 w-fit p-4 rounded-lg">
      <h3 className="pb-4 border-b border-b-lime-300 text-xl font-bold text-center text-lime-700">
        {blog.title} - {blog.author}
      </h3>
      <div className="py-4 flex flex-col gap-2 border-b border-b-lime-300">
        <a href={blog.url}>
          <b>Url:</b> {blog.url}
        </a>
        <div className="inline-flex items-center gap-2">
          <div className="inline-flex items-center gap-1">
            <b>Likes:</b>
            {blog.likes}
          </div>
          <button
            onClick={() => like(blog)}
            className="rounded-lg border border-lime-900 px-4 py-1 bg-lime-900 text-lime-100 hover:text-lime-900 hover:bg-lime-100 hover:cursor-pointer transition-all duration-300 ease-in-out"
          >
            <svg
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12.444 1.35396C11.6474 0.955692 10.6814 1.33507 10.3687 2.16892L7.807 9.00001L4 9.00001C2.34315 9.00001 1 10.3432 1 12V20C1 21.6569 2.34315 23 4 23H18.3737C19.7948 23 21.0208 22.003 21.3107 20.6119L22.9773 12.6119C23.3654 10.7489 21.9433 9.00001 20.0404 9.00001H14.8874L15.6259 6.7846C16.2554 4.89615 15.4005 2.8322 13.62 1.94198L12.444 1.35396ZM9.67966 9.70225L12.0463 3.39119L12.7256 3.73083C13.6158 4.17595 14.0433 5.20792 13.7285 6.15215L12.9901 8.36755C12.5584 9.66261 13.5223 11 14.8874 11H20.0404C20.6747 11 21.1487 11.583 21.0194 12.204L20.8535 13H17C16.4477 13 16 13.4477 16 14C16 14.5523 16.4477 15 17 15H20.4369L20.0202 17H17C16.4477 17 16 17.4477 16 18C16 18.5523 16.4477 19 17 19H19.6035L19.3527 20.204C19.2561 20.6677 18.8474 21 18.3737 21H8V10.9907C8.75416 10.9179 9.40973 10.4221 9.67966 9.70225ZM6 11H4C3.44772 11 3 11.4477 3 12V20C3 20.5523 3.44772 21 4 21H6V11Z"
                  fill="currentColor"
                ></path>
              </g>
            </svg>
          </button>
        </div>
        <div className="inline-flex items-center gap-2">
          <div className="inline-flex items-center gap-1">
            <b>Added by:</b>
            {blog.user.name}
          </div>
          {user && user.username === blog.user.username && (
            <button
              onClick={() => removeBlog(blog)}
              className="rounded-lg border border-lime-900 px-4 py-1 bg-lime-900 text-lime-100 hover:text-lime-900 hover:bg-lime-100 hover:cursor-pointer transition-all duration-300 ease-in-out"
            >
              Delete
            </button>
          )}
        </div>
      </div>

      <h4 className="pt-4 font-bold text-lg text-lime-900 pb-2">Comments:</h4>
      {blog.comments.length === 0 ? (
        <p className="italic">No comments yet.</p>
      ) : (
        <div className="flex flex-col gap-1">
          {blog.comments.map((comment) => (
            <div
              key={comment.id}
              className="rounded-lg border border-lime-900 py-1 px-2"
            >
              {comment.comment}
            </div>
          ))}
        </div>
      )}

      <form onSubmit={addComment} className="pt-4 inline-flex gap-2">
        <input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="border border-lime-900 rounded-lg bg-transparent px-2"
        />
        <button
          type="submit"
          className="rounded-lg border border-lime-900 px-4 py-1 bg-lime-900 text-lime-100 hover:text-lime-900 hover:bg-lime-100 hover:cursor-pointer transition-all duration-300 ease-in-out"
        >
          Add comment
        </button>
      </form>
    </div>
  )
}

export default BlogInfo
