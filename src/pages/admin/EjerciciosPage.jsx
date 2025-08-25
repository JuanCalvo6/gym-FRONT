import { useEffect, useRef, useState } from "react"
import TablaEjercicios from "../../components/TablaEjercicios";
import NuevoModificarEjercicio from "../../components/NuevoModificarEjercicio";
import { listarEjerciciosRequest } from "../../services/ejercicios";

export default function EjerciciosPage () {
    const [ejercicio, setEjercicio] = useState([]);
    const [ejercicios, setEjercicios] = useState([]);
    const [modo, setModo] = useState('nuevo');
    const modalRef = useRef();

    const datosEjercicios = async()=>{
        try {
            const res = await listarEjerciciosRequest();
            setEjercicios(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(()=>{
        datosEjercicios();
    }, []);

    const handleModificar = (dato)=>{
        setModo('modificar');
        setEjercicio(dato);
        modalRef.current?.showModal();
    }

    const handleNuevo = () =>{
        setModo('nuevo');
        setEjercicio({
            nombre: ''
        })
        modalRef.current?.showModal();
    }

    return (
        <div className="mx-4">
            <label>Ejercicios: </label>

            <div className="flex flex-col-2 mt-2 gap-2">
                <TablaEjercicios
                    ejercicios={ejercicios}
                    onClickModificar={handleModificar}
                    datosEjercicios={datosEjercicios}
                />
                <button onClick={handleNuevo} className="w-auto bg-red-800 text-white px-8 py-2  text-lg rounded-2xl self-center hover:cursor-pointer  transition hover:ring-2 hover:ring-red-900" type="submit">
                    NUEVO
                </button>
            </div>

            <NuevoModificarEjercicio
                ejercicio={ejercicio}
                setEjercicio={setEjercicio}
                modo={modo}
                modalRef={modalRef}
                datosEjercicios={datosEjercicios}
            />
        </div>
    )
}