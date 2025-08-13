import { nuevoProfesorRequest, modificarProfesorRequest } from "../services/profesores";


export default function NuevoModificarProfesor({modalRef, modo, profesor, setProfesor, datosProfesores}){

    const handleForm = async(event)=>{
        event.preventDefault();
        try {
            if(modo === 'nuevo')
                await nuevoProfesorRequest(profesor);
            else
                await modificarProfesorRequest(profesor);
            datosProfesores();
            modalRef.current?.close();
        } catch (error) {
            console.log(error)
        }
    }

    const handleInputForm = (event)=>{
        const {name, value} = event.target;
        setProfesor(prev =>({
            ...prev,
            [name] : value
        }));
    }

    const handleModalClose = () =>{
        modalRef.current?.close();
    }

    return(
        <dialog ref={modalRef} className="m-auto z-50">
            <div>
                <h1 className="block w-full text-center bg-red-800 text-white font-bold p-2 mb-4 text-xl">
                    {modo === 'nuevo' ? "Nuevo Profesor" : "Modificar Profesor"}                
                </h1>
                <form onSubmit={handleForm}  className="flex flex-col px-2 gap-2" method="dialog">
                    <div className="flex gap-2">
                        <label htmlFor="nombres">Nombre: </label>
                        <input value={profesor.nombres} onChange={handleInputForm} className="w-2/3  ml-auto px-1 border border-gray-500 shadow mb-2 rounded-sm" type="text" id="nombres" name='nombres'/>
                    </div>
                    
                    <div className="flex gap-2">
                        <label htmlFor="apellidos">Apellido: </label>
                        <input value={profesor.apellidos} onChange={handleInputForm} className="w-2/3 ml-auto px-1 border border-gray-500 shadow mb-2 rounded-sm" type="text" id="apellidos" name='apellidos'/>
                    </div>
                    
                    <div className="flex gap-2">
                        <label htmlFor="documento">Documento: </label>
                        <input  value={profesor.dni} onChange={handleInputForm} className="w-2/3 ml-auto border px-1 border-gray-500 shadow mb-2 rounded-sm" type="text" id="documento" name='dni'/>
                    </div>
                    <div className="flex gap-2">
                        <label htmlFor="telefono">Telefono: </label>
                        <input  value={profesor.telefono} onChange={handleInputForm} className="w-2/3 ml-auto px-1 border border-gray-500 shadow mb-2 rounded-sm" type="number" id="telefono" name='telefono'/>
                    </div>
                    <div className="flex gap-2">
                        <label htmlFor="direccion">Direccion: </label>
                        <input  value={profesor.direccion} onChange={handleInputForm} className="w-2/3 ml-auto px-1 border border-gray-500 shadow mb-2 rounded-sm" type="text" id="direccion" name='direccion'/>
                    </div>
                    <div className="flex gap-2">
                        <label htmlFor="mail">Email: </label>
                        <input  value={profesor.mail} onChange={handleInputForm} className="w-2/3 ml-auto px-1 border border-gray-500 shadow mb-2 rounded-sm" type="email" id="mail" name='mail'/>
                    </div>
                    <div className="flex gap-2">
                        <label htmlFor="usuario">Usuario: </label>
                        <input  value={profesor.usuario} onChange={handleInputForm} className="w-2/3 ml-auto px-1 border border-gray-500 shadow mb-2 rounded-sm" type="text" id="usuario" name='usuario'/>
                    </div>
                    {modo==='nuevo' ? (<div className="flex gap-2">
                        <label htmlFor="contraseña">Contraseña: </label>
                        <input  value={profesor.contraseña} onChange={handleInputForm} className="w-2/3 ml-auto px-1 border border-gray-500 shadow mb-2 rounded-sm" type="password" id="contraseña" name='contraseña'/>
                    </div> )
                    :
                    (<div> </div>)
                    }
                    
                    <div className="w-full self-center flex justify-between ">
                        <button className="w-1/3 bg-red-800 text-white text-center py-2 mb-4 text-lg rounded-2xl hover:cursor-pointer  transition hover:ring-2 hover:ring-red-900">Aceptar</button>
                        <button type='button' onClick={handleModalClose} className="w-1/3 bg-red-800 text-white text-center py-2 mb-4 text-lg rounded-2xl hover:cursor-pointer  transition hover:ring-2 hover:ring-red-900">Cancelar</button>
                    </div>
                    
                </form>
            </div>
        </dialog>
    )
}