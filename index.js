const express = require('express')
const morgan = require('morgan')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose');

const password = "..."

const url = `mongodb+srv://fahmirased:${password}@fullstackopen.rfmu2fp.mongodb.net/personApp?retryWrites=true&w=majority`;

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

const phonebookSchema = new mongoose.Schema({
  name: String,
  number: String,
  id: Number,
})

const Person = mongoose.model('Person', phonebookSchema);

const addEntry = (name, number) => {
  // Check if an entry with the same name and number already exists
  Person.findOne({ name: name, number: number })
    .then(existingEntry => {
      if (existingEntry) {
        console.log(`Entry already exists: ${name} - ${number}`);
        mongoose.connection.close();
      } else {
        // Add the entry if it doesn't exist
        const entry = new Person({
          name: name,
          number: number,
        });

        entry.save().then(() => {
          console.log(`Entry added: ${name} - ${number}`);
          mongoose.connection.close();
        })
        .catch(error => {
          console.error('Error adding entry:', error);
          mongoose.connection.close();
        });
      }
    })
    .catch(error => {
      console.error('Error checking for existing entry:', error);
      mongoose.connection.close();
    });
};

const listEntries = () => {
  Person.find({})
    .then(entries => {
      console.log('Phonebook entries:');
      entries.forEach(entry => {
        console.log(`${entry.name} - ${entry.number}`);
      });
      mongoose.connection.close();
    })
    .catch(error => {
      console.error('Error listing entries:', error);
      mongoose.connection.close();
    });
};

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:', request.path)
  console.log('Body:', request.body)
  console.log('---')
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({error: 'unknown endpoint'})
}

app.use(cors())
app.use(express.json())
app.use(requestLogger)
app.use(express.static('dist'))


let persons = [
    {
        "name": "Arto Hellas",
        "number": "040-123456",
        "id": 1
      },
      {
        "name": "Ada Lovelace",
        "number": "39-44-5323523",
        "id": 2
      },
      {
        "name": "Dan Abramov",
        "number": "12-43-234345",
        "id": 3
      },
      {
        "name": "Mary Poppendieck",
        "number": "39-23-6423122",
        "id": 4  }
]

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    console.log(id)
    const person = persons.find(person => person.id === id)
    console.log(person)

    if (person) {
        response.json(person)
    } else {
        response.status(404).end('Not Found')
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
    
    response.status(204).end()
  })

const generateId = () => {
  const maxId = persons.length > 0
  ? Math.max(...persons.map(n => n.id))
  : 0
  return maxId + 1
}

app.post('/api/persons', (request, response) => {
    const body = request.body
    
    if (!body.name || !body.number) {
        return response.status(400).json({
            error: 'Name or number is missing'
        })
    }

    const nameExists = persons.some(person => person.name === body.name)
    if (nameExists) {
        return response.status(400).json({
            error: 'Name must be unique'
        })
    }

    const newPerson = {
        id: generateId(),
        name: body.name,
        number: body.number
    }

    persons = persons.concat(newPerson)
    response.json(newPerson)
})

app.get('/info', (request, response) => {
    const time = new Date()
    const numberOfEntries = persons.length
    
    const text = `<p>Phonebook has ${numberOfEntries} people<p/><p>${time}</p>` 

    response.send(text)
})

app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})