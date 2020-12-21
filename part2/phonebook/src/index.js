import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const NumberBook = ({ persons }) => 
  persons.map(person=> 
    (
      <div key={person.name}>
        <span>{ person.name }</span>  <span>{ person.number }</span>
      </div>
    )
  );

const Filter = ({ filterValue, setFilterValue }) => {
  const onFilterChange = e => {
    e.preventDefault(); 
    const newFilterValue = e.target.value;
    setFilterValue(newFilterValue);
  }

  return (
    <div>
      <text>filter shown with</text> 
      <input value={ filterValue } onChange={ onFilterChange } />
    </div>
  )
};

const PersonForm = ({ persons, setPersons }) => {
  const [ newName, setNewName ] = useState('')
  const [ newPhoneNumber, setNewPhoneNumber] = useState('');

  const onNameChange = e =>{
    e.preventDefault(); 
    setNewName(e.target.value)
  }
  const onPhoneChange = e =>{
    e.preventDefault(); 
    setNewPhoneNumber(e.target.value)
  }
  const submitAction = ( e ) => {
    e.preventDefault(); 
    if(persons.some( a => a.name === newName)) return alert(`${newName} is already added to phonebook`);
    if(!newName ) return alert('Please input name');
    if(!newPhoneNumber ) return alert('Please input phone number  ');
    setPersons(persons.concat({ name: newName, number: newPhoneNumber }));
    setNewName('');
    setNewPhoneNumber('');
  }
  return (
    <form onSubmit={submitAction}>
      <div> name: <input value={ newName } onChange={ onNameChange } /></div>
      <div>number: <input value={ newPhoneNumber } onChange={ onPhoneChange } /></div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}


const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]);

  const [ filterValue , setFilterValue ] = useState('');

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterValue={ filterValue } setFilterValue= {setFilterValue}/>
      <h2>Add a new</h2>
      <PersonForm  persons={persons}  setPersons={setPersons} />
      <h2>Numbers</h2>
      <NumberBook persons = { persons.filter( p => p.name.toLowerCase().includes(filterValue)) } />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
