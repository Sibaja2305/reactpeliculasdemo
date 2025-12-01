import type Claim from "../modelos/Claim";
import type RespuestaAutenticacion from "../modelos/RespuestaAutenticacion";
const llaveToken = "token";
const llaveExpiracion = "expiracion";

export function UsuarioEstaLogueado(){
    const claims = obtenerClaims();
    return claims.length > 0;
}
export function guardatTokenLocalStorage(autenticacion: RespuestaAutenticacion){
    localStorage.setItem(llaveToken, autenticacion.token);
    localStorage.setItem(llaveExpiracion, autenticacion.expiracion.toString());
}
export function logout(){
    localStorage.removeItem(llaveToken);
    localStorage.removeItem(llaveExpiracion);
}

export function obtenerClaims(): Claim[]{
    const token = localStorage.getItem(llaveToken);
    const expiracion = localStorage.getItem(llaveExpiracion);
    if (!token || ! expiracion) {
        return[];
    }
    const expiracionFecha = new Date(expiracion);
    if (isNaN(expiracionFecha.getTime()) || expiracionFecha <= new Date()) {
        logout();
        return[];
    }
    try{
        const payloadBase64 = token.split('.')[1];
        const payloadJson = atob(payloadBase64);
        const dataToken = JSON.parse(payloadJson);
        const claims: Claim[] = Object.entries(dataToken)
            .map(([nombre, valor]) => ({nombre, valor: String(valor)}));
     return claims;
    }catch (error){
        console.error(error);
        logout();
        return[];
    }
}
 export function obtenerToke(){
    return localStorage.getItem(llaveToken);
 }