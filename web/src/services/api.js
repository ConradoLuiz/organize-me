import axios from 'axios';

const options = {
    baseURL: (window.location.hostname == 'localhost') ? 'http://localhost:5000' : 'https://todo-mvc-c5999.herokuapp.com/',
    timeout: 15000,
}

const api = axios.create(options);

export default api;



