import axios from './axios.js'

export const listarClientesRequest = async()=>{
    try {
        const res = await axios.get('/clientes');
        return res;
    } catch (error) {
        console.log(error);
    }
}