import { useEffect, useState } from "react";
import { crearRutinaRequest } from "../services/clientes";
import { modificarRutinaRequest } from "../services/rutinas";

export default function NuevaModificarRutina ({modalRef, modo, rutina, setRutina, datosRutinas}){
    const [errores, setErrores] = useState([])

    useEffect(()=>{
        if(errores){
            const timer = setTimeout(()=> setErrores(""),3000);
            return ()=> clearTimeout(timer);
        }
    },[errores])

    const handleModalClose = ()=>{
        setRutina(prev =>({
            ...prev,
            nombre: "",
            observaciones: ""
        }));
        modalRef.current?.close();
    }
    const handleForm = async(event)=>{
        event.preventDefault();
        try {
            if(modo === 'nueva'){
                await crearRutinaRequest(rutina);
            }else{
                await modificarRutinaRequest(rutina);
            }
            datosRutinas(rutina.idCliente);
            setRutina(prev =>({
                ...prev,
                nombre: "",
                observaciones: ""
            }));
        modalRef.current?.close();
        } catch (error) {
            console.log(error.response.data)
            setErrores(error.response.data.errores)
        }
        
    }
    const handleInputForm = (event)=>{
        const {name, value} = event.target;
        setRutina(prev=> ({
            ...prev,
            [name]: value
        }));
    }
    return (
        <dialog ref={modalRef} onClose={handleModalClose}  className="m-auto z-50">
            <div>
                <h1 className="block w-full text-center bg-red-800 text-white font-bold p-2 mb-4 text-xl">
                    {modo === 'nueva' ? "Nueva Rutina" : "Modificar Rutina"}                
                </h1>
                <form onSubmit={handleForm}  className="flex flex-col px-2 gap-2" method="dialog">
                    <label htmlFor="nombre">Nombre: </label>
                    <input readOnly={modo!='nueva'} value={rutina.nombre} onChange={handleInputForm} className=" px-1 border border-gray-500 shadow mb-2 rounded-sm" type="text" id="nombre" name='nombre'/>
                    {errores?.nombre && <p className="text-red-600 text-right text-sm -mt-4">{errores.nombre}</p>}
                    <label htmlFor="observaciones">Observaciones: </label>
                    <textarea 
                        name="observaciones" 
                        id="observaciones" 
                        value={rutina.observaciones} 
                        onChange={handleInputForm} 
                        className="px-1 border border-gray-500 shadow mb-2 rounded-sm"
                        rows={4}
                        cols={30}
                    />
            
                    <div className="w-full mb-4 self-center flex justify-between ">
                        <button className="w-1/3 bg-red-800 text-white text-center py-2 text-lg rounded-2xl hover:cursor-pointer  transition hover:ring-2 hover:ring-red-900">Aceptar</button>
                        <button type='button' onClick={handleModalClose} className="w-1/3 bg-red-800 text-white text-center py-2  text-lg rounded-2xl hover:cursor-pointer  transition hover:ring-2 hover:ring-red-900">Cancelar</button>
                    </div>
                    {errores?.message && <p className="text-red-600 text-right text-sm -mt-4">{errores.message}</p>}    
                </form>
            </div>
        </dialog>
    )
}