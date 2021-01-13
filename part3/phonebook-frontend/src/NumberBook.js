import React from 'react'
import PersonRequest from './request';


const NumberBook = ({ persons, setPersons, setErrorMessage }) => {
  const onDeletePerson = (person) => {
    if(window.confirm(`Delete ${person.name} ?`)){
      PersonRequest
        .deletePerson(person.id)
        .then(()=>{
          setPersons(persons.filter(p => p.id !== person.id));
        })
        .catch((res)=>{
          setErrorMessage(`Imformation of ${person.name} is already been removed from server`);
          setTimeout(()=>{
            setErrorMessage(null);
          }, 5000);
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

export default NumberBook;