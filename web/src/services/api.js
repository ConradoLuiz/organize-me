import axios from 'axios';

const options = {
    baseURL: (process.env.TYPE == 'PROD') ? 'https://todo-mvc-c5999.herokuapp.com/' : 'http://localhost:5000'
}

const api = axios.create(options);

export default api;



