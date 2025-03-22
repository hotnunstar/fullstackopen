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
    <div>
      <h3>Users</h3>

      {users.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th></th>
              <th>
                <b>blogs created</b>
              </th>
            </tr>
          </thead>
          <tbody>
            {[...users].map((user) => (
              <tr key={user.id}>
                <td>
                  <Link to={`/users/${user.id}`}>{user.name}</Link>
                </td>
                <td>{user.blogs.length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No users available</p>
      )}
    </div>
  )
}

export default UserList
