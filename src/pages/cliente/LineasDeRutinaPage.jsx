import { useNavigate, useParams } from "react-router-dom"
import { obtenerRutinaRequest } from "../../services/clientes";
import { obtenerLineasRutinaRequest } from "../../services/rutinas";
import { useEffect, useRef, useState } from "react";
import TablaLineasDeRutina from "../../components/TablaLineasDeRutina";
import NuevaModificarLineaRutina from "../../components/NuevaModificarLineaRutina";
import { eliminarLineaRutinaRequest } from '../../services/lineasDeRutina'

import { mayusWords } from "../../utils/mayus";

export default function LineasDeRutinaPage () {
    const {id, idRutina} =  useParams();
    const [rutina, setRutina] = useState([]);
    const [erroresLineas, setErroresLineas] = useState([]);
    const [lineasRutina, setLineasRutina] = useState([]);
    const [lineaRutina, setLineaRutina] = useState({
        idCliente : id,
        idRutina: idRutina,
        ejercicio: "",
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
            setLineasRutina([]);
            setErroresLineas(error.response.data.errores);
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
        setModo('modificar');
        setLineaRutina({
            ...dato,
            idCliente: id,
            idRutina: idRutina
        })
        modalRef.current?.showModal();
    }

    const handleEliminar = async(dato) =>{
        const confirmar = window.confirm("¿Está seguro que desea eliminar el Ejercicio?");
        try {
            if(confirmar)
                await eliminarLineaRutinaRequest(dato.idLineaDeRutina);
             datosLineasRutina();
        } catch (error) {
            console.log(error);
        }         
    }

    return(
        <div>
            <div className='mx-4 mt-2 mb-8'>
                        Rutina: {mayusWords(rutina.nombre)}
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
                erroresLineas={erroresLineas}
                onClickEliminar={handleEliminar}
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