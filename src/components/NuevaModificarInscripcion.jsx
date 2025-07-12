import { useEffect, useState } from "react";
import { listarPasesRequest } from "../services/pases";
import { crearInscripcionRequest } from "../services/clientes";
import validarInscripcion from "../validaciones/validarInscripcion";

export default function NuevaModificarInscripcion ({modalRef, modo, inscripcion, setInscripcion, datosInscripciones}) {
    const [pases, setPases] = useState([]);
    const [errores, setErrores] = useState([]);

    useEffect(()=>{
        const traerPases = async() =>{
            const res = await listarPasesRequest();
            setPases(res.data);
        }
        traerPases();  
    }, [])

    useEffect(()=>{
        if(errores){
            const timer = setTimeout(() => setErrores(""), 3000);
            return () => clearTimeout(timer);
        }

    },[errores])

    const handleModalClose = () =>{
            setInscripcion(prev => ({
                ...prev, 
                idPase: "",
                diaInicio: "",
                diaFin: "",
                precio: ""
            }));
            modalRef.current?.close();
        }

    const handleForm = async(event) =>{
        event.preventDefault()
        const erroresInscripcion = validarInscripcion(inscripcion, pases);

        if(Object.keys(erroresInscripcion).length > 0){
            setErrores(erroresInscripcion);
            return
        }

        try {
            await crearInscripcionRequest(inscripcion);
            datosInscripciones(inscripcion.idCliente, false);
            modalRef.current?.close();

        } catch (error) {
            console.log(error.response.data.message);
            setErrores(prev => ({
                ...prev, 
                api : error.response.data.message
            }));
        }
    }

    const handleInputForm = (event) =>{
        const {name, value} = event.target;

        if(name === 'idPase'){
            const paseSeleccionado = pases.find((p) => String(p.idPase)=== value);
            const precio = paseSeleccionado ? paseSeleccionado.precio : "";
            setInscripcion(prev => ({
                ...prev, 
                [name] : value,
                precio: precio
            }));
        } else {
            setInscripcion(prev => ({
                ...prev, 
                [name] : value
            }));
        }
    };

    return (
        <dialog ref={modalRef} onClose={handleModalClose}  className="m-auto z-50">
            <div>
                <h1 className="block w-full text-center bg-red-800 text-white font-bold p-2 mb-4 text-xl">
                    {modo === 'nuevo' ? "Nueva Inscripcion" : "Modificar Inscripcion"}                
                </h1>
                <form onSubmit={handleForm}  className="flex flex-col px-2 gap-2" method="dialog">
                    <div className="flex gap-2">
                        <label htmlFor="idPase">Pase: </label>
                        <select value={inscripcion.idPase} onChange={handleInputForm} className="w-2/3 ml-auto px-1 border border-gray-500 shadow mb-2 rounded-sm" name="idPase" id="idPase">
                            <option value="">Seleccionar Pase</option>
                            {pases?.map((pase)=>(
                                <option key={pase.idPase} value={pase.idPase} > {pase.nombre} </option>
                            ))}
                        </select>
                    </div>
                    {errores?.pase && <p className="text-red-600 text-right text-sm -mt-4">{errores.pase}</p>}
                    
                    <div className="flex gap-2">
                        <label htmlFor="diaInicio">Inicio: </label>
                        <input readOnly={modo != 'nuevo'}  value={inscripcion.diaInicio} onChange={handleInputForm} className="w-2/3 ml-auto px-1 border border-gray-500 shadow mb-2 rounded-sm" type="date" id="diaInicio" name='diaInicio'/>
                    </div>
                    {errores?.diaInicio && <p className="text-red-600 text-right text-sm -mt-4">{errores.diaInicio}</p>}
                    
                    <div className="flex gap-2">
                        <label htmlFor="diaFin">Fin: </label>
                        <input value={inscripcion.diaFin} onChange={handleInputForm} className="w-2/3 ml-auto px-1 border border-gray-500 shadow mb-2 rounded-sm" type="date" id="diaFin" name='diaFin'/>
                    </div>
                    {errores?.diaFin && <p className="text-red-600 text-right text-sm -mt-4">{errores.diaFin}</p>}
                    
                    <div className="flex gap-2">
                        <label htmlFor="precio">Precio: </label>
                        <input readOnly value={inscripcion.precio} onChange={handleInputForm} className="w-2/3 ml-auto px-1 border border-gray-500 shadow mb-2 rounded-sm" type="number" id="precio" name='precio'/>
                    </div>
                    {errores?.precio && <p className="text-red-600 text-right text-sm -mt-4">{errores.precio}</p>}

                    <div className="w-full mb-4 self-center flex justify-between ">
                        <button className="w-1/3 bg-red-800 text-white text-center py-2 text-lg rounded-2xl hover:cursor-pointer  transition hover:ring-2 hover:ring-red-900">Aceptar</button>
                        <button type='button' onClick={handleModalClose} className="w-1/3 bg-red-800 text-white text-center py-2  text-lg rounded-2xl hover:cursor-pointer  transition hover:ring-2 hover:ring-red-900">Cancelar</button>
                    </div>
                    {errores?.api && <p className="text-red-600 text-right text-sm -mt-4 mb-4">{errores.api}</p>}
                    
                </form>
            </div>
        </dialog>
    )
}