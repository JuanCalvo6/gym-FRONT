import alta from '../assets/alta.png' 
import baja from '../assets/baja.png'
import edit from '../assets/edit.png'
import eliminar from '../assets/eliminar.png'
import rutinaImg from '../assets/rutina.png'

import { darBajaRutinaRequest, darAltaRutinaRequest, eliminarRutinaRequest } from '../services/rutinas'
import { useNavigate } from 'react-router-dom'

export default function TablaRutinas ({rutinas, datosRutinas, idCliente, onClickModificar}){
    const navigate = useNavigate();

    const handleEditar = (rutina)=>{
        onClickModificar(rutina)
    }

    const handleLineasRutina = (id)=>{
        navigate(`${id}/lineasDeRutina`)
    }

    const handleDarBaja = async(id)=>{
        try {
            await darBajaRutinaRequest(id);
            datosRutinas(idCliente);
        } catch (error) {
            console.log(error)
        }
    }

    const handleDarAlta = async(id)=>{
        try {
            await darAltaRutinaRequest(id);
            datosRutinas(idCliente);
        } catch (error) {
            console.log(error)
        }
    }

    const handleEliminar = async(id)=>{
       const confirmar = window.confirm("¿Está seguro que desea eliminar la rutina?");
       try {
            if(confirmar){
                await eliminarRutinaRequest(id);
                datosRutinas(idCliente);
        }
       } catch (error) {
            console.log(error);
       }

    }

    return (
        <div className="border-2 w-5/6 max-h-100 overflow-auto mx-4 mb-4">
            {rutinas.length === 0 ?
            (<div>El Cliente no tiene Rutinas</div> ) : 
            (<div className="bg-white grid grid-cols-4 text-center divide-x divide-gray-500 sticky top-0">
                <div className="border-t-1 border-b-1 border-l-1">Nombre</div>
                <div className="border-t-1 border-b-1 ">Observaciones</div>
                <div className="border-t-1 border-b-1 ">Estado</div>
                <div className="border-t-1 border-b-1 ">Accion</div>
            </div>
            )}
            {rutinas?.map((rutina)=>(
                <div key={rutina.idRutina} className={`${rutina.estado === 'B' ? 'text-gray-400' : 'text-black'} grid grid-cols-4 text-center divide-x divide-gray-500`}>
                    <div className="px-2 border-b-1 border-l-1 truncate">{rutina.nombre}</div>
                    <div className="px-2 border-b-1 truncate ">{rutina.observaciones}</div>
                    <div className="px-2 border-b-1 truncate ">{rutina.estado}</div>
                    <div className="px-1 border-b-1 border-r-1 grid grid-cols-4 justify-between">
                        <button onClick={()=>handleEditar(rutina)} className="cursor-pointer flex justify-center items-center">
                            <img  className="h-4 px-auto" src={edit} title="Editar Rutina" alt="Editar"/>
                        </button>
                        <button onClick={()=>handleLineasRutina(rutina.idRutina)} className="cursor-pointer flex justify-center items-center">
                            <img  className="h-4 px-auto" src={rutinaImg} title="Lineas de Rutina" alt="Lineas de Rutina"/>
                        </button>
                        {rutina.estado === 'A' ?
                        <button onClick={()=>handleDarBaja(rutina.idRutina)} className="cursor-pointer flex justify-center items-center">
                            <img  className="h-4" src={baja} title="Dar Baja" alt="Baja"/>
                        </button>
                        :
                        <button onClick={()=>handleDarAlta(rutina.idRutina)} className="cursor-pointer flex justify-center items-center">
                            <img  className="h-4" src={alta} title="Dar Alta" alt="Alta"/>
                        </button>}
                        <button onClick={()=>handleEliminar(rutina.idRutina)} className="cursor-pointer flex justify-center items-center">
                            <img  className="h-4" src={eliminar} title="Eliminar" alt="Eliminar"/>
                        </button>
                    </div>
                </div>
            ))}
        </div>
    )
}