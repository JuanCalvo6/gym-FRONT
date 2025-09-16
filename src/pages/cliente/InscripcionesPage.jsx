import alta from '../../assets/alta.png' 
import baja from '../../assets/baja.png'
import edit from '../../assets/edit.png'

import { useEffect, useRef, useState } from "react";
import { useAuth } from '../../context/auth/useAuth';
import { useParams, useNavigate } from "react-router-dom"
import { obtenerClienteRequest, obtenerInscripcionesRequest } from "../../services/clientes";
import { darBajaInscripcionRequest, darAltaInscripcionRequest } from '../../services/inscripciones';
import BuscadorInscripcion from '../../components/BuscadorInscripcion';
import NuevaModificarInscripcion from '../../components/NuevaModificarInscripcion';
import { mayusWords } from '../../utils/mayus';
import { formatFecha } from '../../utils/fechaFormat';

export default function InscripcionesPage (){
    const {user} = useAuth();
    const {id} = useParams();
    const [cliente, setCliente] = useState(null);
    const [inscripciones, setInscripciones] = useState([]);
    const [errorInscripciones, setErrorInscripciones] = useState([]);
    const [modo, setModo] = useState('nuevo');
    const [bajas, setBajas] = useState(false)
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
            console.log(error);
        }
    }

    const datosInscripciones = async(idCliente, baja) =>{
        try {
            const res = await obtenerInscripcionesRequest(idCliente, baja);
            setInscripciones(res.data);
        } catch (error) {
            setInscripciones([]);
            setErrorInscripciones(error.response.data.errores);
        }
    }

    useEffect(() =>{
        datosCliente(id);
        datosInscripciones(id, bajas);
    }, [id])

    
    const handleNuevo = () =>{
        setModo('nuevo');
        const inicio = new Date();
        const fin = new Date();
        fin.setMonth(inicio.getMonth()+1);

        const datoFecha = (fecha) => fecha.toISOString().split("T")[0];
        setInscripcion(prev => ({
            ...prev, 
            diaInicio : datoFecha(inicio),
            diaFin: datoFecha(fin),
        }));
        modalRef.current?.showModal();
    }

    const handleModificar = (inscripcion) =>{
        setModo('modificar');
        const inicio = new Date(inscripcion.diaInicio);
        const fin = new Date(inscripcion.diaFin);
        const formatoFecha = (fecha) => fecha.toISOString().split("T")[0];
  
        setInscripcion(prev => ({
            ...prev,
            idInscripcion: inscripcion.idInscripcion,
            idPase: inscripcion.idPase,
            diaInicio: formatoFecha(inicio),
            diaFin: formatoFecha(fin),
            precio: inscripcion.precio
        }));

        modalRef.current?.showModal();
    }

    const handleBaja = async(inscripcion) =>{
        try {
            await darBajaInscripcionRequest(inscripcion.idInscripcion);
            datosInscripciones(id,bajas);
        } catch (error) {
            setErrorInscripciones(error.response.data.errores);
        }
    }

    const handleAlta = async(inscripcion) =>{
        try {
            await darAltaInscripcionRequest(inscripcion.idInscripcion);
            datosInscripciones(id, bajas);
        } catch (error) {
            setErrorInscripciones(error.response.data.errores);
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
                        Cliente: { mayusWords(cliente.apellidos)}, {mayusWords(cliente.nombres)}
                    </div>
                ) : (
                    <div>Cargando datos del cliente...</div>
                )}
            </div>
            <BuscadorInscripcion
                onClickNuevo={handleNuevo}
                datosInscripciones={datosInscripciones}
                bajas={bajas}
                setBajas={setBajas}
                idCliente={id}
            />
            <div className="border-2 w-5/6 max-h-100 overflow-auto mx-4 mb-4">
                {inscripciones.length === 0 ?
                    (
                        <div>{errorInscripciones.message}</div> 
                    ) :
                    (
                        <div className="bg-white grid grid-cols-2 md:grid-cols-[3fr_3fr_2fr_3fr_4fr] text-center divide-x divide-gray-500 sticky top-0">
                            <div className="border-t-1 border-b-1 border-l-1">Inicio</div>
                            <div className="border-t-1 border-b-1 hidden md:block">Fin</div>
                            <div className="border-t-1 border-b-1 hidden md:block">Pase</div>
                            <div className="border-t-1 border-b-1 hidden md:block">Precio</div>
                            <div className="border-t-1 border-b-1 border-r-1">Acción</div>
                        </div>
                )} 
                {inscripciones?.map((inscripcion) =>(
                    <div key={inscripcion.idInscripcion} className={`${inscripcion.estado === 'b' ? 'text-gray-400' : 'text-black'} grid grid-cols-2 md:grid-cols-[3fr_3fr_2fr_3fr_4fr] text-center divide-x divide-gray-500`}>
                        <div className="px-2 border-b-1 border-l-1 truncate">{formatFecha(inscripcion.diaInicio)}</div>
                        <div className="px-2 border-b-1 truncate hidden md:block">{formatFecha(inscripcion.diaFin)}</div>
                        <div className="px-2 border-b-1 truncate hidden md:block">{inscripcion.pase}</div>
                        <div className="px-2 border-b-1 truncate hidden md:block">{inscripcion.precio}</div>
                        <div className="px-1 border-b-1 border-r-1 grid grid-cols-2 justify-between">
                            <button onClick={()=>handleModificar(inscripcion)} className="cursor-pointer flex justify-center items-center">
                                <img  className="h-4 px-auto" src={edit} title="Editar Inscripcion" alt="Editar"/>
                            </button>
                            {inscripcion.estado === 'a' ?
                            <button onClick={()=> handleBaja(inscripcion)} className="cursor-pointer flex justify-center items-center">
                                <img  className="h-4" src={baja} title="Dar Baja" alt="Baja"/>
                            </button>
                            :
                            <button onClick={()=> handleAlta(inscripcion)} className="cursor-pointer flex justify-center items-center">
                                <img  className="h-4" src={alta} title="Dar Alta" alt="Alta"/>
                            </button>}
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