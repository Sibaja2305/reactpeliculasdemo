import axios from "axios";
import { obtenerToke } from "../features/Seguridad/utilidades/ManejadorJWT";

const clienteAPI = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});
clienteAPI.interceptors.request.use((config) =>{
    const token = obtenerToke();
    if(token){
        config.headers.Authorization = `bearer ${token}`
    }
    return config;
})

export default clienteAPI;