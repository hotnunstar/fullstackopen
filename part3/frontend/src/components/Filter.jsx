const Filter = ({ value, onChange }) => {
    return (
        <>
            Filter shown with
            <input type="text" value={value} onChange={onChange} />
        </>
    )
}

export default Filter