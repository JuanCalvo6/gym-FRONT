import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useState, useRef } from "react";
import { obtenerClienteRequest, obtenerAsistenciasRequest } from "../../services/clientes";
import NuevaAsistencia from "../../components/NuevaAsistencia";
import { mayus, mayusWords } from "../../utils/mayus";

export default function AsistenciasPage (){
    const {id} = useParams();
    const [cliente, setCliente] = useState(null)
    const [errores, setErrores] = useState([])
    const [asistencias, setAsistencias] = useState([])
    const [asistencia, setAsistencia] = useState({
        idCliente: id,
        hora: "",
        fecha: ""
    })
    const navigate = useNavigate();
    const modalRef = useRef();

    const datosCliente = async(idCliente) =>{
            try {
                const res = await obtenerClienteRequest(idCliente);
                setCliente(res.data[0]);
            } catch (error) {
                setErrores(error.response.data.errores)
            }
        }
    
    const datosAsistencias = async(idCliente) =>{
        try {
            const res = await obtenerAsistenciasRequest(idCliente);
            setAsistencias(res.data)
        } catch (error) {
            setErrores(error.response.data.errores)
        }
    }
    useEffect(()=>{
        datosCliente(id);
        datosAsistencias(id);
    },[id])

    const handleNuevo = ()=>{
        const ahora = new Date();
        const fechaAhora = ahora.toISOString().split('T')[0];
        const horaAhora = ahora.toTimeString().slice(0,5);
        setAsistencia(prev=>({
            ...prev,
            hora: horaAhora,
            fecha: fechaAhora
        }))
        modalRef.current?.showModal();
    }

    const handleAtras = ()=>{
        navigate('/profesor')
    }
    return (
        <div>
            <div>
                {cliente ? (
                    <div className='mx-4 mt-2 mb-8'>
                        Cliente: { mayus(cliente.apellidos)}, {mayusWords(cliente.nombres)}
                    </div>
                ) : (
                    <div>Cargando datos del cliente...</div>
                )}
            </div>
            <div className="flex  justify-between gap-4  mx-4 mb-2">
                <div>
                    Asistencias: 
                </div>
                <button onClick={handleNuevo} className="w-auto bg-red-800 text-white px-8 py-2  text-lg rounded-2xl self-center hover:cursor-pointer  transition hover:ring-2 hover:ring-red-900" type="submit">
                NUEVO
                </button>
            </div>
            <div className="border-2 w-5/6 max-h-100 overflow-auto mx-4 mb-4">
                {asistencias.length === 0 ?
                (<div>{errores?.message}</div> ) : 
                (<div className="bg-white grid grid-cols-2 text-center divide-x divide-gray-500 sticky top-0">
                    <div className="border-t-1 border-b-1 border-l-1">Hora</div>
                    <div className="border-t-1 border-b-1 hidden md:block">Dia</div>
                </div>
                )}
                {asistencias?.map((asistencia,id)=>(
                    <div key={id} className="text-black grid grid-cols-2 text-center divide-x divide-gray-500">
                        <div className="px-2 border-b-1 border-l-1 truncate">{new Date(asistencia.fecha).toTimeString().slice(0, 5)}</div>
                        <div className="px-2 border-b-1 truncate hidden md:block">{new Date(asistencia.fecha).toISOString().split("T")[0]}</div>
                    </div>
                ))}
            </div>
            <div className='flex justify-end mr-4'>
                <button onClick={handleAtras} className="w-auto  bg-red-800 text-white px-8 py-2  text-lg rounded-2xl self-center hover:cursor-pointer  transition hover:ring-2 hover:ring-red-900" type="submit">
                    ATRAS
                </button>
            </div>

            <NuevaAsistencia
                modalRef={modalRef}
                asistencia={asistencia}
                setAsistencia={setAsistencia}
                datosCliente={datosCliente}
                datosAsistencias={datosAsistencias}
            />
        </div>
    )
}