const Notification = ({ type, message }) => {
    if (message === null) return null
    return type == 'success' ? <div className='success'>{message}</div> : <div className='error'>{message}</div>
}

export default Notification