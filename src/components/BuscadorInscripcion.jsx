
export default function BuscadorInscripcion({bajas, setBajas,onClickNuevo, datosInscripciones, idCliente}){


    const handleBajas = (event)=>{
        setBajas(event.target.checked)
        datosInscripciones(idCliente, !bajas);
    }

    return (
        <div className="flex  justify-between gap-4  mx-4 mb-2">
            <form className="w-3/4 flex flex-row justify-between items-center gap-8">
                <div>
                    Inscripciones: 
                </div>
                <div className=" flex items-center gap-1">
                    <input 
                        type="checkbox" 
                        name="baja" 
                        id="baja"
                        checked={bajas}
                        onChange={handleBajas}
                    />
                    <label htmlFor="baja">Mostrar Bajas</label>
                </div>
            </form>
            <button onClick={onClickNuevo} className="w-auto bg-red-800 text-white px-8 py-2  text-lg rounded-2xl self-center hover:cursor-pointer  transition hover:ring-2 hover:ring-red-900" type="submit">
                NUEVO
            </button>
        </div>
    )
}