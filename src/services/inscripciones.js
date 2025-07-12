import axios from './axios.js'

export const darBajaInscripcionRequest = async(id)=>{
    const res =  await axios.patch(`/inscripciones/${id}/baja`);

    return res;
}

export const darAltaInscripcionRequest = async(id)=>{
    const res =  await axios.patch(`/inscripciones/${id}/alta`);

    return res;
}

export const eliminarInscripcionRequest = async(id)=>{
    const res = await axios.delete(`/inscripciones/${id}`);

    return res;
}
