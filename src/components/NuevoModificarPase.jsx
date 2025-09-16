import { useState, useEffect } from "react";
import { nuevoPaseRequest, modificarPaseRequest } from "../services/pases";

export default function NuevoModificarPase ({pase, setPase, modo, modalRef, datosPases}){

    const [errores, setErrores] = useState([]);

    useEffect(()=>{
            if(errores){
                const timer = setTimeout(()=> setErrores(""),3000);
                return ()=> clearTimeout(timer);
            }
        },[errores]);

    const handleForm = async(event) =>{
        event.preventDefault();
        try {
            if(modo === 'nuevo'){
                await nuevoPaseRequest(pase);
            }else{
                await modificarPaseRequest(pase);
            }
            datosPases();
            modalRef.current?.close();

        } catch (error) {
            setErrores(error.response.data.errores);
        }
        
    }

    const handleModalClose = () =>{
        modalRef.current?.close()
    }

    const handleInputForm = (event)=>{
        const {name, value} = event.target;
        if(name === 'precio'){
            const precio = parseInt(value,10);
            setPase(prev =>({
                ...prev,
                [name] : precio
            }));
        }else{
            setPase(prev =>({
                ...prev,
                [name] : value
            }));
        }
    }

    return (
        <dialog ref={modalRef} className="m-auto z-50">
            <div>
                <h1 className="block w-full text-center bg-red-800 text-white font-bold p-2 mb-4 text-xl">
                    {modo === 'nuevo' ? "Nuevo Pase" : "Modificar Pase"}                
                </h1>
                <form onSubmit={handleForm}  className="flex flex-col px-2 gap-2" method="dialog">
                    <div className="flex gap-2">
                        <label htmlFor="nombre">Nombre: </label>
                        <input value={pase?.nombre} onChange={handleInputForm} className="w-2/3  ml-auto px-1 border border-gray-500 shadow mb-2 rounded-sm" type="text" id="nombre" name='nombre'/>
                    </div>
                    {errores?.nombre && <p className="text-red-600 text-right text-sm -mt-4">{errores.nombre}</p>}
                    <div className="flex gap-2">
                        <label htmlFor="horaInicio">Hora Inicio: </label>
                        <input value={pase.horaInicio} onChange={handleInputForm} className="w-2/3 ml-auto px-1 border border-gray-500 shadow mb-2 rounded-sm" type="time" id="horaInicio" name='horaInicio'/>
                    </div>
                    {errores?.horaInicio && <p className="text-red-600 text-right text-sm -mt-4">{errores.horaInicio}</p>}
                    <div className="flex gap-2">
                        <label htmlFor="horaFin">Hora Fin: </label>
                        <input  value={pase.horaFin} onChange={handleInputForm} className="w-2/3 ml-auto border px-1 border-gray-500 shadow mb-2 rounded-sm" type="time" id="horaFin" name='horaFin'/>
                    </div>
                    {errores?.horaFin && <p className="text-red-600 text-right text-sm -mt-4">{errores.horaFin}</p>}
                    <div className="flex gap-2">
                        <label htmlFor="precio">Precio: </label>
                        <input  value={pase.precio} onChange={handleInputForm} className="w-2/3 ml-auto px-1 border border-gray-500 shadow mb-2 rounded-sm" type="number" id="precio" name='precio'/>
                    </div>
                    {errores?.precio && <p className="text-red-600 text-right text-sm -mt-4">{errores.precio}</p>}

                    <div className="w-full self-center flex justify-between ">
                        <button className="w-1/3 bg-red-800 text-white text-center py-2 mb-4 text-lg rounded-2xl hover:cursor-pointer  transition hover:ring-2 hover:ring-red-900">Aceptar</button>
                        <button type='button' onClick={handleModalClose} className="w-1/3 bg-red-800 text-white text-center py-2 mb-4 text-lg rounded-2xl hover:cursor-pointer  transition hover:ring-2 hover:ring-red-900">Cancelar</button>
                    </div>
                    {errores?.message && <p className="text-red-600 text-center text-sm -mt-4">{errores.message}</p>}
                </form>
            </div>
        </dialog>
    )
}