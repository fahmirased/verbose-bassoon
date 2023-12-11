import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState([])
  const [newNumber, setNewNumber] = useState([])
  const [search,setSearch] = useState ('')

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
    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')
  }

  const searchPersons = persons.filter((person) =>
  person.name && person.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with <input
        value = {search}
        onChange={(event) => setSearch(event.target.value)}
        />
      </div>
      <h2>add a new</h2>
      <form onSubmit={addContact}>
        <div>
          name: 
          <input 
          value={newName} 
          onChange={(event) => setNewName(event.target.value)} 
          />
        </div>
        <div>
          number:
          <input
          value={newNumber}
          onChange={(event) => setNewNumber(event.target.value)}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {searchPersons.map((person) => (
          <p key={person.id}>
            {person.name} {person.number}
          </p>
        ))
        }
      </div>
    </div>
  )
}

export default App