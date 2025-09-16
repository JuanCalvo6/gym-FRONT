import alta from '../assets/alta.png' 
import baja from '../assets/baja.png'
import edit from '../assets/edit.png'
import { darBajaPaseRequest, darAltaPaseRequest } from '../services/pases'
import { mayusWords } from '../utils/mayus'

export default function TablaPases ({pases, erroresPases, onClickModificar, datosPases}){

    const handleModificar = (pase) =>{
        onClickModificar(pase);
    }

    const handleDarBaja = async(id) =>{
        try {
            await darBajaPaseRequest(id);
            datosPases();
        } catch (error) {
            console.log(error)
        }
    }

    const handleDarAlta = async(id) =>{
        try {
            await darAltaPaseRequest(id);
            datosPases();
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="border-2 w-5/6 max-h-100 overflow-auto mb-4"> 
            {pases.length === 0 ? (
                <div> {erroresPases.message} </div>
            ):
            (
            <div className="bg-white grid grid-cols-2 md:grid-cols-[3fr_2fr_2fr_3fr_4fr] text-center divide-x divide-gray-500 sticky top-0">
                <div className="border-t-1 border-b-1 border-l-1">Nombre</div>
                <div className="border-t-1 border-b-1 hidden md:block">Inicio</div>
                <div className="border-t-1 border-b-1 hidden md:block">Fin</div>
                <div className="border-t-1 border-b-1 hidden md:block">Precio</div>
                <div className="border-t-1 border-b-1 border-r-1">Acción</div>
            </div>
            )} 
                   
            {pases.map((pase) =>(
                <div key={pase.idPase} className={`${pase.estado === 'b' ? 'text-gray-400' : 'text-black'} grid grid-cols-2 md:grid-cols-[3fr_2fr_2fr_3fr_4fr] text-center divide-x divide-gray-500`}>
                    <div className="px-2 border-b-1 border-l-1 text-left truncate">{mayusWords(pase.nombre)}</div>
                    <div className="px-2 border-b-1 truncate hidden md:block">{pase.horaInicio.slice(0,5)}</div>
                    <div className="px-2 border-b-1 truncate hidden md:block">{pase.horaFin.slice(0,5)}</div>
                    <div className="px-2 border-b-1 truncate hidden md:block">{pase.precio}</div>
                    <div className="px-1 border-b-1 border-r-1 grid grid-cols-2 justify-between">
                        <button onClick={()=>handleModificar(pase)}  className="cursor-pointer flex justify-center items-center">
                            <img  className="h-4 px-auto" src={edit} title="Editar Cliente" alt="Editar"/>
                        </button>
                        {pase.estado === 'a' ?
                        <button onClick={()=>handleDarBaja(pase.idPase)} className="cursor-pointer flex justify-center items-center">
                            <img  className="h-4" src={baja} title="Dar Baja" alt="Baja"/>
                        </button>
                        :
                        <button onClick={()=>handleDarAlta(pase.idPase)} className="cursor-pointer flex justify-center items-center">
                            <img  className="h-4" src={alta} title="Dar Alta" alt="Alta"/>
                        </button>}
                    </div>
            </div>
            ))}
                
        </div>
    )
}