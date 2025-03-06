import { createContext, useReducer, useContext } from 'react'

const NotificationContext = createContext()

const notificationReducer = (state, action) => {
	switch (action.type) {
		case 'SET_NOTIFICATION':
			return action.payload
		case 'CLEAR_NOTIFICATION':
			return ''
		default:
			return state
	}
}

export const NotificationContextProvider = (props) => {
	const [notification, notificationDispatch] = useReducer(notificationReducer, '')

	return (
		<NotificationContext.Provider value={[notification, notificationDispatch]}>
			{props.children}
		</NotificationContext.Provider>
	)
}

export const useNotificationState = () => {
	const context = useContext(NotificationContext);
	return context[0];
}

export const useNotificationDispatch = () => {
	const context = useContext(NotificationContext);
	return context[1];
}

export default NotificationContext;