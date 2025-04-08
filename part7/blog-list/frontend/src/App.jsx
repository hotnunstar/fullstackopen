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
    <div className="min-h-screen w-full h-full flex justify-center items-center">
      {user === null ? (
        <LoginForm />
      ) : (
        <div className="w-full">
          <div className="container mx-auto px-6">
            <Notification />

            <div className="fixed top-0 left-0 w-full py-4 bg-lime-100 rounded-lg border-b border-lime-900">
              <div className="container mx-auto px-6">
                <div className="flex flex-row gap-4 justify-between items-center">
                  <div className="inline-flex gap-4">
                    <Link
                      to="/blogs"
                      className="text-lime-900 font-bold underline"
                    >
                      Blogs
                    </Link>
                    <Link
                      to="/users"
                      className="text-lime-900 font-bold underline"
                    >
                      Users
                    </Link>
                  </div>
                  <div className="inline-flex items-center gap-4">
                    <p>{user.name} logged in</p>
                    <button
                      onClick={() => dispatch(handleLogout())}
                      className="rounded-lg border border-lime-900 px-4 py-1 bg-lime-900 text-lime-100 hover:text-lime-900 hover:bg-lime-100 hover:cursor-pointer transition-all duration-300 ease-in-out"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>
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
        </div>
      )}
    </div>
  )
}

export default App
