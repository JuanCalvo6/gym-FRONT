import { Outlet, Link } from "react-router-dom";

export default function AdminLayout (){
    return (
        <div>
            <nav>
                <Link to="/admin"> INICIO </Link>
                <Link to="/admin/ejercicios"> EJERCICIOS </Link>
                <Link to="/admin/pases"> PASES </Link>
                <Link to="/admin/profesores"> PROFESORES </Link>
            </nav>
           <Outlet/>
        </div>
    )
}