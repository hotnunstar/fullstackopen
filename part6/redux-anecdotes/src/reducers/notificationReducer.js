import { createSlice } from '@reduxjs/toolkit'

let timeoutId

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: { 
    setNotification(state, action) { return action.payload },
    clearNotification() { return '' } 
  }
})

export const { setNotification, clearNotification } = notificationSlice.actions

export const showNotification = (message, duration = 5) => (dispatch) => {
  dispatch(setNotification(message))

  if(timeoutId) clearTimeout(timeoutId)

  timeoutId = setTimeout(() => {
    dispatch(clearNotification())
  }, duration * 1000)
}

export default notificationSlice.reducer