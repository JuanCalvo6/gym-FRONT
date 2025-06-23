import { useEffect, useRef, useState } from "react";
import { useAuth } from "../../context/auth/useAuth"
import { listarClientesRequest } from "../../services/clientes";
import BuscadorCliente from '../../components/BuscadorCliente'
import TablaClientes from "../../components/TablaClientes";
import NuevoModificarCliente from "../../components/NuevoModificarCliente";

export default function ClientesPage (){
    const [cliente, setCliente] = useState({
        nombres: '',
        apellidos: '',
        tipoDni: '',
        dni: '',
        huella: '',
        telefono: '',
        direccion: '',
        mail: ''}
    )
    const [clientes, setClientes] = useState([]);
    const [errorCliente, setErrorCliente] = useState('');
    const [modoForm, setModoForm] = useState('nuevo');
    const {user} = useAuth();
    const modalRef = useRef(null);

    const cargaInicial = async()=>{
        try {
            const res = await listarClientesRequest({buscar: '', incluirBajas: false});
            await setClientes(res.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        cargaInicial();
    },[])

    const handleNuevo = () =>{
        setModoForm('nuevo');
        modalRef.current?.showModal();
    }

     const handleModificar = (dato) =>{
        setCliente(dato);
        setModoForm('modificar');
        modalRef.current?.showModal();
    }

    return (
        <div> 
            <h1 className="mt-2 mx-4 mb-8">Profesor/a: {user.nombre} </h1>
            <BuscadorCliente 
                setClientes={setClientes}
                setErrorCliente={setErrorCliente}
                onClickNuevo={handleNuevo}
                modalRef={modalRef}
            />
            <h2 className="mx-4 mb-2">Clientes:</h2>
            
            <TablaClientes 
                clientes={clientes}
                onClickModificar={handleModificar}
                errorCliente={errorCliente}
            />

            <NuevoModificarCliente
                modo={modoForm}
                cliente={cliente} 
                modalRef={modalRef} 
                setCliente={setCliente} 
                cargarClientes={cargaInicial}
            />
        </div>
    )
}