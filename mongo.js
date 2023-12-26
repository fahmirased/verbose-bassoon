const mongoose = require('mongoose');

if (process.argv.length < 3) {
  console.log('Usage: node mongo.js <password> [<name> <number>]');
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://fahmirased:${password}@fullstackopen.rfmu2fp.mongodb.net/personApp?retryWrites=true&w=majority`;

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

const phonebookSchema = new mongoose.Schema({
  name: String,
  number: String,
  id: Number,
});

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

const name = process.argv[3];
const number = process.argv[4];

if (name && number) {
  addEntry(name, number);
} else {
  listEntries();
}
