import axios from './axios.js'

export const listarEjerciciosRequest = async(bajas) =>{
    console.log(bajas)
    const res = await axios.get('/ejercicios', {
        params: {bajas}
    });

    return res;
}

export const nuevoEjercicioRequest = async(ejercicio) =>{
    const res = await axios.post(`/ejercicios`, ejercicio);

    return res;
}

export const modificarEjercicioRequest = async(ejercicio) =>{
    const res = await axios.put(`/ejercicios/${ejercicio.idEjercicio}`, ejercicio);

    return res;
}

export const darBajaEjercicioRequest = async(id) =>{
    const res = await axios.patch(`/ejercicios/${id}/baja`);

    return res;
}

export const darAltaEjercicioRequest = async(id) =>{
    const res = await axios.patch(`/ejercicios/${id}/alta`);

    return res;
}

export const eliminarEjercicioRequest = async(id) =>{
    const res = await axios.delete(`/ejercicios/${id}`);

    return res;
}