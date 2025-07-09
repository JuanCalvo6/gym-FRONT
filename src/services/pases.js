import axios from './axios.js'

export const listarPasesRequest = async() =>{
    const res = await axios.get('/pases');

    return res;
}