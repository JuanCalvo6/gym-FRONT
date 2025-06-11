import { useState, useEffect } from "react";
import {useAuth} from '../context/auth/useAuth.jsx'
import { useNavigate } from "react-router-dom";

export default function LoginPage(){
    const [usuario, setUsuario] = useState('');
    const [contraseña, setContraseña] = useState('');
    const {user,isAuthenticated, errores,setErrores, signin} = useAuth();
    const navigate = useNavigate();

    useEffect(()=>{
        if(isAuthenticated){
            if(user.tipo === 'admin')
                navigate('/admin')
            if(user.tipo === 'prof')
                navigate('/profesor')
        }
    }, [isAuthenticated]);

    useEffect(()=>{
        if(errores){
            const timer = setTimeout(() => setErrores(""), 3000);
            return () => clearTimeout(timer);
        }
    },[errores])

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
                <div className="bg-white min-w-xs max-w-md pb-6 shadow-lg absolute transform lg:translate-x-80 xl:translate-x-120  ">
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
                            {errores.errores?.usuario && <p className="text-red-600 text-sm -mt-4 mb-2">{errores.errores.usuario}</p>}
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
                            {errores.errores?.contraseña && <p className="text-red-600 text-sm -mt-4 mb-2">{errores.errores.contraseña}</p>}
                        </div>
                        <button className="w-auto bg-red-800 text-white px-8 py-2  text-lg rounded-2xl self-center hover:cursor-pointer  transition hover:ring-2 hover:ring-red-900" type="submit">
                            INGRESAR
                        </button>
                        {errores?.message && <p className="text-red-600 text-sm self-center">{errores.message}</p>}
                    </form>
                </div>
        </div>
    )
}