import axios from './axios.js'

export const loginRequest = async(user)=>{
    try {
        const res = await axios.post('/login', user);
        return res;

    } catch (error) {
        console.log("Error de loginRequest: ", error.response.data.message);
        throw error;
    }
}

export const logoutRequest = async()=>{
    try {
        const res = await axios.post('/logout');
        return res;   
    
    } catch (error) {
        console.log("Error de logoutRequest: ", error.response.data.message);
        throw error;
    }
}

export const verifyTokenRequest = ()=>{
    try {
        const res = axios.get('/verify');
        return res;
    } catch (error) {
        console.log("Error de verifyTokenRequest: ", error.response.data.message);
        throw error;
    }
}