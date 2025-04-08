import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const UserInfo = () => {
  const { id } = useParams()
  const users = useSelector((state) => state.users)
  const user = users.find((u) => u.id === id)

  if (!user) {
    return <p>User not found</p>
  }

  return (
    <div className="mx-auto min-w-96 bg-lime-100 border border-lime-900 w-fit p-4 rounded-lg">
      <h3 className="pb-4 border-b border-b-lime-300 text-xl font-bold text-center text-lime-700">
        {user.name}
      </h3>
      <p className="pt-4 font-bold text-lg text-lime-900">Blogs created:</p>
      {user.blogs.length > 0 ? (
        <div className="pt-4 flex flex-col gap-2">
          {user.blogs.map((blog) => (
            <Link key={blog.id} to={`/blogs/${blog.id}`}>
              <div className="rounded-lg border border-amber-700 py-2 px-4 bg-amber-700 text-lime-100 hover:text-amber-700 hover:bg-lime-100 transition-all duration-300 ease-in-out">
                <h4>{blog.title}</h4>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p className="italic">This user has not created any blogs yet.</p>
      )}
    </div>
  )
}

export default UserInfo
