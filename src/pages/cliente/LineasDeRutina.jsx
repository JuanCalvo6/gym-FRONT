import { useNavigate, useParams } from "react-router-dom"
import { obtenerRutinaRequest } from "../../services/clientes";
import { obtenerLineasRutinaRequest } from "../../services/rutinas";
import { useEffect, useRef, useState } from "react";
import TablaLineasDeRutina from "../../components/TablaLineasDeRutina";
import NuevaModificarLineaRutina from "../../components/NuevaModificarLineaRutina";

export default function LineasDeRutina () {
    const {id, idRutina} =  useParams();
    const [rutina, setRutina] = useState([])
    const [lineasRutina, setLineasRutina] = useState([]);
    const [lineaRutina, setLineaRutina] = useState({
        idCliente : id,
        idRutina: idRutina,
        idEjercicio: "",
        repeticiones: "",
        series: "",
        descanso: ""
    });
    const [modo, setModo] = useState('nuevo')
    const modalRef = useRef();
    const navigate = useNavigate();
    
    const datosRutina = async() =>{
        try {
            const res = await obtenerRutinaRequest({id, idRutina});
            setRutina(res.data[0]);
        } catch (error) {
            console.log(error);
        }
    }

    const datosLineasRutina =  async()=>{
        try {
            const res = await obtenerLineasRutinaRequest(idRutina);
            setLineasRutina(res.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        datosRutina();
        datosLineasRutina();
    }, []);

    const handleNuevo = ()=>{
        setModo('nuevo');
        modalRef.current?.showModal();
    }

    const handleAtras = ()=>{
        navigate(`/profesor/clientes/${id}/rutinas`);
    }

    const handleModificar = (dato) =>{
        console.log(dato);
        setModo('modificar');
        setLineaRutina({
            ...dato,
            idCliente: id,
            idRutina: idRutina
        })
        modalRef.current?.showModal();
    }

    return(
        <div>
            <div className='mx-4 mt-2 mb-8'>
                        Rutina: {rutina.nombre}
            </div>
            <div className="flex  justify-between gap-4  mx-4 mb-2">
                <div>
                    Ejercicios: 
                </div>
                <button onClick={handleNuevo} className="w-auto bg-red-800 text-white px-8 py-2  text-lg rounded-2xl self-center hover:cursor-pointer  transition hover:ring-2 hover:ring-red-900" type="submit">
                    NUEVO
                </button>
            </div>

            <TablaLineasDeRutina
                lineasRutina={lineasRutina}
                onclickModificar={handleModificar} 
                datosLineasRutina={datosLineasRutina}   
            />

            <div className='flex justify-end mr-4'>
                <button onClick={handleAtras} className="w-auto  bg-red-800 text-white px-8 py-2  text-lg rounded-2xl self-center hover:cursor-pointer  transition hover:ring-2 hover:ring-red-900" type="submit">
                    ATRAS
                </button>
            </div>

            <NuevaModificarLineaRutina
                modalRef={modalRef}
                modo={modo}
                lineaRutina={lineaRutina}
                setLineaRutina={setLineaRutina}
                datosLineasRutina={datosLineasRutina}
            />
        </div>
    )
}