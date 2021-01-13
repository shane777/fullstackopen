const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const url = process.env.MONGODB_URI;
mongoose.connect(url, {
  useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true,
})
  .then((res) => {
    console.log('connected to mongobd', res);
  })
  .catch((err) => {
    console.log('Error connecting to MongoDB', err.message);
  });

const phonebookSchema = mongoose.Schema({
  name: {
    type: String, require: true, unique: true, minlength: 3,
  },
  number: { type: String, require: true, minlength: 8 },
});

phonebookSchema.plugin(uniqueValidator);

phonebookSchema.set('toJSON', {
  transform: (document, returnedObj) => {
    returnedObj.id = returnedObj._id.toString();
    delete returnedObj._id;
    delete returnedObj.__v;
  },
});

module.exports = mongoose.model('Phonebook', phonebookSchema);
