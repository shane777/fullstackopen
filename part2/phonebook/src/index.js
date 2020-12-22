import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import PersonRequest from './request';


const NumberBook = ({ persons, setPersons }) => {
  const onDeletePerson = (person) => {
    if(window.confirm(`Delete ${person.name} ?`)){
      PersonRequest.deletePerson(person.id).then(()=>{
        setPersons(persons.filter(p => p.id !== person.id));
      });
    }
  }

  return persons.map(person=> 
    (
      <div key={person.name}>
        <span>{ person.name } </span>  
        <span>{ person.number } </span>  
        <button onClick={()=> onDeletePerson(person)}>delete</button>
      </div>
    )
  );
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
    if(!newName ) return alert('Please input name');
    if(!newPhoneNumber ) return alert('Please input phone number  ');
    const personCheckIndex = persons.findIndex( a => a.name === newName)
    if( personCheckIndex !== -1 ){
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
        PersonRequest
          .updatePerson( personCheckIndex + 1, { ...persons[personCheckIndex], number: newPhoneNumber})
          .then((res)=> {
            console.log('res: ', res);
            const jsonStr = JSON.stringify(persons);
            const target = JSON.parse(jsonStr);
            target[personCheckIndex] = res;
            setPersons(target);
            setNewName('');
            setNewPhoneNumber('');
          });
      }
    }else {
      PersonRequest.createPerson({ name: newName, number: newPhoneNumber })
      .then((newPerson)=> {
        setPersons(persons.concat(newPerson));
        setNewName('');
        setNewPhoneNumber('');
      })
    }
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
  const [persons, setPersons] = useState([]);
  const [ filterValue , setFilterValue ] = useState('');

  useEffect(()=> {
      PersonRequest.getAllPersons().then( persons => {
        setPersons(persons);
      });
  }, []);

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterValue={ filterValue } setFilterValue= {setFilterValue}/>
      <h2>Add a new</h2>
      <PersonForm  persons={persons}  setPersons={setPersons} />
      <h2>Numbers</h2>
      <NumberBook persons = { persons.filter( p => p.name.toLowerCase().includes(filterValue)) } setPersons={setPersons} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
