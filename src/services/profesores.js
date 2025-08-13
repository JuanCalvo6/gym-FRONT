import axios from './axios.js'

export const obtenerProfesoresRequest = async() =>{
    const res = await axios.get(`/profesores`);

    return res;
}

export const nuevoProfesorRequest = async(profesor) =>{
    const res = await axios.post(`/profesores`, profesor);

    return res;
}

export const modificarProfesorRequest = async(profesor) =>{
    const res = await axios.put(`/profesores/${profesor.idProfesor}`, profesor);

    return res;
}

export const darBajaProfesorRequest = async(id) =>{
    const res = await axios.patch(`/profesores/${id}/baja`);

    return res;
}

export const darAltaProfesorRequest = async(id) =>{
    const res = await axios.patch(`/profesores/${id}/alta`);

    return res;
}

export const eliminarProfesorRequest = async(id) =>{
    const res = await axios.delete(`/profesores/${id}`);

    return res;
}