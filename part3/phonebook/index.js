const express = require('express');
const morgan = require('morgan');

const app = express();
app.use(express.json());
app.use(express.static('build'));
morgan.token('body', (req, res) => JSON.stringify(req.body));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

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
  }
];

const getRandomId = ()=>{
  return Math.floor(Math.random() * Math.floor(999999999));
}

app.get('/api/persons', (req, res)=>{
  res.json(persons);
});

app.get('/api/info', (req, res) => {
  res.send(`<div>Phonebook has info for ${persons.length} people </div><div>${new Date().toString()}</div>`);
});
app.get('/api/persons/:id', (req,res)=>{
  const id = req.params.id;
  const person = persons.find(p => p.id == id);
  if(person){
    res.json(person)
  }else {
    res.status(404).end();
  }
})
app.delete('/api/persons/:id', (req, res)=>{
  const id = req.params.id;
  persons = persons.filter(p => p.id != id );
  console.log('persons: ', persons);
  res.status(200).end();
})

app.post('/api/persons', (req, res)=>{
  const person = req.body;
  if(!person.name){
    res.status(400).json({
      error: 'Missing name'
    });
    return;
  }else if(!person.number){
    res.status(400).json({
      error: 'Missing phone number'
    });
    return;
  }
  let newId = getRandomId();
  while(persons.some(p => p.id == newId)){ newId = getRandomId()};
  const newPerson = {
    id: newId,
    name: person.name,
    number: person.number,
    date: new Date()
  }
  persons = persons.concat(newPerson);
  res.json(newPerson);
})

app.get('/', (req, res)=>{
  res.send('<h1>Hello world</h1>');
})

const PORT = process.env.PORT || 3001

app.listen(PORT, ()=>{
  console.log(`server running on port ${PORT}`);
});