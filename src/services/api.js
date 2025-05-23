
// https://api-cadastro-farmacias.onrender.com/

import axios from "axios";

const api = axios.create({
    baseURL: 'https://api-cadastro-farmacias.onrender.com/'
})

export default api
