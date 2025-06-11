import axios from './axios.js'

export const loginRequest = async(user)=>{
    const res = await axios.post('/login', user);
    return res; 
}

export const logoutRequest = async()=>{
    const res = await axios.post('/logout');
    return res;   
}

export const verifyTokenRequest = ()=>{
    const res = axios.get('/verify');
    return res;   
}