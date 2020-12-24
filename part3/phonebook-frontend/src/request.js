
import axios from 'axios';
const basicUrl = '/api'

const getAllPersons = () => axios.get(`${basicUrl}/persons`).then(res => res.data);
const createPerson = ( changedObj ) => {
  const request = axios.post(`${basicUrl}/persons`, changedObj);
  return request.then(res => res.data);
}
const deletePerson = (id) => {
  return axios.delete(`${basicUrl}/persons/${id}`);
}
const updatePerson = (id, person) => {
  return axios.put(`${basicUrl}/persons/${id}`, person).then(res => res.data);
}


export default { 
  getAllPersons, 
  createPerson,
  deletePerson,
  updatePerson
}