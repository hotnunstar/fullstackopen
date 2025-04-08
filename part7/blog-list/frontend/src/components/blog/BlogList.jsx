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
    <div className="mx-auto min-w-96 bg-lime-100 border border-lime-900 w-fit p-4 rounded-lg">
      <div className="inline-flex items-center justify-between gap-4 pb-4 w-full border-b border-b-lime-300">
        <h3 className="text-xl font-bold text-center text-lime-700">Blogs</h3>
        <Link
          to="/blogs/new"
          className="inline-flex items-center gap-2 rounded-lg border border-lime-900 px-4 py-1 bg-lime-900 text-lime-100 hover:text-lime-900 hover:bg-lime-100 hover:cursor-pointer transition-all duration-300 ease-in-out"
        >
          <svg
            className="w-4 h-4"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g>
              <path
                d="M6 12H18M12 6V18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </g>
          </svg>
          Create
        </Link>
      </div>

      <div className="pt-4 flex flex-col gap-2">
        {[...blogs]
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            <Link key={blog.id} to={`/blogs/${blog.id}`}>
              <div className="rounded-lg border border-amber-700 py-2 px-4 bg-amber-700 text-lime-100 hover:text-amber-700 hover:bg-lime-100 transition-all duration-300 ease-in-out">
                <h4>{blog.title}</h4>
              </div>
            </Link>
          ))}
      </div>
    </div>
  )
}

export default BlogList
