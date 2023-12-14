import React from 'react';


const Person = ({person, onDelete}) =>
  <div>
    <p>
      {person.name} {person.number}
      <button onClick={() => onDelete(person.id, person.name)}>Delete
      </button>
    </p>
  </div>

const Persons = ({search, persons, onDelete}) => {
  const searchPerson = search
  ? persons.filter((person) =>
      person.name.toLowerCase().includes(search.toLowerCase())
    )
  : persons

    return (
        <div>
        {searchPerson.map((person) => (
          <Person key={person.id} person={person} onDelete={onDelete} />
        ))
        }
      </div>
    )
}

export default Persons;