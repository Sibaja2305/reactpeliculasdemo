import type { AxiosError } from "axios";

export default function extraerErrores(obj : AxiosError): string []{
    const data = obj.response?.data as RespuestaErrorProps[];
    const mensajeError: string[] = data.map(error => error.description);
    return mensajeError;
}
interface RespuestaErrorProps{
    code: string;
    description: string;
}