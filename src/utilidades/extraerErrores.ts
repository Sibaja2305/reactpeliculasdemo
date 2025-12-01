import type { AxiosError } from "axios";


export function extraerErrores(obj: AxiosError): string[] {

 const data = obj.response?.data as RespuestaError;

 const err = data.errors;
 let mensajeError: string[] =[];
 for (const campo in err){
    const mensajeCampo = err[campo].map(mensajeError => `${campo}: ${mensajeError}`);
    mensajeError = mensajeError.concat(mensajeCampo);
 }
 return mensajeError;
}

interface RespuestaError{
    errors: {
        [campo: string]: string[];
    }
}