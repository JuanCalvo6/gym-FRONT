import axios from './axios.js'

export const listarPasesRequest = async() =>{
    const res = await axios.get('/pases');

    return res;
};

export const nuevoPaseRequest = async(pase) =>{
    const res = await axios.post('/pases', pase);

    return res;
};

export const modificarPaseRequest = async(pase) =>{
    const res = await axios.put(`/pases/${pase.idPase}`, pase);

    return res;
}

export const darBajaPaseRequest = async(id) =>{
    const res = await axios.patch(`/pases/${id}/baja`);

    return res;
}

export const darAltaPaseRequest = async(id) =>{
    const res = await axios.patch(`/pases/${id}/alta`);

    return res;
}

export const eliminarPaseRequest = async(id) =>{
    const res = await axios.delete(`/pases/${id}`);

    return res;
}