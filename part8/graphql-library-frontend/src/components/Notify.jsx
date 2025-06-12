import PropTypes from 'prop-types'

const Notify = ({ errorMessage }) => {
    if (!errorMessage) return null

    return (
        <div style={{ color: 'red' }}>
            {errorMessage}
        </div>
    )
}

Notify.propTypes = {
    errorMessage: PropTypes.any
}

export default Notify