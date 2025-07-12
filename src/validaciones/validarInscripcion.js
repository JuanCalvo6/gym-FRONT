
export default function validarInscripcion (inscripcion, pases) {
    const errores = {};
    

    if(!pases.find((pase) => String(pase.idPase) === inscripcion.idPase))
        errores.pase = "Seleccione un tipo de pase";

    if(inscripcion.diaInicio === "")
        errores.diaInicio = "Seleccione una fecha de inicio";

    if(inscripcion.diaFin === "")
        errores.diaFin = "Selecciones una fecha de fin";

    if(inscripcion.diaInicio && inscripcion.diaFin){
        const fechaInicio = new Date(inscripcion.diaInicio);
        const fechaFin =  new Date(inscripcion.diaFin);
        if(fechaFin < fechaInicio)
            errores.diaFin = "La fecha de fin debe ser posterior a la fecha de inicio"
    }
    
    if(inscripcion.precio === "")
        errores.precio = "El precio es obligatorio";

    return errores;
}