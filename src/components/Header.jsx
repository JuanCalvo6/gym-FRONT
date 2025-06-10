import salir from '../assets/salir.png';
import logo from '../assets/logo.png';

export default function Header (){
    return(
        <header className="relative w-full min-h-14 bg-red-800 flex items-center px-4">
            <img  className="absolute left-1/2 -translate-x-1/2 h-12" src={logo} alt=""/> 
            <button className="absolute right-4 top-1/2 -translate-y-1/2">
                <img className="h-8 " src={salir} alt=""/>
            </button>        
        </header>
    )
}