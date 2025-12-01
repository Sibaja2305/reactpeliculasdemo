import { useEffect, useState } from "react";
import { type SubmitHandler } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import type ActorCreacion from "../modelos/ActorCreacion.model";
import Cargando from "../../../components/Cargando";
import FormularioActor from "./FormularioActor";
import clienteAPI from "../../../api/clienteAxios";
import type Actor from "../modelos/Actor.model";
import formatearFecha from "../../../utilidades/formatearFecha";
import { extraerErrores } from "../../../utilidades/extraerErrores";
import type { AxiosError } from "axios";

export default function EditarActor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [modelo, setModelo] = useState<ActorCreacion | undefined>(undefined);
  const [errores, setErrores] = useState<string[]>([]);
  useEffect(() => {
    clienteAPI.get<Actor>(`/actores/${id}`).then((res =>{
      const actor = res.data;
      const ActorCreacion: ActorCreacion = {
        nombre: actor.nombre,
        fechaNacimiento:formatearFecha(actor.fechaNacimiento),
        foto: actor.foto
      };
      setModelo(ActorCreacion);
    }))
  }, [id]);

  const onSubmit: SubmitHandler<ActorCreacion> = async (data) => {
    try{
      await clienteAPI.putForm(`actores/${id}`, data);
      navigate("/actores");
    }catch(err){
      const errores = extraerErrores(err as AxiosError);
      setErrores(errores);
    }
  };
  return (
    <>
      <h3>Editar Actor </h3>
      {modelo ? <FormularioActor errores={errores} modelo={modelo} onSubmit={onSubmit} /> : <Cargando />}
    </>
  );
}
