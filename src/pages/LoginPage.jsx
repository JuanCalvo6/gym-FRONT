import { useState } from "react";
import {useAuth} from '../context/auth/useAuth.jsx'

export default function LoginPage(){
    const [usuario, setUsuario] = useState('');
    const [contraseña, setContraseña] = useState('');
    const {signin} = useAuth();

    const handleChangeUsuario = (event) =>{
        setUsuario(event.target.value);
    }

    const handleChangeContraseña = (event) =>{
        setContraseña(event.target.value);
    }

    const handleSubmit = async(event) =>{
        event.preventDefault();
        await signin({usuario, contraseña})
    }

    return (
        <div className="bg-[url('src/assets/fondo.webp')] min-h-76 grow bg-cover bg-center relative flex flex-col items-center justify-center">
            <div className="absolute transform lg:translate-x-80 xl:translate-x-120  ">
                <div className="bg-white min-w-xs max-w-md pb-6 shadow-lg">
                    <h1 className="block w-full text-center bg-red-800 text-white font-bold p-2 mb-4 text-xl">INICIAR SESION</h1>
                    <form onSubmit={handleSubmit} className="flex flex-col mx-4 gap-1" >
                        <div>
                            <label className="block mb-1" htmlFor="usuario" >Nombre de Usuario :</label>
                            <input 
                                className="w-full border border-gray-500 shadow mb-4 rounded-sm px-1" 
                                type="text"
                                id="usuario" 
                                value = {usuario}
                                onChange={handleChangeUsuario}
                            />
                            {/* {error && <p className="text-red-600 text-sm -mt-4 mb-2">{error}</p>} */}
                        </div>
                        <div>
                            <label className="block mb-1" htmlFor="contraseña" >Contraseña :</label>
                            <input 
                                className="w-full border border-gray-500 shadow mb-4 rounded-sm px-1" 
                                type="password"
                                id="contraseña" 
                                value={contraseña}
                                onChange={handleChangeContraseña}
                            />
                            {/* {error && <p className="text-red-600 text-sm -mt-4 mb-2">{error}</p>} */}
                        </div>
                        <button className="w-auto bg-red-800 text-white px-8 py-2  text-lg rounded-2xl self-center hover:cursor-pointer  transition hover:ring-2 hover:ring-red-900" type="submit">
                            INGRESAR
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}