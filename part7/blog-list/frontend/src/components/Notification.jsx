import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector((state) => state.notification)

  return notification && notification.type !== '' ? (
    <div
      className={`z-10 fixed top-2 right-2 w-fit text-base rounded-lg border p-4 ${notification.type == 'error' ? 'border-red-900 bg-red-100 text-red-900' : 'border-green-900 bg-green-100 text-green-900'}`}
    >
      {notification.message}
    </div>
  ) : null
}

export default Notification
