import { nuevoEjercicioRequest, modificarEjercicioRequest } from "../services/ejercicios";

export default function NuevoModificarEjercicio ({ejercicio, setEjercicio, modo, modalRef, datosEjercicios}){

    const handleForm = async()=>{
        try {
            if(modo === 'nuevo')
                await nuevoEjercicioRequest(ejercicio);
            else
                await modificarEjercicioRequest(ejercicio);
            datosEjercicios();
            modalRef.current?.close();
        } catch (error) {
            console.log(error);
        }
    }

    const handleInputForm = (event) =>{
        const {name, value} = event.target;
        setEjercicio(prev =>({
            ...prev,
            [name] : value
        }));
    }

    const handleModalClose = ()=>{
        modalRef.current?.close();
    }

    return(
        <dialog ref={modalRef} className="m-auto z-50">
            <div>
                <h1 className="block w-full text-center bg-red-800 text-white font-bold p-2 mb-4 text-xl">
                    {modo === 'nuevo' ? "Nuevo Ejercicio" : "Modificar Ejercicio"}                
                </h1>
                <form onSubmit={handleForm}  className="flex flex-col px-2 gap-2" method="dialog">
                    <div className="flex gap-2">
                        <label htmlFor="nombre">Nombre: </label>
                        <input value={ejercicio?.nombre} onChange={handleInputForm} className="w-2/3  ml-auto px-1 border border-gray-500 shadow mb-2 rounded-sm" type="text" id="nombre" name='nombre'/>
                    </div>
                    
                    <div className="w-full self-center flex justify-between ">
                        <button className="w-1/3 bg-red-800 text-white text-center py-2 mb-4 text-lg rounded-2xl hover:cursor-pointer  transition hover:ring-2 hover:ring-red-900">Aceptar</button>
                        <button type='button' onClick={handleModalClose} className="w-1/3 bg-red-800 text-white text-center py-2 mb-4 text-lg rounded-2xl hover:cursor-pointer  transition hover:ring-2 hover:ring-red-900">Cancelar</button>
                    </div>
                    
                </form>
            </div>
        </dialog>
    )
}