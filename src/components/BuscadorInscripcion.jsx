import { useState } from "react";
import { listarClientesRequest } from "../services/clientes";

export default function BuscadorInscripcion({setClientes, setErrorCliente, onClickNuevo}){
    const [incluirBajas, setIncluirBajas] = useState(false);

    const handleBuscador = async(event) =>{
        event.preventDefault();

        try {
            const res = await listarClientesRequest({incluirBajas});
            await setClientes(res.data);
            await setErrorCliente('');

        } catch (error) {
            await setClientes([]);
            await setErrorCliente(error.response.data.message);
        }
    }

    return (
        <div className="flex  justify-between gap-4  mx-4 mb-2">
                <form onSubmit={handleBuscador} className="w-3/4 flex flex-row justify-between items-center gap-8">
                    <div>
                        Inscripciones: 
                    </div>
                    <div className=" flex items-center gap-1">
                        <input 
                            type="checkbox" 
                            name="baja" 
                            id="baja"
                            checked={incluirBajas}
                            onChange={(e)=>{
                                setIncluirBajas(e.target.checked)}}
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