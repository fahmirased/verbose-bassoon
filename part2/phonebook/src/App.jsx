import { useState, useEffect } from 'react';
import axios from 'axios'
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import personServices from './services/person'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState([])
  const [newNumber, setNewNumber] = useState([])
  const [search,setSearch] = useState ('')

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

  const addContact = (event) => {
    event.preventDefault()

    const nameExists = persons.some(
      (person) => person.name.toLowerCase() === newName.toLowerCase())
    
    const numberExists = persons.some(
      (person) => person.number === newNumber)
    
    if (nameExists) {
      alert(`${newName} is already added to phonebook`)
      return
    }

    if (numberExists) {
      alert(`${newNumber} is already added to phonebook`)
      return
    }

    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }
    personServices
      .create(personObject)
      .then(returnedPersons => {
        console.log(response)
        setPersons(persons.concat(returnedPersons))
        setNewName('')
        setNewNumber('')
    })
  }

  const deleteContact = (id, name) => {
    console.log('delete contact called')
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