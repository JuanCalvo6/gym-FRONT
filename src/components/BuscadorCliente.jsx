import { listarClientesRequest } from "../services/clientes";

export default function BuscadorCliente ({setClientes, setErrorClientes,buscar, setBuscar,incluirBajas, setIncluirBajas, onClickNuevo}){

    const handleBuscador = async(event) =>{
        event.preventDefault();
        try {
            const res = await listarClientesRequest({buscar,incluirBajas});
            await setClientes(res.data);

        } catch (error) {
            await setClientes([]);
            setErrorClientes(error.response.data.errores);
        }
    }

    return (
        <div className="flex  justify-between gap-4  mx-4 mb-6">
                <form onSubmit={handleBuscador} className="w-3/4 flex flex-row items-center gap-8">
                    <input 
                        className="w-1/2 pl-1 border border-gray-500 shadow-md" 
                        type="text"
                        value={buscar}
                        onChange={(e)=>setBuscar(e.target.value)} 
                    />
                    <div className=" flex items-center gap-1">
                        <input 
                            type="checkbox" 
                            name="baja" 
                            id="baja"
                            checked={incluirBajas}
                            onChange={(e)=>setIncluirBajas(e.target.checked)}
                        />
                        <label htmlFor="baja">Mostrar Bajas</label>
                    </div>
                    <button className="w-auto bg-red-800 text-white px-8 py-2  text-lg rounded-2xl self-center hover:cursor-pointer  transition hover:ring-2 hover:ring-red-900" type="submit">
                        BUSCAR
                    </button>
                </form>
                <button onClick={onClickNuevo} className="w-auto bg-red-800 text-white px-8 py-2  text-lg rounded-2xl self-center hover:cursor-pointer  transition hover:ring-2 hover:ring-red-900" type="submit">
                    NUEVO
                </button>
            </div>
    )
}