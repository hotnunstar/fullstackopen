import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import UserList from './components/UsersList'
import BlogForm from './components/Blog/BlogForm'
import BlogList from './components/Blog/BlogList'
import { handleLogout, login } from './reducers/authReducer'

import blogService from './services/blogs'
import userService from './services/users'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.auth)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('userLoggedBlogApp')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(login(user))
      blogService.setToken(user.token)
      userService.setToken(user.token)
    }
  }, [dispatch])

  return (
    <div>
      <Notification />
      {user === null ? (
        <LoginForm />
      ) : (
        <div>
          <p>
            {user.name} logged-in{' '}
            <button onClick={() => dispatch(handleLogout())}>Logout</button>
          </p>
          <UserList />
          <BlogForm />
          <BlogList user={user} />
        </div>
      )}
    </div>
  )
}

export default App
