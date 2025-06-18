import alta from '../../assets/alta.png' 
import asist from '../../assets/asist.png'
import baja from '../../assets/baja.png'
import edit from '../../assets/edit.png'
import eliminar from '../../assets/eliminar.png'
import inscripcion from '../../assets/inscripcion.png'
import rutina from '../../assets/rutina.png'
import { useEffect, useRef, useState } from "react";
import { useAuth } from "../../context/auth/useAuth"
import { listarClientesRequest } from "../../services/clientes";

export default function ClientesPage (){
    const [buscar, setBuscar] = useState('');
    const [incluirBajas, setIncluirBajas] = useState(false);
    const [cliente, setCliente] = useState({
        nombres: '',
        apellidos: '',
        tipoDni: '',
        dni: '',
        huella: '',
        telefono: '',
        direccion: '',
        email: ''}
    )
    const [clientes, setClientes] = useState([]);
    const [errorCliente, setErrorCliente] = useState('');
    const {user} = useAuth();
    const formRef =  useRef(null);
    const modalRef = useRef(null);

    useEffect(()=>{
        const cargaInicial = async()=>{
            try {
               const res = await listarClientesRequest({buscar, incluirBajas});
               await setClientes(res.data);
            } catch (error) {
                console.log(error);
            }
        }
        cargaInicial();
    },[])

    const handleSubmit = async(event) =>{
        event.preventDefault();
        try {
            const res = await listarClientesRequest({buscar,incluirBajas});
            await setClientes(res.data);
            await setErrorCliente('');

        } catch (error) {
            await setClientes([]);
            await setErrorCliente(error.response.data.message);
        }
    }

    const handleNuevo = () =>{
        modalRef.current?.showModal();
    }

    const handleForm = () => {
        console.log("Se creo el nuevo cliente", cliente)
    }

    const handleInputForm = (event) =>{
        const {name, value} = event.target;
        setCliente(prev => ({
            ...prev, 
            [name] : value
        }));
    };

    const handleModalClose = () =>{
        setCliente({nombres: '',
        apellidos: '',
        tipoDni: '',
        dni: '',
        huella: '',
        telefono: '',
        direccion: '',
        email: ''})
        modalRef.current?.close();
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
                    (<div>{errorCliente}</div>
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
                {clientes.map((cliente) =>(
                    <div key={cliente.idCliente} className={`${cliente.estado === 'B' ? 'text-gray-400' : 'text-black'} grid grid-cols-2 md:grid-cols-[3fr_2fr_2fr_3fr_1fr_4fr] text-center divide-x divide-gray-500`}>
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

            <dialog ref={modalRef} onClose={handleModalClose}  className="m-auto z-50">
            <div>
                <h1 className="block w-full text-center bg-red-800 text-white font-bold p-2 mb-4 text-xl"> Cliente</h1>
                <form onSubmit={handleForm} ref={formRef} className="flex flex-col px-2 gap-2" method="dialog">
                    <div className="flex gap-2">
                        <label htmlFor="nombres">Nombre: </label>
                        <input value={cliente.nombres} onChange={handleInputForm} className="w-2/3  ml-auto px-1 border border-gray-500 shadow mb-2 rounded-sm" type="text" id="nombres" name='nombres'/>
                    </div>
                    <div className="flex gap-2">
                        <label htmlFor="apellidos">Apellido: </label>
                        <input value={cliente.apellidos} onChange={handleInputForm} className="w-2/3 ml-auto px-1 border border-gray-500 shadow mb-2 rounded-sm" type="text" id="apellidos" name='apellidos'/>
                    </div>
                    <div className="flex">
                        <label htmlFor="documento">Documento: </label>
                        <select value={cliente.tipoDni} onChange={handleInputForm} className="w-1/6 ml-auto mr-0 border border-gray-500 shadow mb-2 rounded-sm" name="tipoDni" id="">
                            <option value="">tipo</option>
                            <option value="dni">DNI</option>
                            <option value="pasaporte">P.</option>
                            <option value="otro">Otro</option>
                        </select>
                        <input  value={cliente.dni} onChange={handleInputForm} className="w-1/2 border px-1 border-gray-500 shadow mb-2 rounded-sm" type="text" id="documento" name='dni'/>
                    </div>
                    <div className="flex gap-2">
                        <label htmlFor="huella">Huella: </label>
                        <input value={cliente.huella} onChange={handleInputForm} className="w-2/3 ml-auto px-1 border border-gray-500 shadow mb-2 rounded-sm" type="text" id="huella" name='huella'/>
                    </div>
                    <div className="flex gap-2">
                        <label htmlFor="telefono">Telefono: </label>
                        <input  value={cliente.telefono} onChange={handleInputForm} className="w-2/3 ml-auto px-1 border border-gray-500 shadow mb-2 rounded-sm" type="number" id="telefono" name='telefono'/>
                    </div>
                    <div className="flex gap-2">
                        <label htmlFor="direccion">Direccion: </label>
                        <input  value={cliente.direccion} onChange={handleInputForm} className="w-2/3 ml-auto px-1 border border-gray-500 shadow mb-2 rounded-sm" type="text" id="direccion" name='direccion'/>
                    </div>
                    <div className="flex gap-2">
                        <label htmlFor="email">Email: </label>
                        <input  value={cliente.email} onChange={handleInputForm} className="w-2/3 ml-auto px-1 border border-gray-500 shadow mb-2 rounded-sm" type="email" id="email" name='email'/>
                    </div>
                    <div className="w-full self-center flex justify-between ">
                        <button className="w-1/3 bg-red-800 text-white text-center py-2 mb-4 text-lg rounded-2xl hover:cursor-pointer  transition hover:ring-2 hover:ring-red-900">Aceptar</button>
                        <button type='button' onClick={handleModalClose} className="w-1/3 bg-red-800 text-white text-center py-2 mb-4 text-lg rounded-2xl hover:cursor-pointer  transition hover:ring-2 hover:ring-red-900">Cancelar</button>
                    </div>
                    
                </form>
            </div>
        </dialog>
        </div>
    )
}