import axios from 'axios';
const token = localStorage.getItem('token');
console.log(token);

const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/',
    headers: {
        // Add any default headers if needed
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
    }
});

// Add any interceptors or additional configurations as required
// For example, you can add an interceptor to handle authentication headers

export default api;
