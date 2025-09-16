import TablaProfesores from "../../components/TablaProfesores"
import { useEffect, useRef, useState } from "react";
import { obtenerProfesoresRequest } from "../../services/profesores";
import NuevoModificarProfesor from "../../components/NuevoModificarProfesor";

export default function ProfesoresPage () {

    const [profesores, setProfesores] = useState([]);
    const [erroresProfesores, setErroresProfesores] = useState([])
    const [profesor, setProfesor] = useState([]);
    const [modo, setModo] = useState('nuevo');
    const modalRef = useRef();

    const datosProfesores = async() =>{
        try {
            const res = await obtenerProfesoresRequest();
            setProfesores(res.data);
        } catch (error) {
            setProfesores([]);
            setErroresProfesores(error.response.data.errores);
        }
    }

    useEffect(()=>{
        datosProfesores();
    },[])
    
    const handleNuevo = ()=>{
        setModo("nuevo");
        setProfesor({
                nombres: "",
                apellidos: "",
                dni: "",
                telefono: "",
                direccion: "",
                mail: "",
                usuario: "",
                contraseña: ""
        })
        modalRef.current?.showModal();
    }

    const handleModificar = (dato) =>{
        setModo("modificar");
        setProfesor(dato)
        modalRef.current?.showModal();
    }

    return (
        <div className="mx-4">
            <label>Profesores: </label>
            <div className="flex flex-col-2 mt-2 gap-2">
                <TablaProfesores
                    profesores = {profesores}
                    erroresProfesores={erroresProfesores}
                    onClickModificar = {handleModificar}
                    datosProfesores={datosProfesores}
                />
                <button onClick={handleNuevo} className="w-auto bg-red-800 text-white px-8 py-2  text-lg rounded-2xl self-center hover:cursor-pointer  transition hover:ring-2 hover:ring-red-900" type="submit">
                    NUEVO
                </button>
            </div>

            <NuevoModificarProfesor
                modalRef={modalRef}
                modo={modo}
                profesor={profesor}
                setProfesor={setProfesor}
                datosProfesores={datosProfesores}
            />
        </div>
    )
}