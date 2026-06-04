import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || process.env.REACT_APP_API_URL || 'https://pta-squad-lucas-mendonca.onrender.com',
});

export default api;