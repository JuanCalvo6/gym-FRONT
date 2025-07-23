import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { obtenerClienteRequest, obtenerRutinasRequest } from "../../services/clientes";
import NuevaModificarRutina from "../../components/NuevaModificarRutina";
import TablaRutinas from "../../components/TablaRutinas";

export default function RutinasPage (){
    const {id} = useParams();
    const [cliente, setCliente] = useState('');
    const [rutinas, setRutinas] = useState([]);
    const [rutina, setRutina] = useState({
        idCliente: id,
        nombre: '',
        observaciones: ''
    })
    const [bajas, setBajas] = useState(false);
    const [modo, setModo] = useState('nueva')
    const navigate = useNavigate();
    const modalRef = useRef();

    const datosCliente = async(idCliente) =>{
        try {
            const res = await obtenerClienteRequest(idCliente);
            setCliente(res.data[0]);
        } catch (error) {
            console.log(error);
        }
    }
    
    const datosRutinas = async(idCliente) =>{
        try {
            const res = await obtenerRutinasRequest(idCliente);
            setRutinas(res.data);

        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
        datosCliente(id);
        datosRutinas(id);
    },[id]);

    const handleBajas = (event)=>{
        setBajas(event.target.checked);
        console.log("Mostrar Bajas");
    }

    const onClickNuevo = ()=>{
        setModo('nueva');
        modalRef.current?.showModal();
    }

    const handleAtras = ()=>{
        navigate('/profesor');
    }

    const handleModificar = (dato)=>{
        setModo("modificar");
        setRutina({
            ...dato,
            idCliente: id
        });
        modalRef.current?.showModal();
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
            <div className="flex  justify-between gap-4  mx-4 mb-2">
                <form className="w-3/4 flex flex-row justify-between items-center gap-8">
                    <div>
                        Inscripciones: 
                    </div>
                    <div className=" flex items-center gap-1">
                        <input 
                            type="checkbox" 
                            name="baja" 
                            id="baja"
                            checked={bajas}
                            onChange={handleBajas}
                        />
                        <label htmlFor="baja">Mostrar Bajas</label>
                    </div>
                </form>
                <button onClick={onClickNuevo} className="w-auto bg-red-800 text-white px-8 py-2  text-lg rounded-2xl self-center hover:cursor-pointer  transition hover:ring-2 hover:ring-red-900" type="submit">
                    NUEVO
                </button>
            </div>
            <TablaRutinas
                rutinas = {rutinas}
                datosRutinas={datosRutinas}
                idCliente ={id}
                onClickModificar = {handleModificar}
            />
            <div className='flex justify-end mr-4'>
                <button onClick={handleAtras} className="w-auto  bg-red-800 text-white px-8 py-2  text-lg rounded-2xl self-center hover:cursor-pointer  transition hover:ring-2 hover:ring-red-900" type="submit">
                    ATRAS
                </button>
            </div>

            <NuevaModificarRutina 
                modalRef={modalRef}
                modo={modo}
                rutina={rutina}
                setRutina={setRutina}
                datosRutinas={datosRutinas}
            />
        </div>
    )
}