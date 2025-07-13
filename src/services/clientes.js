import axios from './axios.js'

export const listarClientesRequest = async(busqueda)=>{
        const res = await axios.get('/clientes', {
            params: {
                cadena: busqueda.buscar,
                incluirBajas: busqueda.incluirBajas
            }
        });
        return res;   
}

export const obtenerClienteRequest = async(id) =>{
    const res = await axios.get(`/clientes/${id}`);

    return res;
}

export const crearClienteRequest = async(cliente)=>{
    const res = await axios.post('/clientes', cliente);

    return res;
}

export const modificarCLienteRequest = async(cliente)=>{
    const res = await axios.put(`/clientes/${cliente.idCliente}`, cliente);

    return res;
}

export const darBajaClienteRequest = async(id)=>{
    const res = await axios.patch(`/clientes/${id}/baja`);

    return res;
}

export const darAltaClienteRequest = async(id)=>{
    const res = await axios.patch(`/clientes/${id}/alta`);

    return res;
}

export const eliminarClienteRequest = async(id)=>{
    const res = await axios.delete(`/clientes/${id}`)

    return res;
}

export const obtenerInscripcionesRequest = async(id, baja)=>{
    const res = await axios.get(`/clientes/${id}/inscripciones`, {
        params: {
                incluirBajas: baja
            }
    })
    
    return res;
}

export const crearInscripcionRequest = async(inscripcion)=>{
    const res =  await axios.post(`/clientes/${inscripcion.idCliente}/inscripciones`, inscripcion)

    return res;
}

export const obtenerAsistenciasRequest = async(id) =>{
    const res = await axios.get(`/clientes/${id}/asistencias`)

    return res;
}

export const crearAsistenciaRequest = async(id, fecha) =>{
    console.log(fecha);
    const res = await axios.post(`/clientes/${id}/asistencias`, {
        fecha: fecha
    });

    return res;
}