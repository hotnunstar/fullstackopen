import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import personsService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterValue, setFilterValue] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [type, setType] = useState('')
  const personsToShow = persons.filter(person => person.name.toLowerCase().includes(filterValue.toLowerCase()))

  useEffect(() => {
    personsService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addName = (event) => {
    event.preventDefault()
    const nameObject = {
      id: (persons.length + 1).toString(),
      name: newName,
      number: newNumber,
    }

    if (persons.some(person => person.name === nameObject.name)) {
      const person = persons.find(p => p.name === nameObject.name);
      const personID = person.id;

      if (window.confirm(`${nameObject.name} is already added to phonebook, replace the old number with a new one?`)) {
        personsService
          .update(personID, nameObject)
          .then(returnedPerson => {
            setPersons(persons.map(p => p.id !== personID ? p : returnedPerson))
            setType('success')
            setNotificationMessage(`${nameObject.name}'s phone number has been updated`)
            setTimeout(() => { setNotificationMessage(null) }, 5000)
          })
          .catch(error => {
            setType('error')
            setNotificationMessage(`An error occurred updating the number of ${nameObject.name}`)
            setTimeout(() => { setNotificationMessage(null) }, 5000)
          })
        setNewName('')
        setNewNumber('')
      }
    }
    else {
      personsService
        .create(nameObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
          setType('success')
          setNotificationMessage(`Added ${nameObject.name}`)
          setTimeout(() => { setNotificationMessage(null) }, 5000)
        })
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterValue = (event) => {
    setFilterValue(event.target.value)
  }

  const deletePerson = id => {
    const person = persons.find(p => p.id === id)
    if (window.confirm(`Do you really want to delete ${person.name}?`)) {
      personsService
        .personDelete(person.id)
        .then(response => {
          personsService
            .getAll()
            .then(initialPersons => {
              setPersons(initialPersons)
            })
          setType('success')
          setNotificationMessage(`${person.name} has been deleted`)
          setTimeout(() => { setNotificationMessage(null) }, 5000)
        })
        .catch(error => {
          setType('error')
          setNotificationMessage(`Information of ${person.name} has already been removed from the server`)
          setTimeout(() => { setNotificationMessage(null) }, 5000)
          personsService
            .getAll()
            .then(initialPersons => {
              setPersons(initialPersons)
            })
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification type={type} message={notificationMessage} />
      <Filter value={filterValue} onChange={handleFilterValue}></Filter>
      <h3>Add a new</h3>
      <PersonForm onSubmit={addName} newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} ></PersonForm>
      <h3>Numbers</h3>
      <Persons personsToShow={personsToShow} deletePerson={deletePerson}></Persons>
    </div>
  )
}

export default App