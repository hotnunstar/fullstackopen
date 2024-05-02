const Input = ({ text, value, onChange }) => {
    return(
        <div>{text}: <input value={value} onChange={onChange} /></div>
    )
}

const PersonForm = ({ onSubmit, newName, newNumber, handleNameChange, handleNumberChange }) => {
    return (
        <form onSubmit={onSubmit}>
            <Input text="name" value={newName} onChange={handleNameChange}></Input>
            <Input text="number" value={newNumber} onChange={handleNumberChange}></Input>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

export default PersonForm