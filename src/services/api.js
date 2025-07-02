
import axios from "axios";

const api = axios.create({
    baseURL: 'https://api-cadastro-farmacias.onrender.com/'
})

export const viacep = axios.create({
    baseURL: 'https://viacep.com.br/ws/'
})

export const validarCnpj = axios.create({
    baseURL: 'https://publica.cnpj.ws/cnpj/'
})

export default api
