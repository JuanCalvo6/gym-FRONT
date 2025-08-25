import alta from '../assets/alta.png' 
import baja from '../assets/baja.png'
import edit from '../assets/edit.png'
import eliminar from '../assets/eliminar.png'
import { darBajaEjercicioRequest, darAltaEjercicioRequest, eliminarEjercicioRequest } from '../services/ejercicios'

export default function TablaEjercicios ({ejercicios, onClickModificar, datosEjercicios}){

    const handleModificar = (ejercicio) =>{
        onClickModificar(ejercicio);
    }

    const handleDarBaja = async(id) =>{
        try {
            await darBajaEjercicioRequest(id)
            datosEjercicios();
        } catch (error) {
            console.log(error);
        }
    }

    const handleDarAlta = async(id) =>{
        try {
            await darAltaEjercicioRequest(id)
            datosEjercicios();
        } catch (error) {
            console.log(error);
        }
    }

    const handleEliminar= async(ejercicio) =>{
        const confirmar = window.confirm(`¿Esta seguro que quiere eliminar el ejercicio: ${ejercicio.nombre}?`);
                try {
                    if(confirmar){
                        await eliminarEjercicioRequest(ejercicio.idEjercicio);
                        datosEjercicios();
                    }
                } catch (error) {
                    console.log(error);
                }
    }

    return (
        <div className="border-2 max-h-100 overflow-auto">  
            <div className="bg-white grid grid-cols-2 text-center divide-x divide-gray-500 sticky top-0">
                <div className="border-t-1 border-b-1 border-l-1">Nombre</div>
                <div className="border-t-1 border-b-1 border-r-1">Acción</div>
            </div>       
            {ejercicios.map((ejercicio) =>(
                <div key={ejercicio.idEjercicio} className={`${ejercicio.estado === 'B' ? 'text-gray-400' : 'text-black'} grid grid-cols-2  text-center divide-x divide-gray-500`}>
                    <div className="px-2 border-b-1 border-l-1 text-left truncate">{ejercicio.nombre}</div>
                    <div className="px-1 border-b-1 border-r-1 grid grid-cols-3 justify-between">
                        <button onClick={()=>handleModificar(ejercicio)}  className="cursor-pointer flex justify-center items-center">
                            <img  className="h-4 px-auto" src={edit} title="Editar Cliente" alt="Editar"/>
                        </button>
                        {ejercicio.estado === 'A' ?
                        <button onClick={()=>handleDarBaja(ejercicio.idEjercicio)} className="cursor-pointer flex justify-center items-center">
                            <img  className="h-4" src={baja} title="Dar Baja" alt="Baja"/>
                        </button>
                        :
                        <button onClick={()=>handleDarAlta(ejercicio.idEjercicio)} className="cursor-pointer flex justify-center items-center">
                            <img  className="h-4" src={alta} title="Dar Alta" alt="Alta"/>
                        </button>}
                        <button onClick={()=>handleEliminar(ejercicio)} className="cursor-pointer flex justify-center items-center">
                            <img  className="h-4" src={eliminar} title="Eliminar" alt="Eliminar"/>
                        </button>
                    </div>
            </div>
            ))}
                
        </div>
    )
}