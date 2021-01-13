const mongoose = require('mongoose');

const url = process.env.MONGODB_URI
mongoose.connect(url,  {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
 .then( res => {
   console.log('connected to mongobd', res);
 })
 .catch( err => {
   console.log('Error connecting to MongoDB', err.message);
 });

const phonebookSchema = new mongoose.Schema({
  name: String,
  number: String
});

phonebookSchema.set('toJSON', {
  transform: ( document, returnedObj ) => {
    returnedObj.id = returnedObj._id.toString();
    delete returnedObj._id;
    delete returnedObj.__v;
  }
});

module.exports = mongoose.model('Phonebook', phonebookSchema);
