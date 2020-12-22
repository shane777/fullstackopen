
import axios from 'axios';

const getAllPersons = () => axios.get('http://localhost:3001/persons').then(res => res.data);
const createPerson = ( changedObj ) => {
  const request = axios.post('http://localhost:3001/persons', changedObj);
  return request.then(res => res.data);
}
const deletePerson = (id) => {
  return axios.delete(`http://localhost:3001/persons/${id}`).then(res => res.data);
}
const updatePerson = (id, person) => {
  return axios.put(`http://localhost:3001/persons/${id}`, person).then(res => res.data);
}


export default { 
  getAllPersons, 
  createPerson,
  deletePerson,
  updatePerson
}