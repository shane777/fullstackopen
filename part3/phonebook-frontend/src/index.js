import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import PersonRequest from './request';
import PersonForm from './PersonForm';
import NumberBook from './NumberBook';
import './index.css';

const Notification = ({ message, extraClass }) => {
  if (message === null || !message) {
    return null
  }

  return (
    <div className={`basic ${extraClass}`}>
      {message}
    </div>
  )
}

const Filter = ({ filterValue, setFilterValue }) => {
  const onFilterChange = e => {
    e.preventDefault(); 
    const newFilterValue = e.target.value;
    setFilterValue(newFilterValue);
  }

  return (
    <div>
      <span>filter shown with</span> 
      <input value={ filterValue } onChange={ onFilterChange } />
    </div>
  )
};


const App = () => {
  const [persons, setPersons] = useState([]);
  const [ filterValue , setFilterValue ] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [extraClass, setExtraClass] = useState('');
  useEffect(()=> {
      PersonRequest.getAllPersons().then( persons => {
        setPersons(persons);
      });
  }, []);

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} extraClass={extraClass} />
      <Filter filterValue={ filterValue } setFilterValue= {setFilterValue}/>
      <h2>Add a new</h2>
      <PersonForm  persons={persons}  setPersons={setPersons}  setErrorMessage={setErrorMessage} setExtraClass={setExtraClass}/>
      <h2>Numbers</h2>
      <NumberBook persons = { persons.filter( p => p.name.toLowerCase().includes(filterValue)) } setPersons={setPersons} setErrorMessage={setErrorMessage}/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
