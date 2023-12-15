import { useState, useEffect } from 'react';
import axios from 'axios'
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import personServices from './services/person'
import Notification from './components/Notification';

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search,setSearch] = useState ('')
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    console.log('effect')
    personServices
      .getAll()
      .then(initialPersons => {
        console.log('promise fulfilled')
        setPersons(initialPersons)
      })
  }, [])
  console.log('render', persons.length, 'persons')

  const addContact = async (event) => {
    event.preventDefault()

    const nameExists = persons.find(
      (person) => person.name.toLowerCase() === newName.toLowerCase())

      if (!newName) {
        alert('Please enter a name')
        return
      }
      if (!newNumber) {
        alert('Please enter number')
        return
      }

      if (nameExists) {
        const confirmUpdate = window.confirm(
          `${newName} is already added to the phonebook, replace the old number with a new one?`
        )

        if (!confirmUpdate) {
          return
        }

        try {
          const updatePerson = await personServices.update(nameExists.id, {
            ...nameExists,
            number: newNumber
          })
          setPersons((prevPersons) =>
            prevPersons.map((person) =>
              person.id === nameExists.id ? updatePerson : person
            )
          )
          setNewName('')
          setNewNumber('')
          setNotification({
            type: 'success',
            message: `Number updated for ${newName}` 
          })
          setTimeout(() => {
            setNotification(null)
          }, 5000)
        } catch (error) {
          if (error.response && error.response.status === 404) {
            setNotification({
              type: 'error',
              message: `Information of ${newName} has already been removed from the server`
            }) 
            setTimeout(() => {
              setNotification(null)
            }, 5000)
            setNewName('')
            setNewNumber('')
          } else {
          console.error('Error updating contact:', error)
          }
        }
      } else {
        const numberExists = persons.some(
          (person) => person.number === newNumber)
    
        if (numberExists) {
          alert(`${newNumber} is already added to phonebook`)
          return
        }
    
        const personObject = {
          name: newName,
          number: newNumber,
          id: persons.length + 1
        }

        try {
          const returnedPersons = await personServices.create({
            name: newName,
            number: newNumber
          })
          setPersons((prevPersons) => prevPersons.concat(returnedPersons))
          setNewName('')
          setNewNumber('')
          setNotification ({
            type: 'success',
            message: `Added ${newName}`
          })
          setTimeout(() => {
            setNotification(null)
          }, 5000)
        } catch (error) {
          console.error('Error updating contact:', error)
        }
        }
      }
  

  const deleteContact = (id, name) => {
    console.log('deleteContact called')
    const confirmDelete = window.confirm(`Delete ${name}?`)
    console.log('confirmDelete:', confirmDelete)

    if (confirmDelete) {
      personServices
        .remove(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
        })
        .catch(error => {
          console.error('Error deleting contact:', error)
        })
    }
  }

  

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification 
      message= {notification} />
      <Filter
        search = {search}
        setSearch = {setSearch}
        />
      <h2>add a new</h2>
      <PersonForm 
        addContact = {addContact}
        newName = {newName}
        newNumber = {newNumber}
        setNewName = {setNewName}
        setNewNumber = {setNewNumber}
        /> 
      <h2>Numbers</h2>
      <Persons 
        search = {search}
        persons = {persons}
        onDelete = {deleteContact}
      />
    </div>
  )
}

export default App