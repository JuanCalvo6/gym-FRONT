import axios from './axios.js'

export const darBajaRutinaRequest = async(id) =>{
    const res = await axios.patch(`/rutinas/${id}/baja`);
    
    return res;
}

export const darAltaRutinaRequest = async(id) =>{
    const res = await axios.patch(`/rutinas/${id}/alta`);
    
    return res;
}

export const eliminarRutinaRequest = async(id) =>{
    const res = await axios.delete(`/rutinas/${id}/`);

    return res;
}

export const modificarRutinaRequest = async(rutina)=>{
    const res = await axios.put(`/rutinas/${rutina.idRutina}`, rutina);

    return res;
}