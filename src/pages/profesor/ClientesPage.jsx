import alta from '../../assets/alta.png' 
import asist from '../../assets/asist.png'
import baja from '../../assets/baja.png'
import edit from '../../assets/edit.png'
import eliminar from '../../assets/eliminar.png'
import inscripcion from '../../assets/inscripcion.png'
import rutina from '../../assets/rutina.png'
import { useEffect, useState } from "react";
import { useAuth } from "../../context/auth/useAuth"
import { listarClientesRequest } from "../../services/clientes";

export default function ClientesPage (){
    const [buscar, setBuscar] = useState('');
    const [incluirBajas, setIncluirBajas] = useState(false);
    const [clientes, setClientes] = useState([]);
    const {user} = useAuth();

    useEffect(()=>{
        const cargaInicial = async()=>{
            try {
               const res = await listarClientesRequest();
               await setClientes(res.data);
            } catch (error) {
                console.log(error);
            }
        }
        cargaInicial();
    },[])

    const handleSubmit = (event) =>{
        event.preventDefault();
        console.log(buscar, incluirBajas);
    }

    const handleNuevo = () =>{
        console.log("Crear un nuevo Cliente");
    }

    return (
        <div> 
            <h1 className="mt-2 mx-4 mb-8">Profesor/a: {user.nombre} </h1>
            <div className="flex  justify-between gap-4  mx-4 mb-6">
                <form onSubmit={handleSubmit} className="w-3/4 flex flex-row items-center gap-8">
                    <input 
                        className="w-1/2 pl-1 border border-gray-500 shadow-md" 
                        type="text"
                        value={buscar}
                        onChange={(e)=>setBuscar(e.target.value)} 
                    />
                    <div className=" flex items-center gap-1">
                        <input 
                            type="checkbox" 
                            name="baja" 
                            id="baja"
                            checked={incluirBajas}
                            onChange={(e)=>setIncluirBajas(e.target.checked)}
                        />
                        <label htmlFor="baja">Mostrar Bajas</label>
                    </div>
                    <button className="w-auto bg-red-800 text-white px-8 py-2  text-lg rounded-2xl self-center hover:cursor-pointer  transition hover:ring-2 hover:ring-red-900" type="submit">
                        BUSCAR
                    </button>
                </form>
                <button onClick={handleNuevo} className="w-auto bg-red-800 text-white px-8 py-2  text-lg rounded-2xl self-center hover:cursor-pointer  transition hover:ring-2 hover:ring-red-900" type="submit">
                    NUEVO
                </button>
            </div>
            <h2 className="mx-4 mb-2">Clientes:</h2>
            
            <div className="border-2 max-h-100 overflow-auto mx-4">
                {clientes.length === 0 ? 
                    (<div>No hay clientes con ese nombre</div>
                    ):
                    (<div className="bg-white grid grid-cols-2 md:grid-cols-[3fr_2fr_2fr_3fr_1fr_4fr] text-center divide-x divide-gray-500 sticky top-0">
                        <div className="border-t-1 border-b-1 border-l-1">Nombre</div>
                        <div className="border-t-1 border-b-1 hidden md:block">DNI</div>
                        <div className="border-t-1 border-b-1 hidden md:block">Telefono</div>
                        <div className="border-t-1 border-b-1 hidden md:block">Dirección</div>
                        <div className="border-t-1 border-b-1 hidden md:block">Estado</div>
                        <div className="border-t-1 border-b-1 border-r-1">Acción</div>
                    </div>
                )}
                {clientes.map((cliente,i) =>(
                    <div key={i} className={`${cliente.estado === 'B' ? 'text-gray-400' : 'text-black'} grid grid-cols-2 md:grid-cols-[3fr_2fr_2fr_3fr_1fr_4fr] text-center divide-x divide-gray-500`}>
                        <div className="px-2 border-b-1 border-l-1 text-left truncate">{cliente.apellidos}, {cliente.nombres}</div>
                        <div className="px-2 border-b-1 truncate hidden md:block">{cliente.dni}</div>
                        <div className="px-2 border-b-1 truncate hidden md:block">{cliente.telefono}</div>
                        <div className="px-2 border-b-1 truncate hidden md:block">{cliente.direccion}</div>
                        <div className="px-2 border-b-1 hidden md:block">{cliente.estado}</div>
                        <div className="px-1 border-b-1 border-r-1 grid grid-cols-7 justify-between">
                            <button className="cursor-pointer flex justify-center items-center">
                                <img  className="h-4 px-auto" src={edit} title="Editar Cliente" alt="Editar"/>
                            </button>
                            <button  className="cursor-pointer flex justify-center items-center">
                                <img  className="h-4" src={asist} title="Nueva Asistencia" alt="Asistencia"/>
                            </button>
                            <button  className="cursor-pointer flex justify-center items-center">
                                <img  className="h-4" src={inscripcion} title="Nueva Inscripcion" alt="Inscripcion"/>
                            </button>
                            <button  className="cursor-pointer flex justify-center items-center">
                                <img  className="h-4" src={rutina} title="Ver Rutinas" alt="Rutinas"/>
                            </button>
                            <button  className="cursor-pointer flex justify-center items-center">
                                <img  className="h-4" src={baja} title="Dar Baja" alt="Baja"/>
                            </button>
                            <button  className="cursor-pointer flex justify-center items-center">
                                <img  className="h-4" src={alta} title="Dar Alta" alt="Alta"/>
                            </button>
                            <button  className="cursor-pointer flex justify-center items-center">
                                <img  className="h-4" src={eliminar} title="Eliminar" alt="Eliminar"/>
                            </button>
                        </div>
                </div>
                ))}
            </div>
        </div>
    )
}