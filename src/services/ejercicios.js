import axios from './axios.js'

export const listarEjerciciosRequest = async() =>{
    const res = await axios.get('/ejercicios');

    return res;
}