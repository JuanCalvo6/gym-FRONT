
export const formatFecha = (cadena) =>{
    const mes =  ["Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov", "Dic"]
    const fecha = cadena.split("T")[0]
    const partes = fecha.split("-");
    return `${partes[2]}-${mes[parseInt(partes[1])-1]}`;
};