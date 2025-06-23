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

export const crearClienteRequest = async(cliente)=>{
    const res = await axios.post('/clientes', cliente);

    return res;
}

export const modificarCLienteRequest = async(cliente)=>{
    const res = await axios.put(`/clientes/${cliente.idCliente}`, cliente);

    return res;
}