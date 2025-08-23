import TablaPases from "../../components/TablaPases";
import NuevoModificarPase from "../../components/NuevoModificarPase";
import { listarPasesRequest } from "../../services/pases";
import { useEffect, useRef, useState } from "react";

export default function PasesPage (){
    const [pases, setPases] = useState([]);
    const [pase, setPase] = useState([]);
    const [modo, setModo] = useState('nuevo');
    const modalRef = useRef();

    const datosPases = async()=>{
        try {
            const res = await listarPasesRequest();
            setPases(res.data);
        } catch (error) {
            console.log(error);
        } 
    }

    useEffect(()=>{
        datosPases();
    },[]);

    const handleNuevo = ()=>{
        setModo('nuevo');
        setPase({
            nombre: "",
            horaInicio: "",
            horaFin: "",
            precio: ""
        })
        modalRef.current?.showModal();
    }

    const handleModificar = (dato)=>{
        setModo('modificar');
        dato.horaInicio = dato.horaInicio.slice(0,5);
        dato.horaFin = dato.horaFin.slice(0,5);
        setPase(dato);
        modalRef.current?.showModal();
    }

    return (
        <div className="mx-4">
            <label>Pases: </label>

            <div className="flex flex-col-2 mt-2 gap-2">
                <TablaPases
                    pases={pases}
                    onClickModificar={handleModificar}
                    datosPases={datosPases}
                />
                <button onClick={handleNuevo} className="w-auto bg-red-800 text-white px-8 py-2  text-lg rounded-2xl self-center hover:cursor-pointer  transition hover:ring-2 hover:ring-red-900" type="submit">
                    NUEVO
                </button>
            </div>

            <NuevoModificarPase
                pase={pase}
                setPase={setPase}
                modo={modo}
                modalRef={modalRef}
                datosPases={datosPases}
            />
        </div>
    )
}