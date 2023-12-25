const mongoose = require('mongoose');

if (process.argv.length < 3) {
  console.log('Give password as an argument');
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://fahmirased:${password}@fullstackopen.rfmu2fp.mongodb.net/personApp?retryWrites=true&w=majority`;

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

const noteSchema = new mongoose.Schema({
  name: String,
  number: String,
  id: Number
});

const Person = mongoose.model('Person', noteSchema);

const persons = [
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
    "id": 4
  }
];

// Use the create method to save multiple documents
Person.create(persons)
  .then(results => {
    console.log('Persons saved:', results);
  })
  .catch(error => {
    console.error('Error saving persons:', error);
  })
  .finally(() => {
    mongoose.connection.close();
  });
