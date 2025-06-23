
export default function validarCliente(cliente){
    const tiposDocumento = ['dni','cuil','pasaporte','otro'];
    const errores = {};

    if(!cliente.nombres){
        errores.nombres = "El nombre es obligatorio";
    }
    else if(!/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/.test(cliente.nombres)){
            errores.nombres = "El nombre solo puede contener caracteres alfabéticos";
    }

    if(!cliente.apellidos){
        errores.apellidos = "El apellido es obligatorio";
    }
    else if(!/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/.test(cliente.apellidos)){
            errores.apellidos = "El apellido solo puede contener caracteres alfabéticos";
    }

    if(!tiposDocumento.includes(cliente.tipoDni))
        errores.tipoDni = "Tipo de documento no válido";

    if(!cliente.dni){
        errores.dni = "El documento es obligatorio";
    }
    else if(!/^\d{1,20}$/.test(cliente.dni)){
        errores.dni = "El dni solo acepta números";
    }

    if(!cliente.huella)
        errores.huella = "La huella es obligatoria";

    if(cliente.telefono && !/^\d{1,20}$/.test(cliente.telefono))
        errores.telefono = "El telefono solo acepta números";

    if(cliente.mail && !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(cliente.mail)) 
        errores.mail = 'El mail no tiene un formato válido.';

    return errores;
}