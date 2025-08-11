import axios from './axios.js'

export const eliminarLineaRutinaRequest = async(id) =>{
    await axios.delete(`/lineasDeRutina/${id}`);
}

export const modificarLineaRutinaRequest = async(lineaRutina) =>{
    await axios.put(`/lineasDeRutina/${lineaRutina.idLineaDeRutina}`, lineaRutina)
}