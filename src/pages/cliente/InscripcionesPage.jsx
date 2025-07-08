import alta from '../../assets/alta.png' 
import baja from '../../assets/baja.png'
import edit from '../../assets/edit.png'
import eliminar from '../../assets/eliminar.png'


import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { obtenerClienteRequest, obtenerInscripcionesRequest } from "../../services/clientes";
import BuscadorInscripcion from '../../components/BuscadorInscripcion';

export default function InscripcionesPage (){
    const {id} = useParams();
    const [cliente, setCliente] = useState(null);
    const [inscripciones, setInscripciones] = useState([]);

    const datosCliente = async(idCliente) =>{
        try {
            const res = await obtenerClienteRequest(idCliente);
            setCliente(res.data[0]);
        } catch (error) {
            console.log(error.response.data);
        }
    }

    const datosInscripciones = async(idCliente) =>{
        try {
            const res = await obtenerInscripcionesRequest(idCliente);
            setInscripciones(res.data);
        } catch (error) {
            console.log(error.response.data);
        }
    }

    useEffect(() =>{
        datosCliente(id);
        datosInscripciones(id);
    }, [id])

    return (
        <div>
            <div>
                {cliente ? (
                    <div className='mx-4 mt-2 mb-8'>
                        Cliente: {cliente.apellidos}, {cliente.nombres}
                    </div>
                ) : (
                    <div>Cargando datos del cliente...</div>
                )}
            </div>
            <BuscadorInscripcion />
            <div className="border-2 w-5/6 max-h-100 overflow-auto mx-4 mb-4">
                <div className="bg-white grid grid-cols-2 md:grid-cols-[3fr_2fr_2fr_3fr_1fr_4fr] text-center divide-x divide-gray-500 sticky top-0">
                        <div className="border-t-1 border-b-1 border-l-1">Inicio</div>
                        <div className="border-t-1 border-b-1 hidden md:block">Fin</div>
                        <div className="border-t-1 border-b-1 hidden md:block">Pase</div>
                        <div className="border-t-1 border-b-1 hidden md:block">Precio</div>
                        <div className="border-t-1 border-b-1 hidden md:block">Estado</div>
                        <div className="border-t-1 border-b-1 border-r-1">Acción</div>
                </div> 
                {inscripciones?.map((inscripcion) =>(
                    <div key={inscripcion.idInscripcion} className={`${inscripcion.estado === 'B' ? 'text-gray-400' : 'text-black'} grid grid-cols-2 md:grid-cols-[3fr_2fr_2fr_3fr_1fr_4fr] text-center divide-x divide-gray-500`}>
                        <div className="px-2 border-b-1 border-l-1 text-left truncate">{inscripcion.inicio}</div>
                        <div className="px-2 border-b-1 truncate hidden md:block">{inscripcion.fin}</div>
                        <div className="px-2 border-b-1 truncate hidden md:block">{inscripcion.idPase}</div>
                        <div className="px-2 border-b-1 truncate hidden md:block">{inscripcion.precio}</div>
                        <div className="px-2 border-b-1 hidden md:block">{inscripcion.estado}</div>
                        <div className="px-1 border-b-1 border-r-1 grid grid-cols-3 justify-between">
                            <button className="cursor-pointer flex justify-center items-center">
                                <img  className="h-4 px-auto" src={edit} title="Editar Cliente" alt="Editar"/>
                            </button>
                            {cliente.estado === 'A' ?
                            <button className="cursor-pointer flex justify-center items-center">
                                <img  className="h-4" src={baja} title="Dar Baja" alt="Baja"/>
                            </button>
                            :
                            <button className="cursor-pointer flex justify-center items-center">
                                <img  className="h-4" src={alta} title="Dar Alta" alt="Alta"/>
                            </button>}
                            <button className="cursor-pointer flex justify-center items-center">
                                <img  className="h-4" src={eliminar} title="Eliminar" alt="Eliminar"/>
                            </button>
                        </div>
                </div>
                ))}
                
            </div>
            <div className='flex justify-end mr-4'>
                <button className="w-auto  bg-red-800 text-white px-8 py-2  text-lg rounded-2xl self-center hover:cursor-pointer  transition hover:ring-2 hover:ring-red-900" type="submit">
                    ATRAS
                </button>
            </div>
        </div>
    )
}