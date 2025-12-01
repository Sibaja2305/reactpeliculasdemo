import type { SubmitHandler } from "react-hook-form";
import FormularioCine from "./FormularioCine";
import type CineCreacion from "../modelo/CineCreacion.model";
import { useNavigate } from "react-router";
import { useState } from "react";
import clienteAPI from "../../../api/clienteAxios";
import type { AxiosError } from "axios";
import { extraerErrores } from "../../../utilidades/extraerErrores";


export default function CrearCine (){
    const navigate = useNavigate();
    const [errores, setErrores] = useState<string[]>([]); 
    const onSubmit: SubmitHandler<CineCreacion> = async (data) =>{
     try{
        await clienteAPI.post('/cines', data);
        navigate('/cines');
     }catch(err){
        const error = extraerErrores(err as AxiosError);
        setErrores(error);
     }
    }
    return(
        <>
        <h3>Crear Cine </h3>
        <FormularioCine onsubmit={onSubmit} errores={errores} />
        </>
    )
}