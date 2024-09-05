import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/auth' // Fixed the URL: added '//' after 'http:'
});

export const googleAuth = (code) => api.get(`/google?code=${code}`); // Use template literals correctly
