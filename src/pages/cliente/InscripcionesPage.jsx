import alta from '../../assets/alta.png' 
import baja from '../../assets/baja.png'
import edit from '../../assets/edit.png'
import eliminar from '../../assets/eliminar.png'


import { useEffect, useRef, useState } from "react";
import { useAuth } from '../../context/auth/useAuth';
import { useParams, useNavigate } from "react-router-dom"
import { obtenerClienteRequest, obtenerInscripcionesRequest } from "../../services/clientes";
import { darBajaInscripcionRequest, darAltaInscripcionRequest, eliminarInscripcionRequest } from '../../services/inscripciones';
import BuscadorInscripcion from '../../components/BuscadorInscripcion';
import NuevaModificarInscripcion from '../../components/NuevaModificarInscripcion';

export default function InscripcionesPage (){
    const {user} = useAuth();
    const {id} = useParams();
    const [cliente, setCliente] = useState(null);
    const [inscripciones, setInscripciones] = useState([]);
    const [modo, setModo] = useState('nuevo');
    const [inscripcion, setInscripcion] = useState({
        idProfesor: user.id,
        idCliente: id,
        idPase: "",
        diaInicio: "",
        diaFin: "",
        precio: "",
        estado: "A"
    });
    const modalRef = useRef();
    const navigate = useNavigate();

    const datosCliente = async(idCliente) =>{
        try {
            const res = await obtenerClienteRequest(idCliente);
            setCliente(res.data[0]);
        } catch (error) {
            console.log(error.response.data);
        }
    }

    const datosInscripciones = async(idCliente, baja) =>{
        try {
            const res = await obtenerInscripcionesRequest(idCliente, baja);
            setInscripciones(res.data);
        } catch (error) {
            console.log(error.response.data);
        }
    }

    useEffect(() =>{
        datosCliente(id);
        datosInscripciones(id, true);
    }, [id])

    const handleNuevo = () =>{
        setModo('nuevo');
        const inicio = new Date();
        const fin = new Date();
        fin.setMonth(inicio.getMonth()+1);

        const formatoFecha = (fecha) => fecha.toISOString().split("T")[0];
        setInscripcion(prev => ({
            ...prev, 
            diaInicio : formatoFecha(inicio),
            diaFin: formatoFecha(fin),
        }));
        modalRef.current?.showModal();
    }

    const handleModificar = (inscripcion) =>{
        setModo('modificar');
        const diaInicio = new Date(inscripcion.inicio);
        const diaFin = new Date(inscripcion.fin);
        const formatoFecha = (fecha) => fecha.toISOString().split("T")[0];
  
        setInscripcion(prev => ({
            ...prev,
            idPase: inscripcion.idPase,
            diaInicio: formatoFecha(diaInicio),
            diaFin: formatoFecha(diaFin),
            precio: inscripcion.precio
        }));
        modalRef.current?.showModal();

    }

    const handleBaja = async(inscripcion) =>{
        try {
            await darBajaInscripcionRequest(inscripcion.idInscripcion);
            datosInscripciones(id,true);
            console.log("Inscripcion dada de Baja", inscripcion);
        } catch (error) {
            console.log(error.response.data.message)
        }
    }

    const handleAlta = async(inscripcion) =>{
        try {
            await darAltaInscripcionRequest(inscripcion.idInscripcion);
            datosInscripciones(id, true);
            console.log("Inscripcion dada de Alta", inscripcion);
        } catch (error) {
            console.log(error.response.data.message)
        }
    }

    const handleEliminar = async(inscripcion) =>{
         const confirmar = window.confirm(`¿Esta seguro que quiere eliminar a ${cliente.nombres}?`);

        try {
            if(confirmar){
                await eliminarInscripcionRequest(inscripcion.idInscripcion);
                datosInscripciones(id, true);
                console.log("Inscripcion Eliminada", inscripcion);
            }
            
        } catch (error) {
            console.log(error.response.data.message)
        }
    }

    const handleAtras = () =>{
        navigate('/profesor')
    }

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
            <BuscadorInscripcion
                onClickNuevo={handleNuevo}
            />
            <div className="border-2 w-5/6 max-h-100 overflow-auto mx-4 mb-4">
                {inscripciones.length === 0 ?
                    (
                        <div>El cliente no tiene inscripciones</div> 
                    ) :
                    (
                        <div className="bg-white grid grid-cols-2 md:grid-cols-[3fr_2fr_2fr_3fr_1fr_4fr] text-center divide-x divide-gray-500 sticky top-0">
                            <div className="border-t-1 border-b-1 border-l-1">Inicio</div>
                            <div className="border-t-1 border-b-1 hidden md:block">Fin</div>
                            <div className="border-t-1 border-b-1 hidden md:block">Pase</div>
                            <div className="border-t-1 border-b-1 hidden md:block">Precio</div>
                            <div className="border-t-1 border-b-1 hidden md:block">Estado</div>
                            <div className="border-t-1 border-b-1 border-r-1">Acción</div>
                        </div>
                )} 
                {inscripciones?.map((inscripcion) =>(
                    <div key={inscripcion.idInscripcion} className={`${inscripcion.estado === 'B' ? 'text-gray-400' : 'text-black'} grid grid-cols-2 md:grid-cols-[3fr_2fr_2fr_3fr_1fr_4fr] text-center divide-x divide-gray-500`}>
                        <div className="px-2 border-b-1 border-l-1 truncate">{inscripcion.inicio}</div>
                        <div className="px-2 border-b-1 truncate hidden md:block">{inscripcion.fin}</div>
                        <div className="px-2 border-b-1 truncate hidden md:block">{inscripcion.pase}</div>
                        <div className="px-2 border-b-1 truncate hidden md:block">{inscripcion.precio}</div>
                        <div className="px-2 border-b-1 hidden md:block">{inscripcion.estado}</div>
                        <div className="px-1 border-b-1 border-r-1 grid grid-cols-3 justify-between">
                            <button onClick={()=>handleModificar(inscripcion)} className="cursor-pointer flex justify-center items-center">
                                <img  className="h-4 px-auto" src={edit} title="Editar Cliente" alt="Editar"/>
                            </button>
                            {inscripcion.estado === 'A' ?
                            <button onClick={()=> handleBaja(inscripcion)} className="cursor-pointer flex justify-center items-center">
                                <img  className="h-4" src={baja} title="Dar Baja" alt="Baja"/>
                            </button>
                            :
                            <button onClick={()=> handleAlta(inscripcion)} className="cursor-pointer flex justify-center items-center">
                                <img  className="h-4" src={alta} title="Dar Alta" alt="Alta"/>
                            </button>}
                            <button onClick={()=> handleEliminar(inscripcion)} className="cursor-pointer flex justify-center items-center">
                                <img  className="h-4" src={eliminar} title="Eliminar" alt="Eliminar"/>
                            </button>
                        </div>
                </div>
                ))}
                
            </div>
            <div className='flex justify-end mr-4'>
                <button onClick={handleAtras} className="w-auto  bg-red-800 text-white px-8 py-2  text-lg rounded-2xl self-center hover:cursor-pointer  transition hover:ring-2 hover:ring-red-900" type="submit">
                    ATRAS
                </button>
            </div>

            <NuevaModificarInscripcion 
                inscripcion={inscripcion}
                setInscripcion={setInscripcion}
                datosInscripciones ={datosInscripciones}
                modalRef={modalRef}
                modo={modo}
            />
        </div>
    )
}