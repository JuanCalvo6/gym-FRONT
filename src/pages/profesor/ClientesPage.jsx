import { useEffect, useRef, useState } from "react";
import { useAuth } from "../../context/auth/useAuth"
import { listarClientesRequest } from "../../services/clientes";
import BuscadorCliente from '../../components/BuscadorCliente'
import TablaClientes from "../../components/TablaClientes";
import NuevoModificarCliente from "../../components/NuevoModificarCliente";
import { mayusWords } from "../../utils/mayus";

export default function ClientesPage (){
    const [buscar, setBuscar] = useState('');
    const [incluirBajas, setIncluirBajas] = useState(false);
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
    const [errorClientes, setErrorClientes] = useState('');
    const [modoForm, setModoForm] = useState('nuevo');
    const {user} = useAuth();
    const modalRef = useRef(null);

    const datosClientes = async()=>{
        try {
            const res = await listarClientesRequest({buscar, incluirBajas});
            setClientes(res.data);
        } catch (error) {
            setClientes([]);
            setErrorClientes(error.response.data.errores);
        }
    }

    useEffect(()=>{
        datosClientes();
    },[]);

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
            <h1 className="mt-2 mx-4 mb-8">Profesor/a: {mayusWords(user.nombre)} </h1>
            <BuscadorCliente 
                setClientes={setClientes}
                setErrorClientes={setErrorClientes}
                buscar={buscar}
                setBuscar={setBuscar}
                incluirBajas={incluirBajas}
                setIncluirBajas={setIncluirBajas}
                onClickNuevo={handleNuevo}
                modalRef={modalRef}
            />
            <h2 className="mx-4 mb-2">Clientes:</h2>
            
            <TablaClientes 
                clientes={clientes}
                errorClientes={errorClientes}
                setErrorClientes={setErrorClientes}
                onClickModificar={handleModificar}
                cargarClientes={datosClientes}
            />

            <NuevoModificarCliente
                modo={modoForm}
                cliente={cliente} 
                modalRef={modalRef} 
                setCliente={setCliente} 
                cargarClientes={datosClientes}
            />
        </div>
    )
}