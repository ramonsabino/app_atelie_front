import axios from 'axios';

const api = axios.create({
  baseURL: 'https://app-atelie-back-1.onrender.com:5000', // Base URL do seu backend
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
