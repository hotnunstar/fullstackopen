import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Routes, Route, Link } from 'react-router-dom'

import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import UserList from './components/user/UserList'
import UserInfo from './components/user/UserInfo'
import BlogForm from './components/blog/BlogForm'
import BlogList from './components/blog/BlogList'
import BlogInfo from './components/blog/BlogInfo'
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
    }
  }, [dispatch])

  useEffect(() => {
    if (user && user.token) {
      blogService.setToken(user.token)
      userService.setToken(user.token)
    }
  }, [user])

  return (
    <div>
      {user === null ? (
        <LoginForm />
      ) : (
        <div>
          <Notification />
          <div>
            <Link to="/blogs">Blogs</Link>
            <Link to="/users">Users</Link>
            <p>
              {user.name} logged-in{' '}
              <button onClick={() => dispatch(handleLogout())}>Logout</button>
            </p>
          </div>

          <Routes>
            <Route path="/" element={<BlogList user={user} />} />
            <Route path="/users" element={<UserList />} />
            <Route path="/blogs" element={<BlogList user={user} />} />
            <Route path="/blogs/new" element={<BlogForm />} />
            <Route path="/users/:id" element={<UserInfo />} />
            <Route path="/blogs/:id" element={<BlogInfo />} />
          </Routes>
        </div>
      )}
    </div>
  )
}

export default App
