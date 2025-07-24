import { useParams } from "react-router-dom"
import { obtenerRutinaRequest } from "../../services/clientes";
import { useEffect, useState } from "react";

export default function LineasDeRutina () {
    const {id, idRutina} =  useParams();
    const [rutina, setRutina] = useState([])
    
    const datosRutina = async() =>{
        try {
            const res = await obtenerRutinaRequest({id, idRutina});
            setRutina(res.data[0]);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        datosRutina();
    }, [])

    return(
        <div>
            <div className='mx-4 mt-2 mb-8'>
                        Rutina: {rutina.nombre}
            </div>
        </div>
    )
}