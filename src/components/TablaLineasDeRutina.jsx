import edit from '../assets/edit.png'
import eliminar from '../assets/eliminar.png'

import { mayusWords } from '../utils/mayus'

export default function TablaLineasDeRutina ({lineasRutina, erroresLineas, onclickModificar, onClickEliminar}){

    const handleEditar = (dato) =>{
        onclickModificar(dato);
    }

    const handleDelete = (dato)=>{
        onClickEliminar(dato);
    }

    return (
        <div>
            <div className="border-2 w-5/6 max-h-100 overflow-auto mx-4 mb-4">
            {lineasRutina.length === 0 ?
            (<div>{erroresLineas.message}</div> ) : 
            (<div className="bg-white grid grid-cols-5 text-center divide-x divide-gray-500 sticky top-0">
                <div className="border-t-1 border-b-1 border-l-1">Ejercicio</div>
                <div className="border-t-1 border-b-1 ">Repeticiones</div>
                <div className="border-t-1 border-b-1 ">Series</div>
                <div className="border-t-1 border-b-1 ">Descanso</div>
                <div className="border-t-1 border-b-1 border-r-1">Accion</div>
            </div>
            )}
            {lineasRutina?.map((lineaRutina)=>(
                <div key={lineaRutina.idLineaDeRutina} className={`grid grid-cols-5 text-center divide-x divide-gray-500`}>
                    <div className="px-2 border-b-1 border-l-1 truncate">{mayusWords(lineaRutina.ejercicio)}</div>
                    <div className="px-2 border-b-1 truncate ">{lineaRutina.repeticiones}</div>
                    <div className="px-2 border-b-1 truncate ">{lineaRutina.series}</div>
                    <div className="px-2 border-b-1 truncate ">{lineaRutina.descanso}</div>
                    <div className="px-1 border-b-1 border-r-1 grid grid-cols-2 justify-between">
                        <button onClick={()=>handleEditar(lineaRutina)} className="cursor-pointer flex justify-center items-center">
                            <img  className="h-4 px-auto" src={edit} title="Editar Ejercicio" alt="Editar"/>
                        </button>
                        <button  className="cursor-pointer flex justify-center items-center">
                            <img onClick={()=>handleDelete(lineaRutina)} className="h-4" src={eliminar} title="Eliminar" alt="Eliminar"/>
                        </button>
                    </div>
                </div>
            ))}
            </div>
        </div>
    )
}