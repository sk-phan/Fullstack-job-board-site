import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  //  'Authorization': 'Bearer ' + localStorage.getItem('token')
  }
});

export default api;
