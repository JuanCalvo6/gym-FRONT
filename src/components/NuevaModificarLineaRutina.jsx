import { crearLineaRutinaRequest } from "../services/rutinas";
import { modificarLineaRutinaRequest } from "../services/lineasDeRutina";
import { useState, useEffect } from "react";

export default function NuevaModificarLineaRutina ({modalRef, modo, lineaRutina, setLineaRutina, datosLineasRutina}){

    const [errores, setErrores] = useState([]);

    useEffect(()=>{
        if(errores){
            const timer = setTimeout(()=> setErrores(""),3000);
            return ()=> clearTimeout(timer);
        }
    },[errores])


    const handleModalClose = () =>{
        setLineaRutina(prev =>({
            ...prev,
            ejercicio: '',
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
                ejercicio: '',
                repeticiones: '',
                series: '',
                descanso: ''
            }))
            modalRef.current?.close(); 
        } catch (error) {
            setErrores(error.response.data.errores )
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
                    <label htmlFor="ejercicio">Ejercicio: </label>
                    <input value={lineaRutina.ejercicio} onChange={handleInputForm} className=" px-1 border border-gray-500 shadow mb-2 rounded-sm" type="text" id="ejercicio" name='ejercicio'/>
                    {errores?.ejercicio && <p className="text-red-600 text-right text-sm -mt-4">{errores.ejercicio}</p>}
                    <label htmlFor="observaciones">Repeticiones: </label>
                    <input value={lineaRutina.repeticiones} onChange={handleInputForm} className=" px-1 border border-gray-500 shadow mb-2 rounded-sm" type="text" id="repeticiones" name='repeticiones'/>
                    <label htmlFor="observaciones">Series: </label>
                    <input value={lineaRutina.series} onChange={handleInputForm} className=" px-1 border border-gray-500 shadow mb-2 rounded-sm" type="number" id="series" name='series'/>
                    {errores?.series && <p className="text-red-600 text-right text-sm -mt-4">{errores.series}</p>}
                    <label htmlFor="observaciones">Descanso: </label>
                    <input value={lineaRutina.descanso} onChange={handleInputForm} className=" px-1 border border-gray-500 shadow mb-2 rounded-sm" type="text" id="descanso" name='descanso'/>
                    
                    <div className="w-full mb-4 self-center flex justify-between ">
                        <button className="w-1/3 bg-red-800 text-white text-center py-2 text-lg rounded-2xl hover:cursor-pointer  transition hover:ring-2 hover:ring-red-900">
                            Aceptar
                        </button>
                        <button onClick={handleModalClose} type='button' className="w-1/3 bg-red-800 text-white text-center py-2  text-lg rounded-2xl hover:cursor-pointer  transition hover:ring-2 hover:ring-red-900">
                            Cancelar
                        </button>
                    </div>
                    {errores?.message && <p className="text-red-600 text-center text-sm -mt-4">{errores.message}</p>}
                </form>
            </div>
        </dialog>
    )
}