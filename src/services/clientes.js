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