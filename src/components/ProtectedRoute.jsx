import { Navigate } from "react-router-dom";
import { useAuth } from "../context/auth/useAuth";

export default function ProtectedRoute ({rol, children}) {
    const {isAuthenticated, user} = useAuth();

    if(!isAuthenticated)
        return <Navigate to="/" replace /> 

    if(!rol.includes(user.tipo))
        return <Navigate to="/" replace />

    return children;
}
