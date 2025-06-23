import { useState, useEffect } from "react";
import validarCliente from "../validaciones/validarCliente";
import { crearClienteRequest, modificarCLienteRequest } from "../services/clientes";

export default function NuevoModificarCliente({modo, cliente, modalRef, setCliente, cargarClientes}){
    const [errores, setErrores] = useState([]);

    useEffect(()=>{
            if(errores){
                const timer = setTimeout(() => setErrores(""), 3000);
                return () => clearTimeout(timer);
            }
        },[errores])

    const handleForm =  async(event) => {
        event.preventDefault();
        const erroresCliente = validarCliente(cliente);

        if(Object.keys(erroresCliente).length > 0){
            setErrores(erroresCliente);
            return
        }
        try {
            if(modo === 'nuevo')
                await crearClienteRequest(cliente);
            else
                await modificarCLienteRequest(cliente);

            cargarClientes();
            modalRef.current?.close();
        } catch (error) {
            console.log(error)
        }
        
    }

    const handleInputForm = (event) =>{
        const {name, value} = event.target;
        setCliente(prev => ({
            ...prev, 
            [name] : value
        }));
    };

    const handleModalClose = () =>{
            setCliente({nombres: '',
            apellidos: '',
            tipoDni: '',
            dni: '',
            huella: '',
            telefono: '',
            direccion: '',
            mail: ''})
            modalRef.current?.close();
        }

    return (
        <dialog ref={modalRef} onClose={handleModalClose}  className="m-auto z-50">
            <div>
                <h1 className="block w-full text-center bg-red-800 text-white font-bold p-2 mb-4 text-xl">
                    {modo === 'nuevo' ? "Nuevo Cliente" : "Modificar Cliente"}                
                </h1>
                <form onSubmit={handleForm}  className="flex flex-col px-2 gap-2" method="dialog">
                    <div className="flex gap-2">
                        <label htmlFor="nombres">Nombre: </label>
                        <input value={cliente.nombres} onChange={handleInputForm} className="w-2/3  ml-auto px-1 border border-gray-500 shadow mb-2 rounded-sm" type="text" id="nombres" name='nombres'/>
                    </div>
                    {errores?.nombres && <p className="text-red-600 text-right text-sm -mt-4">{errores.nombres}</p>}
                    <div className="flex gap-2">
                        <label htmlFor="apellidos">Apellido: </label>
                        <input value={cliente.apellidos} onChange={handleInputForm} className="w-2/3 ml-auto px-1 border border-gray-500 shadow mb-2 rounded-sm" type="text" id="apellidos" name='apellidos'/>
                    </div>
                    {errores?.apellidos && <p className="text-red-600 text-right text-sm -mt-4">{errores.apellidos}</p>}
                    <div className="flex">
                        <label htmlFor="documento">Documento: </label>
                        <select value={cliente.tipoDni} onChange={handleInputForm} className="w-1/6 ml-auto mr-0 border border-gray-500 shadow mb-2 rounded-sm" name="tipoDni" id="">
                            <option value="">Tipo</option>
                            <option value="dni">DNI</option>
                            <option value="cuil">Cuil</option>
                            <option value="pasaporte">P.</option>
                            <option value="otro">Otro</option>
                        </select>
                        <input  value={cliente.dni} onChange={handleInputForm} className="w-1/2 border px-1 border-gray-500 shadow mb-2 rounded-sm" type="text" id="documento" name='dni'/>
                    </div>
                    {errores?.tipoDni && <p className="text-red-600 text-right text-sm -mt-4 mb-1">{errores.tipoDni}</p>}
                    {errores?.dni && <p className="text-red-600 text-right text-sm -mt-4">{errores.dni}</p>}
                    <div className="flex gap-2">
                        <label htmlFor="huella">Huella: </label>
                        <input value={cliente.huella} onChange={handleInputForm} className="w-2/3 ml-auto px-1 border border-gray-500 shadow mb-2 rounded-sm" type="text" id="huella" name='huella'/>
                    </div>
                    {errores?.huella && <p className="text-red-600 text-right text-sm -mt-4">{errores.huella}</p>}
                    <div className="flex gap-2">
                        <label htmlFor="telefono">Telefono: </label>
                        <input  value={cliente.telefono} onChange={handleInputForm} className="w-2/3 ml-auto px-1 border border-gray-500 shadow mb-2 rounded-sm" type="number" id="telefono" name='telefono'/>
                    </div>
                    {errores?.telefono && <p className="text-red-600 text-right text-sm -mt-4">{errores.telefono}</p>}
                    <div className="flex gap-2">
                        <label htmlFor="direccion">Direccion: </label>
                        <input  value={cliente.direccion} onChange={handleInputForm} className="w-2/3 ml-auto px-1 border border-gray-500 shadow mb-2 rounded-sm" type="text" id="direccion" name='direccion'/>
                    </div>
                    {errores?.direccion && <p className="text-red-600 text-right text-sm -mt-4">{errores.direccion}</p>}
                    <div className="flex gap-2">
                        <label htmlFor="mail">Email: </label>
                        <input  value={cliente.mail} onChange={handleInputForm} className="w-2/3 ml-auto px-1 border border-gray-500 shadow mb-2 rounded-sm" type="mail" id="mail" name='mail'/>
                    </div>
                    {errores?.mail && <p className="text-red-600 text-right text-sm -mt-4">{errores.mail}</p>}
                    <div className="w-full self-center flex justify-between ">
                        <button className="w-1/3 bg-red-800 text-white text-center py-2 mb-4 text-lg rounded-2xl hover:cursor-pointer  transition hover:ring-2 hover:ring-red-900">Aceptar</button>
                        <button type='button' onClick={handleModalClose} className="w-1/3 bg-red-800 text-white text-center py-2 mb-4 text-lg rounded-2xl hover:cursor-pointer  transition hover:ring-2 hover:ring-red-900">Cancelar</button>
                    </div>
                    
                </form>
            </div>
        </dialog>
    )
}