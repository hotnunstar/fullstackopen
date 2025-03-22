import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Routes, Route } from 'react-router-dom'

import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import UserList from './components/user/UserList'
import UserInfo from './components/user/UserInfo'
import BlogForm from './components/blog/BlogForm'
import BlogList from './components/blog/BlogList'
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
          <Routes>
            <Route path="/users/:id" element={<UserInfo />} />
          </Routes>
          <BlogForm />
          <BlogList user={user} />
        </div>
      )}
    </div>
  )
}

export default App
