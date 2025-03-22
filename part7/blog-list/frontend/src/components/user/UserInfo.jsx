import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

const UserInfo = () => {
  const { id } = useParams()
  const users = useSelector((state) => state.users)
  const user = users.find((u) => u.id === id)

  if (!user) {
    return <p>User not found</p>
  }

  return (
    <div>
      <h3>{user.name}</h3>
      <p>
        <strong>Blogs created:</strong>
      </p>
      {user.blogs.length > 0 ? (
        <ul>
          {user.blogs.map((blog) => (
            <li key={blog.id}>{blog.title}</li>
          ))}
        </ul>
      ) : (
        <p>
          <em>This user has not created any blogs yet.</em>
        </p>
      )}
    </div>
  )
}

export default UserInfo
