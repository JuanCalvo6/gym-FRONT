
export const mayus = (cadena)=>{
    if(!cadena) return "";
    return cadena.charAt(0).toUpperCase() + cadena.slice(1);
}

export const mayusWords = (str) => {
  if (!str) return "";
  return str
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};