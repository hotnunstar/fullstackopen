import { createSlice } from '@reduxjs/toolkit'
import { showNotification } from './notificationReducer'
import loginService from '../services/login'
import blogService from '../services/blogs'
import userService from '../services/users'

const authSlice = createSlice({
  name: 'auth',
  initialState: [],
  reducers: {
    login(state, action) {
      return action.payload
    },
    logout(state, action) {
      return null
    },
  },
})

export const { login, logout } = authSlice.actions

export default authSlice.reducer

export const handleLogin = (username, password) => async (dispatch) => {
  try {
    const user = await loginService.login({ username, password })
    window.localStorage.setItem('userLoggedBlogApp', JSON.stringify(user))
    dispatch(login(user))
    dispatch(showNotification('Login successful', 'success', 10))
  } catch (error) {
    dispatch(showNotification('Wrong username or password', 'error', 10))
  }
}

export const handleLogout = () => async (dispatch) => {
  try {
    window.localStorage.removeItem('userLoggedBlogApp')
    blogService.setToken(null)
    userService.setToken(null)
    dispatch(logout())
    dispatch(showNotification('Logout successful', 'success', 10))
  } catch (error) {
    dispatch(showNotification('Failed to logout', 'error', 10))
  }
}
