import { crearAsistenciaRequest } from "../services/clientes"

export default function NuevaAsistencia({modalRef, asistencia, setAsistencia, datosCliente}){

    const handleInput = (event)=>{
        const {name, value} =  event.target
        setAsistencia(prev =>({
            ...prev,
            [name]: value
        }))
    }
    const handleModalClose = ()=>{
        setAsistencia(prev =>({
            ...prev,
            hora: "",
            fecha: ""
        }))
        modalRef.current?.close();
    }

    const handleForm = async(event) =>{
        event.preventDefault();
        const fecha = `${asistencia.fecha} ${asistencia.hora}`;
        
        try {
            await crearAsistenciaRequest(asistencia.idCliente, fecha);
            datosCliente(asistencia.idCliente);
            console.log("Asistencia Creada con exito")
            console.log(asistencia);
            modalRef.current?.close();
        } catch (error) {
            console.log(error.response.data)
        }
    }
    return (
        <dialog ref={modalRef} onClose={handleModalClose}  className="m-auto z-50">
            <div>
                <h1 className="block w-full text-center bg-red-800 text-white font-bold p-2 mb-4 text-xl">
                    Nueva Asistencia               
                </h1>
                <form onSubmit={handleForm}  className="flex flex-col px-2 gap-2" method="dialog">
                    <div className="flex gap-2">
                        <label htmlFor="hora">Hora: </label>
                        <input value={asistencia.hora} onChange={handleInput} className="w-2/3 ml-auto px-1 border border-gray-500 shadow mb-2 rounded-sm" type="time" id="hora" name='hora'/>
                    </div>
                    <div className="flex gap-2">
                        <label htmlFor="fecha">Fecha: </label>
                        <input value={asistencia.fecha} onChange={handleInput} className="w-2/3 ml-auto px-1 border border-gray-500 shadow mb-2 rounded-sm" type="date" id="fecha" name='fecha'/>
                    </div>
                    <div className="w-full mb-4 self-center flex justify-between ">
                        <button className="w-1/3 bg-red-800 text-white text-center py-2 text-lg rounded-2xl hover:cursor-pointer  transition hover:ring-2 hover:ring-red-900">Aceptar</button>
                        <button type='button' onClick={handleModalClose} className="w-1/3 bg-red-800 text-white text-center py-2  text-lg rounded-2xl hover:cursor-pointer  transition hover:ring-2 hover:ring-red-900">Cancelar</button>
                    </div>
                </form>
            </div>
        </dialog>
    )
}