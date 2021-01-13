const mongoose = require('mongoose');

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>');
  process.exit(1);
}

const password = process.argv[2];
const url = `mongodb+srv://fullstackopen:${password}@sp1.rf405.mongodb.net/phonebook?retryWrites=true&w=majority`;
mongoose.connect(url, {
  useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true,
});

const phonebookSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Phonebook = mongoose.model('Phonebook', phonebookSchema);

const item = new Phonebook({
  name: 'Arto Hellas',
  number: '040-1242256',
});

item.save()
  .then(() => Phonebook.find({}))
  .then((res) => {
    res.forEach((phonebook) => {
      console.log(phonebook.name + phonebook.number);
    });
    mongoose.connection.close();
  })
  .catch((e) => console.log('e: ', e));
