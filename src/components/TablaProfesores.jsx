import alta from '../assets/alta.png' 
import baja from '../assets/baja.png'
import edit from '../assets/edit.png'
import eliminar from '../assets/eliminar.png'

import { darBajaProfesorRequest, darAltaProfesorRequest, eliminarProfesorRequest } from '../services/profesores'

export default function TablaProfesores ({profesores, onClickModificar,datosProfesores}){

    const handleModificar = (dato) =>{
        onClickModificar(dato);
    }

    const handleBaja = async(id) =>{
        try {
            await darBajaProfesorRequest(id);
            datosProfesores();
        } catch (error) {
            console.log(error);
        }
    }

    const handleAlta = async(id) =>{
        try {
            await darAltaProfesorRequest(id);
            datosProfesores();
        } catch (error) {
            console.log(error);
        }
    }

    const handleEliminar = async(profesor) =>{
            const confirmar = window.confirm(`¿Esta seguro que quiere eliminar a ${profesor.nombres}?`);
            try {
                if(confirmar){
                    await eliminarProfesorRequest(profesor.idProfesor);
                    datosProfesores();
                }
            } catch (error) {
                console.log(error);
            }
            
        }

    return (
        <div className="border-2 max-h-100 overflow-auto">
            <div className="bg-white grid grid-cols-[3fr_2fr_2fr_3fr_3fr_3fr_4fr] text-center divide-x divide-gray-500 sticky top-0">
                    <div className="border-t-1 border-b-1 border-l-1">Nombre</div>
                    <div className="border-t-1 border-b-1 ">DNI</div>
                    <div className="border-t-1 border-b-1 ">Telefono</div>
                    <div className="border-t-1 border-b-1 ">Dirección</div>
                    <div className="border-t-1 border-b-1 ">Mail</div>
                    <div className="border-t-1 border-b-1 ">Usuario</div>
                    <div className="border-t-1 border-b-1 border-r-1">Acción</div>
            </div>
            {profesores.map((profesor) =>(
                <div key={profesor.idProfesor} className={`${profesor.estado === 'B' ? 'text-gray-400' : 'text-black'} grid grid-cols-[3fr_2fr_2fr_3fr_3fr_3fr_4fr] text-center divide-x divide-gray-500`}>
                    <div className="px-2 border-b-1 border-l-1 text-left truncate">{profesor.apellidos}, {profesor.nombres}</div>
                    <div className="px-2 border-b-1 truncate ">{profesor.dni}</div>
                    <div className="px-2 border-b-1 truncate " title={profesor.telefono}>{profesor.telefono}</div>
                    <div className="px-2 border-b-1 truncate " title={profesor.direccion}>{profesor.direccion}</div>
                    <div className="px-2 border-b-1 truncate" title={profesor.mail}>{profesor.mail}</div>
                    <div className="px-2 border-b-1 truncate">{profesor.usuario}</div>
                    <div className="px-1 border-b-1 border-r-1 grid grid-cols-3 justify-between">
                        <button onClick={()=>handleModificar(profesor)} className="cursor-pointer flex justify-center items-center">
                            <img  className="h-4 px-auto" src={edit} title="Editar Cliente" alt="Editar"/>
                        </button>
                        {profesor.estado === 'A' ?
                        <button onClick={()=>handleBaja(profesor.idProfesor)}  className="cursor-pointer flex justify-center items-center">
                            <img  className="h-4" src={baja} title="Dar Baja" alt="Baja"/>
                        </button>
                        :
                        <button onClick={()=>handleAlta(profesor.idProfesor)}  className="cursor-pointer flex justify-center items-center">
                            <img  className="h-4" src={alta} title="Dar Alta" alt="Alta"/>
                        </button>}
                        <button onClick={()=>handleEliminar(profesor)} className="cursor-pointer flex justify-center items-center">
                            <img  className="h-4" src={eliminar} title="Eliminar" alt="Eliminar"/>
                        </button>
                    </div>
            </div>
            ))}     
        </div>
    )
}