import { useEffect, useState } from "react";
import { listarEjerciciosRequest } from "../services/ejercicios";
import { crearLineaRutinaRequest } from "../services/rutinas";
import { modificarLineaRutinaRequest } from "../services/lineasDeRutina";

export default function NuevaModificarLineaRutina ({modalRef, modo, lineaRutina, setLineaRutina, datosLineasRutina}){
    const [ejercicios, setEjercicios] = useState([]);

    const traerEjercicios = async () =>{
        const res = await listarEjerciciosRequest();
        setEjercicios(res.data);
    }

    useEffect(()=>{
        traerEjercicios();
    },[])
    const handleModalClose = () =>{
        setLineaRutina(prev =>({
            ...prev,
            idEjercicio: '',
            repeticiones: '',
            series: '',
            descanso: ''
        }))
        modalRef.current?.close();
    }

    const handleForm =async(event) => {
        event.preventDefault();
        try {
            if(modo === 'nuevo')
                await crearLineaRutinaRequest(lineaRutina);
            else
                await modificarLineaRutinaRequest(lineaRutina);
            datosLineasRutina();
            setLineaRutina(prev =>({
                ...prev,
                idEjercicio: '',
                repeticiones: '',
                series: '',
                descanso: ''
            }))
            modalRef.current?.close(); 
        } catch (error) {
            console.log(error);
        }
        
    }

    const handleInputForm = (event)=>{
        const {name, value, type} = event.target;
        setLineaRutina(prev=> ({
            ...prev,
            [name]: type === 'number' ? (value === '' ? '' : Number(value)) : value
        }));
    }

    return (
        <dialog ref={modalRef} onClose={handleModalClose} className="m-auto z-50">
            <div>
                <h1 className="block w-full text-center bg-red-800 text-white font-bold p-2 mb-4 text-xl">
                    {modo === 'nuevo' ? "Nuevo" : "Modificar"}                
                </h1>
                <form  onSubmit={handleForm} className="flex flex-col px-2 gap-2" method="dialog">
                    <div className="flex gap-2">
                        <label htmlFor="idEjercicio">Ejercicio: </label>
                        <select value={lineaRutina.idEjercicio} onChange={handleInputForm} className="w-2/3 ml-auto px-1 border border-gray-500 shadow mb-2 rounded-sm" name="idEjercicio" id="idEjercicio">
                            <option value=''>Seleccionar Ejercicio</option>
                            {ejercicios?.map((ejercicio)=>(
                                <option key={ejercicio.idEjercicio} value={ejercicio.idEjercicio} > {ejercicio.nombre} </option>
                            ))}
                        </select>
                    </div>
                    <label htmlFor="observaciones">Repeticiones: </label>
                    <input value={lineaRutina.repeticiones} onChange={handleInputForm} className=" px-1 border border-gray-500 shadow mb-2 rounded-sm" type="text" id="repeticiones" name='repeticiones'/>
                    <label htmlFor="observaciones">Series: </label>
                    <input value={lineaRutina.series} onChange={handleInputForm} className=" px-1 border border-gray-500 shadow mb-2 rounded-sm" type="number" id="series" name='series'/>
                    <label htmlFor="observaciones">Descanso: </label>
                    <input value={lineaRutina.descanso} onChange={handleInputForm} className=" px-1 border border-gray-500 shadow mb-2 rounded-sm" type="number" id="descanso" name='descanso'/>
                    
                    <div className="w-full mb-4 self-center flex justify-between ">
                        <button className="w-1/3 bg-red-800 text-white text-center py-2 text-lg rounded-2xl hover:cursor-pointer  transition hover:ring-2 hover:ring-red-900">
                            Aceptar
                        </button>
                        <button onClick={handleModalClose} type='button' className="w-1/3 bg-red-800 text-white text-center py-2  text-lg rounded-2xl hover:cursor-pointer  transition hover:ring-2 hover:ring-red-900">
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </dialog>
    )
}