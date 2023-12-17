const express = require('express')
const app = express()

app.use(express.json())

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

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
  })

app.get('/api/persons', (request, response) => {
    response.json(persons)
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
        id: Math.floor(Math.random()*10000),
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

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)