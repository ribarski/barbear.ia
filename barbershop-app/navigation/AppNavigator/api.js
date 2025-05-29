import axios from 'axios';

const api = axios.create({
  baseURL: 'http://10.32.85.57:5000/api', // IP local do seu PC
});

export default api;
