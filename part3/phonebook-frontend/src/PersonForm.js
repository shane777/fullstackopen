import React, { useState } from 'react'
import PersonRequest from './request';

const PersonForm = ({ persons, setPersons, setErrorMessage, setExtraClass }) => {
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
      PersonRequest
        .updatePerson(persons[personCheckIndex].id, { ...persons[personCheckIndex], number: newPhoneNumber})
        .then((res)=> {
          const jsonStr = JSON.stringify(persons);
          const target = JSON.parse(jsonStr);
          target[personCheckIndex] = res;
          setPersons(target);
          setNewName('');
          setNewPhoneNumber('');
        });
    }else {
      PersonRequest.createPerson({ name: newName, number: newPhoneNumber })
      .then((newPerson)=> {
        setPersons(persons.concat(newPerson));
        setNewName('');
        setNewPhoneNumber('');
        setExtraClass('success');
        setErrorMessage(`Added ${newPerson.name}`);
        setTimeout(()=>{
          setErrorMessage(null);
          setExtraClass('');
        }, 5000);
      })
      .catch(err => {
        console.log('err: ', err.response);
        setErrorMessage(err.response.data.error);
        setTimeout(()=>{
          setErrorMessage(null);
        }, 5000);
      });
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

export default PersonForm;
