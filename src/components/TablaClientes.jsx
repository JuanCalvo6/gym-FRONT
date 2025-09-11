import alta from '../assets/alta.png' 
import asist from '../assets/asist.png'
import baja from '../assets/baja.png'
import edit from '../assets/edit.png'
import inscripcion from '../assets/inscripcion.png'
import rutina from '../assets/rutina.png'
import { darAltaClienteRequest, darBajaClienteRequest } from '../services/clientes'
import { useNavigate } from 'react-router-dom'
import { mayus } from '../utils/mayus'

export default function TablaClientes ({clientes, errorClientes, setErrorClientes, onClickModificar, cargarClientes}){   
    const navigate = useNavigate();

    const handleEditar =(cliente) =>{
        onClickModificar(cliente);
    }

    const handleAsistencia = (cliente) =>{
        navigate(`/profesor/clientes/${cliente.idCliente}/asistencias`);
    }

    const handleInscripcion = (cliente) =>{
        navigate(`/profesor/clientes/${cliente.idCliente}/inscripciones`);
    }

    const handleRutina = (cliente) =>{
        navigate(`/profesor/clientes/${cliente.idCliente}/rutinas`);
    }

    const handleDarBaja = async(cliente) =>{
        try {
            await darBajaClienteRequest(cliente.idCliente);
            cargarClientes();
        } catch (error) {
            setErrorClientes(error.response.data);
        }
    }

    const handleDarAlta = async(cliente) =>{
        try {
            await darAltaClienteRequest(cliente.idCliente);
            cargarClientes();
        } catch (error) {
            setErrorClientes(error.response.data);
        }
    }


    return (
        <div className="border-2 max-h-100 overflow-auto mx-4">
                {clientes.length === 0 ? 
                    (<div> {errorClientes.message} </div>
                    ):
                    (<div className="bg-white grid grid-cols-2 md:grid-cols-[3fr_2fr_3fr_3fr_4fr] text-center divide-x divide-gray-500 sticky top-0">
                        <div className="border-t-1 border-b-1 border-l-1">Nombre</div>
                        <div className="border-t-1 border-b-1 hidden md:block">DNI</div>
                        <div className="border-t-1 border-b-1 hidden md:block">Telefono</div>
                        <div className="border-t-1 border-b-1 hidden md:block">Dirección</div>
                        <div className="border-t-1 border-b-1 border-r-1">Acción</div>
                    </div>
                    )}
                {clientes.map((cliente) =>(
                    <div key={cliente.idCliente} className={`${cliente.estado === 'B' ? 'text-gray-400' : 'text-black'} grid grid-cols-2 md:grid-cols-[3fr_2fr_3fr_3fr_4fr] text-center divide-x divide-gray-500`}>
                        <div className="px-2 border-b-1 border-l-1 text-left truncate">{mayus(cliente.apellidos)}, {mayus(cliente.nombres)}</div>
                        <div className="px-2 border-b-1 truncate hidden md:block">{cliente.dni}</div>
                        <div className="px-2 border-b-1 truncate hidden md:block">{cliente.telefono}</div>
                        <div className="px-2 border-b-1 truncate hidden md:block">{mayus(cliente.direccion)}</div>
                        <div className="px-1 border-b-1 border-r-1 grid grid-cols-5 justify-between">
                            <button onClick={()=>handleEditar(cliente)} className="cursor-pointer flex justify-center items-center">
                                <img  className="h-4 px-auto" src={edit} title="Editar Cliente" alt="Editar"/>
                            </button>
                            <button onClick={() =>handleAsistencia(cliente)} className="cursor-pointer flex justify-center items-center">
                                <img  className="h-4" src={asist} title="Nueva Asistencia" alt="Asistencia"/>
                            </button>
                            <button onClick={() =>handleInscripcion(cliente)} className="cursor-pointer flex justify-center items-center">
                                <img  className="h-4" src={inscripcion} title="Nueva Inscripcion" alt="Inscripcion"/>
                            </button>
                            <button onClick={() =>handleRutina(cliente)} className="cursor-pointer flex justify-center items-center">
                                <img  className="h-4" src={rutina} title="Ver Rutinas" alt="Rutinas"/>
                            </button>
                            {cliente.estado === 'A' ?
                            <button onClick={() =>handleDarBaja(cliente)} className="cursor-pointer flex justify-center items-center">
                                <img  className="h-4" src={baja} title="Dar Baja" alt="Baja"/>
                            </button>
                            :
                            <button onClick={() =>handleDarAlta(cliente)} className="cursor-pointer flex justify-center items-center">
                                <img  className="h-4" src={alta} title="Dar Alta" alt="Alta"/>
                            </button>}
                        </div>
                </div>
                ))}
                
        </div>
    )
}