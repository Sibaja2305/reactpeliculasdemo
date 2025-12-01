import { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router";
import type CineCreacion from "../modelo/CineCreacion.model";
import FormularioCine from "./FormularioCine";

import Cargando from "../../../components/Cargando";
import clienteAPI from "../../../api/clienteAxios";
import type Cine from "../modelo/Cine.model";
import { extraerErrores } from "../../../utilidades/extraerErrores";
import type { AxiosError } from "axios";
import type { SubmitHandler } from "react-hook-form";

export default function EditarCine() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [modelo, setModelo] = useState<CineCreacion | undefined>(undefined);
  const [errores, setErrores] = useState<string[]>([]);
  useEffect(() => {
  clienteAPI.get<Cine>(`/cines/${id}`)
    .then(res => {
      const cine: Cine = res.data;
      const cineCreacion: CineCreacion = {
        nombre: cine.nombre,
        latitud: cine.latitud,
        longitud: cine.longitud
      };
      setModelo(cineCreacion);
    })
    .catch(() => navigate('/cines'));
}, [id, navigate]);
  
  const onSubmit: SubmitHandler<CineCreacion> = async (data) =>{
         try{
        await clienteAPI.put(`/cines/${id}`, data);
        navigate('/cines');
         }catch(err){
          const errores = extraerErrores(err as AxiosError);
          setErrores(errores);
         }
      }
  return (
    <>
      <h3>Editar Cine </h3>

      {modelo ? <FormularioCine modelo={modelo} onsubmit={onSubmit} errores={errores} /> : <Cargando/>} 


    </>
  );
}
