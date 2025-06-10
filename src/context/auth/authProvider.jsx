import { AuthContext } from "./authContext.jsx"
import { loginRequest, logoutRequest, verifyTokenRequest } from "../../services/aut.js"
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export const AuthProvider = ({children}) =>{
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(()=>{
        const checkLogin = async()=>{
            const cookie = Cookies.get();
            if(cookie.token){
                try {
                    const res = await verifyTokenRequest(cookie.token)
                    if(res.data){
                        setIsAuthenticated(true);
                        setUser(res.data);
                    }
                } catch (error) {
                    console.log(error.response.data.message);
                    setIsAuthenticated(false);
                    setUser(null);
                }
            }
        }
        checkLogin();
    },[])

    const signin = async({usuario, contraseña}) =>{
        try {
            const res = await loginRequest({usuario, contraseña})
            console.log(res.data);
            setUser(res.data);
            setIsAuthenticated(true);
        } catch (error) {
            console.log(error.response.data.message)
        }
    }

    const signout = async() =>{
        try {
            const res = await logoutRequest();
            console.log(res.data);
            setUser(null);
            setIsAuthenticated(false);
        } catch (error) {
            console.log(error.response.data.message)
        }
    } 

    return (
       < AuthContext.Provider value={{
        user,
        isAuthenticated,
        signin,
        signout
       }}>
        {children}
       </AuthContext.Provider>
    )
}