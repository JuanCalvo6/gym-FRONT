import { Outlet, Link } from "react-router-dom";

export default function AdminLayout (){
    return (
        <div>
            <nav className="flex gap-6 justify-center my-4">
                <Link to="/admin/profesores">
                    <button className="w-auto bg-red-800 text-white px-8 py-2  text-lg rounded-2xl self-center hover:cursor-pointer  transition hover:ring-2 hover:ring-red-900" type="submit">
                        PROFESORES
                    </button>
                </Link>
                <Link to="/admin/pases">
                    <button className="w-auto bg-red-800 text-white px-8 py-2  text-lg rounded-2xl self-center hover:cursor-pointer  transition hover:ring-2 hover:ring-red-900" type="submit">
                        PASES
                    </button> 
                </Link>
                <Link to="/admin/ejercicios">
                    <button className="w-auto bg-red-800 text-white px-8 py-2  text-lg rounded-2xl self-center hover:cursor-pointer  transition hover:ring-2 hover:ring-red-900" type="submit">
                        EJERCICIOS
                    </button>
                </Link>
            </nav>
           <Outlet/>
        </div>
    )
}