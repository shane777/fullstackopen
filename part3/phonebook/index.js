const express = require('express');
const morgan = require('morgan');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(express.static('build'));
morgan.token('body', (req, res) => JSON.stringify(req.body));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));
const Phonebook = require('./models/phonebook');

const phoneBookBodyValid = (req, res, next) => {
  const person = req.body;
  if (!person.name) {
    res.status(400).json({
      error: 'Missing name',
    }).end();
  } else if (!person.number) {
    res.status(400).json({
      error: 'Missing phone number',
    }).end();
  } else next();
};
// let persons = [
//   {
//     "name": "Arto Hellas",
//     "number": "040-123456",
//     "id": 1
//   },
//   {
//     "name": "Ada Lovelace",
//     "number": "39-44-5323523",
//     "id": 2
//   },
//   {
//     "name": "Dan Abramov",
//     "number": "12-43-234345",
//     "id": 3
//   }
// ];

// const getRandomId = ()=>{
//   return Math.floor(Math.random() * Math.floor(999999999));
// }

app.get('/api/persons', (req, res) => {
  Phonebook.find({}).then((phonebooks) => {
    res.json(phonebooks.map((phonebook) => phonebook.toJSON()));
  });
});

app.get('/api/info', (req, res) => {
  Phonebook.find({}).then((phonebooks) => {
    res.send(`<div>Phonebook has info for ${phonebooks.length} people </div><div>${new Date().toString()}</div>`);
  });
});

app.get('/api/persons/:id', (req, res) => {
  const { id } = req.params;
  Phonebook.findById(id).then((phonebook) => {
    if (phonebook) {
      res.json(phonebook);
    } else {
      res.status(404).end();
    }
  });
});

app.put('/api/persons/:id', phoneBookBodyValid, (req, res, next) => {
  const { id } = req.params;
  const { body } = req;
  const newPerson = {
    name: body.name,
    number: body.number,
  };
  Phonebook.findByIdAndUpdate(id, newPerson, { new: true }).then((person) => {
    res.json(person);
  }).catch((err) => next(err));
});

app.delete('/api/persons/:id', (req, res, next) => {
  const { id } = req.params;
  Phonebook.findByIdAndDelete(id).then(() => {
    res.status(204).end();
  }).catch((err) => next(err));
});

app.post('/api/persons', phoneBookBodyValid, (req, res, next) => {
  const person = req.body;
  const newPerson = new Phonebook({
    name: person.name,
    number: person.number,
  });
  newPerson.save().then((savedPerson) => {
    res.json(savedPerson);
  }).catch((err) => next(err));
});

const errorHandler = (error, request, response, next) => {
  console.log('err: ', error.message, error.kind, error.name);
  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return response.status(400).send({ error: 'malformatted id' });
  } if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  }
  return next(error);
};
app.use(errorHandler);

const unknownEndpoint = (re, rs) => {
  rs.status(404).send({ error: 'unknown endpoint ' });
};
app.use(unknownEndpoint);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
