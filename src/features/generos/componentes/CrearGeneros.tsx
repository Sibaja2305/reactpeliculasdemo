import { type SubmitHandler } from "react-hook-form";

import type GeneroCreacion from "../modelos/GeneroCreacion.model";
import FormularioGenero from "./FormularioGenero";
import clienteAPI from "../../../api/clienteAxios";
import { useNavigate } from "react-router";
import { useState } from "react";
import { extraerErrores } from "../../../utilidades/extraerErrores";
import type { AxiosError } from "axios";

export default function CrearGenero(){
   const navigate = useNavigate();
   const [errores, setErrores] = useState<string[]>([]);

    const onSubmit: SubmitHandler<GeneroCreacion> = async (data) => {
    try{
        await clienteAPI.post('/generos', data)
        navigate('/generos');
    }catch(error){
       const errores = extraerErrores(error as AxiosError);
       setErrores(errores);
    }
  
    }
    return (
       <>
       <FormularioGenero errores={errores} onSubmit={onSubmit}/>
       </>
    )
}

