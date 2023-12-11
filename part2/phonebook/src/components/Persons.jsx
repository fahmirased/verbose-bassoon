import React from 'react';

const Persons = ({search, persons}) => {
    const searchPersons = persons.filter((person) =>
        person.name && person.name.toLowerCase().includes(search.toLowerCase()))

    return (
        <div>
        {searchPersons.map((person) => (
          <p key={person.id}>
            {person.name} {person.number}
          </p>
        ))
        }
      </div>
    )
}

export default Persons;