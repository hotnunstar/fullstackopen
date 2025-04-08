import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setUsers } from '../../reducers/userReducer'
import { showNotification } from '../../reducers/notificationReducer'
import userService from '../../services/users'
import { Link } from 'react-router-dom'

const UserList = () => {
  const dispatch = useDispatch()
  const users = useSelector((state) => state.users)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const users = await userService.getAll()
        dispatch(setUsers(users))
      } catch (error) {
        dispatch(
          showNotification(
            'An error occurred while loading users, please try again',
            'error',
            10
          )
        )
      }
    }
    fetchUsers()
  }, [dispatch])

  return (
    <div className="mx-auto min-w-96 bg-lime-100 border border-lime-900 w-fit p-4 rounded-lg">
      <h3 className="text-xl font-bold text-center text-lime-700 pb-4">
        Users
      </h3>

      {users.length > 0 ? (
        <table className="table-auto w-full border border-collapse border-lime-300">
          <thead>
            <tr>
              <th className="text-start border border-lime-300 px-4 py-2">
                Name
              </th>
              <th className="text-start border border-lime-300 px-4 py-2">
                Blogs created
              </th>
            </tr>
          </thead>
          <tbody>
            {[...users].map((user) => (
              <tr key={user.id}>
                <td className="border border-lime-300 px-4 py-2">
                  <Link to={`/users/${user.id}`}>{user.name}</Link>
                </td>
                <td className="border border-lime-300 px-4 py-2">
                  {user.blogs.length}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="pt-4 text-center italic">No users available</p>
      )}
    </div>
  )
}

export default UserList
