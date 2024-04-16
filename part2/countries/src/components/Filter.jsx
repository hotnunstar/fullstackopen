const Filter = ({ value, onChange }) => {
    return (
        <>
            <div>Find countries</div>
            <input type="text" value={value} onChange={onChange} />
        </>
    )
}

export default Filter