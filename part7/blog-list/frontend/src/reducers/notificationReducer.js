import { createSlice } from '@reduxjs/toolkit'

let timeoutId

const notificationSlice = createSlice({
  name: 'notification',
  initialState: { message: '', type: '' },
  reducers: {
    setNotification(state, action) {
      return action.payload
    },
    clearNotification() {
      return { message: '', type: '' }
    },
  },
})

export const { setNotification, clearNotification } = notificationSlice.actions

export const showNotification =
  (message, type = 'success', duration = 5) =>
  (dispatch) => {
    dispatch(setNotification({ message, type }))

    if (timeoutId) clearTimeout(timeoutId)

    timeoutId = setTimeout(() => {
      dispatch(clearNotification())
    }, duration * 1000)
  }

export default notificationSlice.reducer
